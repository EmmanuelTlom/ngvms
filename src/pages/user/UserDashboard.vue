<template>
  <div class="container">
    <q-inner-loading :showing="loading" />
    <h4 class="dashboardmain_text q-mt-xl">Welcome, {{ user.fullname }}</h4>
    <div class="stats_hold">
      <div v-for="(data, index) in stats" :key="index">
        <DashBoardCardsVue :data="data" />
      </div>
    </div>

    <!-- <ChartCompVue /> -->
    <!-- <ConversionCompVue /> -->
    <!-- <LatestUsersVue /> -->
  </div>
</template>

<script setup lang="ts">
import { useRequest } from 'alova/client';
import { Dashboard } from 'app/repository/models';
import DashBoardCardsVue from 'src/components/DashBoardCards.vue';
import { dashboardRequest } from 'src/data/userRequests';
import { useBootstrapStore } from 'src/stores/bootstrap-store';
import { computed, ref } from 'vue';

const user = computed(() => useBootstrapStore().user);
const stats = ref<
  {
    id: keyof Dashboard;
    name: string;
    numbers: number;
    icon: string;
    data: string;
    icontype: 'up' | 'down';
    classStyle: 'total' | 'veri' | 'convert' | 'pending';
  }[]
>([
  {
    id: 'storage_dealerships',
    name: 'Storage Dealerships',
    numbers: 0,
    icon: '/images/users.svg',
    data: '{inc}% {dir} from yesterday',
    icontype: 'up',
    classStyle: 'total',
  },
  {
    id: 'filling_outlets',
    name: 'Filling Outlets',
    numbers: 0,
    icon: '/images/shield.svg',
    data: '{inc}% {dir} from past week',
    icontype: 'up',
    classStyle: 'veri',
  },
  {
    id: 'financial_service_providers',
    name: 'Financial Service Providers',
    numbers: 0,
    icon: '/images/graph.svg',
    data: '{inc}% {dir} from yesterday',
    icontype: 'down',
    classStyle: 'convert',
  },
  {
    id: 'verification_centers',
    name: 'Verification Centers',
    numbers: 0,
    icon: '/images/circle.svg',
    data: '{inc}% {dir} from yesterday',
    icontype: 'up',
    classStyle: 'pending',
  },
  {
    id: 'certificate_centers',
    name: 'Certificate Centers',
    numbers: 0,
    icon: '/images/circle.svg',
    data: '{inc}% {dir} from yesterday',
    icontype: 'up',
    classStyle: 'pending',
  },
]);

const { loading } = useRequest(dashboardRequest({ with: 'everything' }), {
  immediate: true,
}).onSuccess(({ data }) => {
  if (data.data.everything) {
    useBootstrapStore().setEverything(data.data.everything);
  }

  stats.value.forEach((stat, i) => {
    if (data.data[stat.id]) {
      const inc = data.data[
        (stat.id + '_inc') as unknown as keyof Dashboard
      ] as number;
      stats.value[i].numbers = data.data[stat.id] as number;
      stats.value[i].icontype = inc >= 0 ? 'up' : 'down';
      stats.value[i].data = stats.value[i].data
        .replace('{inc}', inc.toString())
        .replace('{dir}', inc >= 0 ? 'up' : 'down');
    }
  });
});
</script>

<style lang="scss" scoped></style>
