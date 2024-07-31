<template>
  <div class="q-mt-md container">
    <q-table
      hide-pagination
      title="History"
      class="sort_tables coupon"
      row-key="id"
      :rows="data"
      :loading="loading"
      :columns="columns"
      v-model:pagination="pagination"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <span
            :class="props.row.status === 'Opened' ? 'verified' : 'notverified '"
          >
            {{ props.row.status }}
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
              :to="{ name: 'user.add.data', params: { data_id: props.value } }"
            />
            <ContentRemover
              dense
              base-url="/v1/user/vehicles"
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
            alt=""
          />
          <span class="text-black review_big"> {{ message }} </span>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from 'alova/client';
import { date, QTableProps } from 'quasar';
import ContentRemover from 'src/components/utilities/ContentRemover.vue';
import { vehiclesRequest } from 'src/data/serviceRequests';
import { ref } from 'vue';

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
    label: 'S/N',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'identifier',
    required: true,
    label: 'Identifier',
    align: 'left',
    field: 'identifier',
    sortable: true,
  },
  {
    name: 'verification_center_id',
    required: true,
    label: 'Verification Center',
    align: 'left',
    field: (row) => row.verificationCenter.name,
    sortable: true,
  },
  {
    name: 'storage_dealership_id',
    required: true,
    label: 'Kit & Storage Dealership',
    align: 'left',
    field: (row) => row.storageDealership.name,
    sortable: true,
  },

  {
    name: 'financial_service_provider_id',
    required: true,
    label: 'Financial Service Providers',
    align: 'center',
    field: (row) => row.financialServiceProvider.name,
    sortable: true,
  },
  {
    name: 'filling_outlet_id',
    required: true,
    label: 'Filling Outlet',
    align: 'left',
    field: (row) => row.fillingOutlet.name,
    sortable: true,
  },
  {
    name: 'date',
    required: true,
    label: 'Date',
    align: 'left',
    field: (row) => row.conversionCenter.name,
    sortable: true,
  },
  {
    name: 'certificate_center_id',
    required: true,
    label: 'NMDPRA',
    align: 'left',
    field: (row) => row.certificateCenter.name,
    sortable: true,
  },
  {
    name: 'createdAt',
    required: true,
    label: 'Added On',
    align: 'left',
    field: (row) => date.formatDate(row.createdAt, 'DD MMM YYYY'),
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
