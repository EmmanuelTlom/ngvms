<template>
  <q-btn
    color="negative"
    icon="delete"
    :loading="loading"
    @click="confirm"
    v-if="validate"
  />
</template>

<script setup lang="ts">
import { useRequest } from 'alova/client';
import { ResponseBody } from 'app/repository/models';
import { alova } from 'src/boot/alova';
import { notify } from 'src/utils/helpers';
import { computed, ref } from 'vue';

defineOptions({
  name: 'ContentRemover',
});

/* eslint-disable @typescript-eslint/no-explicit-any */
type Propstype =
  | {
      id: string | number;
      ids?: string[];
      list?: any[];
      title?: string;
      baseUrl?: string;
      buttons?: { cancel: string; ok: string };
      confirmation?: string;
      successDialog?: boolean;
    }
  | {
      id?: string | number;
      ids: string[];
      list?: any[];
      title?: string;
      baseUrl?: string;
      buttons?: { cancel: string; ok: string };
      confirmation?: string;
      successDialog?: boolean;
    };

const emit = defineEmits(['deleted', 'loading']);
const props = withDefaults(defineProps<Propstype>(), {
  ids: () => [],
  list: () => [],
  title: 'Confirm Delete',
  baseUrl: '',
  buttons: () => ({ cancel: 'Cancel', ok: 'Yes, Delete' }),
  confirmation: 'Are you sure you want to delete this item?',
});

const validate = computed(() => {
  const p = props;
  const valid =
    p.baseUrl &&
    !!(p.id || p.ids.length) &&
    (!p.buttons || (!!p.buttons.cancel && !!p.buttons.ok));

  if (!p.id && !p.ids.length) {
    console.error('Either of the id or ids prop is required');
  }

  if (!p.baseUrl) {
    console.error('The baseUrl prop is required');
  }

  if (!p.buttons.cancel || !p.buttons.ok) {
    console.error(
      'The buttons prop must be an object with both "cancel" and "ok" properties',
    );
  }
  return valid;
});

const parentList = ref(props.list);

const { loading, send, onSuccess } = useRequest(
  () =>
    alova.Delete<ResponseBody<string[]>>(
      `${props.baseUrl}/${props.id || 'items'}`,
      {
        items: props.ids,
      },
    ),
  {
    immediate: false,
  },
);

const confirm = () => {
  if (props.confirmation) {
    notify({
      alert: true,
      title: props.title,
      status: 'warning',
      message: props.confirmation,
      ok: { color: 'negative', label: props.buttons?.ok, noCaps: true },
      cancel: { color: 'green-8', label: props.buttons?.cancel, noCaps: true },
    })?.onOk(() => {
      send();
    });
  } else {
    send();
  }
};

onSuccess(({ data }) => {
  if (props.ids?.length) {
    props.ids.forEach((e) => {
      parentList.value.splice(
        props.list.findIndex((i) => i.id == e),
        1,
      );
    });
    emit('deleted', props.ids, parentList.value);
  } else {
    parentList.value.splice(
      props.list.findIndex((i) => i.id == props.id),
      1,
    );
    emit('deleted', props.id, parentList.value);
  }
  notify(data.message, data.status, props.successDialog);
});
</script>
