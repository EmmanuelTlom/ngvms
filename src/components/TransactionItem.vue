<template>
  <q-item clickable v-ripple>
    <q-item-section avatar top>
      <q-avatar>
        <img :src="record.img" alt="" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ record.name }}</q-item-label>
      <q-item-label caption>{{ record.time }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-item-label
        class="text-weight-medium"
        :class="record.type === 'credit' ? 'text-green' : 'text-black'"
        >{{ record.amount }}</q-item-label
      >
    </q-item-section>
  </q-item>
</template>

<script setup>
let props = defineProps({
  record: Object,
});
</script>

<style lang="scss" scoped></style>
