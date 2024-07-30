<template>
  <div>
    <section class="loginPage register">
      <div class="container">
        <div class="grid order">
          <div class="left">
            <h4 class="section_header">Welcome to NGVMS.</h4>
            <p class="section_paraText">
              Login to access your travelwise account
            </p>
            <div class="auth q-mt-lg">
              <form @submit.prevent="submit" id="form">
                <!-- <div class="grid">
                  <div class="input-box active-grey">
                    <label class="input-label">First Name</label>
                    <input v-model="data." type="text" class="input-1" />
                  </div>
                  <div class="input-box active-grey">
                    <label class="input-label">First Name</label>
                    <input type="text" class="input-1" />
                  </div>
                </div> -->
                <div class="input-box active-grey">
                  <label class="input-label">Full name</label>
                  <input
                    v-model="data.fullname"
                    required
                    type="text"
                    class="input-1"
                  />
                </div>
                <div class="grid last">
                  <div class="input-box active-grey">
                    <label class="input-label">Email</label>
                    <input
                      v-model="data.email"
                      type="email"
                      required
                      class="input-1"
                    />
                  </div>

                  <div class="input-box active-grey">
                    <label class="input-label">Phone Number</label>
                    <input
                      v-model="data.phone"
                      required
                      type="text"
                      class="input-1"
                    />
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
                  <label class="input-label">Confirm Password</label>
                  <div class="row items-center justify-between no-wrap">
                    <input
                      v-model="confirmPassword"
                      :type="toggleConfirmPassword ? 'password' : 'text'"
                      class="input-1"
                    />
                    <q-btn
                      @click="toggleConfirmPassword = !toggleConfirmPassword"
                      flat
                    >
                      <i class="fa-regular fa-eye-slash"></i>
                    </q-btn>
                  </div>
                </div>

                <div class="row items-center justify-between">
                  <div>
                    <q-checkbox v-model="rememberMe">
                      I agree to all the
                      <span class="text-negative">Terms</span> and
                      <span class="text-negative"
                        >Privacy Policies</span
                      ></q-checkbox
                    >
                  </div>

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
  </div>
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
let loadingVerify = ref(false);
let loadingVerifyOtp = ref(false);
let togglePassword = ref(true);
let toggleConfirmPassword = ref(true);
let confirmPassword = ref("");
let data = ref({});
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
const submit = () => {
  if (confirmPassword.value !== data.value.password) {
    Notify.create({
      message: "Password does not match",
      position: "top",
      color: "red",
    });
  } else if (!rememberMe.value) {
    Notify.create({
      message: "You need to agree to our privacy policy before proceeding",
      position: "top",
      color: "red",
    });
  } else {
    loading.value = true;
    api
      .post(`/api/v1/users`, {
        ...data.value,
        userType: "USER",
      })
      .then((response) => {
        console.log(response);
        loading.value = false;
        Notify.create({
          message: "Successful",
          position: "top",
          color: "green",
        });
        // store.setUserDetails(response.data);

        verifyEmailDialog.value = true;
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
      });
  }
};
// const registerFcn = () => {
//   router.replace({
//     name: "user.dashboard",
//   });
// };

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
        position: "top",
        color: "green",
      });

      // store.setUserDetails(response.data);
      verifyEmailDialog.value = false;
      router.replace({
        name: "login",
      });
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
