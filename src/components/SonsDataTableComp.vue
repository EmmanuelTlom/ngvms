<template>
  <div class="q-mt-md">
    <q-table
      :rows="rows"
      :hide-header="mode === 'grid'"
      :columns="columns"
      class="sort_tables"
      row-key="id"
      :grid="mode == 'grid'"
      :filter="filter"
      :loading="loading"
      v-model:pagination="pagination"
    >
      <template v-slot:body-cell-view="props">
        <q-td :props="props">
          <q-btn
            no-caps
            no-wrap
            @click="viewPictureOrDocument(props.row.picture)"
          >
            View picture or document
          </q-btn>
        </q-td>
      </template>
      <template v-slot:no-data="{ message }">
        <div class="full-width row flex-center text-negative q-gutter-sm">
          <span> {{ message }} </span>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { exportFile, Notify } from 'quasar';
import { ref } from 'vue';
const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    // field: (row, index) => console.log(row, index),
    sortable: true,
  },

  {
    name: 'picture',
    required: true,
    label: 'Picture or Document',
    align: 'left',
    field: 'picture',
    sortable: true,
  },
  {
    name: 'kits_serial_number',
    required: true,
    label: 'Kits serial number',
    align: 'left',
    field: 'kits_serial_number',
    sortable: true,
  },
  {
    name: 'tank_serial_number',
    required: true,
    label: 'CNG tank serial number',
    align: 'left',
    field: 'tank_serial_number',
    sortable: true,
  },

  {
    name: 'dealer',
    required: true,
    label: 'Dealer allocated to',
    align: 'left',
    field: 'dealer',
    sortable: true,
  },
  {
    name: 'importer',
    required: true,
    label: 'Importer',
    align: 'left',
    field: 'importer',
    sortable: true,
  },
  {
    name: 'manufacturer',
    required: true,
    label: 'Manufacturer',
    align: 'left',
    field: 'manufacturer',
    sortable: true,
  },
  {
    name: 'nameof_inspection_officers',
    required: true,
    label: 'Name of inspection officers',
    align: 'left',
    field: 'nameof_inspection_officers',
    sortable: true,
  },

  {
    name: 'view',
    required: true,
    label: 'View Picture',
    align: 'left',
    field: 'view',
    // field: (row, index) => console.log(row, index),
    sortable: true,
  },
];
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;
  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted);
  formatted = formatted.split('"').join('""');
  return `"${formatted}"`;
}

let rows = ref([]);
// let errors = ref({});
let viewData = ref({});

let pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 10,
});
let filter = ref('');
let loading = ref(false);

let refreshPage = () => {
  if (curl.value !== '') {
    loading.value = true;
    api
      .get(curl.value)
      .then(({ data }) => {
        loading.value = false;

        console.log(data);
      })
      .catch(() => {
        // console.log(response);
        loading.value = false;
        rows.value = [];
      });
  }
};
let viewPictureOrDocument = (rowData) => {
  viewData.value = rowData;
};

let exportTable = () => {
  // naive encoding to csv format
  const content = [columns.map((col) => wrapCsvValue(col.label))]
    .concat(
      rows.map((row) =>
        columns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === 'function'
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
            ),
          )
          .join(','),
      ),
    )
    .join('\r\n');
  const status = exportFile('Members', content, 'text/csv');
  if (status !== true) {
    Notify.create({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning',
    });
  }
};
</script>

<style scoped>
.error {
  color: red;
}

.verified {
  background: rgba(0, 182, 155, 0.3);
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0px;
  color: #00b69b;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-align: center;
}
.notverified {
  background: rgba(239, 56, 38, 0.2);
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ef3826;
  text-align: center;
}
</style>
