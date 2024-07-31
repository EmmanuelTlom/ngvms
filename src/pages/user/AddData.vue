<template>
  <div class="container">
    <div class="q-mt-lg">
      <h4 class="dashboardmain_text">Add Data</h4>
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
                  :alt="form.identifier"
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
          <q-form @submit.prevent="send">
            <div class="grid">
              <div class="input_wrap">
                <label for="">NMDPRA</label>
                <div class="input">
                  <select v-model="form.certificate_center_id">
                    <option
                      :value="data.id"
                      :key="i"
                      v-for="(data, i) in everything.certificate_centers"
                    >
                      {{ data.name }}
                    </option>
                  </select>
                </div>
                <span class="error-message" v-if="errors.certificate_center_id">
                  {{ errors.certificate_center_id }}
                </span>
              </div>
              <div class="input_wrap">
                <label for="">Licensed CNG Filling Outlets</label>
                <div class="input">
                  <select v-model="form.filling_outlet_id">
                    <option
                      :value="data.id"
                      :key="i"
                      v-for="(data, i) in everything.filling_outlets"
                    >
                      {{ data.name }}
                    </option>
                  </select>
                </div>

                <span class="error-message" v-if="errors.filling_outlet_id">
                  {{ errors.filling_outlet_id }}
                </span>
              </div>
            </div>
            <div class="grid">
              <div class="input_wrap">
                <label for="">SON Approved Kit & Storage Dealership</label>
                <div class="input">
                  <select v-model="form.storage_dealership_id">
                    <option
                      :value="data.id"
                      :key="i"
                      v-for="(data, i) in everything.storage_dealerships"
                    >
                      {{ data.name }}
                    </option>
                  </select>
                </div>

                <span class="error-message" v-if="errors.storage_dealership_id">
                  {{ errors.storage_dealership_id }}
                </span>
              </div>
              <div class="input_wrap">
                <label for="">Unique Identifier</label>
                <div class="input">
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    v-model="form.identifier"
                  />
                </div>

                <span class="error-message" v-if="errors.identifier">
                  {{ errors.identifier }}
                </span>
              </div>
            </div>

            <div class="grid">
              <div class="input_wrap">
                <label for="">FRSC REG Verification</label>
                <div class="input">
                  <select v-model="form.verification_center_id">
                    <option
                      :value="data.id"
                      :key="i"
                      v-for="(data, i) in everything.verification_centers"
                    >
                      {{ data.name }}
                    </option>
                  </select>
                </div>

                <span
                  class="error-message"
                  v-if="errors.verification_center_id"
                >
                  {{ errors.verification_center_id }}
                </span>
              </div>
              <div class="input_wrap">
                <label for="">Financial Service Providers</label>
                <div class="input">
                  <select v-model="form.financial_service_provider_id">
                    <option
                      :value="data.id"
                      :key="i"
                      v-for="(
                        data, i
                      ) in everything.financial_service_providers"
                    >
                      {{ data.name }}
                    </option>
                  </select>
                </div>

                <span
                  class="error-message"
                  v-if="errors.financial_service_provider_id"
                >
                  {{ errors.financial_service_provider_id }}
                </span>
              </div>
            </div>
            <div class="input_wrap">
              <label for=""
                >NADDC(National Automotive Design & Development Council)
                Accredited Conversion Centers</label
              >
              <div class="input">
                <select v-model="form.conversion_center_id">
                  <option
                    :value="data.id"
                    :key="i"
                    v-for="(data, i) in everything.conversion_centers"
                  >
                    {{ data.name }}
                  </option>
                </select>
              </div>
              <span class="error-message" v-if="errors.conversion_center_id">
                {{ errors.conversion_center_id }}
              </span>
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
import { vehicleRequest, vehicleCreateRequest } from 'src/data/serviceRequests';
import { useBootstrapStore } from 'src/stores/bootstrap-store';
import { computed } from 'vue';
import placeholder from 'src/assets/image.png';
import { useRoute, useRouter } from 'vue-router';
import { RequestErrors } from 'app/repository/models';
import { notify } from 'src/utils/helpers';
import { date } from 'quasar';

const route = useRoute();
const router = useRouter();
const everything = computed(() => useBootstrapStore().everything);

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
  updateForm,
  loading: submiting,
} = useForm((form) => vehicleCreateRequest(form, route.params.data_id), {
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
    image: undefined,
    identifier: '',
    filling_outlet_id: 0,
    conversion_center_id: 0,
    storage_dealership_id: 0,
    certificate_center_id: 0,
    verification_center_id: 0,
    financial_service_provider_id: 0,
  },
}).onSuccess(({ data }) => {
  notify(data.message, data.status);
  router.replace({ name: route.name, params: { data_id: data.data.id } });
});

const { data } = useRequest(
  (id: string) =>
    vehicleRequest(id || route.params.data_id, {
      with: 'storageDealership,conversionCenter,fillingOutlet,financialServiceProvider,certificateCenter,verificationCenter',
    }),
  {
    immediate: !!route.params.data_id,
    initialData: {
      imageUrl: placeholder,
    },
  },
).onSuccess(({ data }) => {
  updateForm({
    identifier: data.identifier,
    filling_outlet_id: data.fillingOutlet?.id,
    conversion_center_id: data.conversionCenter?.id,
    storage_dealership_id: data.storageDealership?.id,
    certificate_center_id: data.certificateCenter?.id,
    verification_center_id: data.verificationCenter?.id,
    financial_service_provider_id: data.financialServiceProvider?.id,
  });
});
</script>

<style lang="scss" scoped></style>
