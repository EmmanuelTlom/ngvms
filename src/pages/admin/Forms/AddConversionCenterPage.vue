<template>
  <div class="container">
    <div class="q-mt-lg">
      <h4 class="dashboardmain_text">Add Conversion Center</h4>
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
                <label for="">Certification license ID</label>
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

            <div
              class="text-grey-3 q-pa-md input_wrap"
              style="border: solid 1px"
            >
              <label for="">Approval officer</label>
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
                        :name="`officer.name`"
                        v-model="form.officer.name"
                      />
                    </div>

                    <span class="error-message" v-if="errors[`officer.name`]">
                      {{ errors[`officer.name`] }}
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
                        :name="`officer.phone`"
                        v-model="form.officer.phone"
                      />
                    </div>

                    <span class="error-message" v-if="errors[`officer.phone`]">
                      {{ errors[`officer.phone`] }}
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
  conversionCenterCreateRequest,
  conversionCenterRequest,
} from 'src/data/adminRequests';
import { computed, ref, watch } from 'vue';
import placeholder from 'src/assets/image.png';
import { useRoute, useRouter } from 'vue-router';
import { PersonForm, RequestErrors } from 'app/repository/models';
import { notify } from 'src/utils/helpers';
import { date, QForm } from 'quasar';

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
  (form) => conversionCenterCreateRequest(form, route.params.center_id),
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
      name: '',
      email: '',
      phone: '',
      address: '',
      license_number: '',
      officer: <PersonForm>{ name: '', email: '' },
    },
  },
).onSuccess(({ data }) => {
  notify(data.message, data.status);
  router.replace({
    name: route.name,
    params: { center_id: data.data.id },
  });
});

const { data } = useRequest(
  (id: string) =>
    conversionCenterRequest(id || route.params.center_id, {
      with: 'officer',
    }),
  {
    immediate: !!route.params.center_id,
    initialData: {
      imageUrl: placeholder,
    },
  },
).onSuccess(({ data }) => {
  updateForm({
    name: data.name,
    email: data.email,
    phone: data.phone,
    officer: data.officer,
    address: data.address,
    license_number: data.licenseNumber,
  });
});

watch(
  () => route.params.center_id,
  (id, oid) => {
    if (oid && !id) {
      reset();
      formRef.value?.resetValidation();
    }
  },
);
</script>
