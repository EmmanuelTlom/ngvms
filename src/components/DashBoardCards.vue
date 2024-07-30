<template>
  <div :class="data.classStyle" class="dash_card">
    <div class="row justify-between no-wrap">
      <div>
        <p class="card_text">{{ data.name }}</p>
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

<script setup>
let props = defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped>
.dash_card {
  background: #ffffff;
  padding: 1rem;
  box-shadow: 6px 6px 54px 0px #0000000d;
  border-radius: 8px;
}
.card_text {
  font-family: "Nunito Sans", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  color: #202224;
}
.card_text.small {
  font-size: 12px;
  white-space: nowrap;
}

.card_bigtext {
  font-family: "Nunito Sans", sans-serif;
  font-size: 22px;
  line-height: 38px;
  letter-spacing: 1px;
  text-align: left;
  font-weight: 700;
}

.icon {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 1.5rem;

  img {
    width: 30px;
    height: 20px;
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
