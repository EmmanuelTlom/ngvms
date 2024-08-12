<template>
  <q-btn rounded dense color="primary" icon="add" class="cursor-pointer">
    <q-menu anchor="top right" self="top left">
      <div class="row no-wrap q-pa-md">
        <!-- {{ value }} -->
        <div class="column">
          <q-select
            multiple
            use-input
            map-options
            hide-selected
            v-bind="$attrs"
            v-model="value"
            input-debounce="0"
            option-value="id"
            option-label="name"
            :loading="loading"
            :options="centers.data"
            @update:model-value="emitSelectedValues"
            @filter="filterFn"
            @focus="hideSelected = true"
            @blur="hideSelected = false"
          >
            <template
              v-slot:option="{ itemProps, opt, selected, toggleOption }"
            >
              <q-item clickable v-bind="itemProps">
                <q-item-section>
                  <q-item-label>{{ opt.name }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-checkbox
                    :model-value="selected"
                    @update:model-value="toggleOption(opt)"
                  />
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <br />
          <q-btn
            unelevated
            v-close-popup
            color="primary"
            :disable="!value.length"
            @click="
              () => {
                modelValue = [
                  ...new Set([...value, ...modelValue]),
                ] as ConversionCenter[];
                value = [];
              }
            "
          >
            Add Selection ({{ value.length }})
          </q-btn>
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { useWatcher } from 'alova/client';
import { ConversionCenter, GenericData } from 'app/repository/models';
import { QSelect } from 'quasar';
import { conversionCentersRequest } from 'src/data/serviceRequests';
import { ref } from 'vue';

interface Params {
  search?: string;
}

const params = ref<Params>({});

const hideSelected = ref(false);

const value = ref<ConversionCenter[]>([]);
const options = ref<ConversionCenter[]>([]);
const modelValue = defineModel<ConversionCenter[] | number[]>('modelValue', {
  default: [],
});
const emit = defineEmits<{
  (e: 'selectionChanged', value: ConversionCenter[]): void;
}>();

function emitSelectedValues(newValue: ConversionCenter[]) {
  emit('selectionChanged', newValue);
}
const {
  data: centers,
  loading,
  onSuccess,
} = useWatcher(
  () => conversionCentersRequest(params.value as GenericData, true),
  [params],
  {
    force: true,
    immediate: true,
    initialData: [],
  },
);

onSuccess(({ data }) => {
  options.value = data.data;
  if (!modelValue.value || modelValue.value.length < 1) {
    modelValue.value = [data.data[0]];
  }
});

const filterFn = (
  val: string,
  update: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
) => {
  params.value.search = val;
  if (val) {
    onSuccess(({ data }) => {
      update(() => {});
    });
  } else {
    update(() => {});
  }
};
</script>
