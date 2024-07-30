<template>
  <div class="admin_auth">
    <div class="form_area">
      <div class="auth">
        <h5 class="main_tex">Create an Account</h5>
        <p class="">Create a account to continue</p>

        <form>
          <div class="input_wrap">
            <label for=""> Email address</label>
            <div class="input">
              <input type="email" placeholder="marvellousdick@gmail.com" />
            </div>
          </div>
          <div class="input_wrap">
            <label for=""> Username</label>
            <div class="input">
              <input type="email" placeholder="Username" />
            </div>
          </div>
          <div class="input_wrap">
            <div class="row justify-between">
              <label for=""> Password</label>
              <router-link to="">Forgot Password?</router-link>
            </div>

            <div class="input">
              <input type="password" placeholder="0000" />
            </div>
            <div>
              <q-checkbox
                v-model="data.remember"
                label="I accept terms and conditions"
              />
            </div>
          </div>

          <div class="submit row justify-center">
            <q-btn :to="{ name: 'admin.dashboard' }" flat no-wrap no-caps>
              Sign In
            </q-btn>
          </div>
          <p>
            Already have an account?
            <router-link :to="{ name: 'admin.login' }"> Login </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

let data = ref({
  remember: false,
});
</script>

<style lang="scss" scoped></style>
