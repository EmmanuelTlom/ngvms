<template>
  <q-item-label class="q-py-xs" header v-if="title">{{ title }}</q-item-label>

  <q-item class="q-mb-sm" clickable v-ripple v-bind="$attrs">
    <q-item-section avatar top>
      <q-avatar rounded>
        <img :src="center.imageUrl" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ center.name }}</q-item-label>
      <q-item-label caption lines="1">
        <b>Email:</b> {{ center.email }}
      </q-item-label>
      <q-item-label caption lines="1">
        <b>Phone:</b> {{ center.phone }}
      </q-item-label>
      <q-item-label caption lines="2">
        <b>Address:</b> {{ center.address }}
      </q-item-label>
    </q-item-section>
    <!-- <q-item-section side>
      <q-icon name="chat_bubble" color="grey" />
    </q-item-section> -->
  </q-item>
</template>

<script setup lang="ts">
import { ConversionCenter } from 'app/repository/models';

defineProps<{
  title?: string;
}>();

const center = defineModel<ConversionCenter>('center', {
  default: {},
});
</script>
