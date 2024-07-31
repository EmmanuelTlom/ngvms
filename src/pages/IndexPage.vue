<template>
  <q-page class="">
    <section class="hero">
      <div v-intersection="onIntersection" class="container">
        <div class="grid">
          <div class="left">
            <h1 class="main_text">
              Welcome to The NVGMS Monitoring and Database System.
            </h1>

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
                :to="{ name: 'login' }"
                class="started full-width"
                flat
                no-caps
                no-wrap
              >
                Login
              </q-btn>
              <q-btn class="watch full-width bg-grey-3" flat no-wrap no-caps>
                Sign up
              </q-btn>
            </div>

            <div class="q-mt-lg">
              <p class="text-weight-bold">
                {{ stats.registeredMotorCycles }}+ Registered MotorCycles
              </p>
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
import { computed, ref } from 'vue';

let slide = ref(1);

let stats = ref({
  registeredVehicles: 0,
  accreditedCenters: 0,
  registeredMotorCycles: 0,
});
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
  const finalCountCenters = 500;
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
  const timer = setInterval(() => {
    if (stats.value.registeredVehicles < finalCountVehicles) {
      stats.value.registeredVehicles += incrementVehicles;
    } else {
      stats.value.registeredVehicles = finalCountVehicles;
      clearInterval(timer);
    }
  }, interval);
  const timerPersonnel = setInterval(() => {
    if (stats.value.accreditedCenters < finalCountCenters) {
      stats.value.accreditedCenters += incrementCenters;
    } else {
      stats.value.accreditedCenters = finalCountCenters;
      clearInterval(timerPersonnel);
    }
  }, interval);
  const timerFacility = setInterval(() => {
    if (stats.value.registeredMotorCycles < finalCountMotorcycles) {
      stats.value.registeredMotorCycles += incrementMotorcycles;
    } else {
      stats.value.registeredMotorCycles = finalCountMotorcycles;
      clearInterval(timerFacility);
    }
  }, interval);
};

// let countFcn = async () => {
//   try {
//     const countFacilityResponse = await api.get(`admin/stats`);
//     // console.log(countFacilityResponse);
//     statsCountVehicles.value = countFacilityResponse.data.allPersonnels;
//     statsCountAccreditedCenters.value =
//       countFacilityResponse.data.allfacilities;
//     statsCountMotorcycles.value = countFacilityResponse.data.allfoodPersonnels;
//     loadComplete.value = true;
//   } catch (error) {
//     console.error(error);
//   }
// };

// onMounted(() => {
//   countFcn();
// });
</script>
