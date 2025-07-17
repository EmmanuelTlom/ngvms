<template>
  <q-page class="dashboard q-pb-xl">
    <div class="container">
      <div class="q-mt-xl q-pt-xl">
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="id"
          title="Pump Sales"
          :filter="filter"
          :loading="loading"
          @request="onRequest"
          v-model:pagination="pagination"
          class="my-sticky-last-column-table sort_tables"
        >
          <template v-slot:top-right="props">
            <!-- <q-btn
              no-caps
              no-wrap
              outline
              class="bg-white q-mr-sm"
              @click="createFuelPumpersModal = !createFuelPumpersModal"
            >
              Create Pumper
            </q-btn> -->
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
                <!-- <q-btn
                  round
                  dense
                  color="negative"
                  size="sm"
                  icon="delete"
                  @click="deletePumper(props.row)"
                >
                </q-btn>
                <q-btn
                  round
                  dense
                  class="q-ml-sm"
                  color="green"
                  size="sm"
                  icon="edit"
                  @click="toggleEditPumper(props.row)"
                >
                </q-btn> -->
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

    <q-dialog v-model="createFuelPumpersModal">
      <div class="q-card add_manager">
        <div class="q-mt-lg">
          <h4 class="dashboardmain_text">
            {{ editState ? 'Edit' : 'Create' }} Pumper
          </h4>
        </div>
        <form @submit.prevent="addPumper">
          <div class="grid">
            <div class="input_wrap">
              <label for="">Pumpers Name</label>
              <div class="input">
                <input
                  required
                  type="text"
                  placeholder=""
                  v-model="form.pumpers_name"
                />
              </div>

              <span class="error-message" v-if="errors.pumpers_name">
                {{ errors.pumpers_name }}
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
            <label for="">Email</label>
            <div class="input">
              <input required type="text" placeholder="" v-model="form.email" />
            </div>

            <span class="error-message" v-if="errors.email">
              {{ errors.email }}
            </span>
          </div>
          <div class="auth">
            <div class="input-box last active-grey">
              <label class="input-label">Password</label>
              <div class="row items-center justify-between no-wrap">
                <input
                  v-model="form.password"
                  class="input-1"
                  autocomplete="current-password"
                  :type="togglePassword ? 'password' : 'text'"
                />
                <q-btn @click="togglePassword = !togglePassword" flat>
                  <i class="fa-regular fa-eye-slash"></i>
                </q-btn>
              </div>
            </div>
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
let createFuelPumpersModal = ref(false);
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
const togglePassword = ref(true);
const totalPages = computed(() =>
  Math.ceil(totalRows.value / pagination.value.rowsPerPage),
);

const bookings = ref([]);

const columns = [
  {
    name: 'amount',
    label: 'Amount',
    field: 'amount',
    align: 'left',
    sortable: true,
  },
  {
    name: 'quantity',
    label: 'Quantity',
    field: (row) => `${row.quantity} KG`,
    align: 'left',
    sortable: true,
  },
  {
    name: 'user',
    label: 'Pumpers Name',
    field: (row) => `${row?.user?.name}`,
    align: 'left',
    sortable: true,
  },
  {
    name: 'user',
    label: 'Pumpers Email',
    field: (row) => `${row?.user?.email}`,
    align: 'left',
    sortable: true,
  },
  {
    name: 'user',
    label: 'Pumpers Phone',
    field: (row) => `${row?.user?.phone}`,
    align: 'left',
    sortable: true,
  },

  {
    name: 'createdAt',
    label: 'Date',
    field: (row) =>
      new Date(row.createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    align: 'left',
    sortable: true,
  },

  // {
  //   name: 'action',
  //   label: 'Action',
  //   field: 'action',
  //   align: 'left',
  //   sortable: true,
  // },
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
    .get('admin/pump-sales')
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

const toggleEditPumper = (category) => {
  console.log(category);
  editState.value = true;
  editID.value = category.id;
  form.value = {
    pumpers_name: category.pumpers_name,
    phone_number: category.phone_number,
    email: category.email,
    nin: category.nin,
  };

  createFuelPumpersModal.value = true;
};
const deletePumper = (category) => {
  console.log(category);
  Dialog.create({
    title: 'Are you sure you want to delete this pumper?',
  }).onOk(() => {
    loading.value = true;
    api
      .delete(`admin/pump-sales/${category.id}`)
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

const addPumper = () => {
  if (editState.value) {
    const formData = new FormData();

    // Append core registration fields
    formData.append('name', form.value.name);
    formData.append('email', form.value.email);
    formData.append('phone', form.value.phone);
    formData.append('password', form.value.password);

    formData.append('type', 'dealer');
    formData.append('accept', 1);
    formData.append(`pump_metadata[nin]`, form.value.nin);
    loadingSubmit.value = true;
    api
      .put(`admin/pump-sales/${editID.value}`, formData)
      .then((response) => {
        console.log(response);
        Notify.create({
          message: response.data.message,
          color: 'green',
          position: 'top',
          actions: [{ icon: 'close', color: 'white' }],
        });
        loadingSubmit.value = false;
        createFuelPumpersModal.value = false;
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
    loadingSubmit.value = true;
    const formData = new FormData();

    // Append core registration fields
    formData.append('name', form.value.name);
    formData.append('email', form.value.email);
    formData.append('phone', form.value.phone);
    formData.append('password', form.value.password);

    formData.append('type', 'dealer');
    formData.append('accept', 1);
    formData.append(`pump_metadata[nin]`, form.value.nin);
    api
      .post(`admin/pump-sales`, formData)
      .then((response) => {
        console.log(response);
        Notify.create({
          message: response.data.message,
          color: 'green',
          position: 'top',
          actions: [{ icon: 'close', color: 'white' }],
        });
        loadingSubmit.value = false;
        createFuelPumpersModal.value = false;
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

const onRequest = (page) => {
  loading.value = true;
  api
    .get('admin/pump-sales?with=user')
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
