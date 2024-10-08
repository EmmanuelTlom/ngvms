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
      <template v-slot:body-cell-fullname="props">
        <q-td :props="props">
          <span>
            {{ props.row.fullName }}
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <span class="text-secondary">
            {{ props.row.view }}
          </span>
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

<script>
import { exportFile } from 'quasar';
// import { api } from "src/boot/axios";
const columns = [
  {
    name: 'referees_bonus',
    required: true,
    label: 'Refrees Bonus',
    align: 'left',
    field: 'referees_bonus',
    sortable: true,
  },
  {
    name: 'transaction_limit',
    required: true,
    label: 'Transaction Limit',
    align: 'left',
    field: 'transaction_limit',
    sortable: true,
  },

  {
    name: 'view',
    required: true,
    label: 'Action',
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
      organizations: [],
      states: [],
      rows: [
        {
          referees_bonus: '5000',
          transaction_limit: 'MINIMUM_BONUS_RATE',
          view: '....',
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
  watch: {
    '$route.params.id': {
      handler() {
        // console.log(to, from);
        if (this.$router.currentRoute.value.params.id === 'all') {
          // console.log(this.$router.currentRoute.value.params.id);
          this.title = 'All personnel';
        } else {
          this.title = this.$router.currentRoute.value.params.id;
        }
      },
      immediate: true,
    },
  },
  methods: {
    refreshPage() {
      if (this.curl !== '') {
        this.loading = true;
        this.$api
          .get(this.curl)
          .then(({ data }) => {
            this.loading = false;
            this.rows = data.user.map((data, index) => ({
              ...data,
              idd: index + 1,
            }));
            // console.log(data);
          })
          .catch(() => {
            this.loading = false;
            this.rows = [];
          });
      }
    },

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
