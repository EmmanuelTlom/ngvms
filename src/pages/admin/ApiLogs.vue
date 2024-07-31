<template>
  <div class="container">
    <div class="row items-center justify-between">
      <h4 class="dashboardmain_text">Api Logs</h4>
      <div class="q-ml-md">
        <div class="search_inp">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
      </div>
    </div>

    <div class="stats_hold q-mt-md">
      <ApiLogsCompVue />
    </div>
  </div>
</template>

<script setup>
import ApiLogsCompVue from 'src/components/ApiLogsComp.vue';
</script>

<style lang="scss" scoped></style>
