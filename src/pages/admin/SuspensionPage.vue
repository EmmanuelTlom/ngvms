<template>
  <div class="container">
    <div class="row items-center q-my-lg justify-between">
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
    <h4 class="dashboardmain_text">Suspension</h4>
    <div class="stats_hold">
      <SuspensionCompVue />
    </div>
  </div>
</template>

<script setup>
import SuspensionCompVue from 'src/components/SuspensionComp.vue';
import { useRouter } from 'vue-router';
let router = useRouter();
</script>

<style lang="scss" scoped></style>
