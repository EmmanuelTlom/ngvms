<template>
  <slot
    :viewData="viewData"
    :viewMode="viewMode"
    :toggleDialog="toggleDialog"
  ></slot>
  <q-dialog v-model="editDialogToggle" v-bind="$attrs">
    <q-card
      class="card_img"
      :style="{
        minWidth: $q.screen.gt.xs ? '550px' : '100%',
      }"
    >
      <div class="q-pa-md">
        <div class="text-h6 text-weight-bold q-mb-sm">
          {{
            { view: 'View Data', edit: 'Edit Data', doc: 'View Document' }[
              viewMode
            ]
          }}
        </div>
        <q-form v-if="viewMode === 'edit'" class="q-gutter-md">
          <slot
            name="form-prepend"
            :form="form"
            :errors="errors"
            :viewData="viewData"
          >
          </slot>
          <div class="input_wrap" :key="field[0]" v-for="field in viewDataMap">
            <label class="q-mb-xs block">
              {{ field[0].slug(' ').titleCase() }}
            </label>
            <div
              class="row items-center justify-start q-pr-sm active-grey input-box"
              v-if="typeof field[1] === 'boolean'"
            >
              <q-radio
                v-model="form[field[0].slug('_')]"
                :key="x"
                :val="x"
                :label="['Pending', 'Approved'][x]"
                v-for="x in [0, 1]"
              />
            </div>
            <q-input
              v-else
              outlined
              hide-bottom-space
              padding="none"
              bg-color="sky-1"
              v-model="form[field[0].slug('_')]"
              :error="!!errors[field[0].slug('_')]"
              :error-message="errors[field[0].slug('_')]"
            />
            <slot
              name="form-field-append"
              :form="form"
              :value="form[field[0].slug('_')]"
              :error="!!errors[field[0].slug('_')]"
              :viewData="viewData"
              :error-message="errors[field[0].slug('_')]"
            >
            </slot>
          </div>
          <slot
            name="form-append"
            :form="form"
            :errors="errors"
            :viewData="viewData"
          >
          </slot>
          <q-btn
            dense
            color="primary"
            label="Save"
            icon-right="fas fa-check"
            :loading="saving"
            @click="emit('click:save', viewData)"
          />
        </q-form>
        <div class="q-pa-sm" v-else-if="viewMode === 'view'">
          <q-list separator>
            <q-item
              class="q-my-sm"
              clickable
              v-ripple
              @click="toggleDialog(viewData, 'doc')"
            >
              <q-item-section avatar>
                <q-avatar square color="primary" text-color="white">
                  <img :src="viewData.imageUrl" alt="Document" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>Click to expand</q-item-label>
              </q-item-section>
            </q-item>
            <q-item :key="field[0]" v-for="field in viewDataMap">
              <q-item-section>
                <q-item-label caption>
                  {{ field[0].slug().titleCase() }}
                </q-item-label>
                <q-item-label v-if="typeof field[1] === 'boolean'">
                  <q-chip
                    square
                    text-color="white"
                    :color="field[1] ? 'green' : 'red '"
                  >
                    {{ field[1] ? 'Approved' : 'Pending ' }}
                  </q-chip>
                </q-item-label>
                <q-item-label v-else>
                  {{ parser(field[1], field[0]) }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <slot name="list-append" :viewData="viewData"> </slot>
          </q-list>
          <slot name="list-after" :viewData="viewData"> </slot>
        </div>
        <div class="q-pa-sm flex flex-col q-gutter-sm justify-center" v-else>
          <q-btn
            dense
            color="primary"
            label="Return"
            icon="fas fa-arrow-left"
            @click="toggleDialog(viewData, 'view')"
          />
          <img style="width: 100%" :src="viewData.imageUrl" alt="Document" />
        </div>
      </div>
      <q-inner-loading :showing="loading" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { date } from 'quasar';
import { computed, ref, watch } from 'vue';

const emit = defineEmits<{
  (e: 'toggleDialog', data: any, mode: 'edit' | 'view' | 'doc'): void;
  (e: 'dataUpdated', data: any): void;
  (e: 'click:save', data: any): void;
}>();

const props = withDefaults(
  defineProps<{
    exclusions?: string[];
    formExclusions?: string[];
  }>(),
  {
    exclusions: () => ['id', 'user', 'imageUrl', 'createdAt', 'updatedAt'],
    formExclusions: () => ['id', 'user', 'imageUrl', 'createdAt', 'updatedAt'],
  },
);

const viewMode = ref<'edit' | 'view' | 'doc'>('view');
const viewData = ref<Record<string, any>>({});
const editDialogToggle = ref(false);

const loading = defineModel<any>('loading', {
  default: false,
});

const saving = defineModel<any>('saving', {
  default: false,
});

const form = defineModel<any>('form', {
  default: {},
});

const errors = defineModel<any>('errors', {
  default: {},
});

const viewDataMap = computed(
  () =>
    Object.entries(viewData.value).filter((e) => {
      if (viewMode.value === 'edit') {
        return ![...props.exclusions, ...props.formExclusions].includes(e[0]);
      } else {
        return !props.exclusions.includes(e[0]);
      }
    }) as Array<[string, string]>,
);

const toggleDialog = (data: any, mode: 'edit' | 'view' | 'doc' = 'view') => {
  viewData.value = data;
  viewMode.value = mode;
  editDialogToggle.value = true;

  const nData = Object.fromEntries(
    Object.entries(data).map(([key, val]) => [key.slug(), parser(val)]),
  );

  emit('toggleDialog', nData, mode);
};

const parser = (data: string | boolean | unknown, field?: string) => {
  if (field && field.includes('edAt', field.length - 4)) {
    return date.formatDate(String(data), 'Do MMM, YYYY h:MM A');
  }

  if (typeof data === 'boolean') {
    return Number(data);
  }

  if (
    Array.isArray(data) &&
    data.every((e) => typeof e === 'string') &&
    viewMode.value === 'view'
  ) {
    return data.join(', ').titleCase();
  }

  return data;
};

watch(
  viewData,
  (viewData) => {
    if (viewData) {
      emit('dataUpdated', viewData);
    }
  },
  {
    immediate: true,
  },
);
</script>

<style lang="scss" scoped>
.input-box.active-grey {
  border: 1px solid #d5d5d5;
  background-color: #f5f6fa;
  border-radius: 4px;
  padding: 5px;
}
</style>
