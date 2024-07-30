<template>
  <div class="q-mt-md">
    <q-table
      title="Tasks"
      :rows="rows"
      :hide-header="mode === 'grid'"
      :columns="columns"
      class="sort_tables coupon"
      row-key="id"
      :grid="mode == 'grid'"
      :filter="filter"
      :loading="loading"
      v-model:pagination="pagination"
      @request="onRequest"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <span
            :class="
              props.row.status === 'Successful' ? 'verified' : 'notverified '
            "
          >
            {{ props.row.status }}
          </span>
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
import { Dialog, exportFile, Loading, Notify, useMeta } from "quasar";
// import { api } from "src/boot/axios";
const columns = [
  {
    name: "ref",
    required: true,
    label: "Ref",
    align: "left",
    field: "ref",
    sortable: true,
  },
  {
    name: "amount",
    required: true,
    label: "Amount",
    align: "left",
    field: "amount",
    sortable: true,
  },

  {
    name: "sim_bal_before",
    required: true,
    label: "Sim Bal Before",
    align: "center",
    field: "sim_bal_before",
    // field: (row, index) => console.log(row, index),
    sortable: true,
  },
  {
    name: "sim_bal_after",
    required: true,
    label: "Sim Bal After",
    align: "left",
    field: "sim_bal_after",
    // field: (row, index) => console.log(row, index),
    sortable: true,
  },
  {
    name: "date",
    required: true,
    label: "Date",
    align: "left",
    field: "date",
    // field: (row, index) => console.log(row, index),
    sortable: true,
  },

  {
    name: "status",
    required: true,
    label: "Status",
    align: "left",
    field: "status",
    // field: (row, index) => console.log(row, index),
    sortable: true,
  },
];
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;
  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);
  formatted = formatted.split('"').join('""');
  return `"${formatted}"`;
}
export default {
  data() {
    return {
      columns,
      title: "",
      showCities: false,
      cities: [],
      guaPreview: "",
      preview: "",
      selected: [],
      rows: [
        {
          ref: "vftegcvdu",
          amount: "6,000",
          sim_bal_before: "6256.75",
          sim_bal_after: "256.75",
          date: "2/9/24",
          status: "Successful",
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
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
      filter: "",
      curl: "",
      separator: "",
      mode: "list",
      role: "personels",
      editId: "",
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
    "$route.params.id": {
      handler(to, from) {
        // console.log(to, from);
        if (this.$router.currentRoute.value.params.id === "all") {
          // console.log(this.$router.currentRoute.value.params.id);
          this.title = "All personnel";
        } else {
          this.title = this.$router.currentRoute.value.params.id;
        }
        this.onRequest();
      },
      immediate: true,
    },
  },

  mounted() {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });
  },
  methods: {
    onRequest(props) {},

    refreshPage() {
      if (this.curl !== "") {
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
          .catch(({ response }) => {
            // console.log(response);
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
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");
      const status = exportFile(`Members`, content, "text/csv");
      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
  },
};
</script>

<style scoped>
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
