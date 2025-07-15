<template>
  <q-page class="dashboard q-pb-xl">
    <div class="container">
      <div class="q-mt-xl q-pt-xl">
        <!-- <div class="row q-mb-md items-center justify-between">
          <h6 class="text-weight-bold">Conversions</h6>

          <div style="gap: 1rem" class="row items-center no-wrap">
            <q-btn
              :to="{ name: 'create.conversion' }"
              no-caps
              no-wrap
              outline
              class="bg-white"
            >
              Create Conversion
            </q-btn>
          </div>
        </div> -->

        <q-table
          :rows="rows"
          :columns="columns"
          row-key="id"
          title="Conversions"
          :filter="filter"
          :loading="loading"
          @request="onRequest"
          v-model:pagination="pagination"
          class="my-sticky-last-column-table sort_tables"
        >
          <template v-slot:top-right="props">
            <q-btn
              no-caps
              no-wrap
              outline
              class="bg-white q-mr-sm"
              @click="createConversionModal = !createConversionModal"
            >
              Create Conversion
            </q-btn>
            <!-- <q-btn
              class="q-mr-sm"
              no-caps
              no-wrap
            >
              Create Conversion
            </q-btn> -->
            <q-input
              outlined
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <!-- <q-btn @click="filterUsers" color="secondary">
                  <q-icon name="search" />
                </q-btn>
                <q-btn
                  v-if="filterTable"
                  @click="cancelSearch"
                  color="red-7"
                  class="q-ml-md"
                >
                  <q-icon name="cancel" />
                </q-btn> -->
              </template>
            </q-input>

            <q-btn
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              v-if="mode === 'list'"
            >
              <q-tooltip :disable="$q.platform.is.mobile">
                {{
                  props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'
                }}
              </q-tooltip>
            </q-btn>
          </template>
          <template v-slot:body-cell-fullName="props">
            <q-td :props="props">
              <span>
                <router-link class="text-black" to="">
                  {{ props.row.fullName }}
                </router-link>
              </span>
            </q-td>
          </template>
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <span :class="props.row.status"> {{ props.row.status }}</span>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div>
                <q-btn
                  round
                  dense
                  color="negative"
                  size="sm"
                  icon="delete"
                  @click="deleteConversion(props.row)"
                >
                </q-btn>
                <q-btn
                  round
                  dense
                  class="q-ml-sm"
                  color="green"
                  size="sm"
                  icon="edit"
                  @click="toggleEditConversions(props.row)"
                >
                </q-btn>
              </div>
            </q-td>
          </template>

          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center text-negative q-gutter-sm">
              <span> {{ message }} </span>
            </div>
          </template>
        </q-table>

        <!-- <div class="row bottom_mover q-pa-md bg-white justify-center q-mt-lg">
          <q-pagination
            v-model="currentPage"
            :max="totalPages"
            :max-pages="7"
            boundary-numbers
            @update:model-value="onPageChange"
            class=""
          />
        </div> -->
      </div>
    </div>

    <q-dialog v-model="createConversionModal">
      <div class="q-card add_manager">
        <div class="q-mt-lg">
          <h4 class="dashboardmain_text">
            {{ editState ? 'Edit' : 'Create' }} Conversion
          </h4>
        </div>
        <form @submit.prevent="addConversion">
          <div class="grid">
            <div class="input_wrap">
              <label for="">Owners Name</label>
              <div class="input">
                <input
                  required
                  type="text"
                  placeholder=""
                  v-model="form.owners_name"
                />
              </div>

              <span class="error-message" v-if="errors.owners_name">
                {{ errors.owners_name }}
              </span>
            </div>

            <div class="input_wrap">
              <label for="">Phone Number</label>
              <div class="input">
                <input
                  required
                  type="text"
                  placeholder=""
                  v-model="form.phone_number"
                />
              </div>

              <span class="error-message" v-if="errors.phone_number">
                {{ errors.phone_number }}
              </span>
            </div>
          </div>
          <div class="grid">
            <div class="input_wrap">
              <label for="">NIN</label>
              <div class="input">
                <input required type="text" placeholder="" v-model="form.nin" />
              </div>

              <span class="error-message" v-if="errors.nin">
                {{ errors.nin }}
              </span>
            </div>

            <div class="input_wrap">
              <label for="">VIN/Chasis Number</label>
              <div class="input">
                <input required type="text" placeholder="" v-model="form.vin" />
              </div>

              <span class="error-message" v-if="errors.vin">
                {{ errors.vin }}
              </span>
            </div>
          </div>
          <div class="grid">
            <div class="input_wrap">
              <label for="">Vehicle type</label>
              <div class="input">
                <input
                  required
                  type="text"
                  placeholder="Toyota"
                  v-model="form.vehicle_type"
                />
              </div>

              <span class="error-message" v-if="errors.vehicle_type">
                {{ errors.vehicle_type }}
              </span>
            </div>

            <div class="input_wrap">
              <label for="">Vehicle model</label>
              <div class="input">
                <input
                  required
                  type="text"
                  placeholder="2025"
                  v-model="form.vehicle_model"
                />
              </div>

              <span class="error-message" v-if="errors.vehicle_model">
                {{ errors.vehicle_model }}
              </span>
            </div>
          </div>
          <div class="grid">
            <div class="input_wrap">
              <label for="">Vehicle registration number</label>
              <div class="input">
                <input
                  required
                  type="text"
                  placeholder="ECE 394 HJ"
                  v-model="form.vehicle_reg_number"
                />
              </div>

              <span class="error-message" v-if="errors.vehicle_reg_number">
                {{ errors.vehicle_reg_number }}
              </span>
            </div>

            <div class="input_wrap">
              <label for="">Vehicle color</label>
              <div class="input">
                <input
                  required
                  type="text"
                  placeholder="red"
                  v-model="form.vehicle_color"
                />
              </div>

              <span class="error-message" v-if="errors.vehicle_color">
                {{ errors.vehicle_color }}
              </span>
            </div>
          </div>
          <div class="grid">
            <div class="input_wrap">
              <label for="">Engine Size</label>
              <div class="input">
                <input
                  required
                  type="text"
                  placeholder=""
                  v-model="form.engine_size"
                />
              </div>

              <span class="error-message" v-if="errors.engine_size">
                {{ errors.engine_size }}
              </span>
            </div>

            <div class="input_wrap">
              <label for="">Date of conversion</label>
              <div class="input">
                <input
                  required
                  type="date"
                  placeholder=""
                  v-model="form.date_of_conversion"
                />
              </div>

              <span class="error-message" v-if="errors.date_of_conversion">
                {{ errors.date_of_conversion }}
              </span>
            </div>
          </div>
          <div class="grid">
            <div class="input_wrap">
              <label for="">Kit serial number</label>
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

            <div class="input_wrap">
              <label for="">Year of manufacture</label>
              <div class="input">
                <input
                  required
                  type="text"
                  placeholder=""
                  v-model="form.year_of_manufacture"
                />
              </div>

              <span class="error-message" v-if="errors.year_of_manufacture">
                {{ errors.year_of_manufacture }}
              </span>
            </div>
          </div>
          <div class="input_wrap">
            <label for="">Conversion center address</label>
            <div class="input">
              <textarea
                v-model="form.conversion_center_address"
                cols="30"
                rows="5"
              ></textarea>
            </div>

            <span class="error-message" v-if="errors.conversion_center_address">
              {{ errors.conversion_center_address }}
            </span>
          </div>

          <div>
            <q-btn
              no-wrap
              no-caps
              type="submit"
              :loading="loadingSubmit"
              class="q-mt-md full-width text-white q-pa-sm bg-secondary"
            >
              Save
            </q-btn>
          </div>
        </form>
      </div>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';

import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
let router = useRouter();
let pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 50,
});
let filter = ref('');
const filterTable = ref('');
let loading = ref(false);
let loadingSubmit = ref(false);
let createConversionModal = ref(false);
let pageByCenter = ref(false);
let curl = ref('');
let separator = ref('');
let mode = ref('list');
const selectedCenter = ref('');
const form = ref({});
let selected = ref([]);
const conversionCenterArr = ref([]);
let conversionCenterOptions = [];
let statsData = ref({});
let errors = ref({});
let selectedStatus = ref('All');
const currentPage = ref(1);
const rowsPerPage = 50; // Or whatever your backend returns
const totalRows = ref(0);

const totalPages = computed(() =>
  Math.ceil(totalRows.value / pagination.value.rowsPerPage),
);

const bookings = ref([]);

const columns = [
  {
    name: 'owners_name',
    label: 'Owners name',
    field: 'owners_name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'nin',
    label: 'NIN',
    field: 'nin',
    align: 'left',
    sortable: true,
  },
  {
    name: 'phone_number',
    label: 'Phone number',
    field: 'phone_number',
    align: 'left',
    sortable: true,
  },
  {
    name: 'vin',
    label: 'VIN/Chassis number',
    field: 'vin',
    align: 'left',
    sortable: true,
  },
  {
    name: 'kit_serial_number',
    label: 'Kit serial number',
    field: 'kit_serial_number',
    align: 'left',
    sortable: true,
  },
  {
    name: 'engine_size',
    label: 'Engine size',
    field: 'engine_size',
    align: 'left',
    sortable: true,
  },
  {
    name: 'vehicle_reg_number',
    label: 'Vehicle registration number',
    field: 'vehicle_reg_number',
    align: 'left',
    sortable: true,
  },
  {
    name: 'vehicle_model',
    label: 'Vehicle model',
    field: 'vehicle_model',
    align: 'left',
    sortable: true,
  },
  {
    name: 'vehicle_color',
    label: 'Vehicle color',
    field: 'vehicle_color',
    align: 'left',
    sortable: true,
  },
  {
    name: 'vehicle_type',
    label: 'Vehicle type',
    field: 'vehicle_type',
    align: 'left',
    sortable: true,
  },
  {
    name: 'year_of_manufacture',
    label: 'Year of  manufacture',
    field: 'year_of_manufacture',
    align: 'left',
    sortable: true,
  },
  {
    name: 'date_of_conversion',
    label: 'Date of conversion',
    field: (row) =>
      new Date(row.date_of_conversion).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    align: 'left',
    sortable: true,
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'left',
    sortable: true,
  },
  {
    name: 'totalAmountDue',
    label: 'Amount',
    field: 'totalAmountDue',
    field: (row) => `NGN${row.totalAmountDue}`,
    align: 'right',
    sortable: true,
  },
  {
    name: 'action',
    label: 'Action',
    field: 'action',
    align: 'left',
    sortable: true,
  },
];

let rows = ref([]);

const clearFilter = () => {
  selectedStatus.value = 'All';
};

const filterFn = (val, update) => {
  if (val === '') {
    update(() => {
      conversionCenterArr.value = conversionCenterOptions;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    conversionCenterArr.value = conversionCenterOptions.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1,
    );
  });
};

const refreshPage = () => {
  loading.value = true;
  api
    .get('admin/conversions')
    .then(({ data }) => {
      console.log(data);
      loading.value = false;
      rows.value = data.data;
    })
    .catch(({ response }) => {
      console.log(response);
      loading.value = false;
      rows.value = [];
    });
};

let editID = ref('');
let editState = ref(false);

const toggleEditConversions = (category) => {
  console.log(category);
  editState.value = true;
  editID.value = category.id;
  form.value = {
    owners_name: category.owners_name,
    phone_number: category.phone_number,
    vehicle_reg_number: category.vehicle_reg_number,
    nin: category.nin,
    vin: category.vin,
    vehicle_type: category.vehicle_type,
    vehicle_model: category.vehicle_model,
    vehicle_color: category.vehicle_color,
    engine_size: category.engine_size,
    date_of_conversion: category.date_of_conversion,
    conversion_center_address: category.conversion_center_address,
    kit_serial_number: category.kit_serial_number,
    year_of_manufacture: category.year_of_manufacture,
  };

  createConversionModal.value = true;
};
const deleteConversion = (category) => {
  console.log(category);
  Dialog.create({
    title: 'Are you sure you want to delete this conversion?',
  }).onOk(() => {
    loading.value = true;
    api
      .delete(`admin/conversions/${category.id}`)
      .then((response) => {
        console.log(response);
        loading.value = false;
        refreshPage();
      })
      .catch((response) => {
        console.log(response);
        loading.value = false;
      });
  });
};

const addConversion = () => {
  if (editState.value) {
    const dataa = {
      ...form.value,
    };
    loadingSubmit.value = true;
    api
      .put(`admin/conversions/${editID.value}`, dataa)
      .then((response) => {
        console.log(response);
        Notify.create({
          message: response.data.message,
          color: 'green',
          position: 'top',
          actions: [{ icon: 'close', color: 'white' }],
        });
        loadingSubmit.value = false;
        createConversionModal.value = false;
        editState.value = false;
        refreshPage();
      })
      .catch(({ response }) => {
        loadingSubmit.value = false;
        console.log(response);
        errors.value = response.data.errors;
        Notify.create({
          message: response.data.message,
          color: 'red',
          position: 'bottom',
          actions: [{ icon: 'close', color: 'white' }],
        });
      });
  } else {
    const dataa = {
      ...form.value,
    };

    loadingSubmit.value = true;
    api
      .post(`admin/conversions`, dataa)
      .then((response) => {
        console.log(response);
        Notify.create({
          message: response.data.message,
          color: 'green',
          position: 'top',
          actions: [{ icon: 'close', color: 'white' }],
        });
        loadingSubmit.value = false;
        createConversionModal.value = false;
        refreshPage();
      })
      .catch(({ response }) => {
        loadingSubmit.value = false;
        console.log(response);
        errors.value = response?.data?.errors;
        Notify.create({
          message: response.data.message,
          color: 'red',
          position: 'bottom',
          actions: [{ icon: 'close', color: 'white' }],
        });
      });
  }
};
// const addConversion = () => {
//   const dataa = {
//     ...form.value,
//   };

//   loadingSubmit.value = true;
//   api
//     .post(`admin/conversions`, dataa)
//     .then((response) => {
//       console.log(response);
//       Notify.create({
//         message: response.data.message,
//         color: 'green',
//         position: 'top',
//         actions: [{ icon: 'close', color: 'white' }],
//       });
//       loadingSubmit.value = false;
//       createConversionModal.value = false;
//       refreshPage();
//     })
//     .catch(({ response }) => {
//       loadingSubmit.value = false;
//       console.log(response);
//       errors.value = response?.data?.errors;
//       Notify.create({
//         message: response.data.message,
//         color: 'red',
//         position: 'bottom',
//         actions: [{ icon: 'close', color: 'white' }],
//       });
//     });
// };

const onRequest = (page) => {
  loading.value = true;
  api
    .get('admin/conversions')
    .then(({ data }) => {
      loading.value = false;
      console.log(data);
      rows.value = data.data;
    })
    .catch(({ response }) => {
      // console.log(response);
      loading.value = false;
      rows.value = [];
    });
};

onMounted(() => {
  onRequest();
});
</script>

<style lang="sass"></style>
