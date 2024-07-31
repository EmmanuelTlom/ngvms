<template>
  <div class="container">
    <div class="row items-center justify-between">
      <h4 class="dashboardmain_text">Referrals</h4>
      <div class="q-ml-md">
        <div class="search_inp">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
      </div>
    </div>
    <div class="row q-my-lg justify-end">
      <q-btn :to="{ name: 'referral.bonus' }" class="add_btn" flat no-wrap>
        VIEW REFERRAL BONUS
      </q-btn>
    </div>
    <div class="stats_hold q-mt-md">
      <ReferralTableCompVue />
    </div>
  </div>
</template>

<script setup>
import ReferralTableCompVue from 'src/components/referral/ReferralTableComp.vue';
</script>

<style lang="scss" scoped></style>
