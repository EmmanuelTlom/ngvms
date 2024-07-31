<template>
  <div class="grid">
    <div class="dash_card">
      <div class="row justify-between no-wrap">
        <div class="wrapper">
          <div class="row er justify-between items-center">
            <p class="card_text">Total Conversions</p>
            <p class="card_text">Total Conversions</p>
          </div>
          <h4 style="gap: 1rem" class="card_bigtext row items-center no-wrap">
            <span>40,689,890.0</span> <span><hr /></span> <span>1465</span>
          </h4>
        </div>
      </div>

      <p class="card_text small q-mt-md">
        <img style="width: 20px; height: 12px" src="/images/trend.svg" alt="" />

        <span><span class="text-green"> 8.5% </span> Up from yesterday</span>
      </p>
    </div>
    <div class="dash_card">
      <div class="row justify-between no-wrap">
        <div>
          <div class="row justify-between items-center">
            <p class="card_text">Available Networks -</p>
          </div>
        </div>
      </div>

      <p v-if="kind !== 'page'" class="card_text small q-mt-md">
        <span><span class="text-green">MTN - 20% </span> </span>
      </p>
      <div v-if="kind === 'page'" class="q-mt-md">
        <div class="row justify-between items-center">
          <p class="card_text small">
            <span><span class="text-green">MTN - 20% </span> </span>
          </p>
          <p class="card_text small">
            <span><span class="text-green">Airtel - 20% </span> </span>
          </p>
        </div>
        <div class="row justify-between q-mt-sm items-center">
          <p class="card_text small">
            <span><span class="text-green">Glo - 20% </span> </span>
          </p>
          <p class="card_text small">
            <span><span class="text-green">9mobile - 20% </span> </span>
          </p>
        </div>

        <div class="row edit_profile justify-center q-mt-md">
          <q-btn
            :to="{
              name: 'network-type',
              params: {
                id: 'airtel',
              },
            }"
            class="smalltext"
            flat
            no-wrap
            no-caps
          >
            VIEW NETWORK
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
}
hr {
  height: 100%;
  width: 30px;
  background: black;
  transform: rotate(90deg);
}
.grid {
  max-width: 800px;
}
.dash_card {
  background: #4338ca;
  box-shadow: 6px 6px 54px 0px #0000000d;
  padding: 1rem;
  color: white;
  border-radius: 20px;

  .er {
    width: 100%;
  }
}

.dash_card:nth-child(2) {
  box-shadow: 6px 6px 54px 0px #0000000d;
  background: white;
  color: #202224;
  border-radius: 20px;
  padding: 1rem;

  .card_text {
    color: #202224;
  }
}
.card_text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  color: #fff;
}
.card_text.small {
  font-size: 12px;
  white-space: nowrap;
}

.card_bigtext {
  font-family: 'Nunito Sans', sans-serif;
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
