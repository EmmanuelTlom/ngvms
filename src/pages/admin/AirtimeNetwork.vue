<template>
  <div class="container users_detail">
    <h4 class="p_sub_text bold">Airtime network</h4>
    <div class="contain">
      <div class="q-mt-sm">
        <div class="row items-center justify-between">
          <div style="gap: 1rem" class="row wallet_bg items-end no-wrap">
            <div class="">
              <p class="bal_text">Edit Airtime Network plan</p>
              <p class="bal_text sec">Set rate on each network</p>
            </div>
          </div>

          <div class="row edit_profile justify-start">
            <q-btn
              :to="{
                name: 'network-type',
                params: {
                  id: 'airtel',
                },
              }"
              class="smalltext"
              flat
              no-wrap
              no-caps
            >
              ADD AIRTIME NETWORK
            </q-btn>
          </div>
        </div>
      </div>

      <div class="q-mt-xl">
        <div class="trans_sum">
          <AirtimeNetworkTableCompVue />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AirtimeNetworkTableCompVue from 'src/components/AirtimeNetworkTableComp.vue';
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
