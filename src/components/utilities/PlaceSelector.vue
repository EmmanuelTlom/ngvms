<template>
  <select v-model="modelValue">
    <option :value="data.id" :key="i" v-for="(data, i) in places">
      {{ data.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { useWatcher } from 'alova/client';
import { ResponseBody } from 'app/repository/models';
import { alova } from 'src/boot/alova';
import { readEnv } from 'src/utils/helpers';
import { computed, type PropType } from 'vue';

interface Params {
  states: string | number | boolean;
  cities?: string | number | boolean;
  wards?: string | number | boolean;
  units?: string | number | boolean;
  lgas?: string | number | boolean;
}

const emit = defineEmits<{
  (e: 'change', id: number | string): void;
}>();

const modelValue = defineModel<string | number>('modelValue');

const params = defineModel('params', {
  type: Object as PropType<Params>,
  default: { states: true },
});

const url = computed<string | null>(() => {
  if (!Object.values(params.value).every((e) => !!e)) {
    return null;
  }

  const obj = params.value;

  let path = '';

  for (const [key, value] of Object.entries(obj)) {
    if (value === true) {
      path += `/${key}`;
    } else {
      path += `/${key}/${value}`;
    }
  }

  return path;
});

const { data: places, onSuccess } = useWatcher(
  () => {
    const config = alova.Get(url.value ?? '', {
      transform: (
        e: ResponseBody<
          {
            id: number;
            name: string;
            slug: string;
          }[]
        >,
      ) => e.data,
    });

    config.baseURL = 'https://naija-places.niconpay.com/api/v1/'; // readEnv('naijaPlacesAPI');

    return config;
  },
  [params],
  {
    initialData: [],
    immediate: true,
    middleware(_, next) {
      if (Object.values(params.value).every((e) => !!e)) {
        return next();
      }
    },
  },
);

onSuccess(({ data }) => {
  if (!modelValue.value) {
    modelValue.value = data[0].id;
  }
});
</script>
