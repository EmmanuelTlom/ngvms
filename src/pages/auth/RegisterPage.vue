<template>
  <div>
    <section class="loginPage register">
      <div class="container">
        <div class="grid order">
          <div class="left">
            <h4 class="section_header">Welcome to NGVMS.</h4>
            <!-- <p class="section_paraText">
              Login to access your travelwise account
            </p> -->
            <div class="auth q-mt-lg">
              <form @submit.prevent="send" id="form">
                <div class="input-box active-grey">
                  <label class="input-label">Full name</label>
                  <input
                    v-model="form.name"
                    required
                    type="text"
                    class="input-1"
                  />
                </div>
                <span class="error-message" v-if="errors.name">
                  {{ errors.name }}
                </span>
                <div class="grid last">
                  <div>
                    <div class="input-box active-grey">
                      <label class="input-label">Email</label>
                      <input
                        v-model="form.email"
                        type="email"
                        required
                        class="input-1"
                        autocomplete="username"
                      />
                    </div>
                    <span class="error-message q-mb-xs" v-if="errors.email">
                      {{ errors.email }}
                    </span>
                  </div>

                  <div>
                    <div class="input-box active-grey">
                      <label class="input-label">Phone Number</label>
                      <input
                        v-model="form.phone"
                        required
                        type="text"
                        class="input-1"
                      />
                    </div>
                    <span class="error-message q-mb-xs" v-if="errors.phone">
                      {{ errors.phone }}
                    </span>
                  </div>
                </div>
                <div class="input-box last active-grey">
                  <label class="input-label">Password</label>
                  <div class="row items-center justify-between no-wrap">
                    <input
                      v-model="form.password"
                      :type="togglePassword ? 'password' : 'text'"
                      class="input-1"
                      autocomplete="new-password"
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
                  <label class="input-label">Confirm Password</label>
                  <div class="row items-center justify-between no-wrap">
                    <input
                      v-model="form.password_confirmation"
                      :type="togglePassword ? 'password' : 'text'"
                      class="input-1"
                      autocomplete="new-password"
                    />
                    <q-btn @click="togglePassword = !togglePassword" flat>
                      <i class="fa-regular fa-eye-slash"></i>
                    </q-btn>
                  </div>
                </div>
                <span class="error-message" v-if="errors.password_confirmation">
                  {{ errors.password_confirmation }}
                </span>

                <div class="row items-center justify-between">
                  <div>
                    <q-checkbox v-model="form.accept">
                      I agree to all the
                      <span class="text-negative">Terms</span> and
                      <span class="text-negative"
                        >Privacy Policies</span
                      ></q-checkbox
                    >
                  </div>
                  <span class="error-message" v-if="errors.accept">
                    {{ errors.accept }}
                  </span>

                  <div></div>
                </div>

                <div class="submit_btn row justify-center q-mt-lg q-mb-lg">
                  <q-btn
                    no-caps
                    no-wrap
                    :loading="loading"
                    type="submit"
                    flat
                    class="full-width bg-secondary review_small bold text-white"
                  >
                    Register
                  </q-btn>
                  <p class="text_poppins q-mt-sm">
                    Already have an account?
                    <router-link
                      :to="{ name: 'login' }"
                      class="text-negative text_serrat"
                    >
                      Login
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
import { useForm } from 'alova/client';
import { RequestErrors } from 'app/repository/models';
import { registerRequest } from 'src/data/userRequests';
import { reboot } from 'src/utils/proccessor';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const errors = computed(
  () => (error.value as unknown as RequestErrors)?.errors || {},
);
const router = useRouter();
const togglePassword = ref(true);

const { send, form, error, loading, onSuccess } = useForm(registerRequest, {
  store: true,
  initialForm: {
    name: '',
    email: '',
    phone: '',
    accept: false,
    password: '',
    password_confirmation: '',
  },
  resetAfterSubmitting: true,
});

onSuccess(() => {
  loading.value = true;
  reboot().then(() => {
    loading.value = false;
    router.replace({ name: 'user.dashboard' });
  });
});
</script>

<style lang="scss" scoped>
.q-mb-xs {
  margin-bottom: 4px;
}
</style>
