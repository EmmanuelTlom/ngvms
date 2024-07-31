<template>
  <div class="q-mt-md">
    <q-table
      :rows="rows"
      :hide-header="mode === 'grid'"
      :columns="columns"
      class="sort_tables coupon net"
      row-key="id"
      :grid="mode == 'grid'"
      :filter="filter"
      :loading="loading"
      v-model:pagination="pagination"
      @request="onRequest"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div style="gap: 1rem" class="row enable_btns items-center no-wrap">
            <q-btn class="enable" flat> Enable </q-btn>
            <q-btn class="disable" flat> Disable </q-btn>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <router-link to="">
            <span class="text-secondary"> Edit Network </span>
          </router-link>
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

<script>
import { exportFile } from 'quasar';
// import { api } from "src/boot/axios";
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Network Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'ussd',
    required: true,
    label: 'USSD code',
    align: 'left',
    field: 'ussd',
    sortable: true,
  },

  {
    name: 'actions',
    required: true,
    label: '',
    align: 'left',
    field: 'actions',
    // field: (row, index) => console.log(row, index),
    sortable: true,
  },
  {
    name: 'status',
    required: true,
    label: '',
    align: 'left',
    field: 'status',
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
export default {
  data() {
    return {
      columns,
      title: '',
      showCities: false,
      cities: [],
      guaPreview: '',
      preview: '',
      selected: [],
      rows: [
        {
          name: 'AIRTEL',
          ussd: '99',
        },
      ],
      errors: {},
      viewData: {},
      data: {},
      image: null,
      viewDialog: false,
      create_memberDialog: false,
      editstate: false,
      pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
      filter: '',
      curl: '',
      separator: '',
      mode: 'list',
      role: 'personels',
      editId: '',
      loading: false,
      loaders: {
        delete: false,
        category: false,
        deleteBtn: [],
        save: [],
      },
    };
  },

  mounted() {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });
  },
  methods: {
    refreshPage() {},

    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.rows.map((row) =>
            this.columns
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
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning',
        });
      }
    },
  },
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
