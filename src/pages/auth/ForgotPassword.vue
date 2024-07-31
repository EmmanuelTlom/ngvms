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
            <div v-if="forgotPasswordView">
              <h4 class="section_header">Forgot your password?</h4>
              <p class="section_paraText">
                Don’t worry, happens to all of us. Enter your email below to
                recover your password
              </p>
              <div class="auth q-mt-lg">
                <form @submit.prevent="getPasswordReset" id="form">
                  <div class="input-box active-grey">
                    <label class="input-label">Email</label>
                    <input
                      name="email"
                      v-model="data.email"
                      type="email"
                      class="input-1"
                    />
                  </div>

                  <div class="submit_btn row justify-center q-mt-lg q-mb-lg">
                    <q-btn
                      no-caps
                      :loading="loading"
                      no-wrap
                      flat
                      type="submit"
                      class="full-width bg-secondary review_small bold text-white"
                    >
                      Submit
                    </q-btn>
                  </div>

                  <div class="or_section">
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
                  </div>

                  <div class="clear"></div>
                </form>
              </div>
            </div>
            <div v-if="verifyCodeView">
              <h4 class="section_header">Verify code</h4>
              <p class="section_paraText">
                An authentication code has been sent to your email.
              </p>
              <div class="auth q-mt-lg">
                <form @submit.prevent="resetPassword" id="form">
                  <div class="input-box last active-grey">
                    <label class="input-label">Enter Code</label>
                    <div class="row items-center justify-between no-wrap">
                      <input
                        v-model="data.code"
                        :type="toggleCode ? 'password' : 'text'"
                        class="input-1"
                      />
                      <q-btn flat @click="toggleCode = !toggleCode">
                        <i class="fa-regular fa-eye-slash"></i>
                      </q-btn>
                    </div>
                  </div>
                  <div class="submit_btn row justify-center q-mt-lg q-mb-lg">
                    <q-btn
                      no-caps
                      no-wrap
                      flat
                      type="submit"
                      class="full-width bg-secondary review_small bold text-white"
                    >
                      Verify
                    </q-btn>
                  </div>

                  <div class="clear"></div>
                </form>
              </div>
            </div>
            <div v-if="resetPasswordView">
              <h4 class="section_header">Set a password</h4>
              <p class="section_paraText">
                Your previous password has been reseted. Please set a new
                password for your account.
              </p>
              <div class="auth q-mt-lg">
                <form @submit.prevent="resetPassword" id="form">
                  <div class="input-box last active-grey">
                    <label class="input-label">Enter OTP</label>
                    <div class="row items-center justify-between no-wrap">
                      <input
                        v-model="data.code"
                        :type="toggleCode ? 'password' : 'text'"
                        class="input-1"
                      />
                      <q-btn flat @click="toggleCode = !toggleCode">
                        <i class="fa-regular fa-eye-slash"></i>
                      </q-btn>
                    </div>
                  </div>
                  <div class="input-box last active-grey">
                    <label class="input-label">Password</label>
                    <div class="row items-center justify-between no-wrap">
                      <input
                        v-model="data.password"
                        :type="togglePassword ? 'password' : 'text'"
                        class="input-1"
                      />
                      <q-btn @click="togglePassword = !togglePassword" flat>
                        <i class="fa-regular fa-eye-slash"></i>
                      </q-btn>
                    </div>
                  </div>
                  <div class="input-box last active-grey">
                    <label class="input-label">Re-enter Password</label>
                    <div class="row items-center justify-between no-wrap">
                      <input
                        v-model="reenterPassword"
                        :type="togglePassword ? 'password' : 'text'"
                        class="input-1"
                      />
                      <q-btn @click="togglePassword = !togglePassword" flat>
                        <i class="fa-regular fa-eye-slash"></i>
                      </q-btn>
                    </div>
                  </div>
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
                      @click="resendOtp"
                      flat
                      :loading="loadingVerifyOtp"
                      no-caps
                      style="padding: 0; text-decoration: underline"
                    >
                      Click to resend.
                    </q-btn>
                  </div>
                  <div class="clear"></div>
                </form>
              </div>
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

<script setup>
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
let router = useRouter();
let forgotPasswordView = ref(true);
let verifyCodeView = ref(false);
let toggleCode = ref(false);
let resetPasswordView = ref(false);
let loadingVerifyOtp = ref(false);
let reenterPassword = ref('');
let togglePassword = ref(false);
let loading = ref(false);
let data = ref({});

const getPasswordReset = () => {
  loading.value = true;
  api
    .get('/api/v1/users/get-reset-password-token', {
      email: data.value.email,
    })
    .then((response) => {
      console.log(response);
      loading.value = false;
      forgotPasswordView.value = false;
      resetPasswordView.value = true;
      Notify.create({
        message: response.data.message,
        color: 'green',
        position: 'top',
      });
    })
    .catch(({ response }) => {
      loading.value = false;
      Notify.create({
        message: response.data.message,
        color: 'red',
        position: 'top',
      });
    });
};
const resetPassword = () => {
  if (data.value.password !== reenterPassword.value) {
    Notify.create({
      message: 'Password does not match',
      color: 'red',
      position: 'top',
    });
    return;
  } else {
    loading.value = true;
    api
      .get('/api/v1/users/get-reset-password-token', {
        otp: data.value.code,
        password: data.value.password,
      })
      .then((response) => {
        console.log(response);
        loading.value = false;
        data.value = {};
        Notify.create({
          message: response.data.message,
          color: 'green',
          position: 'top',
        });
        router.replace({ name: 'login' });
      })
      .catch(({ response }) => {
        loading.value = false;
        Notify.create({
          message: response.data.message,
          color: 'red',
          position: 'top',
        });
      });
  }
};
const resendOtp = () => {
  loadingVerifyOtp.value = true;
  api
    .put('/api/v1/users/resend-verification-code', {
      email: data.value.email,
    })
    .then((response) => {
      console.log(response);
      loadingVerifyOtp.value = false;
      Notify.create({
        message: 'Successful',
        position: 'top',
        color: 'green',
      });
    })
    .catch(({ response }) => {
      loadingVerifyOtp.value = false;
      Notify.create({
        message: response.data.message
          ? response.data.message
          : 'An error ocurred',
        position: 'top',
        color: 'red-7',
      });
    });
};
</script>

<style lang="scss" scoped></style>
