<template>
  <div class="container">
    <h4 class="dashboardmain_text">Dashboard</h4>
    <div class="stats_hold">
      <div v-for="(dataDetails, index) in statsArr" :key="index">
        <DashBoardCardsVue :data="dataDetails" />
      </div>
    </div>

    <ChartCompVue />
    <ConversionCompVue />
    <!-- <LatestUsersVue /> -->
  </div>
</template>

<script setup>
import ChartCompVue from 'src/components/ChartComp.vue';
import ConversionCompVue from 'src/components/ConversionComp.vue';
import DashBoardCardsVue from 'src/components/DashBoardCards.vue';

// import LatestUsersVue from "src/components/LatestUsers.vue";

let statsArr = [
  {
    name: 'Total Users',
    numbers: '40,689',
    icon: '/images/users.svg',
    data: '8.5% Up from yesterday',
    icontype: 'up',
    classStyle: 'total',
  },
  {
    name: 'Verified Users',
    numbers: '10,293',
    icon: '/images/shield.svg',
    data: '1.3% Up from past week',
    icontype: 'up',
    classStyle: 'veri',
  },
  {
    name: 'Total Conversions',
    numbers: '1,189,000',
    icon: '/images/graph.svg',
    data: '4.3% Down from yesterday',
    icontype: 'down',
    classStyle: 'convert',
  },
  {
    name: 'Total Pending',
    numbers: '200,340',
    icon: '/images/circle.svg',
    data: '1.8% Up from yesterday',
    icontype: 'up',
    classStyle: 'pending',
  },
];
</script>

<style lang="scss" scoped></style>
