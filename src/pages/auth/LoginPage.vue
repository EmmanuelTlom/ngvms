<template>
  <div>
    <section class="loginPage">
      <div class="container">
        <div class="grid">
          <div class="left">
            <h4 class="section_header">Welcome to NGVMS.</h4>
            <p class="section_paraText">Login to access your account</p>
            <div class="auth q-mt-lg">
              <form @submit.prevent="send" id="form">
                <div class="input-box active-grey">
                  <label class="input-label">Email</label>
                  <input
                    v-model="form.email"
                    required
                    type="text"
                    autocomplete="username"
                    class="input-1"
                  />
                </div>
                <span class="error-message" v-if="errors.email">
                  {{ errors.email }}
                </span>

                <div class="input-box last active-grey">
                  <label class="input-label">Password</label>
                  <div class="row items-center justify-between no-wrap">
                    <input
                      v-model="form.password"
                      class="input-1"
                      autocomplete="current-password"
                      :type="togglePassword ? 'password' : 'text'"
                    />
                    <q-btn @click="togglePassword = !togglePassword" flat>
                      <i class="fa-regular fa-eye-slash"></i>
                    </q-btn>
                  </div>
                </div>
                <span class="error-message" v-if="errors.password">
                  {{ errors.password }}
                </span>

                <div class="row items-center justify-end">
                  <div>
                    <router-link
                      :to="{ name: 'forgot.password' }"
                      class="text-negative"
                    >
                      Forgot Password
                    </router-link>
                  </div>
                </div>

                <div class="submit_btn row justify-center q-mt-lg q-mb-lg">
                  <q-btn
                    flat
                    no-caps
                    no-wrap
                    type="submit"
                    :loading="loading"
                    class="full-width bg-secondary review_small bold text-white"
                  >
                    Login
                  </q-btn>
                  <p class="text_poppins q-mt-sm">
                    Don’t have an account?
                    <router-link
                      :to="{ name: 'register' }"
                      class="text-negative text_serrat"
                    >
                      Sign up
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
import { loginRequest } from 'src/data/userRequests';
import { reboot, refreshUser } from 'src/utils/proccessor';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const errors = computed(
  () => (error.value as unknown as RequestErrors)?.errors || {},
);
const router = useRouter();
const togglePassword = ref(true);

const { send, form, error, loading, onSuccess } = useForm(loginRequest, {
  store: true,
  initialForm: {
    email: '',
    password: '',
    remember: false,
  },
  resetAfterSubmitting: true,
});

onSuccess(() => {
  loading.value = true;
  reboot().then(() => {
    loading.value = false;
    refreshUser();
    router.replace({ name: 'user.dashboard' });
  });
});
</script>

<style lang="scss" scoped></style>
