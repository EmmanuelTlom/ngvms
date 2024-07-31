<template>
  <div class="container">
    <div class="row items-center justify-between">
      <h4 class="dashboardmain_text">Dispute</h4>
      <div class="q-ml-md">
        <div class="search_inp">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
      </div>
    </div>

    <div class="stats_hold q-mt-md">
      <DisputeTableCompVue />
    </div>
  </div>
</template>

<script setup>
import DisputeTableCompVue from 'src/components/DisputeTableComp.vue';
</script>

<style lang="scss" scoped>
.dashboardmain_text {
  margin-bottom: 0;
}
</style>
