<template>
  <div class="container transact_page">
    <h4 class="dashboardmain_text">Order Lists</h4>

    <div class="filters">
      <q-btn class="filterImageBtn" flat
        ><img src="/images/filter.svg" alt=""
      /></q-btn>
      <q-btn flat no-caps no-wrap>Filter By</q-btn>
      <q-btn flat no-caps no-wrap icon-right="fa-solid fa-chevron-down"
        >Date

        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date range multiple minimal color="secondary" v-model="data.date">
            <div style="margin-top: 0" class="filter_val">
              <p>*You can choose multiple date</p>
              <div class="row items-center justify-center">
                <q-btn
                  v-close-popup
                  no-wrap
                  no-caps
                  label="Apply Now"
                  color="primary"
                  class="apply"
                  flat
                />
              </div>
            </div>
          </q-date>
        </q-popup-proxy>
      </q-btn>
      <q-btn flat no-caps no-wrap icon-right="fa-solid fa-chevron-down"
        >Order Type
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <div class="wrap_div">
            <h5 class="p_sub_text">Select Order Type</h5>
            <div class="q-gutter-sm q-mt-sm">
              <q-chip v-model:selected="orderType.conversion">
                Conversion
              </q-chip>
              <q-chip v-model:selected="orderType.auto">
                Auto Conversion
              </q-chip>
              <q-chip v-model:selected="orderType.data"> Data Network </q-chip>
              <q-chip v-model:selected="orderType.airtime">
                Airtime Network
              </q-chip>
            </div>
            <div class="filter_val q-mt-md">
              <p>*You can choose multiple date</p>
              <div class="row items-center justify-center">
                <q-btn
                  v-close-popup
                  no-wrap
                  no-caps
                  label="Apply Now"
                  color="primary"
                  class="apply"
                  flat
                />
              </div>
            </div>
          </div> </q-popup-proxy
      ></q-btn>
      <q-btn flat no-caps no-wrap icon-right="fa-solid fa-chevron-down"
        >Order Status
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <div class="wrap_div">
            <h5 class="p_sub_text">Select Order Status</h5>
            <div class="q-gutter-sm q-mt-sm">
              <q-chip v-model:selected="orderStatus.completed">
                Completed
              </q-chip>
              <q-chip v-model:selected="orderStatus.processing">
                Processing
              </q-chip>
              <q-chip v-model:selected="orderStatus.decline"> Decline </q-chip>
            </div>
            <div class="filter_val q-mt-md">
              <p>*You can choose multiple date</p>
              <div class="row items-center justify-center">
                <q-btn
                  v-close-popup
                  no-wrap
                  no-caps
                  label="Apply Now"
                  color="primary"
                  class="apply"
                  flat
                />
              </div>
            </div>
          </div>
        </q-popup-proxy>
      </q-btn>
      <q-btn flat no-caps no-wrap icon="fa-solid fa-rotate-right" class="reset"
        >Reset Filter</q-btn
      >
    </div>
    <TransactionTableVue />
  </div>
</template>

<script setup>
import TransactionTableVue from 'src/components/TransactionTable.vue';
import { ref } from 'vue';

let data = ref({});

let orderType = ref({
  conversion: true,
  auto: true,
  data: false,
  airtime: false,
});
let orderStatus = ref({
  completed: true,
  decline: true,
  processing: false,
});
</script>

<style lang="scss" scoped></style>
