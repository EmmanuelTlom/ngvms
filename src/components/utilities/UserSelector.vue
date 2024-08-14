<template>
  <q-select
    use-input
    map-options
    v-bind="$attrs"
    v-model="modelValue"
    input-debounce="0"
    option-value="id"
    option-label="name"
    @update:model-value="emitSelectedValues"
    :loading="loading"
    :options="users"
    @filter="filterFn"
  >
    <template v-slot:option="{ itemProps, opt }">
      <q-item clickable v-bind="itemProps">
        <q-item-section avatar>
          <q-item-label>
            <q-avatar rounded size="md">
              <img :src="opt.imageUrl" />
            </q-avatar>
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ opt.name }}</q-item-label>
          <q-item-label caption>{{ opt.email || opt.phone }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { useWatcher } from 'alova/client';
import { ResponseBody, User } from 'app/repository/models';
import { QSelect } from 'quasar';
import { alova } from 'src/boot/alova';
import { PropType, ref } from 'vue';

interface Params {
  type?: User['type'];
  search?: string;
}

const emit = defineEmits<{
  (e: 'change', value: User[]): void;
}>();

function emitSelectedValues(newValue: User[]) {
  emit('change', newValue);
}

const params = defineModel('params', {
  type: Object as PropType<Params>,
  default: { type: 'dealer' },
});

const query = ref<Params>(params.value);
const modelValue = defineModel<number | undefined | User>('modelValue');

const {
  data: users,
  loading,
  onSuccess,
} = useWatcher(
  () => {
    const config = alova.Get('v1/users' ?? '', {
      params: query.value,
      transform: (e: ResponseBody<User[]>) => e.data,
    });

    return config;
  },
  [query],
  {
    force: true,
    initialData: [],
    immediate: true,
    middleware(_, next) {
      if (Object.values(params.value).every((e) => !!e)) {
        return next();
      }
    },
  },
);

const filterFn = (
  val: string,
  update: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
) => {
  query.value.search = val;
  if (val) {
    onSuccess(() => {
      update(() => {});
    });
  } else {
    update(() => {});
  }
};
</script>
