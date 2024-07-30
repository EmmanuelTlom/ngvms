<template>
  <div class="container">
    <div class="row items-center justify-between">
      <div class="backbtn">
        <q-btn @click="router.go(-1)" flat no-caps no-wrap>
          <i class="fa-solid fa-chevron-left"></i>
        </q-btn>
      </div>
      <div class="q-ml-md">
        <div class="search_inp">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
      </div>
    </div>
    <div class="row q-my-lg justify-between">
      <h4 class="dashboardmain_text">Referral Bonus</h4>
      <div></div>
    </div>
    <div class="stats_hold q-mt-md">
      <ReferralBonusVue />
    </div>
  </div>
</template>

<script setup>
import ReferralBonusVue from "src/components/referral/ReferralBonus.vue";
import { useRouter } from "vue-router";
let router = useRouter();
</script>

<style lang="scss" scoped>
.dashboardmain_text {
  margin-bottom: 0;
}
</style>
