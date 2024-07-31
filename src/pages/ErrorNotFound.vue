<template>
  <div class="admin_auth">
    <div class="form_area">
      <div class="auth">
        <div class="row justify-center">
          <img src="/images/404.png" alt="" />
        </div>
        <div class="q-mt-xl">
          <h5 class="main_tex">Looks like you’ve got lost….</h5>
          <div class="submit row justify-center">
            <q-btn :to="{ name: 'admin.dashboard' }" flat no-wrap no-caps>
              Back to Dashboard
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
img {
  width: 100%;
  max-width: 300px;
}
.main_tex {
  font-size: 20px;
  line-height: 20px;
}
</style>
