<template>
  <div class="container">
    <div class="q-mt-lg">
      <h4 class="dashboardmain_text">Add Refueling Station</h4>
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
                  position="center center"
                  :ratio="3 / 4"
                  :src="dataURL || data.imageUrl"
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
            <div class="input_wrap">
              <label for="">License Number</label>
              <div class="input">
                <input
                  required
                  type="text"
                  placeholder=""
                  v-model="form.license_number"
                />
              </div>

              <span class="error-message" v-if="errors.license_number">
                {{ errors.license_number }}
              </span>
            </div>

            <div class="grid">
              <div class="input_wrap">
                <label class="">State</label>
                <div class="input">
                  <select v-model="form.state" required class="">
                    <option value="" disabled>Select state</option>
                    <option
                      v-for="state in nigeriaStates"
                      :key="state.name"
                      :value="state.name"
                    >
                      {{ state.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="input_wrap">
                <label class="">LGA</label>
                <div class="input">
                  <select v-model="form.lga" required class="">
                    <option value="" disabled>Select LGA</option>
                    <option
                      v-for="lga in nigeriaStates.find(
                        (s) => s.name === form.state,
                      )?.lgas || []"
                      :key="lga"
                      :value="lga"
                    >
                      {{ lga }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="input_wrap">
              <label for="">Address</label>
              <div class="input">
                <input
                  required
                  type="text"
                  placeholder=""
                  v-model="form.address"
                />
              </div>

              <span class="error-message" v-if="errors.address">
                {{ errors.address }}
              </span>
            </div>

            <div class="grid">
              <div class="input_wrap">
                <label for="">Email Address</label>
                <div class="input">
                  <input
                    required
                    type="text"
                    placeholder=""
                    v-model="form.email"
                  />
                </div>

                <span class="error-message" v-if="errors.email">
                  {{ errors.email }}
                </span>
              </div>

              <div class="input_wrap">
                <label for="">Phone Number</label>
                <div class="input">
                  <input
                    required
                    type="text"
                    placeholder=""
                    v-model="form.phone"
                  />
                </div>

                <span class="error-message" v-if="errors.phone">
                  {{ errors.phone }}
                </span>
              </div>
            </div>

            <div
              class="text-grey-3 q-pa-md input_wrap"
              style="border: solid 1px"
            >
              <label for="">Inspection Officers</label>
              <div class="">
                <q-btn
                  dense
                  outline
                  no-caps
                  no-wrap
                  color="blue"
                  icon-right="add"
                  :loading="submiting"
                  :disable="!editable"
                  @click="
                    form.inspection_officers.push({
                      name: '',
                      phone: '',
                      email: '',
                    })
                  "
                >
                  Add
                </q-btn>
              </div>
              <div
                class=""
                :key="o"
                v-for="(officer, o) in form.inspection_officers"
              >
                <div class="grid">
                  <div class="input_wrap">
                    <label for="">Fullname</label>
                    <div class="input">
                      <input
                        required
                        type="text"
                        placeholder=""
                        autocomplete="name"
                        :name="`inspection_officers.${o}.name`"
                        v-model="form.inspection_officers[o].name"
                      />
                    </div>

                    <span
                      class="error-message"
                      v-if="errors[`inspection_officers.${o}.name`]"
                    >
                      {{ errors[`inspection_officers.${o}.name`] }}
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
                        :name="`inspection_officers.${o}.phone`"
                        v-model="form.inspection_officers[o].phone"
                      />
                    </div>

                    <span
                      class="error-message"
                      v-if="errors[`inspection_officers.${o}.phone`]"
                    >
                      {{ errors[`inspection_officers.${o}.phone`] }}
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
  fillingOutletRequest,
  fillingOutletCreateRequest,
} from 'src/data/serviceRequests';
import { computed, ref, watch } from 'vue';
import placeholder from 'src/assets/image.png';
import { useRoute, useRouter } from 'vue-router';
import { PersonForm, RequestErrors } from 'app/repository/models';
import { notify } from 'src/utils/helpers';
import { date, Dialog, QForm } from 'quasar';
import PlaceSelector from 'src/components/utilities/PlaceSelector.vue';
import nigeriaStates from 'src/utils/stateHelper';

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
} = useForm(
  (form) => fillingOutletCreateRequest(form, route.params.station_id),
  {
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
      lga: '',
      email: '',
      phone: '',
      state: '',
      address: '',
      license_number: '',
      inspection_officers: <PersonForm[]>[],
    },
  },
).onSuccess(({ data }) => {
  notify(data.message, data.status);
  // router.replace({ name: route.name, params: { station_id: data.data.id } });
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
  (id: string) =>
    fillingOutletRequest(id || route.params.station_id, {
      with: 'inspection_officers',
    }),
  {
    immediate: !!route.params.station_id,
    initialData: {
      imageUrl: placeholder,
    },
  },
).onSuccess(({ data }) => {
  updateForm({
    lga: data.lga,
    email: data.email,
    phone: data.phone,
    state: data.state,
    address: data.address,
    license_number: data.licenseNumber,
    inspection_officers: data.inspectionOfficers.map((e) => ({
      id: e.id,
      name: e.name,
      phone: e.phone,
      email: e.email,
    })),
  });
});

watch(
  () => route.params.station_id,
  (id, oid) => {
    if (oid && !id) {
      reset();
      formRef.value?.resetValidation();
    }
  },
);
</script>
