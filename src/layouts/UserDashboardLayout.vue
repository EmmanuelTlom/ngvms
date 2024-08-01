<template>
  <q-layout view="lHh Lpr lFf" class="greyBack">
    <header class="header bg-white">
      <div class="container">
        <div class="row justify-between">
          <div style="gap: 3rem" class="left row no-wrap items-center">
            <router-link :to="{ name: 'user.dashboard' }"
              ><div class="logo row items-center">
                <img src="/images/logo.svg" alt="" /></div
            ></router-link>
            <div class="stroke"><img src="/images/divider.svg" alt="" /></div>
            <ul style="gap: 1.5rem" class="row items-center no-wrap">
              <li>
                <router-link
                  class="review_small bold"
                  :to="{ name: 'user.dashboard' }"
                >
                  Home
                </router-link>
              </li>
              <li>
                <router-link
                  class="review_small bold"
                  :to="{ name: 'user.add.data' }"
                >
                  Add New Data
                </router-link>
              </li>
              <li>
                <router-link
                  class="review_small bold"
                  :to="{ name: 'user.history' }"
                >
                  Edit Data
                </router-link>
              </li>
              <li>
                <router-link
                  class="review_small bold"
                  :to="{ name: 'user.history' }"
                >
                  My History
                </router-link>
              </li>
            </ul>
          </div>

          <div style="gap: 1rem" class="row btns items-center">
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
                max-width="300px"
                max-height="600px"
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
                {{ user.fullname }}
              </p>
            </router-link>
          </div>

          <div class="toggle_btn">
            <q-btn @click="toggleLeftDrawer" flat>
              <i class="fa-solid fa-bars"></i>
            </q-btn>
          </div>
        </div>
      </div>
    </header>
    <q-drawer
      :width="240"
      v-model="leftDrawerOpen"
      side="left"
      :breakpoint="600"
      bordered
    >
      <!-- drawer content -->
      <q-scroll-area class="fit">
        <div class="logo row items-center">
          <img src="/images/logo.svg" alt="" />
        </div>
        <q-list padding class="menu-list">
          <q-item :to="{ name: 'user.dashboard' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-home-line"></i>
            </q-item-section>

            <q-item-section> Home </q-item-section>
          </q-item>
          <q-item :to="{ name: 'user.bills' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-wallet-2-line"></i>
            </q-item-section>

            <q-item-section> Vouchers </q-item-section>
          </q-item>
          <q-item :to="{ name: 'user.referral' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-user-search-line"></i>
            </q-item-section>

            <q-item-section> Referrals </q-item-section>
          </q-item>
          <q-item :to="{ name: 'user.profile' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-user-line"></i>
            </q-item-section>

            <q-item-section> Profile </q-item-section>
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
    <q-footer>
      <div class="row justify-center">
        <p class="rights">
          © NGVNS {{ new Date().getFullYear() }}. All Rights Reserved.
        </p>
      </div>
    </q-footer>

    <q-page-container class="greyBack">
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

const user = computed(() => useBootstrapStore().user);
const notifMenu = ref(false);
const leftDrawerOpen = ref(false);

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
  initialData: [],
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
