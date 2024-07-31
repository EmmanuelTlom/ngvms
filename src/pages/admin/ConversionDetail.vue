<template>
  <div class="container">
    <div class="multi_grids">
      <div class="pills">
        Network: <br />
        <span>MTN</span>
      </div>
      <div class="pills">
        Sender: <br />
        <span>09154364534</span>
      </div>
      <div class="pills">
        Beneficiary: <br />
        <span>08031425637</span>
      </div>
      <div class="pills">
        Amount: <br />
        <span>6,000</span>
      </div>
      <div class="pills">
        Return Amount: <br />
        <span>4,800</span>
      </div>
    </div>
    <ConversionTaskTableVue />
  </div>
</template>

<script setup>
import ConversionTaskTableVue from 'src/components/ConversionTaskTable.vue';
</script>

<style lang="scss" scoped></style>
