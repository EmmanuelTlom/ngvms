<template>
  <div class="container">
    <div class="add_manager q-px-none overflow-hidden">
      <q-layout
        view="hHh Lpr lff"
        container
        :style="`min-height: ${$q.screen.lt.sm ? '100vh' : '80vh'}`"
      >
        <q-drawer
          :model-value="$q.screen.gt.xs"
          :width="200"
          :breakpoint="500"
          bordered
          show-if-above
        >
          <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
            <q-list padding>
              <q-item
                v-ripple
                clickable
                active-class="bg-grey-3"
                :active="group.key === activeGroup.key"
                :key="group.key"
                @click="activeGroup = group"
                v-for="group in groups"
              >
                <q-item-section avatar>
                  <i :class="group.icon"></i>
                </q-item-section>

                <q-item-section> {{ group.label }} </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-drawer>

        <q-page-container class="relative">
          <div class="fixed-top z-top bg-white">
            <q-tabs
              dense
              inline-label
              :model-value="activeGroup.key"
              v-if="$q.screen.lt.sm"
            >
              <q-tab
                dense
                :class="{
                  'bg-grey-3 text-primary': activeGroup.key === group.key,
                }"
                :name="group.key"
                :key="group.key"
                @click="activeGroup = group"
                v-for="group in groups"
              >
                <i :class="group.icon"></i> &nbsp;
                <q-item-label>{{ group.label }}</q-item-label>
              </q-tab>
            </q-tabs>
          </div>
          <q-page
            class="q-px-lg q-pb-md"
            :class="{ 'q-pt-xl': $q.screen.lt.sm }"
            v-if="activeGroup.key === 'main'"
          >
            <div class="column justify-center items-center">
              <img
                style="width: 80px; height: 80px; object-fit: contain"
                v-if="!profile_imageValue"
                src="/images/logo.svg"
              />
              <img
                style="width: 80px; height: 80px; object-fit: contain"
                v-else
                :src="(() => profile_imageValue as string)()"
              />
              <q-file
                @update:model-value="setFile"
                accept=".jpg,.png,.svg,.jpeg"
                label="Upload Logo"
                outlined
                class="authUpload"
                v-model="data.profile_image"
              />
            </div>

            <div class="dash_inputs q-mt-md">
              <q-form @submit="save">
                <div class="row q-mb-md q-col-gutter-sm">
                  <div
                    class="col-12"
                    :key="option.id"
                    v-for="option in activeGroup.options.filter(
                      (e) => !['allow_default_images'].includes(e.key),
                    )"
                  >
                    <div class="input_wrap">
                      <label class="q-mb-xs block">
                        {{ option.title }}
                      </label>
                      <q-input
                        outlined
                        hide-bottom-space
                        padding="none"
                        bg-color="sky-1"
                        v-model="<string>form[option.key]"
                        :error="!!errors[option.key]"
                        :error-message="errors[option.key]?.toString()"
                      />
                    </div>
                  </div>
                </div>

                <q-separator spaced />

                <q-list padding>
                  <q-item tag="label" v-ripple>
                    <q-item-section side top>
                      <q-checkbox
                        v-model="form.allow_default_images"
                        :true-value="1"
                        :false-value="0"
                      />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label> Allow Default Images </q-item-label>
                      <q-item-label caption>
                        Determines wether default images or null should be used
                        in place of missing images
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <div class="row q-mt-lg save_btn justify-center">
                  <q-btn
                    class="bg-secondary q-px-xl q-py-sm text-white"
                    no-caps
                    no-wrap
                    type="submit"
                    :loading="saving"
                  >
                    Save
                  </q-btn>
                </div>
              </q-form>
            </div>
          </q-page>
          <q-page
            class="q-px-lg q-py-md"
            :class="{ 'q-pt-xl': $q.screen.lt.sm }"
            v-if="activeGroup.key === 'access'"
          >
            <q-form @submit="save">
              <div class="row q-mb-md q-col-gutter-sm">
                <div
                  class="col-12"
                  :key="option.id"
                  v-for="option in activeGroup.options.filter(
                    (e) => e.type !== 'boolean' && e.key !== 'token_lifespan',
                  )"
                >
                  <div class="input_wrap" v-if="option.choices.length">
                    <label class="q-mb-xs block">
                      {{ option.title }}
                    </label>
                    <q-select
                      outlined
                      hide-bottom-space
                      padding="none"
                      bg-color="sky-1"
                      v-model="form[option.key]"
                      :hint="option.hint"
                      :use-chips="option.multiple"
                      :multiple="option.multiple"
                      :options="option.choices"
                      :error="!!errors[option.key]"
                      :error-message="errors[option.key]?.toString()"
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
                            <q-item-label v-html="opt" />
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
                  <div class="input_wrap" v-else>
                    <label class="q-mb-xs block">
                      {{ option.title }}
                    </label>
                    <q-input
                      outlined
                      hide-bottom-space
                      padding="none"
                      bg-color="sky-1"
                      v-model="<string>form[option.key]"
                      :hint="option.hint"
                      :type="<'text'>option.type"
                      :error="!!errors[option.key]"
                      :error-message="errors[option.key]?.toString()"
                    />
                  </div>
                </div>
              </div>
              <q-separator spaced />

              <q-list padding>
                <q-item-label header>Options</q-item-label>
                <q-item
                  tag="label"
                  v-ripple
                  :key="option.id"
                  v-for="option in activeGroup.options.filter(
                    (e) => e.type === 'boolean',
                  )"
                >
                  <q-item-section side top>
                    <q-checkbox
                      v-model="form[option.key]"
                      :true-value="1"
                      :false-value="0"
                    />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ option.title }}</q-item-label>
                    <q-item-label caption>
                      {{ option.hint }}
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced />
                <q-item-label header>Other settings</q-item-label>

                <q-item>
                  <q-item-section side>
                    <q-icon color="primary" name="fingerprint" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      Token Lifespan ({{ form.token_lifespan / 1000 }} mins.)
                    </q-item-label>
                    <q-slider
                      v-model="form.token_lifespan"
                      :min="300"
                      :max="10000"
                      :step="700"
                      label
                    />
                    <q-item-label caption>
                      How long tokens should live (ms.)"
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <div class="row q-mt-lg save_btn justify-center">
                <q-btn
                  class="bg-secondary q-px-xl q-py-sm text-white"
                  no-caps
                  no-wrap
                  type="submit"
                  :loading="saving"
                >
                  Save
                </q-btn>
              </div>
            </q-form>
          </q-page>
          <q-page
            class="q-px-lg q-py-md"
            :class="{ 'q-pt-xl': $q.screen.lt.sm }"
            v-if="activeGroup.key === 'misc'"
          >
            <q-form @submit="save">
              <div class="row q-mb-md q-col-gutter-sm">
                <div
                  class="col-12"
                  :key="option.id"
                  v-for="option in activeGroup.options"
                >
                  <div class="input_wrap">
                    <label class="q-mb-xs block">
                      {{ option.title }}
                    </label>
                    <q-input
                      outlined
                      hide-bottom-space
                      padding="none"
                      bg-color="sky-1"
                      v-model="<string>form[option.key]"
                      :hint="option.hint"
                      :type="<'text'>option.type"
                      :error="!!errors[option.key]"
                      :error-message="errors[option.key]?.toString()"
                    />
                  </div>
                </div>
              </div>
              <div class="row q-mt-lg save_btn justify-center">
                <q-btn
                  class="bg-secondary q-px-xl q-py-sm text-white"
                  no-caps
                  no-wrap
                  type="submit"
                  :loading="saving"
                >
                  Save
                </q-btn>
              </div>
            </q-form>
          </q-page>
          <q-inner-loading :showing="loading" />
        </q-page-container>
      </q-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, useRequest } from 'alova/client';
import {
  ConfigGroup,
  Configuration,
  ConfigurationRaw,
} from 'app/repository/configs';
import { RequestErrors } from 'app/repository/models';
import { configRequest, configSaveRequest } from 'src/data/adminRequests';
import { notify } from 'src/utils/helpers';
import { computed, ref } from 'vue';

type Group = {
  key: ConfigGroup;
  icon: string;
  label: string;
  options: ConfigurationRaw[];
};

let data = ref({
  profile_image: <File | null>null,
  site_name: 'NGVMS',
  copy_right: 'All rights Reserved@NGVMS',
  seo_title: 'NGVMS converts all your excess airtime to cash.',
  seo_desc: 'NGVMS is an airtime to cash and data sales company.',
  seo_keywords: 'CEO',
});

let profile_imageValue = ref<FileReader | ArrayBuffer | string | null>(null);

const setFile = (props: File) => {
  data.value.profile_image = props;

  var reader = new FileReader();
  reader.onload = (e: Event) => {
    profile_imageValue.value = (e.target as FileReader)?.result;
  };
  reader.readAsDataURL(props);
};

const cast = (config: string) => {
  if (typeof config === 'boolean') {
    return Number(config);
  }

  return config;
};

const errors = computed(
  () => (error.value as unknown as RequestErrors)?.errors || {},
);

const {
  form,
  send: save,
  error,
  loading: saving,
} = useForm((form) => configSaveRequest(form), {
  store: {
    enable: true,
    serializers: {
      file: {
        forward: (data) => (data instanceof File ? data.name : undefined),
        backward: () => undefined,
      },
    },
  },
  initialForm: <Configuration>{},
}).onSuccess(({ data: dat }) => {
  notify(dat.message, dat.status);
});

const { data: config, loading } = useRequest(() => configRequest(), {
  initialData: {
    misc: [],
    main: [],
    access: [],
  },
  immediate: true,
}).onSuccess(({ data }) => {
  activeGroup.value.options = data[activeGroup.value.key];
  form.value = Object.entries(data)
    .map((e) => e[1])
    .flat()
    .reduce(
      (e, x) => Object.assign(e, { [x.key]: cast(x.value) }),
      {} as Configuration,
    );
});

const groups = computed<Group[]>(() => [
  {
    key: 'main',
    label: 'SEO and Main',
    icon: 'ri-seo-fill',
    options: config.value.main ?? [],
  },
  {
    key: 'access',
    label: 'Users and Access',
    icon: 'ri-user-settings-fill',
    options: config.value.access ?? [],
  },
  {
    key: 'misc',
    label: 'Misc.',
    icon: 'ri-table-alt-fill',
    options: config.value.misc ?? [],
  },
]);

const activeGroup = ref<Group>(groups.value[0]);
</script>

<style lang="scss" scoped>
.q-item__section--avatar {
  min-width: 26px;
}
.add_manager .input_wrap {
  margin: 0 0;
}
</style>
