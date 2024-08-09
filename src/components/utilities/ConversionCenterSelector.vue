<template>
  <q-btn dense icon="add" class="cursor-pointer">
    <q-menu>
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <q-select
            multiple
            emit-value
            map-options
            v-bind="$attrs"
            v-model="modelValue"
            option-value="id"
            option-label="name"
            :options="centers.data"
            @focus="hideSelected = true"
            @blur="hideSelected = false"
          >
            <template
              v-slot:option="{ itemProps, opt, selected, toggleOption }"
            >
              <q-item v-bind="itemProps">
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

const modelValue = defineModel<number[] | ConversionCenter[]>('modelValue');

const { data: centers, onSuccess } = useWatcher(
  () => conversionCentersRequest(params.value as GenericData, true),
  [params],
  {
    initialData: [],
    immediate: true,
  },
);

onSuccess(({ data }) => {
  if (!modelValue.value || modelValue.value.length < 1) {
    modelValue.value = [data.data[0].id];
  }
});

const filterFn = (
  val: string,
  update: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void,
  abort: () => void,
) => {
  if (val !== '') {
    params.value.search = val;
    onSuccess(() => {
      update(() => {});
    });
  } else {
    abort();
  }
};
</script>
