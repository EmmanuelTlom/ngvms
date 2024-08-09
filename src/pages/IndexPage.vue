<template>
  <q-page class="">
    <section class="hero">
      <div class="container">
        <div class="grid">
          <div class="left">
            <h1 class="main_text">
              Welcome To NGVMS, Nigeria Gas Vehicle Monitoring System.
            </h1>

            <div v-if="!loading">
              <div style="gap: 1rem" class="row q-my-lg items-center no-wrap">
                <div class="column items-center text-center">
                  <p class="text-black text-h6">Total Registered Vehicles</p>

                  <h5 class="text-h4 text-weight-bold">
                    <q-skeleton size="50px" />
                  </h5>
                </div>
                <div class="column items-center text-center">
                  <p class="text-black text-h6">Accredited Centers</p>

                  <h5 class="text-h4 text-weight-bold">
                    <q-skeleton size="50px" />
                  </h5>
                </div>
              </div>
              <div
                style="gap: 2rem"
                class="hero_btns row justify-center items-center no-wrap"
              >
                <q-btn
                  flat
                  no-caps
                  no-wrap
                  class="started full-width"
                  :to="{ name: 'login' }"
                >
                  Login
                </q-btn>
                <q-btn
                  flat
                  no-wrap
                  no-caps
                  class="watch full-width bg-grey-3"
                  :to="{ name: 'register' }"
                >
                  Sign up
                </q-btn>
              </div>

              <div class="q-mt-lg">
                <p class="text-weight-bold">
                  <q-skeleton size="50px" />+ Registered MotorCycles
                </p>
              </div>
            </div>
            <div v-intersection="onIntersection" v-if="loading">
              <div style="gap: 1rem" class="row q-my-lg items-center no-wrap">
                <div class="column items-center text-center">
                  <p class="text-black text-h6">Total Registered Vehicles</p>

                  <h5 class="text-h4 text-weight-bold">
                    {{ stats.registeredVehicles }}+
                  </h5>
                </div>
                <div class="column items-center text-center">
                  <p class="text-black text-h6">Accredited Centers</p>

                  <h5 class="text-h4 text-weight-bold">
                    {{ stats.accreditedCenters }}+
                  </h5>
                </div>
              </div>
              <div
                style="gap: 2rem"
                class="hero_btns row justify-center items-center no-wrap"
              >
                <q-btn
                  flat
                  no-caps
                  no-wrap
                  class="started full-width"
                  :to="{ name: 'login' }"
                >
                  Login
                </q-btn>
                <q-btn
                  flat
                  no-wrap
                  no-caps
                  class="watch full-width bg-grey-3"
                  :to="{ name: 'register' }"
                >
                  Sign up
                </q-btn>
              </div>

              <div class="q-mt-lg">
                <p class="text-weight-bold">
                  {{ stats.registeredMotorCycles }}+ Registered MotorCycles
                </p>
              </div>
            </div>
          </div>
          <div class="right row justify-end">
            <q-carousel :autoplay="true" animated v-model="slide" infinite>
              <q-carousel-slide :name="1" img-src="/images/hero1.jpeg" />
              <q-carousel-slide :name="2" img-src="/images/hero2.jpeg" />
              <q-carousel-slide :name="3" img-src="/images/hero3.jpeg" />
              <q-carousel-slide :name="4" img-src="/images/hero4.jpeg" />
              <q-carousel-slide :name="4" img-src="/images/hero5.webp" />
            </q-carousel>
            <!-- <img src="../assets/moi.svg" alt="" /> -->
          </div>
        </div>
      </div>
    </section>

    <!-- <FooterVue /> -->
  </q-page>
</template>

<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

let slide = ref(1);
let loading = ref(false);

let stats = ref({
  registeredVehicles: 0,
  accreditedCenters: 0,
  registeredMotorCycles: 0,
});
let statsCountAccreditedCenters = ref(0);
let statsCountVehicles = ref(0);
let statsCountMotorcycles = ref(0);
let counterRef = ref(false);

let visible = computed(() => (counterRef.value ? 'positive' : 'negative'));

const onIntersection = (entry) => {
  counterRef.value = entry.isIntersecting;
  if (visible.value === 'positive') {
    startCountAnimation();
  } else {
    stats.value = {
      registeredVehicles: 0,
      accreditedCenters: 0,
      registeredMotorCycles: 0,
    };
  }
};

const startCountAnimation = () => {
  const duration = 5000;
  const interval = 70;
  const finalCountVehicles = 17000;
  const finalCountCenters = statsCountAccreditedCenters.value;
  const finalCountMotorcycles = 40000;
  const incrementVehicles = Math.round(
    finalCountVehicles / (duration / interval) + 1,
  );
  const incrementCenters = Math.round(
    finalCountCenters / (duration / interval) + 1,
  );
  const incrementMotorcycles = Math.round(
    finalCountMotorcycles / (duration / interval) + 1,
  );
  const timerForVehicles = setInterval(() => {
    if (stats.value.registeredVehicles < finalCountVehicles) {
      stats.value.registeredVehicles += incrementVehicles;
    } else {
      stats.value.registeredVehicles = finalCountVehicles;
      clearInterval(timerForVehicles);
    }
  }, interval);
  const timerForCenters = setInterval(() => {
    if (stats.value.accreditedCenters < finalCountCenters) {
      stats.value.accreditedCenters += incrementCenters;
    } else {
      stats.value.accreditedCenters = finalCountCenters;
      clearInterval(timerForCenters);
    }
  }, interval);
  const timerForMotocycles = setInterval(() => {
    if (stats.value.registeredMotorCycles < finalCountMotorcycles) {
      stats.value.registeredMotorCycles += incrementMotorcycles;
    } else {
      stats.value.registeredMotorCycles = finalCountMotorcycles;
      clearInterval(timerForMotocycles);
    }
  }, interval);
};

let countFcn = async () => {
  try {
    const getAccreditedCenterCount = await axios.get(
      `https://pci.gov.ng/restapi/center-count/`,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Credentials': 'true',
          Authorization: 'Bearer ' + '9dfb9104511c37746d3263d132659d3c',
        },
      },
    );
    // const getCenterCount = await axios.get(
    //   `https://pci.gov.ng/restapi/center-count/`,
    // );
    // statsCountVehicles.value = countFacilityResponse.data.allPersonnels;
    statsCountAccreditedCenters.value = getAccreditedCenterCount.data.count;
    // statsCountMotorcycles.value = countFacilityResponse.data.allfoodPersonnels;
    loading.value = true;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  countFcn();
});
</script>
