<template>
  <div class="chart">
    <div class="row justify-between no-wrap items-center">
      <h4 class="sub_texts_dash">Conversion Details</h4>
      <q-btn-dropdown flat no-caps no-wrap label="October" outline>
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>November</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>December</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <ConvertDetailsVue />
  </div>
</template>

<script setup>
import ConvertDetailsVue from './ConvertDetails.vue';
</script>

<style lang="scss" scoped>
.chart {
  box-shadow: 6px 6px 54px 0px #0000000d;
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  margin-top: 3rem;
}
</style>
