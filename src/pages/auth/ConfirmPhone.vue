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
              <div
                class="justify-center otp_wrap"
                style="display: flex; flex-direction: row; gap: 0.5rem"
              >
                <v-otp-input
                  ref="otpInput"
                  v-model:value="bindRef"
                  input-classes="otp-input"
                  separator=" "
                  :num-inputs="4"
                  :should-auto-focus="true"
                  input-type="letter-numeric"
                  :conditionalClass="['one', 'two', 'three', 'four']"
                  :placeholder="['', '', '', '']"
                  @on-change="handleOnChange"
                  @on-complete="handleOnComplete"
                />
              </div>

              <div class="text2 grey">
                Didn’t get a code?
                <q-btn
                  @click="resend"
                  flat
                  no-caps
                  style="padding: 0; text-decoration: underline"
                >
                  Click to resend.
                </q-btn>
              </div>
              <div class="submit_btn row justify-center q-mt-lg q-mb-lg">
                <q-btn
                  no-caps
                  no-wrap
                  type="submit"
                  flat
                  class="full-width bg-secondary review_small bold text-white"
                >
                  Register
                </q-btn>
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
import { ref } from 'vue';

let code = ref(false);

const bindRef = ref('');

const handleOnComplete = (value) => {
  // console.log("OTP completed: ", value);
  code.value = value;
};

const handleOnChange = () => {
  // console.log("OTP changed: ", value);
};
</script>

<style lang="scss" scoped></style>
