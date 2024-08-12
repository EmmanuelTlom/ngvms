<template>
  <div class="container">
    <div class="row items-center justify-between">
      <h4 class="dashboardmain_text">Users</h4>
      <div class="q-ml-md">
        <div class="search_inp">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input v-model="filter" type="text" placeholder="Search" />
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
          hide-pagination
          :rows="data"
          :columns="columns"
          class="sort_tables"
          row-key="id"
          :filter="filter"
          :loading="loading"
          v-model:pagination="pagination"
        >
          <template v-slot:body-cell-id="props">
            <q-td :props="props" v-intersection="onIntersction">
              <span>
                {{ props.rowIndex + 1 }}
              </span>
            </q-td>
          </template>

          <template v-slot:body-cell-firstname="props">
            <q-td :props="props">
              <UserCard
                hide-phone
                class="q-px-none"
                :person="props.row"
                v-if="props.row"
              />
            </q-td>
          </template>

          <template v-slot:body-cell-verified="props">
            <q-td :props="props">
              <q-chip
                size="xs"
                text-color="white"
                :color="props.row.verified ? 'green' : 'red '"
              >
                <q-checkbox
                  dense
                  size="xs"
                  :model-value="props.row.verified"
                  @update:model-value="
                    () => {
                      props.row.verified = !props.row.verified;
                      form = props.row;
                      viewData = props.row;
                      save();
                    }
                  "
                />
                &nbsp;
                {{ props.row.verified ? 'Verified' : 'Unverified ' }}
              </q-chip>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="flex no-wrap q-gutter-x-sm">
                <DataViewer
                  v-model:form="form"
                  v-model:errors="errors"
                  v-model:saving="submiting"
                  v-model:loading="loading"
                  :exclusions="[
                    'id',
                    'userData',
                    'imageUrl',
                    'updatedAt',
                    'lastAttempt',
                  ]"
                  :form-exclusions="[
                    'type',
                    'permissions',
                    'roles',
                    'createdAt',
                    'emailVerifiedAt',
                    'phoneVerifiedAt',
                  ]"
                  @click:save="save"
                  @dataUpdated="viewData = $event"
                  @toggleDialog="(e) => updateForm(e)"
                >
                  <template #default="{ toggleDialog }">
                    <q-btn
                      dense
                      color="info"
                      icon="fas fa-expand"
                      @click="toggleDialog(props.row, 'view')"
                    />
                    <q-btn
                      dense
                      color="primary"
                      icon="edit"
                      @click="toggleDialog(props.row, 'edit')"
                    />
                  </template>
                  <template #list-append="{ viewData }">
                    <UserCard
                      :title="`Submited at ${date.formatDate(viewData.createdAt, 'DD/MM/YYYY')} by:`"
                      :person="viewData.user"
                      v-if="viewData.user"
                    />
                  </template>
                  <template #form-append="{ form, errors }">
                    <div class="input_wrap">
                      <label class="q-mb-xs block"> User Type </label>
                      <q-select
                        outlined
                        hide-bottom-space
                        padding="none"
                        bg-color="sky-1"
                        v-model="form.type"
                        :option-label="(e: string) => e.toUpperCase()"
                        :options="[
                          'dealer',
                          'son',
                          'naddc',
                          'frsc',
                          'nmdpra',
                          'finance',
                          'insurance',
                        ]"
                        :error="!!errors.type"
                        :error-message="errors.type"
                      />
                    </div>
                    <div
                      class="input_wrap"
                      :key="option"
                      v-for="option in ['roles', 'permissions']"
                    >
                      <label class="q-mb-xs block">
                        Admin {{ option.ucfirst() }}
                      </label>
                      <q-select
                        outlined
                        multiple
                        hide-bottom-space
                        padding="none"
                        bg-color="sky-1"
                        v-model="form[option]"
                        :option-label="(e: string) => e.titleCase()"
                        :options="
                          option === 'roles' ? adminRoles : adminPermissions
                        "
                        :error="!!errors[option]"
                        :error-message="errors[option]"
                      >
                        <template
                          v-slot:option="{
                            itemProps,
                            opt,
                            selected,
                            toggleOption,
                          }"
                        >
                          <q-item v-bind="itemProps">
                            <q-item-section>
                              <q-item-label>{{ opt.titleCase() }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-checkbox
                                :model-value="selected"
                                @update:model-value="toggleOption(opt)"
                              />
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                  </template>
                </DataViewer>
                <ContentRemover
                  dense
                  base-url="/v1/admin/users"
                  :id="props.value"
                  :list="data"
                  v-if="!iCan(undefined, props.row)"
                />
              </div>
            </q-td>
          </template>
          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center text-negative q-gutter-sm">
              <span> {{ message }} </span>
            </div>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { exportFile, QTableProps, Notify, date } from 'quasar';
import { useForm, usePagination } from 'alova/client';
import { userCreateRequest, usersRequest } from 'src/data/adminRequests';
import html2pdf from 'html2pdf.js';
import ContentRemover from 'src/components/utilities/ContentRemover.vue';
import { RequestErrors, UserData, UserType, User } from 'app/repository/models';
import { notify } from 'src/utils/helpers';
import UserCard from 'src/components/utilities/UserCard.vue';
import DataViewer from 'src/components/utilities/DataViewer.vue';
import { arrayObjectUpdater, iCan, printArea } from 'src/utils/proccessor';
import { adminPermissions, adminRoles } from 'app/repository/configs';

const filter = ref('');
const content = ref<HTMLElement | null>(null);
const viewData = ref<User>({} as User);

const pagination = ref({
  rowsPerPage: 30,
});

const onIntersction = (e: IntersectionObserverEntry): boolean => {
  if (loading.value || isLastPage.value || !e.isIntersecting) return false;

  page.value++;
  return true;
};

const errors = computed(
  () => (error.value as unknown as RequestErrors)?.errors || {},
);

const {
  form,
  send: save,
  error,
  updateForm,
  loading: submiting,
} = useForm((form) => userCreateRequest(form, String(viewData.value.id)), {
  store: {
    enable: true,
    serializers: {
      file: {
        forward: (data) => (data instanceof File ? data.name : undefined),
        backward: () => undefined,
      },
    },
  },
  initialForm: {
    name: '',
    type: <UserType>'dealer',
    about: '',
    email: '',
    phone: '',
    role_ids: [],
    verified: false,
    username: '',
    permission_ids: [],
    lastname: '',
    firstname: '',
    data: <UserData>{},
  },
}).onSuccess(({ data: dat }) => {
  notify(dat.message, dat.status);
  arrayObjectUpdater(data.value, dat.data);
});

const { data, page, loading, isLastPage, onSuccess } = usePagination(
  (page, limit) =>
    usersRequest({
      page,
      limit,
      with: 'permissions,privileges',
      search: filter.value,
    }),
  {
    append: true,
    total: (e) => e.meta?.total,
    initialData: { data: [] },
    initialPageSize: 30,
    watchingStates: [filter],
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
    name: 'firstname',
    required: true,
    label: 'Info',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'type',
    required: true,
    label: 'Type',
    align: 'left',
    field: 'type',
    sortable: true,
    classes: 'text-capitalize',
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
    name: 'verified',
    required: true,
    label: 'Verified',
    align: 'center',
    field: 'verified',
    sortable: true,
  },
  {
    name: 'actions',
    classes: 'print-hide',
    headerClasses: 'print-hide',
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
  const element = content.value.cloneNode(true) as HTMLElement;
  element.querySelectorAll('.print-hide').forEach((el) => {
    (el as HTMLElement).style.display = 'none';
  });
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
  printArea(content.value as HTMLElement);
};
</script>

<style lang="scss" scoped>
.card_img {
  min-width: 550px;
}

.input-box.active-grey {
  border: 1px solid #d5d5d5;
  background-color: #f5f6fa;
  border-radius: 4px;
  padding: 5px;
}
</style>
