<template>
  <div class="container users_detail">
    <div class="contain">
      <div class="q-mt-sm">
        <div class="row items-center justify-between">
          <h4 class="p_sub_text bold">Airtel Data Type</h4>

          <div class="row edit_profile justify-start">
            <q-btn class="smalltext" flat no-wrap no-caps> ADD NEW TYPE </q-btn>
          </div>
        </div>
      </div>

      <div class="q-mt-sm">
        <div class="trans_sum">
          <NetworkTypeTableVue />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NetworkTypeTableVue from 'src/components/NetworkTypeTable.vue';
</script>

<style lang="scss" scoped>
.contain {
  max-width: 800px;
}

.edit_profile {
  .q-btn {
    background: white;
    color: #4338ca;
    border: 1px solid #4338ca;
    border-radius: 10px;
  }
}

.users_detail .wallet_bg .bal_text {
  opacity: 1;
}
.users_detail .wallet_bg .bal_text.sec {
  font-size: 14px;
}
</style>
