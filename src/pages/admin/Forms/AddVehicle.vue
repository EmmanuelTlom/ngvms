<template>
  <div class="container">
    <div class="q-mt-lg">
      <h4 class="dashboardmain_text">Add Vehicle</h4>
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
                <label for="">Vehicle Type</label>
                <div class="input">
                  <input type="text" placeholder="" v-model="form.type" />
                </div>

                <span class="error-message" v-if="errors.type">
                  {{ errors.type }}
                </span>
              </div>
              <div class="input_wrap">
                <label for="">Vehicle Make</label>
                <div class="input">
                  <input type="text" placeholder="" v-model="form.make" />
                </div>

                <span class="error-message" v-if="errors.make">
                  {{ errors.make }}
                </span>
              </div>
            </div>

            <div class="grid">
              <div class="input_wrap">
                <label for="">Vehicle Color</label>
                <div class="input">
                  <input type="text" placeholder="" v-model="form.color" />
                </div>

                <span class="error-message" v-if="errors.color">
                  {{ errors.color }}
                </span>
              </div>
              <div class="input_wrap">
                <label for="">Chasis Number</label>
                <div class="input">
                  <input
                    type="text"
                    placeholder=""
                    v-model="form.chasis_number"
                  />
                </div>

                <span class="error-message" v-if="errors.chasis_number">
                  {{ errors.chasis_number }}
                </span>
              </div>
            </div>

            <div class="grid">
              <div class="input_wrap">
                <label for="">Vehicle Weight (KG)</label>
                <div class="input">
                  <input type="number" placeholder="" v-model="form.weight" />
                </div>

                <span class="error-message" v-if="errors.weight">
                  {{ errors.weight }}
                </span>
              </div>
              <div class="input_wrap">
                <label for="">Insurance Policy</label>
                <div class="input">
                  <input
                    type="text"
                    placeholder=""
                    v-model="form.insurance_policy"
                  />
                </div>

                <span class="error-message" v-if="errors.insurance_policy">
                  {{ errors.insurance_policy }}
                </span>
              </div>
            </div>

            <div class="grid">
              <div class="input_wrap">
                <label for="">Registration Number</label>
                <div class="input">
                  <input
                    type="text"
                    placeholder=""
                    v-model="form.registration_number"
                  />
                </div>

                <span class="error-message" v-if="errors.registration_number">
                  {{ errors.registration_number }}
                </span>
              </div>
              <div class="input_wrap">
                <label for="">Inspection Officer Name</label>
                <div class="input">
                  <input
                    type="text"
                    placeholder=""
                    v-model="form.inspection_officer_name"
                  />
                </div>

                <span
                  class="error-message"
                  v-if="errors.inspection_officer_name"
                >
                  {{ errors.inspection_officer_name }}
                </span>
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
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, useRequest } from 'alova/client';
import ImageCropper from 'src/components/utilities/ImageCropper.vue';
import { vehicleRequest, vehicleCreateRequest } from 'src/data/adminRequests';
import { computed, ref, watch } from 'vue';
import placeholder from 'src/assets/image.png';
import { useRoute, useRouter } from 'vue-router';
import { RequestErrors } from 'app/repository/models';
import { notify } from 'src/utils/helpers';
import { date, Dialog, QForm } from 'quasar';

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
} = useForm((form) => vehicleCreateRequest(form, route.params.vehicle_id), {
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
    type: '',
    make: '',
    color: '',
    chasis_number: '',
    weight: '',
    insurance_policy: '',
    registration_number: '',
    inspection_officer_name: '',
  },
}).onSuccess(({ data }) => {
  notify(data.message, data.status);
  // router.replace({ name: route.name, params: { vehicle_id: data.data.id } });
  reset();
  Dialog.create({
    title: 'Submission Successful',
    message: `You have successfully added this data.`,
    cancel: true,
    ok: {
      push: true,
      label: 'Okay',
      color: 'green',
    },

    persistent: true,
  })
    .onOk(() => {})
    .onCancel(() => {
      router.go(-1);
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
});

const { data } = useRequest(
  (id: string) => vehicleRequest(id || route.params.vehicle_id, {}),
  {
    immediate: !!route.params.vehicle_id,
    initialData: {
      imageUrl: placeholder,
    },
  },
).onSuccess(({ data }) => {
  updateForm({
    make: data.make,
    type: data.type,
    color: data.color,
    chasis_number: data.chasisNumber,
    weight: data.weight,
    insurance_policy: data.insurancePolicy,
    registration_number: data.registrationNumber,
    inspection_officer_name: data.inspectionOfficerName,
  });
});

watch(
  () => route.params.vehicle_id,
  (id, oid) => {
    if (oid && !id) {
      reset();
      formRef.value?.resetValidation();
    }
  },
);
</script>

<style lang="scss" scoped></style>
