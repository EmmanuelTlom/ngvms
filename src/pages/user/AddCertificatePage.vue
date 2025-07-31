<template>
  <div class="container">
    <div class="q-mt-lg">
      <h4 class="dashboardmain_text">Add Certificate</h4>
    </div>

    <div class="add_manager">
      <div class="q-my-lg row items-center justify-end">
        <q-btn
          no-caps
          no-wrap
          color="primary"
          @click="addDealerDialog = !addDealerDialog"
        >
          Add New Dealer
        </q-btn>
      </div>
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
              <label for="">Dealer</label>
              <div class="input">
                <select v-model="form.dealer_id">
                  <option
                    v-for="(user, index) in usersArr"
                    :key="index"
                    :value="user.id"
                  >
                    {{ user.fullName }}
                  </option>
                </select>
              </div>
              <small class="text-red">
                If you do not find the right dealer for your data entry please
                click the add dealer button to add the dealer.
              </small>
              <!-- <UserSelector
                square
                required
                outlined
                hide-bottom-space
                padding="none"
                bg-color="sky-1"
                v-model="form.dealer_id"
                :error="!!errors.importer"
                :error-message="errors.importer"
              /> -->
            </div>

            <div class="grid">
              <div class="input_wrap">
                <label for="">Importer</label>
                <div class="input">
                  <input
                    required
                    type="text"
                    placeholder=""
                    v-model="form.importer"
                  />
                </div>

                <span class="error-message" v-if="errors.importer">
                  {{ errors.importer }}
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
              <label for="">Kit Serial Number</label>
              <div class="input">
                <input
                  required
                  type="text"
                  placeholder=""
                  v-model="form.kit_serial_number"
                />
              </div>

              <span class="error-message" v-if="errors.kit_serial_number">
                {{ errors.kit_serial_number }}
              </span>
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
          </q-form>
        </div>
      </div>
    </div>
    <q-dialog v-model="addDealerDialog">
      <q-card class="add_manager">
        <h4 class="text-weight-bold">Add Dealer</h4>
        <div class="dash_inputs">
          <form @submit.prevent="addDealer">
            <div class="grid">
              <div class="input_wrap">
                <label for="">Name</label>
                <div class="input">
                  <input
                    required
                    type="text"
                    placeholder=""
                    v-model="dealerData.name"
                  />
                </div>

                <span class="error-message" v-if="reqErrors.name">
                  {{ reqErrors.name[0] }}
                </span>
              </div>
              <div class="input_wrap">
                <label for="">Email</label>
                <div class="input">
                  <input
                    required
                    type="email"
                    placeholder=""
                    v-model="dealerData.email"
                  />
                </div>

                <span class="error-message" v-if="reqErrors.email">
                  {{ reqErrors.email[0] }}
                </span>
              </div>
            </div>

            <div class="input_wrap">
              <label for="">Phone</label>
              <div class="input">
                <input
                  required
                  type="text"
                  placeholder=""
                  v-model="dealerData.phone"
                />
              </div>

              <span class="error-message" v-if="reqErrors.phone">
                {{ reqErrors.phone[0] }}
              </span>
            </div>
            <div class="grid">
              <div class="input_wrap">
                <label for="">Password</label>
                <div class="input">
                  <input
                    required
                    type="password"
                    placeholder=""
                    v-model="dealerData.password"
                  />
                </div>

                <span class="error-message" v-if="reqErrors.password">
                  {{ reqErrors.password[0] }}
                </span>
              </div>

              <div class="input_wrap">
                <label for="">Password Confirmation</label>
                <div class="input">
                  <input
                    required
                    type="password"
                    placeholder=""
                    v-model="dealerData.password_confirmation"
                  />
                </div>

                <span
                  class="error-message"
                  v-if="reqErrors.password_confirmation"
                >
                  {{ reqErrors.password_confirmation[0] }}
                </span>
              </div>
            </div>
            <div class="submit_btn row justify-center q-mt-lg q-mb-lg">
              <q-btn
                no-caps
                no-wrap
                type="submit"
                :loading="loading"
                flat
                class="full-width bg-secondary review_small bold text-white"
              >
                Submit
              </q-btn>
            </div>
          </form>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { useForm, useRequest } from 'alova/client';
import ImageCropper from 'src/components/utilities/ImageCropper.vue';
import {
  certificateCreateRequest,
  certificateRequest,
} from 'src/data/serviceRequests';
import { computed, onMounted, ref, watch } from 'vue';
import placeholder from 'src/assets/image.png';
import { useRoute, useRouter } from 'vue-router';
import { PersonForm, RequestErrors } from 'app/repository/models';
import { notify } from 'src/utils/helpers';
import { date, Dialog, QForm } from 'quasar';
import UserSelector from 'src/components/utilities/UserSelector.vue';
import { api } from 'src/boot/axios';

const route = useRoute();
const router = useRouter();
const formRef = ref<QForm>();
const usersArr = ref<any>([]);
let addDealerDialog = ref<boolean>(false);
let loading = ref<boolean>(false);
const dealerData = ref<any>({});
let reqErrors = ref<any>({});

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

const getUsers = () => {
  api
    .get('users')
    .then((response) => {
      console.log(response);
      usersArr.value = response.data.data.filter(
        (user: any) => user.type === 'dealer',
      );
    })
    .catch(({ response }) => {
      // console.log(response);
    });
};

const {
  form,
  send,
  error,
  reset,
  updateForm,
  loading: submiting,
} = useForm(
  (form) => certificateCreateRequest(form, route.params.certificate_id),
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
      importer: '',
      dealer_id: 0,
      manufacturer: '',
      kit_serial_number: '',
      inspection_officers: <PersonForm[]>[],
    },
  },
).onSuccess(({ data }) => {
  notify(data.message, data.status);
  // router.replace({
  //   name: route.name,
  //   params: { certificate_id: data.data.id },
  // });
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
    certificateRequest(id || route.params.certificate_id, {
      with: 'inspection_officers,dealer',
    }),
  {
    immediate: !!route.params.certificate_id,
    initialData: {
      imageUrl: placeholder,
    },
  },
).onSuccess(({ data }) => {
  updateForm({
    importer: data.importer,
    dealer_id: data.dealer?.id,
    manufacturer: data.manufacturer,
    kit_serial_number: data.kitSerialNumber,
    inspection_officers: data.inspectionOfficers.map((e) => ({
      id: e.id,
      name: e.name,
      phone: e.phone,
      email: e.email,
    })),
  });
});

const addDealer = async () => {
  try {
    loading.value = true;
    const res = await api.post('user/dealer', {
      ...dealerData.value,
      accept: 1,
      type: 'dealer',
    });
    console.log(res);
    loading.value = false;
    dealerData.value = {};
    Dialog.create({
      title: 'Dealer Added Successfully',
      message: `Dealer data successfully added.`,
      cancel: true,
      ok: {
        push: true,
        label: 'Okay',
        color: 'green',
      },

      persistent: true,
    })
      .onOk(() => {
        addDealerDialog.value = false;
        getUsers();
      })
      .onCancel(() => {
        addDealerDialog.value = false;
        getUsers();
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  } catch (errors: any) {
    console.log(errors);
    loading.value = false;
    reqErrors.value = errors.response.data.errors;
  }
};

watch(
  () => route.params.certificate_id,
  (id, oid) => {
    if (oid && !id) {
      reset();
      formRef.value?.resetValidation();
    }
  },
);

onMounted(() => {
  getUsers();
});
</script>
