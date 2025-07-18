<template>
  <div class="container">
    <q-inner-loading :showing="loading" />
    <div
      style="
        border-radius: 10px;
        max-width: 1000px;
        height: 100%;
        margin: 5rem auto;
      "
      class="bg-white q-mt-xl q-pa-md"
    >
      <div class="grid items-center">
        <div class="left">
          <h4 class="text-h4 text-weight-bold q-mt-xl">
            Welcome <br />
            <span class="text-weight-medium text-h4">{{ user.fullName }}</span>
          </h4>
          <q-banner
            class="bg-green q-mt-lg text-white text-justify"
            style="border: 1px solid #009b25; border-radius: 0.7em"
            v-if="!user.verified"
          >
            You can enter and update data only when your account has been
            verified, in the meantime your account is pending verification,
            check back after some time.
          </q-banner>
          <p v-else class="text-green q-mt-lg text-weight-bold">
            Please Remember to Confirm Data Accuracy Before Submission
          </p>
          <!-- {{ endpoints.add }} -->
          <div
            style="gap: 1rem; max-width: 400px"
            class="hero_btns q-mt-lg row justify-center items-center"
            :class="{ 'no-wrap': $q.screen.gt.xs }"
            v-if="user.verified"
          >
            <q-btn
              color="green-10"
              no-caps
              v-if="iCan()"
              no-wrap
              class="started full-width"
              :to="{ name: 'admin.dashboard' }"
            >
              Admin Dashboard
            </q-btn>
            <q-btn
              color="green"
              no-caps
              v-if="user.type !== 'conversion'"
              no-wrap
              class="started full-width"
              :to="{ name: endpoints.add }"
            >
              Add New Data
            </q-btn>
            <q-btn
              color="yellow-7"
              no-caps
              no-wrap
              v-if="user.type === 'conversion'"
              class="started full-width"
              :to="{ name: 'add.conversion' }"
            >
              Add Conversions
            </q-btn>

            <q-btn
              flat
              no-wrap
              no-caps
              v-if="user.type !== 'conversion'"
              class="full-width text-white bg-blue-8"
              :to="{ name: endpoints.list }"
            >
              My History
            </q-btn>
          </div>
        </div>
        <div class="right">
          <img src="/images/dash.png" alt="" />
        </div>
      </div>
    </div>
    <!-- <div class="stats_hold">
      <div v-for="(data, index) in stats" :key="index">
        <DashBoardCardsVue :data="data" />
      </div>
    </div> -->

    <!-- <ChartCompVue /> -->
    <!-- <ConversionCompVue /> -->
    <!-- <LatestUsersVue /> -->
  </div>
</template>

<script setup lang="ts">
import { useRequest } from 'alova/client';
import { Dashboard } from 'app/repository/models';
// import DashBoardCardsVue from 'src/components/DashBoardCards.vue';
import { dashboardRequest } from 'src/data/userRequests';
import { useBootstrapStore } from 'src/stores/bootstrap-store';
import { computed, onMounted, ref } from 'vue';
import { iCan, refreshUser } from 'src/utils/proccessor';
const user = computed(() => useBootstrapStore().user);

console.log(user.value);
const stats = ref<
  {
    id: keyof Dashboard;
    name: string;
    numbers: number;
    icon: string;
    data: string;
    place: string;
    icontype: 'up' | 'down';
    classStyle: 'total' | 'veri' | 'convert' | 'pending';
  }[]
>([
  {
    id: 'certificates',
    name: 'SON Certified CNG Conversion Kit Supplier',
    numbers: 0,
    icon: '/images/users.svg',
    data: '{inc}% {dir} from yesterday',
    place: '{inc}% {dir} from yesterday',
    icontype: 'up',
    classStyle: 'total',
  },
  {
    id: 'filling_outlets',
    name: 'NMDPRA (Licenced CNG Filling Station)',
    numbers: 0,
    icon: '/images/shield.svg',
    data: '{inc}% {dir} from past week',
    place: '{inc}% {dir} from past week',
    icontype: 'up',
    classStyle: 'veri',
  },
  {
    id: 'financial_service_providers',
    name: 'Financial Service Providers',
    numbers: 0,
    icon: '/images/graph.svg',
    data: '{inc}% {dir} from yesterday',
    place: '{inc}% {dir} from yesterday',
    icontype: 'down',
    classStyle: 'convert',
  },
  {
    id: 'vehicles',
    name: 'FRSC Vehicle Registration Verification ',
    numbers: 0,
    icon: '/images/circle.svg',
    data: '{inc}% {dir} from yesterday',
    place: '{inc}% {dir} from yesterday',
    icontype: 'up',
    classStyle: 'pending',
  },
  {
    id: 'conversion_centers',
    name: 'NADDC(Accredited Conversion Centre)',
    numbers: 0,
    icon: '/images/circle.svg',
    data: '{inc}% {dir} from yesterday',
    place: '{inc}% {dir} from yesterday',
    icontype: 'up',
    classStyle: 'pending',
  },
  {
    id: 'vehicles',
    name: 'Registered Vehicles',
    numbers: 0,
    icon: '/images/circle.svg',
    data: '{inc}% {dir} from yesterday',
    place: '{inc}% {dir} from yesterday',
    icontype: 'up',
    classStyle: 'pending',
  },
]);
const endpoints = computed(
  () =>
    ({
      son: {
        add: 'user.add.certificate',
        list: 'user.certificates',
      },
      frsc: {
        add: 'user.add.vehicle',
        list: 'user.vehicles',
      },
      dealer: {
        add: 'user.add.kit',
        list: 'user.kits',
      },
      naddc: {
        add: 'user.add.center',
        list: 'user.centers',
      },
      nmdpra: {
        add: 'user.add.station',
        list: 'user.stations',
      },
    })[user.value.type as 'dealer' | 'son' | 'naddc' | 'frsc' | 'nmdpra'] || {
      add: 'user.add.vehicle',
      list: 'user.vehicles',
    },
);
type KOD = keyof Dashboard;
const buildStats = (data: Dashboard) => {
  stats.value.forEach((stat, i) => {
    if (data[stat.id] !== undefined) {
      const inc = (data[(stat.id + '_inc') as unknown as KOD] || 0) as number;
      stats.value[i].numbers = data[stat.id] as number;

      stats.value[i].icontype = inc >= 0 ? 'up' : 'down';
      stats.value[i].data = stats.value[i].place
        .replace('{inc}', inc.toString())
        .replace('{dir}', inc >= 0 ? 'up' : 'down');
    }
  });
};

const { loading } = useRequest(dashboardRequest({ with: 'everything' }), {
  immediate: true,
}).onSuccess(({ data }) => {
  if (data.data.everything) {
    useBootstrapStore().setEverything(data.data.everything);
  }
  buildStats(data.data);
});

buildStats(Object.fromEntries([...stats.value.map((e) => [e.id, 0])]));

onMounted(() => {
  refreshUser();
});
</script>

<style lang="scss" scoped></style>
