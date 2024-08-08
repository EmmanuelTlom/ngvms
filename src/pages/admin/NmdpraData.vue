<template>
  <div class="container">
    <div class="row items-center justify-between">
      <h4 class="dashboardmain_text">NMDPRA's Data</h4>
      <div class="q-ml-md">
        <div class="search_inp">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
      </div>
    </div>
    <div class="row q-mt-lg justify-end">
      <q-btn-dropdown
        no-caps
        color="primary"
        label="Export"
        style="
          min-height: auto;
          padding: 5px 10px;
          border-radius: 8px;
          border-image-source: none;
        "
        no-wrap
        class="text-white btn-primary text-weight-bold"
      >
        <q-list>
          <q-item clickable v-close-popup @click="exportTable">
            <q-item-section>
              <q-item-label
                ><i class="q-mr-sm ri-download-cloud-line"></i> Export
                Excel</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="exportToPdf">
            <q-item-section>
              <q-item-label>
                <i class="q-mr-sm ri-download-cloud-line"></i>Export
                PDF</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="printPageFCN">
            <q-item-section>
              <q-item-label>
                <i class="ri-printer-line q-mr-sm"></i>Print</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <div ref="content" class="stats_hold q-mt-md">
      <div class="q-mt-md">
        <q-table
          :rows="data"
          :hide-header="mode === 'grid'"
          :columns="columns"
          class="sort_tables"
          row-key="id"
          :grid="mode == 'grid'"
          :filter="filter"
          :loading="loading"
          v-model:pagination="pagination"
        >
          <template v-slot:body-cell-cng_refueling_stations="props">
            <q-td :props="props">
              <p>
                <span>{{ vehicle.license_number }}, {{ vehicle.state }}</span>
              </p>
            </q-td>
          </template>
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
                          <img
                            :src="viewData.application.passport"
                            alt="Image"
                          />
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { exportFile, QTableProps, Notify } from 'quasar';
import { usePagination } from 'alova/client';
import { vehiclesRequest } from 'src/data/serviceRequests';
import html2pdf from 'html2pdf.js';

const content = ref<HTMLElement | null>(null);

// let rows = ref([]);
/* eslint-disable @typescript-eslint/no-explicit-any */
// type FormatFunction = (val: any) => string;

// interface Row {
//   [key: string]: any;
// }
const pagination = ref({
  rowsPerPage: 30,
});

const { data, loading, onSuccess } = usePagination(
  (page, limit) =>
    vehiclesRequest({
      page,
      limit,
      with: 'storageDealership,conversionCenter,fillingOutlet,financialServiceProvider,certificateCenter,verificationCenter',
    }),
  {
    append: true,
    total: (e) => e.meta?.total,
    initialData: { data: [] },
    initialPageSize: 30,
  },
);

onSuccess(({ data }) => {
  pagination.value.rowsPerPage = data.meta?.total as number;
});

const columns: QTableProps['columns'] = [
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
    name: 'document',
    required: true,
    label: 'Document',
    align: 'left',
    field: 'document',
    sortable: true,
  },
  {
    name: 'cng_refueling_stations',
    required: true,
    label: 'CNG refueling stations',
    align: 'left',
    field: 'cng_refueling_stations',
    sortable: true,
  },
  {
    name: 'inspection_officers',
    required: true,
    label: 'Name of inspection officers',
    align: 'left',
    field: 'inspection_officers',
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

function wrapCsvValue(
  val: string,
  /* eslint-disable @typescript-eslint/no-explicit-any */
  formatFn?: (val: any, row: any) => any,
): string {
  const formatted = formatFn !== void 0 ? formatFn(val, undefined) : val;

  if (formatted === void 0 || formatted === null) {
    return '';
  } else if (typeof formatted === 'object') {
    return formatted.name;
  } else {
    return String(formatted);
  }
}

function exportTable(): void {
  if (columns) {
    const content = [columns.slice(0, -1).map((col) => wrapCsvValue(col.label))]
      .concat(
        data.value.map((row?: any) =>
          columns
            .map((col) => {
              const field = col.field;
              if (typeof field === 'function') {
                return wrapCsvValue(field(row), col.format);
              } else if (row && typeof field === 'string') {
                return wrapCsvValue(row[field], col.format);
              } else {
                return ''; // Handle case where field is undefined
              }
            })
            .join(','),
        ),
      )
      .join('\r\n');

    const status = exportFile('History', content, 'text/csv');
    if (status !== true) {
      Notify.create({
        message: 'Browser denied file download...',
        color: 'negative',
        icon: 'warning',
      });
    }
  }
}

const exportToPdf = (): void => {
  if (!content.value) {
    console.error('Content element not found');
    return;
  }
  const element = content.value as HTMLElement;
  // Select sections to omit from the PDF using querySelectorAll
  // const sectionsToOmit = element.querySelectorAll('.omit-from-pdf');

  // Hide sections that should not be included in the PDF
  // sectionsToOmit.forEach((section) => {
  //   (section as HTMLElement).classList.add('hidden');
  // });

  // PDF generation options
  const opt = {
    margin: 0.5,
    filename: 'History.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      // Revert hidden sections after PDF generation
      console.log('PDF export successful:');
      // sectionsToOmit.forEach((section) => {
      //   (section as HTMLElement).classList.remove('hidden');
      // });
    })
    .catch((err: Error) => {
      console.error('PDF export error:', err.message);
      // sectionsToOmit.forEach((section) => {
      //   (section as HTMLElement).classList.remove('hidden');
      // });
    });
};
const printPageFCN = () => {
  window.print();
};
</script>

<style lang="scss" scoped></style>
