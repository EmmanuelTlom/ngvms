<template>
  <q-page class="">
    <section class="hero">
      <div class="container q-pt-lg">
        <div class="grid">
          <div class="left">
            <h1 class="main_text">
              Welcome To NGVMS, Nigeria's Gas Mobility Safety System.
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

<script setup lang="ts">
import { ResponseBody } from 'app/repository/models';
import { alova } from 'src/boot/alova';
import axios from 'axios';
import { readEnv } from 'src/utils/helpers';
import { computed, onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';

let slide = ref(1);
let loading = ref(false);

let stats = ref({
  registeredVehicles: 0,
  accreditedCenters: 0,
  registeredMotorCycles: 0,
});
let statsCountAccreditedCenters = ref(0);
let registeredVehicles = ref(0);
let counterRef = ref(false);

let visible = computed(() => (counterRef.value ? 'positive' : 'negative'));

const onIntersection = (entry: IntersectionObserverEntry): boolean => {
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
  return true;
};

const startCountAnimation = () => {
  const duration = 5000;
  const interval = 70;
  const finalCountVehicles = registeredVehicles.value;
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

// let countFcn = async () => {
//   try {
//     const { count } = await alova
//       .Get<ResponseBody & { count: number }>('v1/misc/center-count')
//       .send();
//     statsCountAccreditedCenters.value = count;
//     loading.value = true;
//   } catch (error) {}
// };
let countFcn = async () => {
  try {
    const res = await axios.get(
      'https://pcngi.com.ng/api/v1/stats',
      // 'https://pcngi.com.ng/api/v1/conversion-centers?limit=50',
      {
        headers: {
          'X-Api-Key': 'gDE18hO2nHbu651Jle8yYieUbP5nGfpI9HiOiLxWRMX58w',
        },
      },
    );
    console.log(res);
    statsCountAccreditedCenters.value = res.data.data.conversion_centers;
    registeredVehicles.value = res.data.data.bookings;
    loading.value = true;
  } catch (error) {}
};
let testsearh = async () => {
  try {
    const res = await api.get(
      `vehicle-details?search=ECE 948 JJ`,

      {
        headers: {
          'X-Api-Key': 'Y9FDY8PBMHs7g8ktVeaolLraozJfKjlE9Gu2d4Rj5KWYuP',
        },
      },
    );
    console.log(res);
  } catch (error) {}
};

onMounted(() => {
  countFcn();
  // testsearh();
});
</script>
