<template>
  <q-layout view="hHh LpR lFr" class="greyBack">
    <q-header class="header bg-white" :reveal="!isMobile && $q.screen.gt.xs">
      <q-toolbar class="row justify-between">
        <div style="gap: 3rem" class="left row no-wrap items-center">
          <router-link :to="{ name: 'user.dashboard' }"
            ><div class="logo row items-center">
              <img
                style="max-width: 200px"
                src="/images/logo.png"
                alt=""
              /></div
          ></router-link>
          <q-separator vertical />
          <ul style="gap: 1.5rem" class="row items-center no-wrap">
            <li>
              <router-link
                class="review_small bold"
                :to="{ name: 'user.dashboard' }"
              >
                Home
              </router-link>
            </li>
            <template v-if="user.verified">
              <li>
                <router-link
                  class="review_small bold"
                  :to="{ name: endpoints.add }"
                >
                  Add New Data
                </router-link>
              </li>
              <li>
                <router-link
                  disable
                  class="review_small bold"
                  :to="{ name: endpoints.list }"
                >
                  My History
                </router-link>
              </li>
            </template>
            <template v-else>
              <li>
                <a class="review_small text-grey-5 bold cursor-pointer">
                  Add New Data
                </a>
              </li>
              <li>
                <a class="review_small text-grey-5 bold cursor-pointer">
                  My History
                </a>
              </li>
            </template>
            <li v-if="iCan()">
              <router-link
                class="review_small bold"
                :to="{ name: 'admin.dashboard' }"
              >
                Admin Dashboard
              </router-link>
            </li>
          </ul>
        </div>

        <div
          style="gap: 1rem"
          class="row items-center"
          :class="{ btns: !isMobile && $q.screen.gt.xs }"
        >
          <q-btn
            round
            color="red"
            icon="admin_panel_settings"
            :to="{ name: 'admin.dashboard' }"
            v-if="iCan() && isMobile"
          />
          <q-btn dense flat round>
            <img src="/images/notif.svg" alt="" />
            <q-badge
              rounded
              color="secondary"
              floating
              v-if="notifs.stats.unread"
            >
              <span class="dot"></span>
            </q-badge>
            <q-menu
              v-model="notifMenu"
              transition-show="scale"
              class="qmenu_notif"
              transition-hide="scale"
              :max-height="
                !$q.platform.is.mobile || $q.screen.gt.sm ? '600px' : '100vh'
              "
              :max-width="
                !$q.platform.is.mobile || $q.screen.gt.sm ? '300px' : '90vw'
              "
              @show="send"
            >
              <q-inner-loading
                :showing="
                  loadingNotifications &&
                  !allNotifications.length &&
                  !importantNotifications.length
                "
              />
              <div class="main_div">
                <div class="row row_top items-center justify-between">
                  <h4 class="dashtext">Notifications</h4>
                  <q-btn @click="notifMenu = false" flat no-wrap no-caps>
                    Close
                    <img class="q-ml-sm" src="/images/closetur.svg" alt="" />
                  </q-btn>
                </div>
                <q-list
                  class="notif_list"
                  :key="n"
                  v-for="(nt, n) in notifications"
                >
                  <h4 class="head">{{ nt.title }} ({{ nt.count }})</h4>
                  <q-item
                    v-for="(n, index) in nt.data"
                    :class="!!n.readAt ? 'blueTick' : 'tick'"
                    :key="index"
                    clickable
                    v-ripple
                  >
                    <q-item-section>
                      <q-item-label class="review_small text-weight-medium">
                        {{ n.title }}
                      </q-item-label>
                      <q-item-label
                        :lines="2"
                        class="message text-weight-medium"
                      >
                        {{ n.message }}
                      </q-item-label>
                      <q-item-label class="caption" caption>
                        {{ timeAgoStamp(n.createdAt) }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-menu>
          </q-btn>
          <router-link
            style="gap: 1rem"
            class="row userarea no-wrap items-center"
            :to="{ name: 'user.profile' }"
            :class="{ hidden: isMobile || $q.screen.lt.sm }"
          >
            <img
              style="
                width: 40px;
                height: 39.47px;
                border-radius: 48px;
                object-fit: cover;
              "
              :src="user.imageUrl"
              :alt="user.username"
            />
            <p class="review_small bold">
              {{ user.fullName }}
            </p>
          </router-link>
        </div>

        <div class="toggle_btn" :class="{ hidden: isMobile }">
          <q-btn color="primary" @click="toggleLeftDrawer" flat>
            <i class="fa-solid fa-bars"></i>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      :width="240"
      v-model="leftDrawerOpen"
      side="left"
      :breakpoint="600"
    >
      <!-- drawer content -->
      <q-scroll-area class="fit">
        <div class="logo q-pa-lg row items-center">
          <img style="max-width: 200px" src="/images/logo.png" alt="" />
        </div>
        <q-list padding class="menu-list">
          <q-item :to="{ name: 'user.dashboard' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-home-line"></i>
            </q-item-section>

            <q-item-section> Home </q-item-section>
          </q-item>
          <template v-if="user.verified">
            <q-item :to="{ name: endpoints.add }" clickable v-ripple>
              <q-item-section avatar>
                <i class="ri-function-add-line"></i>
              </q-item-section>

              <q-item-section> Add Data </q-item-section>
            </q-item>
            <q-item :to="{ name: endpoints.list }" clickable v-ripple>
              <q-item-section avatar>
                <i class="ri-history-line"></i>
              </q-item-section>

              <q-item-section> My History </q-item-section>
            </q-item>
          </template>
          <q-item :to="{ name: 'user.profile' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-user-line"></i>
            </q-item-section>

            <q-item-section> Profile </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            :to="{ name: 'admin.dashboard' }"
            v-if="iCan()"
          >
            <q-item-section avatar>
              <i class="ri-dashboard-line"></i>
            </q-item-section>

            <q-item-section> Admin Dashboard </q-item-section>
          </q-item>
          <q-item :to="{ name: 'user.logout' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-shut-down-line"></i>
            </q-item-section>

            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-footer
      :bordered="isMobile"
      :class="{
        'mobile bg-white': isMobile,
        'bg-transparent': !isMobile,
      }"
    >
      <q-tabs class="text-teal" v-if="isMobile">
        <q-route-tab
          :name="endpoints.add"
          class="q-py-sm"
          no-caps
          exact-active-class="text-teal-7 text-weight-bold"
          :to="{ name: endpoints.add }"
        >
          <q-icon size="sm" name="add_box" />
          Add Data
        </q-route-tab>
        <q-route-tab
          name="home"
          no-caps
          class="q-py-sm"
          exact-active-class="text-teal-7 text-weight-bold"
          :to="{ name: 'user.dashboard' }"
        >
          <q-icon size="sm" name="dashboard" />
          Home
        </q-route-tab>
        <q-route-tab
          name="history"
          no-caps
          class="q-py-sm"
          exact-active-class="text-teal-7 text-weight-bold"
          :to="{ name: endpoints.list }"
        >
          <q-icon size="sm" name="history" />
          History
        </q-route-tab>
        <q-route-tab
          name="profile"
          no-caps
          class="q-py-sm"
          exact-active-class="text-teal-7 text-weight-bold"
          :to="{ name: 'user.profile' }"
        >
          <q-avatar size="sm">
            <img :src="user.imageUrl" />
          </q-avatar>
          Profile
        </q-route-tab>
      </q-tabs>
      <div class="row justify-center" v-if="!isMobile">
        <p class="rights">
          © NGVMS {{ new Date().getFullYear() }}. All Rights Reserved.
        </p>
      </div>
    </q-footer>

    <q-page-container class="greyBack" :class="{ 'q-mb-lg': isMobile }">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useBootstrapStore } from 'src/stores/bootstrap-store';
import { useAutoRequest, usePagination } from 'alova/client';
import { notificationsRequest } from 'src/data/userRequests';
import { Notification } from 'app/repository/models';
import { timeAgoStamp } from 'src/utils/helpers';
import { iCan } from 'src/utils/proccessor';
import { useQuasar } from 'quasar';

const q = useQuasar();
const user = computed(() => useBootstrapStore().user);
const isMobile = computed(() => q.platform.is.capacitor);
const notifMenu = ref(false);
const leftDrawerOpen = ref(false);

user.value.type = 'dealer';

const endpoints = computed(
  () =>
    ({
      son: {
        add: 'user.add.certificate',
        list: 'user.certificates',
      },
      frsc: {
        add: 'user.add.vehicle',
        list: 'user.vehicles',
      },
      dealer: {
        add: 'user.add.kit',
        list: 'user.kits',
      },
      naddc: {
        add: 'user.add.center',
        list: 'user.centers',
      },
      nmdpra: {
        add: 'user.add.station',
        list: 'user.stations',
      },
    })[user.value.type as 'dealer' | 'son' | 'naddc' | 'frsc' | 'nmdpra'] || {
      add: 'user.add.vehicle',
      list: 'user.vehicles',
    },
);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const { data: notifs } = useAutoRequest(
  () => notificationsRequest({ statsOnly: 1 }),
  {
    force: true,
    throttle: 1000,
    pollingTime: 10000,
    initialData: { stats: { read: 0, unread: 0, important: 0 } },
  },
);

const importantNotifications = ref<Notification[]>([]);
const notifications = computed(() => {
  return [
    {
      title: 'Important Notifications',
      data: importantNotifications.value,
      count: notifs.value.stats.important,
      show: importantNotifications.value.some((e) => !e.readAt),
    },
    {
      title: `${notifs.value.stats.important ? 'Other' : 'All'} Notifications`,
      data: allNotifications.value,
      count: notifs.value.stats.unread + notifs.value.stats.read,
      show: allNotifications.value.some((e: Notification) => !e.readAt),
    },
  ].filter((e) => e.count > 0 || e.show);
});

const {
  send,
  data: allNotifications,
  loading: loadingNotifications,
} = usePagination(() => notificationsRequest({ premark: 1, withStats: 1 }), {
  immediate: false,
  initialData: { data: [] },
}).onSuccess(({ data }) => {
  importantNotifications.value = data.important;
});
</script>

<style scoped>
.userarea {
  background: #fafafa;
  padding: 8px 10px 8px 8px;
  border-radius: 1000px;
}
</style>
