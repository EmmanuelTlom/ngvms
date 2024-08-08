<template>
  <div class="container">
    <div class="row items-center justify-between">
      <h4 class="dashboardmain_text">NMDPRA's Data</h4>
      <div class="q-ml-md">
        <div class="search_inp">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
      </div>
    </div>

    <div class="stats_hold q-mt-md">
      <NMDPRADataTableComp />
    </div>
  </div>
</template>

<script setup>
import NMDPRADataTableComp from 'src/components/NMDPRADataTableComp.vue';
</script>

<style lang="scss" scoped></style>
