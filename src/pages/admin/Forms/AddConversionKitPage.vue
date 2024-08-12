<template>
  <div class="container">
    <div class="q-mt-lg">
      <h4 class="dashboardmain_text">Add Conversion Kit</h4>
    </div>

    <div class="add_manager">
      <div class="container">
        <ImageCropper
          :aspect-ratio="3 / 4"
          :buttons="{ cancel: 'Cancel', crop: 'Accept' }"
          @result="setFile"
        >
          <template #default="{ open, dataURL }">
            <div class="column justify-center items-center">
              <div style="width: 5em">
                <q-img
                  :ratio="3 / 4"
                  position="center center"
                  :src="dataURL || data.imageUrl"
                  :alt="data.name"
                />
              </div>
              <q-btn
                flat
                size="sm"
                label="Upload Image"
                class="q-mt-sm"
                @click="open"
              />
            </div>
          </template>
        </ImageCropper>

        <div class="dash_inputs q-mt-md">
          <q-form ref="formRef" @submit.prevent="send">
            <div class="grid">
              <div class="input_wrap">
                <label for="">Name</label>
                <div class="input">
                  <input
                    required
                    type="text"
                    placeholder=""
                    v-model="form.name"
                  />
                </div>

                <span class="error-message" v-if="errors.name">
                  {{ errors.name }}
                </span>
              </div>

              <div class="input_wrap">
                <label for="">Manufacturer</label>
                <div class="input">
                  <input
                    required
                    type="text"
                    placeholder=""
                    v-model="form.manufacturer"
                  />
                </div>

                <span class="error-message" v-if="errors.manufacturer">
                  {{ errors.manufacturer }}
                </span>
              </div>
            </div>

            <div class="input_wrap">
              <label for="">Serial Number</label>
              <div class="input">
                <input
                  required
                  type="text"
                  placeholder=""
                  v-model="form.serial_number"
                />
              </div>

              <span class="error-message" v-if="errors.serial_number">
                {{ errors.serial_number }}
              </span>
            </div>

            <div class="input_wrap">
              <label for="">Description</label>
              <div class="input">
                <input
                  required
                  type="text"
                  placeholder=""
                  v-model="form.description"
                />
              </div>

              <span class="error-message" v-if="errors.description">
                {{ errors.description }}
              </span>
            </div>

            <div
              class="text-grey-3 q-pa-md input_wrap"
              style="border: solid 1px"
            >
              <label for="">Supplied Centers</label>
              <div class="input_wrap">
                <div class="q-gutter-xs row truncate-chip-labels">
                  <ConversionCenterSelector
                    required
                    outlined
                    hide-bottom-space
                    padding="none"
                    bg-color="sky-1"
                    v-model="form.supplied_centers_ids"
                  />
                  <q-chip
                    dense
                    square
                    removable
                    color="primary"
                    text-color="white"
                    :key="i"
                    :label="typeof item !== 'number' ? item?.name : item"
                    :title="typeof item !== 'number' ? item?.name : item"
                    @update:model-value="form.supplied_centers_ids.splice(i, 1)"
                    v-for="(item, i) in form.supplied_centers_ids"
                  />
                </div>

                <span class="error-message" v-if="errors.supplied_centers_ids">
                  {{ errors.supplied_centers_ids }}
                </span>
              </div>
            </div>

            <div
              class="text-grey-3 q-pa-md input_wrap"
              style="border: solid 1px"
            >
              <label for="">Importer</label>
              <div class="">
                <div class="grid">
                  <div class="input_wrap">
                    <label for="">Fullname</label>
                    <div class="input">
                      <input
                        required
                        type="text"
                        placeholder=""
                        autocomplete="name"
                        :name="`importer.name`"
                        v-model="form.importer.name"
                      />
                    </div>

                    <span class="error-message" v-if="errors[`importer.name`]">
                      {{ errors[`importer.name`] }}
                    </span>
                  </div>

                  <div class="input_wrap">
                    <label for="">Phone Number</label>
                    <div class="input">
                      <input
                        required
                        type="text"
                        placeholder=""
                        autocomplete="tel"
                        :name="`importer.phone`"
                        v-model="form.importer.phone"
                      />
                    </div>

                    <span class="error-message" v-if="errors[`importer.phone`]">
                      {{ errors[`importer.phone`] }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="row q-mt-lg justify-center items-center">
              <q-btn
                class="bg-secondary text-white q-px-xl"
                flat
                no-caps
                no-wrap
                type="submit"
                :loading="submiting"
                :disable="!editable"
              >
                Submit
              </q-btn>
            </div>

            <p class="text-red q-mt-md text-weight-bold text-center">
              Data editing can only function within the first 24 hours of data
              upload
            </p>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, useRequest } from 'alova/client';
import ImageCropper from 'src/components/utilities/ImageCropper.vue';
import {
  conversionKitCreateRequest,
  conversionKitRequest,
} from 'src/data/adminRequests';
import { computed, ref, watch } from 'vue';
import placeholder from 'src/assets/image.png';
import { useRoute, useRouter } from 'vue-router';
import {
  ConversionCenter,
  PersonForm,
  RequestErrors,
} from 'app/repository/models';
import { notify } from 'src/utils/helpers';
import { date, QForm } from 'quasar';
import ConversionCenterSelector from 'src/components/utilities/ConversionCenterSelector.vue';

const route = useRoute();
const router = useRouter();
const formRef = ref<QForm>();

const errors = computed(
  () => (error.value as unknown as RequestErrors)?.errors || {},
);

const editable = computed(
  () =>
    !data.value?.id ||
    date.getDateDiff(new Date(), new Date(data.value.createdAt), 'hours') <= 24,
);

const setFile = ({ file }: { file: File }) => {
  form.value.image = file;
};

const {
  form,
  send,
  error,
  reset,
  updateForm,
  loading: submiting,
} = useForm((form) => conversionKitCreateRequest(form, route.params.kit_id), {
  store: {
    enable: true,
    serializers: {
      file: {
        forward: (data) => (data instanceof File ? data.name : undefined),
        backward: () => undefined,
      },
    },
  },
  initialForm: {
    image: <File | undefined>undefined,
    name: '',
    description: '',
    manufacturer: '',
    importer: <PersonForm>{},
    supplied_centers_ids: <ConversionCenter[] | number[]>[],
    serial_number: '',
  },
}).onSuccess(({ data }) => {
  notify(data.message, data.status);
  router.replace({
    name: route.name,
    params: { kit_id: data.data.id },
  });
});

const { data } = useRequest(
  (id: string) =>
    conversionKitRequest(id || route.params.kit_id, {
      with: 'importer',
    }),
  {
    immediate: !!route.params.kit_id,
    initialData: {
      imageUrl: placeholder,
    },
  },
).onSuccess(({ data }) => {
  updateForm({
    name: data.name,
    description: data.description,
    manufacturer: data.manufacturer,
    importer: <PersonForm>{
      email: data.importer?.email,
      name: data.importer?.name,
    },
    supplied_centers_ids: data.suppliedCenters,
    serial_number: data.serialNumber,
  });
});

watch(
  () => route.params.kit_id,
  (id, oid) => {
    if (oid && !id) {
      reset();
      formRef.value?.resetValidation();
    }
  },
);
</script>

<style lang="scss">
.truncate-chip-labels > .q-chip {
  max-width: 140px;
}
</style>
