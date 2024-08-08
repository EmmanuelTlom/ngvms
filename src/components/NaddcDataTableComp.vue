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
  <q-dialog v-model="viewDocumentsDialog">
    <q-card class="card_img">
      <div class="q-pa-md">
        <div class="text-h6 text-weight-bold q-mb-sm">Documents</div>
        <q-list bordered>
          <q-item class="q-my-sm" clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                <img
                  v-if="isImage(viewData.application.passport)"
                  :src="
                    viewData.application.passport
                      ? viewData.application.passport
                      : '/images/worklogo.png'
                  "
                  alt=""
                />
                <div v-else class="text-white">pdf</div>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>Picture / Document</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn no-caps no-wrap color="primary">
                View
                <q-popup-proxy
                  cover
                  class="proxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <div class="proxy_div">
                    <template v-if="isImage(viewData.application.passport)">
                      <img :src="viewData.application.passport" alt="Image" />
                    </template>
                    <template v-else>
                      <iframe
                        width="100%"
                        height="500px"
                        :src="viewData.application.passport"
                        frameborder="0"
                      ></iframe>
                    </template>
                  </div>
                </q-popup-proxy>
              </q-btn>
            </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
      </div>
    </q-card>
  </q-dialog>
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
    name: 'certificate',
    required: true,
    label: 'Certificate License ID',
    align: 'left',
    field: 'certificate',
    sortable: true,
  },
  {
    name: 'center_name',
    required: true,
    label: 'Conversion center name',
    align: 'left',
    field: 'center_name',
    sortable: true,
  },
  {
    name: 'center_phone_number',
    required: true,
    label: 'Conversion center phone number',
    align: 'left',
    field: 'center_phone_number',
    sortable: true,
  },

  {
    name: 'center_address',
    required: true,
    label: 'Conversion center address',
    align: 'left',
    field: 'center_address',
    sortable: true,
  },
  {
    name: 'approval_officer',
    required: true,
    label: 'Approval Officer',
    align: 'left',
    field: 'approval_officer',
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
let isImage = (link) => {
  const extension = link.split('.').pop().toLowerCase();
  return ['jpg', 'jpeg', 'png'].includes(extension);
};
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;
  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted);
  formatted = formatted.split('"').join('""');
  return `"${formatted}"`;
}

let title = ref('');
let viewDocumentsDialog = ref(false);

let rows = ref([]);
let errors = ref({});
let viewData = ref({});

let pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 10,
});
let filter = ref('');
let loading = ref(false);

let separator = ref('');

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
