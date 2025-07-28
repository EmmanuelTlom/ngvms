<template>
  <q-page class="dashboard q-pb-xl">
    <div class="container">
      <div class="q-mt-xl q-pt-xl">
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="id"
          title="CIP Conversion centers"
          :filter="filter"
          :loading="loading"
          @request="onRequest"
          v-model:pagination="pagination"
          class="my-sticky-last-column-table sort_tables"
        >
          <template v-slot:top-right="props">
            <q-input
              outlined
              dense
              debounce="300"
              v-model="filterTable"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-btn @click="filterUsers" color="secondary">
                  <q-icon name="search" />
                </q-btn>
                <q-btn
                  v-if="filterTable"
                  @click="cancelSearch"
                  color="red-7"
                  class="q-ml-md"
                >
                  <q-icon name="cancel" />
                </q-btn>
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

          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center text-negative q-gutter-sm">
              <span> {{ message }} </span>
            </div>
          </template>
        </q-table>

        <div class="row bottom_mover q-pa-md bg-white justify-center q-mt-lg">
          <q-pagination
            v-model="currentPage"
            :max="totalPages"
            :max-pages="7"
            boundary-numbers
            @update:model-value="onPageChange"
            class=""
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import axios from 'axios';
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
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'state',
    label: 'State',
    field: 'state',
    align: 'left',
    sortable: true,
  },
  {
    name: 'lga',
    label: 'LGA',
    field: 'lga',
    align: 'left',
    sortable: true,
  },
  {
    name: 'code',
    label: 'Code',
    field: 'code',
    align: 'left',
    sortable: true,
  },
  {
    name: 'address',
    label: 'Address',
    field: 'address',
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

const onPageChange = (page) => {
  onRequest(page);
};

let editID = ref('');
let editState = ref(false);

const cancelSearch = () => {
  filterTable.value = '';
  onRequest(1);
};

const onRequest = (page) => {
  loading.value = true;
  axios
    .get(
      `https://pcngi.com.ng/api/v1/conversion-centers?limit=50&page=${page ? page : 1}`,
      {
        headers: {
          'X-Api-Key': `HMOTryUhlqjqqVECjs2KUE83x0GccP3LgdSsYsaz0DrQy7`,
        },
      },
    )
    .then(({ data }) => {
      loading.value = false;
      console.log(data);
      rows.value = data.data;
      totalRows.value = data.meta.total;
    })
    .catch(({ response }) => {
      // console.log(response);
      loading.value = false;
      rows.value = [];
    });
};

const filterUsers = (page) => {
  filterRequest(filterTable.value);
};

const filterRequest = (filter) => {
  loading.value = true;
  axios
    .get(
      `https://pcngi.com.ng/api/v1/conversion-centers?limit=50&search=${filter}`,
      {
        headers: {
          'X-Api-Key': `HMOTryUhlqjqqVECjs2KUE83x0GccP3LgdSsYsaz0DrQy7`,
        },
      },
    )
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
