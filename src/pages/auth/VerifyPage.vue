<template>
  <div>
    <section class="loginPage">
      <div class="container">
        <div class="grid">
          <div class="left">
            <h4 class="section_header">Verify your {{ name[type] }}.</h4>
            <p class="section_paraText">
              We have sent instructions to your provided {{ name[type] }} to
              help you complete your verification.
            </p>
            <div class="auth q-mt-lg">
              <form @submit.prevent="send" id="form">
                <div class="auth">
                  <div
                    class="justify-center otp_wrap"
                    style="display: flex; flex-direction: row; gap: 0.5rem"
                  >
                    <OtpInput
                      rounded
                      ref="otpInput"
                      input-classe="otp-input"
                      primary-color="var(--q-secondary)"
                      secondary-color="var(--q-primary)"
                      :fields="6"
                      :has-error="!!errors.code"
                      :field-width="$q.screen.lt.sm ? 45 : 56"
                      :field-height="$q.screen.lt.sm ? 45 : 56"
                      :error-message="errors.code"
                      v-model="form.code"
                      @complete="handleOnComplete"
                    />
                  </div>
                </div>

                <div class="submit_btn row justify-center q-mt-lg q-mb-lg">
                  <p class="text_poppins q-my-md">
                    <q-btn
                      dense
                      no-caps
                      outline
                      color="negative"
                      padding="sm"
                      @click="requestCode"
                      :disable="timeOut > 0"
                    >
                      Request New Code
                      {{ timeOut > 0 ? `(${timeOut} secs.)` : '' }}
                    </q-btn>
                  </p>
                  <q-btn
                    flat
                    no-caps
                    no-wrap
                    type="submit"
                    class="full-width bg-secondary review_small bold text-white"
                    :loading="loading"
                    :disable="form.code?.length < 6"
                    @click="send"
                  >
                    Verify
                  </q-btn>
                  <p class="text_poppins q-mt-sm">
                    Not your account?
                    <router-link
                      :to="{ name: 'logout' }"
                      class="text-negative text_serrat"
                    >
                      Logout
                    </router-link>
                  </p>
                </div>

                <div class="clear"></div>
              </form>
            </div>
          </div>
          <div class="right">
            <img src="/images/auth.jpeg" alt="" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import OtpInput from 'components/utilities/OtpInput.vue';
import { useForm } from 'alova/client';
import { RequestErrors } from 'app/repository/models';
import { verificationRequest } from 'src/data/userRequests';
import { reboot } from 'src/utils/proccessor';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { notify } from 'src/utils/helpers';
import { date, useInterval } from 'quasar';

const { registerInterval, removeInterval } = useInterval();
const now = ref(new Date());
const type = computed<'phone' | 'email'>(() => route.params.type as 'phone');
const route = useRoute();
const router = useRouter();

const timeOut = computed<number>(() =>
  date.getDateDiff(new Date(data.value.try_at), now.value, 'seconds'),
);

const name: Record<'phone' | 'email', string> = {
  email: 'email address',
  phone: 'phone number',
};

const errors = computed(
  () => (error.value as unknown as RequestErrors)?.errors || {},
);

const { send, form, data, error, loading, updateForm, onSuccess } = useForm(
  (f) => verificationRequest(f, type.value),
  {
    initialForm: {
      code: <string>'',
      _method: <'POST' | 'PUT'>'POST',
    },
    initialData: {
      try_at: new Date().toString(),
    },
    resetAfterSubmitting: true,
  },
).onComplete(() => {
  updateForm({ code: '' });
});

onSuccess(({ data }) => {
  notify(data.message, data.status);
  if (data.try_at) {
    now.value = new Date();
    registerInterval(() => {
      now.value = new Date();
    }, 2000);
  } else {
    removeInterval();
  }
  if (data.reboot) {
    proceed();
  }
});

const proceed = () => {
  loading.value = true;
  reboot(undefined, router, true).then(() => {
    loading.value = false;
    router.replace({ name: 'user.dashboard' });
  });
};

const handleOnComplete = () => {
  updateForm({ _method: 'PUT' });
  send();
};

const requestCode = () => {
  updateForm({ _method: 'POST' });
  send();
};

watch(timeOut, (timeOut) => {
  if (timeOut < 0) {
    removeInterval();
  }
});
</script>
