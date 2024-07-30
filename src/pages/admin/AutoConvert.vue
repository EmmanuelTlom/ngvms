<template>
  <div class="container">
    <ConversionCard />

    <div class="stats_hold q-mt-md">
      <AutoConversionTableVue />
    </div>
  </div>
</template>

<script setup>
import AutoConversionTableVue from "src/components/AutoConversionTable.vue";
import ConversionCard from "src/components/ConversionCard.vue";
</script>

<style lang="scss" scoped>
.dashboardmain_text {
  margin-bottom: 0;
}
</style>
