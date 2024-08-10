<template>
  <div class="q-mt-md container">
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
    <div ref="content">
      <q-table
        hide-pagination
        title="Vehicles"
        class="sort_tables coupon"
        row-key="id"
        :rows="data"
        :loading="loading"
        :columns="columns"
        v-model:pagination="pagination"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <span :class="props.row.status ? 'verified' : 'notverified '">
              {{ props.row.status ? 'Approved' : 'Pending ' }}
            </span>
          </q-td>
        </template>

        <template v-slot:body-cell-id="props">
          <q-td :props="props" v-intersection="onIntersction">
            <span>
              {{ props.key }}
            </span>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div class="flex no-wrap q-gutter-x-sm">
              <q-btn
                dense
                color="primary"
                :icon="
                  date.getDateDiff(
                    new Date(),
                    new Date(props.row.createdAt),
                    'hours',
                  ) > 24
                    ? 'fas fa-expand'
                    : 'edit'
                "
                :to="{
                  name: 'user.add.center',
                  params: { center_id: props.value },
                }"
              />
              <ContentRemover
                dense
                base-url="/v1/user/conversion-centers"
                :disable="
                  date.getDateDiff(
                    new Date(),
                    new Date(props.row.createdAt),
                    'hours',
                  ) > 24
                "
                :id="props.value"
                :list="data"
              />
            </div>
          </q-td>
        </template>

        <template v-slot:no-data="{ message }">
          <div
            class="full-width q-mt-sm column flex-center text-negative q-gutter-sm"
          >
            <img
              style="width: 78px; height: 78px; opacity: 0.3px"
              src="/images/coupon.png"
              class="omit-from-pdf"
              alt=""
            />
            <span class="text-black review_big"> {{ message }} </span>
          </div>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { exportFile, QTableProps, date, Notify } from 'quasar';
import { usePagination } from 'alova/client';
import ContentRemover from 'src/components/utilities/ContentRemover.vue';
import { conversionCentersRequest } from 'src/data/serviceRequests';
import html2pdf from 'html2pdf.js';

const content = ref<HTMLElement | null>(null);

const pagination = ref({
  rowsPerPage: 30,
});

const onIntersction = (e: IntersectionObserverEntry): boolean => {
  if (loading.value || isLastPage.value || !e.isIntersecting) return false;

  page.value++;
  return true;
};
const { data, page, loading, isLastPage, onSuccess } = usePagination(
  (page, limit) =>
    conversionCentersRequest({
      page,
      limit,
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
    label: 'S/N',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'license_number',
    required: true,
    label: 'License Number',
    align: 'left',
    field: 'licenseNumber',
    sortable: true,
  },
  {
    name: 'email',
    required: true,
    label: 'Email',
    align: 'left',
    field: 'email',
    sortable: true,
  },
  {
    name: 'createdAt',
    required: true,
    label: 'Added On',
    align: 'left',
    field: (row) => date.formatDate(row.createdAt, 'DD/MM/YYYY'),
    sortable: true,
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'center',
    field: 'status',
    sortable: true,
  },
  {
    name: 'actions',
    required: true,
    label: 'Actions',
    align: 'left',
    field: 'id',
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
