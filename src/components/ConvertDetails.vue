<template>
  <div class="q-mt-xl convertDet">
    <!-- {{ $router.currentRoute }} -->
    <q-table
      :rows="rows"
      :hide-header="mode === 'grid'"
      :columns="columns"
      class="sort_tables"
      row-key="id"
      :grid="mode == 'grid'"
      :filter="filter"
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:body-cell-user="props">
        <q-td :props="props">
          <div style="gap: 1rem" class="row q-mr-md no-wrap items-center">
            <img
              style="width: 36px; height: 36px"
              src="/images/image.svg"
              alt=""
            />
            <p>{{ props.row.user }}</p>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <span
            style="border-radius: 5px"
            :class="
              props.row.practice_id_status === 'Pending'
                ? 'bg-red-9 text-white q-pa-sm'
                : 'bg-green-7 text-white q-pa-sm'
            "
          >
            {{ props.row.status }}
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
import { api } from "src/boot/axios";
const columns = [
  {
    name: "user",
    required: true,
    label: "User",
    align: "left",
    field: "user",
    sortable: true,
  },
  {
    name: "order",
    required: true,
    label: "Order ID",
    align: "left",
    field: "order",
    sortable: true,
  },

  {
    name: "network",
    required: true,
    label: "Network",
    align: "left",
    field: "network",
    // field: (row, index) => console.log(row, index),
    sortable: true,
  },
  {
    name: "number",
    required: true,
    label: "Number",
    align: "left",
    field: "number",
    // field: (row, index) => console.log(row, index),
    sortable: true,
  },
  {
    name: "amount",
    required: true,
    label: "Amount",
    align: "left",
    field: "amount",
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

// const rows = ref([

// ])

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
          img: "/images/image.svg",
          user: "Adebisi Jamiu",
          network: "MTN",
          order: "trsgy2era",
          number: "08092342736",
          amount: "2500",
          status: "Approved",
        },
      ],
      errors: {},
      viewData: {},
      data: {},
      image: null,
      viewDialog: false,
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
      role: "users",
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

  mounted() {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });
  },
  methods: {
    onRequest(props) {
      // this.loading = true;
      // const url = `admin/all-health-personnel`;
      // this.curl = url;
      // api
      //   .get(url)
      //   .then(({ data }) => {
      //     console.log(data);
      //     this.loading = false;
      //     this.rows = data.user
      //       .map((data, index) => ({
      //         ...data,
      //         idd: index + 1,
      //       }))
      //       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      //       .splice(0, 5);
      //   })
      //   .catch(({ response }) => {
      //     // console.log(response);
      //     this.loading = false;
      //     this.rows = [];
      //   });
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
