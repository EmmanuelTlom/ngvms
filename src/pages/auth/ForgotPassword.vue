<template>
  <div>
    <section class="loginPage">
      <div class="container">
        <div class="grid">
          <div class="left">
            <q-btn
              flat
              :to="{ name: 'login' }"
              no-caps
              no-wrap
              class="review_small text-weight-medium"
            >
              <i class="fa-solid q-mr-sm fa-chevron-left"></i> Back to login
            </q-btn>
            <div v-if="view === 'request'">
              <h4 class="section_header">Forgot your password?</h4>
              <p class="section_paraText">
                Don’t worry, happens to all of us. Enter your email below to
                recover your password
              </p>
              <div class="auth q-mt-lg">
                <form @submit.prevent="request" id="form">
                  <div class="input-box active-grey">
                    <label class="input-label">Email</label>
                    <input
                      name="email"
                      v-model="forgotForm.email"
                      type="email"
                      class="input-1"
                      autocomplete="email"
                    />
                  </div>

                  <span class="error-message" v-if="errors.email">
                    {{ errors.email }}
                  </span>

                  <div class="submit_btn row justify-center q-mt-lg q-mb-lg">
                    <q-btn
                      flat
                      no-caps
                      no-wrap
                      type="submit"
                      class="full-width bg-secondary review_small bold text-white"
                      :disable="timeOut > 0 || !forgotForm.email"
                      :loading="requesting"
                    >
                      Submit
                      {{ timeOut > 0 ? `(${timeOut} secs.)` : '' }}
                    </q-btn>
                  </div>

                  <!-- <div class="or_section">
                    <p class="text-center review_small">Or login with</p>

                    <div class="or_btns">
                      <q-btn flat>
                        <img src="/images/facebook.svg" alt="" />
                      </q-btn>
                      <q-btn flat>
                        <img src="/images/google.svg" alt=""
                      /></q-btn>
                      <q-btn flat>
                        <img src="/images/apple.svg" alt=""
                      /></q-btn>
                    </div>
                  </div> -->

                  <div class="clear"></div>
                </form>
              </div>
            </div>
            <div v-if="view === 'verify'" class="relative">
              <h4 class="section_header">Verify code</h4>
              <p class="section_paraText">
                We have sent instructions to your provided email address to help
                you complete your password recovery.
              </p>
              <div class="auth q-mt-lg">
                <form @submit.prevent="send" id="form">
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
                    @complete="send"
                  />

                  <div class="submit_btn row justify-center q-mt-lg q-mb-lg">
                    <p class="text_poppins q-my-md">
                      <q-btn
                        dense
                        no-caps
                        outline
                        color="negative"
                        padding="sm"
                        @click="view = 'request'"
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
                    >
                      Verify
                    </q-btn>
                  </div>

                  <div class="clear"></div>
                </form>
              </div>
              <q-inner-loading :showing="!!$route.query.token && loading" />
            </div>
            <div v-if="view === 'reset'">
              <template v-if="!completed">
                <h4 class="section_header">Set a password</h4>
                <p class="section_paraText">
                  Please setup a new password for your account.
                </p>
                <div class="auth q-mt-lg">
                  <form @submit.prevent="send" id="form">
                    <div class="input-box last active-grey">
                      <label class="input-label">Password</label>
                      <div class="row items-center justify-between no-wrap">
                        <input
                          v-model="form.password"
                          :type="togglePassword ? 'password' : 'text'"
                          class="input-1"
                        />
                        <q-btn @click="togglePassword = !togglePassword" flat>
                          <i class="fa-regular fa-eye-slash"></i>
                        </q-btn>
                      </div>
                    </div>

                    <span class="error-message" v-if="errors.password">
                      {{ errors.password }}
                    </span>

                    <div class="input-box last active-grey">
                      <label class="input-label">Re-enter Password</label>
                      <div class="row items-center justify-between no-wrap">
                        <input
                          v-model="form.password_confirmation"
                          :type="togglePassword ? 'password' : 'text'"
                          class="input-1"
                        />
                        <q-btn @click="togglePassword = !togglePassword" flat>
                          <i class="fa-regular fa-eye-slash"></i>
                        </q-btn>
                      </div>
                    </div>

                    <span
                      class="error-message"
                      v-if="errors.password_confirmation"
                    >
                      {{ errors.password_confirmation }}
                    </span>

                    <span class="error-message" v-if="errors.code">
                      {{ errors.code }}
                    </span>

                    <div class="submit_btn row justify-center q-mt-lg q-mb-lg">
                      <q-btn
                        no-caps
                        no-wrap
                        flat
                        type="submit"
                        class="full-width bg-secondary review_small bold text-white"
                      >
                        Set Password
                      </q-btn>
                    </div>
                    <div class="text2 grey">
                      Didn’t get OTP?
                      <q-btn
                        flat
                        no-caps
                        style="padding: 0; text-decoration: underline"
                        :loading="loading"
                        @click="view = 'request'"
                      >
                        Click to resend.
                      </q-btn>
                    </div>
                    <div class="clear"></div>
                  </form>
                </div>
              </template>
              <template v-else>
                <h4 class="section_header">Password Changed!</h4>
                <p class="section_paraText">
                  Your password has been changed successfully, you may now login
                  to access your account.
                </p>
                <q-btn no-caps color="primary" :to="{ name: 'login' }">
                  Login Now
                </q-btn>
              </template>
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
import {
  forgotPasswordRequest,
  resetPasswordRequest,
} from 'src/data/userRequests';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { notify } from 'src/utils/helpers';
import { date, useInterval } from 'quasar';

const { registerInterval, removeInterval } = useInterval();
const now = ref(new Date());
const route = useRoute();
const router = useRouter();
const completed = ref(false);
const togglePassword = ref(true);

type ViewType = 'request' | 'verify' | 'reset';
const view = computed<ViewType>({
  get: () => (route.query.view as ViewType) || 'request',
  set: (view: ViewType) =>
    router.push({ query: { view, token: route.query.token } }),
});

const timeOut = computed<number>(() =>
  date.getDateDiff(new Date(data.value.try_at), now.value, 'seconds'),
);

const errors = computed(
  () => ((e1.value || e2.value) as unknown as RequestErrors)?.errors || {},
);

const {
  send: request,
  form: forgotForm,
  error: e1,
  loading: requesting,
} = useForm((f) => forgotPasswordRequest(f), {
  initialForm: {
    email: '',
  },
  resetAfterSubmitting: true,
})
  .onSuccess(() => {
    view.value = 'verify';
    if (e2.value) {
      e2.value = undefined;
    }
  })
  .onError(({ error }) => {
    setTimer(error.try_at);
  });

const {
  send,
  form,
  data,
  error: e2,
  loading,
  reset,
  updateForm,
  onSuccess,
} = useForm((f) => resetPasswordRequest(f, view.value === 'verify'), {
  initialForm: {
    code: <string>route.query.token || '',
    password: undefined,
    password_confirmation: undefined,
  },
  initialData: {
    try_at: new Date().toString(),
  },
})
  .onComplete(() => {
    updateForm({ password: undefined, password_confirmation: undefined });
  })
  .onError(() => {
    if (route.query.token) {
      reset();
      router.push({ query: { view: route.query.view, token: undefined } });
    }
  });

onSuccess(({ data }) => {
  notify(data.message, data.status);
  setTimer(data.try_at);
  completed.value = view.value === 'reset';
  if (view.value === 'verify') {
    view.value = 'reset';
  }
});

const setTimer = (try_at?: string) => {
  if (try_at) {
    data.value.try_at = try_at;
    now.value = new Date();
    registerInterval(() => {
      now.value = new Date();
    }, 2000);
  } else {
    removeInterval();
  }
};

watch(timeOut, (timeOut) => {
  if (timeOut < 0) {
    removeInterval();
  }
});

watch(
  () => route.query.token,
  (token) => {
    if (token) {
      updateForm({ code: token as string });
      send();
    }
  },
  {
    immediate: true,
  },
);
</script>
