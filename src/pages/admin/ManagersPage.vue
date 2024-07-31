<template>
  <div class="container">
    <div class="row items-center justify-between">
      <h4 class="dashboardmain_text">Dashboard</h4>
      <q-btn :to="{ name: 'add.managers' }" class="add_btn" no-caps no-wrap>
        Add New Member
      </q-btn>
    </div>

    <div class="stats_hold q-mt-md">
      <div v-for="n in 10" :key="n" class="div"><ManagersCompVue /></div>
    </div>
  </div>
</template>

<script setup>
import ManagersCompVue from 'src/components/ManagersComp.vue';
</script>

<style lang="scss" scoped></style>
