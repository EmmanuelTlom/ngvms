<template>
  <div class="dash_card" :class="data.classStyle">
    <div style="gap: 0.5rem" class="row justify-between no-wrap">
      <div class="flex-zone">
        <p class="card_text main">{{ data.name }}</p>
        <h4 class="card_bigtext">{{ data.numbers }}</h4>
      </div>

      <div class="icon">
        <img :src="data.icon" alt="" />
      </div>
    </div>

    <p class="card_text small q-mt-md">
      <img
        v-if="data.icontype === 'up'"
        style="width: 20px; height: 12px"
        src="/images/trend.svg"
        alt=""
      />
      <img
        v-else
        style="width: 30px; height: 12px"
        src="/images/iconDown.svg"
        alt=""
      />
      {{ data.data }}
    </p>
  </div>
</template>

<script setup lang="ts">
let data = defineModel<{
  name: string;
  numbers: number;
  icon: string;
  data: string;
  icontype: 'up' | 'down';
  classStyle: 'total' | 'veri' | 'convert' | 'pending';
}>('data', {
  default: {},
});
</script>

<style lang="scss" scoped>
.dash_card {
  // background: #ffffff;
  background: rgba(0, 0, 0, 0.08);
  padding: 1rem;
  box-shadow: 6px 6px 54px 0px #0000000d;
  border-radius: 8px;
  height: 190px;
  position: relative;
  .flex-zone {
    flex: 3.5;
  }
}
.card_text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;

  color: #202224;

  &.main {
    background: white;
    padding: 0.5rem;
    font-weight: 700;
    border-radius: 8px;
    height: 80px;
  }
}
.card_text.small {
  font-size: 12px;
  white-space: nowrap;
  position: absolute;
  bottom: 5%;
}

.card_bigtext {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 25px;
  line-height: 38px;
  letter-spacing: 1px;
  text-align: left;
  font-weight: 700;
  position: absolute;
  bottom: 22%;
}

.icon {
  min-width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  // flex: 1;
  border-radius: 1.5rem;

  img {
    width: 15px;
    height: 15px;
  }
}

.total {
  .icon {
    background: rgba(130, 128, 255, 0.4);
    // opacity: 0.4;
  }
}
.veri {
  .icon {
    background: rgba(254, 197, 61, 0.4);
  }
}
.convert {
  .icon {
    background: rgba(74, 217, 145, 0.4);
  }
}
.pending {
  .icon {
    background: rgba(255, 144, 102, 0.4);
  }
}

.green {
  color: #00b69b;
}
</style>
