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
              <q-badge color="secondary" floating
                ><span class="dot"></span
              ></q-badge>
              <q-menu
                v-model="notifMenu"
                transition-show="scale"
                class="qmenu_notif"
                transition-hide="scale"
              >
                <div class="main_div">
                  <div class="row row_top items-center justify-between">
                    <h4 class="dashtext">Notification</h4>
                    <q-btn @click="notifMenu = false" flat no-wrap no-caps>
                      Close
                      <img class="q-ml-sm" src="/images/closetur.svg" alt="" />
                    </q-btn>
                  </div>
                  <q-list class="notif_list">
                    <h4 class="head">Important Notifications (2)</h4>
                    <q-item v-for="n in 2" :key="n" clickable v-ripple>
                      <q-item-section>
                        <q-item-label class="review_small text-weight-medium"
                          >Happy Independence Day
                        </q-item-label>
                        <q-item-label class="message text-weight-medium"
                          >Wishing you and yours a wonderful holiday as
                          we...</q-item-label
                        >
                        <q-item-label class="caption" caption
                          >1 hour ago</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                  </q-list>
                  <q-list class="notif_list">
                    <h4 class="head">Other Notifications (10)</h4>
                    <q-item
                      v-for="(n, index) in 2"
                      :class="index % 2 ? 'blueTick' : 'tick'"
                      :key="n"
                      clickable
                      v-ripple
                    >
                      <q-item-section>
                        <q-item-label class="review_small text-weight-medium"
                          >NGVNS Debit Alert
                        </q-item-label>
                        <q-item-label class="message text-weight-medium"
                          >Your GTBank direct debit transaction of
                          NGN4,500...</q-item-label
                        >
                        <q-item-label class="caption" caption
                          >1 hour ago</q-item-label
                        >
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
        <div class="logo q-pa-md row no-wrap items-center">
          <img src="../assets/evector.svg" alt="" />
          <img src="../assets/logo.svg" alt="" />
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

<script setup>
import { computed, ref } from 'vue';
import { useBootstrapStore } from 'src/stores/bootstrap-store';

const user = computed(() => useBootstrapStore().user);
const notifMenu = ref(false);
const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style scoped>
.userarea {
  background: #fafafa;
  padding: 8px 10px 8px 8px;
  border-radius: 1000px;
}
</style>
