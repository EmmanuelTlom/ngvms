<template>
  <div class="container">
    <h4 class="dashboardmain_text q-mt-xl">Welcome, Adam Kelvin</h4>
    <div class="stats_hold">
      <div v-for="(dataDetails, index) in statsArr" :key="index">
        <DashBoardCardsVue :data="dataDetails" />
      </div>
    </div>

    <!-- <ChartCompVue /> -->
    <!-- <ConversionCompVue /> -->
    <!-- <LatestUsersVue /> -->
  </div>
</template>

<script setup>
import DashBoardCardsVue from 'src/components/DashBoardCards.vue';

// import LatestUsersVue from "src/components/LatestUsers.vue";

let statsArr = [
  {
    name: 'Total Cars/Trucks Added',
    numbers: '10',
    icon: '/images/users.svg',
    data: '8.5% Up from yesterday',
    icontype: 'up',
    classStyle: 'total',
  },
  {
    name: 'Total Tricycles Added',
    numbers: '5',
    icon: '/images/shield.svg',
    data: '1.3% Up from past week',
    icontype: 'up',
    classStyle: 'veri',
  },
  {
    name: 'Total Motorcycles Added',
    numbers: '10',
    icon: '/images/graph.svg',
    data: '4.3% Down from yesterday',
    icontype: 'down',
    classStyle: 'convert',
  },
  {
    name: 'Others',
    numbers: '1',
    icon: '/images/circle.svg',
    data: '1.8% Up from yesterday',
    icontype: 'up',
    classStyle: 'pending',
  },
];
</script>

<style lang="scss" scoped></style>
