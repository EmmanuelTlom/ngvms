<template>
  <select v-model="modelValue">
    <option :value="data.id" :key="i" v-for="(data, i) in places">
      {{ data.fullName }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { useWatcher } from 'alova/client';
import { ResponseBody, User } from 'app/repository/models';
import { alova } from 'src/boot/alova';
import { PropType } from 'vue';

interface Params {
  type?: User['type'];
  search?: string;
}

const emit = defineEmits<{
  (e: 'change', id: number | string): void;
}>();

const modelValue = defineModel<string | number>('modelValue');

const params = defineModel('params', {
  type: Object as PropType<Params>,
  default: { type: 'dealer' },
});

const { data: places, onSuccess } = useWatcher(
  () => {
    const config = alova.Get('v1/users' ?? '', {
      params: params.value,
      transform: (e: ResponseBody<User[]>) => e.data,
    });

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
  modelValue.value = data[0].id;
});
</script>
