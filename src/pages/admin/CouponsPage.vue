<template>
  <div class="container">
    <div class="row items-center justify-between">
      <h4 class="dashboardmain_text">Coupons</h4>
      <div class="q-ml-md">
        <div class="search_inp">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
      </div>
    </div>

    <div class="stats_hold q-mt-md">
      <CouponsTableVue />
    </div>
  </div>
</template>

<script setup>
import CouponsTableVue from 'src/components/CouponsTable.vue';
</script>

<style lang="scss" scoped>
.dashboardmain_text {
  margin-bottom: 0;
}
</style>
