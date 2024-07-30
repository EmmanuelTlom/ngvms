<template>
  <div>
    <section class="loginPage">
      <div class="container">
        <div class="grid">
          <div class="left">
            <h4 class="section_header">Welcome to NGVMS.</h4>
            <p class="section_paraText">Login to access your account</p>
            <div class="auth q-mt-lg">
              <form @submit.prevent="submit" id="form">
                <div class="input-box active-grey">
                  <label class="input-label">Email</label>
                  <input
                    v-model="data.email"
                    required
                    type="text"
                    class="input-1"
                  />
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
                    no-caps
                    no-wrap
                    :loading="loading"
                    type="submit"
                    flat
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

                <!-- <div class="or_section">
                  <p class="text-center review_small">Or login with</p>

                  <div class="or_btns">
                    <q-btn flat>
                      <img src="/images/facebook.svg" alt="" />
                    </q-btn>
                    <q-btn flat> <img src="/images/google.svg" alt="" /></q-btn>
                    <q-btn flat> <img src="/images/apple.svg" alt="" /></q-btn>
                  </div>
                </div> -->
                <!-- <div class="input-box active-grey">
                  <label class="input-label">Dropdown/select list</label>
                  <select class="input-1">
                    <option value="-1"></option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                </div> -->

                <div class="clear"></div>
              </form>
            </div>
          </div>
          <div class="right">
            <!-- <div class="row justify-center">
              <h4 class="section_maintext small">
                Convert your <br />
                airtime to cash
              </h4>
              <p class="section_subtext">
                With NGVMS you can convert your <br />
                airtime to cash, pay bills and more.
              </p>
              <a href=""><img src="../assets/badge1.svg" alt="" /></a>
              <a href=""><img src="../assets/badge2.svg" alt="" /></a>
            </div> -->
            <img src="/images/auth.jpeg" alt="" />
          </div>
        </div>
      </div>
    </section>
  </div>
  <q-dialog v-model="verifyEmailDialog" persistent>
    <q-card
      style="max-width: 547px; gap: 1rem"
      class="column verifyDialogCard no-wrap text-center justify-center items-center"
    >
      <div class="top_modal">
        <img
          style="width: 100px; height: 100px"
          src="/images/mail.png"
          alt=""
        />
        <h5 class="verifyMainText q-my-md">
          Verify your <br />
          email address
        </h5>

        <p class="review_small text-center">
          You're almost there! We sent an email to {{ data.email }} Just click
          on the link in that email to complete your signup.
        </p>
        <p class="review_small text-center q-mt-md">
          If you don't see it, you may need to check your spam folder.
        </p>
      </div>
      <div class="auth">
        <div
          class="justify-center otp_wrap"
          style="display: flex; flex-direction: row; gap: 0.5rem"
        >
          <v-otp-input
            ref="otpInput"
            v-model:value="bindRef"
            input-classes="otp-input"
            separator=" "
            :num-inputs="6"
            :should-auto-focus="true"
            input-type="letter-numeric"
            :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
            :placeholder="['', '', '', '']"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
          />
        </div>
      </div>
      <div class="row verifyBtn justify-center">
        <q-btn
          @click="verifyEmail"
          no-wrap
          no-caps
          :loading="loadingVerify"
          flat
          class="text-white bg-secondary"
        >
          Verify your email address
        </q-btn>
      </div>
      <div>
        <q-btn
          @click="resendEmailOtp"
          no-wrap
          no-caps
          :loading="loadingVerifyOtp"
          flat
          class="text-black bg-grey-3"
        >
          Resend OTP
        </q-btn>
      </div>

      <q-btn
        @click="verifyEmailDialog = false"
        class="closeBtn"
        flat
        no-caps
        no-wrap
      >
        <img src="/images/closeBtn.svg" alt="" />
      </q-btn>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify, Platform } from "quasar";
import { api } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
let store = useMyAuthStore();
let rememberMe = ref(false);
let loading = ref(false);
let togglePassword = ref(true);
let data = ref({});
let loadingVerify = ref(false);
let loadingVerifyOtp = ref(false);
let confirmPassword = ref("");
let verifyEmailDialog = ref(false);
let bindRef = ref("");
let code = ref("");
const handleOnComplete = (value) => {
  // console.log("OTP completed: ", value);
  code.value = value;
};

const handleOnChange = (value) => {
  // console.log("OTP changed: ", value);
};
const loginFcn = () => {};
const submit = () => {
  loading.value = true;
  api
    .post(`/api/v1/users/login`, {
      ...data.value,
      platform: "web",
    })
    .then((response) => {
      console.log(response);
      loading.value = false;
      Notify.create({
        message: "Successful",
        position: "top",
        color: "green",
      });
      store.setUserDetails(response.data);
      router.replace({
        name: "user.dashboard",
      });
    })
    .catch(({ response }) => {
      loading.value = false;
      Notify.create({
        message: response.data.message
          ? response.data.message
          : "An error ocurred",
        position: "top",
        color: "red-7",
      });
      if (response.data.message === "Error: Account Not Verified.") {
        {
          verifyEmailDialog.value = true;
        }
      }
    });
};

const verifyEmail = () => {
  loadingVerify.value = true;
  api
    .put(`/api/v1/users/verify`, {
      email: data.value.email
        ? data.value.email
        : "emmanuelchukwuemeka908@gmail.com",
      code: code.value,
    })
    .then((response) => {
      console.log(response);
      loadingVerify.value = false;
      Notify.create({
        message: "Successful",
        position: "bottom",
        color: "green",
      });
      Notify.create({
        message: "Please login",
        position: "top",
        color: "green",
        timeout: 30002,
        actions: [{ icon: "close", color: "white" }],
      });

      // store.setUserDetails(response.data);
      verifyEmailDialog.value = false;
      // router.replace({
      //   name: "user.dashboard",
      // });
    })
    .catch(({ response }) => {
      loadingVerify.value = false;
      Notify.create({
        message: response.data.message
          ? response.data.message
          : "An error ocurred",
        position: "top",
        color: "red-7",
      });
    });
};
const resendEmailOtp = () => {
  loadingVerifyOtp.value = true;
  api
    .put(`/api/v1/users/resend-verification-code`, {
      email: data.value.email,
    })
    .then((response) => {
      console.log(response);
      loadingVerifyOtp.value = false;
      Notify.create({
        message: "Successful",
        position: "top",
        color: "green",
      });
    })
    .catch(({ response }) => {
      loadingVerifyOtp.value = false;
      Notify.create({
        message: response.data.message
          ? response.data.message
          : "An error ocurred",
        position: "top",
        color: "red-7",
      });
    });
};
</script>

<style lang="scss" scoped></style>
