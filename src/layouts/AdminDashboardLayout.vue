<template>
  <q-layout class="greyBack authLayout" view="lHh lpR fFf">
    <q-header reveal style="width: auto" class="header bg-white">
      <div class="row justify-between no-wrap">
        <div style="gap: 3rem" class="left row no-wrap items-center">
          <div
            style="gap: 1rem"
            class="row q-ml-md right_ items-center no-wrap"
          >
            <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

            <!-- <div class="q-ml-md">
              <div class="search_inp">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search" />
              </div>
            </div> -->
          </div>
        </div>

        <div class="row right items-center no-wrap">
          <!-- <q-btn-dropdown
            class="review_small lang"
            flat
            no-caps
            no-wrap
            label="English"
          >
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Igbo</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown> -->
          <q-btn-dropdown class="review_small" flat no-caps no-wrap>
            <template v-slot:label>
              <div style="gap: 1rem" class="row items-center no-wrap">
                <img
                  style="width: 45px; height: 45px"
                  :alt="user.fullName"
                  :src="user.imageUrl"
                />
                <div>
                  <p class="review_small text text-weight-bold">
                    {{ user.fullName }}
                  </p>

                  <p class="dashsmalltext q-mt-xs">Admin</p>
                </div>
              </div>
            </template>

            <q-list>
              <q-item :to="{ name: 'user.dashboard' }" clickable v-close-popup>
                <q-item-section>
                  <q-item-label>User Dashboard</q-item-label>
                </q-item-section>
              </q-item>
              <q-item :to="{ name: 'logout' }" clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
    </q-header>

    <q-drawer
      :width="240"
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      bordered
    >
      <!-- drawer content -->
      <q-scroll-area class="fit">
        <div class="logo q-pa-lg row items-center">
          <img src="/images/logo.svg" alt="" />
        </div>

        <q-list padding class="menu-list">
          <q-item :to="{ name: 'admin.dashboard' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-dashboard-3-line"></i>
            </q-item-section>

            <q-item-section> Dashboard Overview </q-item-section>
          </q-item>
          <q-expansion-item>
            <template v-slot:header>
              <div class="row full-width items-center justify-between">
                <div style="gap: 0.6rem" class="row no-wrap items-center">
                  <i class="ri-copper-coin-line text-h5"></i>
                  <span style="font-size: 14px" class="text-body2"
                    >Data Management</span
                  >
                </div>
              </div>
            </template>
            <q-card class="q-px-md">
              <q-item :to="{ name: 'admin.son.data' }" clickable v-ripple>
                <q-item-section> SON </q-item-section>
              </q-item>
              <q-item :to="{ name: 'admin.naddc.data' }" clickable v-ripple>
                <q-item-section> NADDC </q-item-section>
              </q-item>
              <q-item :to="{ name: 'admin.frsc.data' }" clickable v-ripple>
                <q-item-section> FRSC </q-item-section>
              </q-item>
              <q-item :to="{ name: 'admin.nmdpra.data' }" clickable v-ripple>
                <q-item-section> NMDPRA </q-item-section>
              </q-item>
              <q-item :to="{ name: 'admin.dealer.data' }" clickable v-ripple>
                <q-item-section> Dealers </q-item-section>
              </q-item>
            </q-card>
          </q-expansion-item>
          <q-expansion-item>
            <template v-slot:header>
              <div class="row full-width items-center justify-between">
                <div style="gap: 0.6rem" class="row no-wrap items-center">
                  <i class="ri-copper-coin-line text-h5"></i>
                  <span style="font-size: 14px" class="text-body2"
                    >User Management</span
                  >
                </div>
              </div>
            </template>
            <q-card class="q-px-md">
              <q-item :to="{ name: 'admin.users' }" clickable v-ripple>
                <q-item-section> User Accounts </q-item-section>
              </q-item>
              <!-- <q-item clickable v-ripple>
                <q-item-section> Role Management </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> Activity Logs </q-item-section>
              </q-item> -->
            </q-card>
          </q-expansion-item>
          <!-- <q-expansion-item>
            <template v-slot:header>
              <div class="row full-width items-center justify-between">
                <div style="gap: 0.6rem" class="row no-wrap items-center">
                  <i class="ri-copper-coin-line text-h5"></i>
                  <span style="font-size: 14px" class="text-body2">
                    Vehicle Management</span
                  >
                </div>
              </div>
            </template>
            <q-card class="q-px-md">
              <q-item clickable v-ripple>
                <q-item-section> Vehicle Registration </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> Vehicle Database </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> Documentation Management </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> Service History </q-item-section>
              </q-item>
            </q-card>
          </q-expansion-item>
          <q-expansion-item>
            <template v-slot:header>
              <div class="row full-width items-center justify-between">
                <div style="gap: 0.6rem" class="row no-wrap items-center">
                  <i class="ri-copper-coin-line text-h5"></i>
                  <span style="font-size: 14px" class="text-body2">
                    Monitoring and Tracking</span
                  >
                </div>
              </div>
            </template>
            <q-card class="q-px-md">
              <q-item clickable v-ripple>
                <q-item-section> Real-Time Tracking </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> Route History </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> Fuel Consumption </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> Emissions Monitoring </q-item-section>
              </q-item>
            </q-card>
          </q-expansion-item>
          <q-expansion-item>
            <template v-slot:header>
              <div class="row full-width items-center justify-between">
                <div style="gap: 0.6rem" class="row no-wrap items-center">
                  <i class="ri-copper-coin-line text-h5"></i>
                  <span style="font-size: 14px" class="text-body2">
                    Alerts and Notifications</span
                  >
                </div>
              </div>
            </template>
            <q-card class="q-px-md">
              <q-item clickable v-ripple>
                <q-item-section> Service Reminders </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> Compliance Alerts </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> Emergency Notifications </q-item-section>
              </q-item>
            </q-card>
          </q-expansion-item>
          <q-expansion-item>
            <template v-slot:header>
              <div class="row full-width items-center justify-between">
                <div style="gap: 0.6rem" class="row no-wrap items-center">
                  <i class="ri-copper-coin-line text-h5"></i>
                  <span style="font-size: 14px" class="text-body2">
                    Data Management</span
                  >
                </div>
              </div>
            </template>
            <q-card class="q-px-md">
              <q-item clickable v-ripple>
                <q-item-section> Centralized Database </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> Search and Filter </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> Data Export/Import </q-item-section>
              </q-item>
            </q-card>
          </q-expansion-item>
          <q-expansion-item>
            <template v-slot:header>
              <div class="row full-width items-center justify-between">
                <div style="gap: 0.6rem" class="row no-wrap items-center">
                  <i class="ri-copper-coin-line text-h5"></i>
                  <span style="font-size: 14px" class="text-body2">
                    Support and Helpdesk</span
                  >
                </div>
              </div>
            </template>
            <q-card class="q-px-md">
              <q-item clickable v-ripple>
                <q-item-section> User Support </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> FAQ and Documentation </q-item-section>
              </q-item>
            </q-card>
          </q-expansion-item>
          <q-expansion-item>
            <template v-slot:header>
              <div class="row full-width items-center justify-between">
                <div style="gap: 0.6rem" class="row no-wrap items-center">
                  <i class="ri-copper-coin-line text-h5"></i>
                  <span style="font-size: 14px" class="text-body2">
                    System Settings</span
                  >
                </div>
              </div>
            </template>
            <q-card class="q-px-md">
              <q-item clickable v-ripple>
                <q-item-section> Configuration Options </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> Integration Management </q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> Widgets and Layouts</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section> Themes and Preferences</q-item-section>
              </q-item>
            </q-card>
          </q-expansion-item> -->

          <!-- <q-item :to="{ name: 'admin.users' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-layout-grid-line"></i>
            </q-item-section>

            <q-item-section> Users </q-item-section>
          </q-item>

          <q-item :to="{ name: 'admin.managers' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-heart-line"></i>
            </q-item-section>

            <q-item-section> Managers </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-question-answer-line"></i>
            </q-item-section>

            <q-item-section> Statistics </q-item-section>
          </q-item>
          <q-item :to="{ name: 'transactions' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-list-unordered"></i>
            </q-item-section>

            <q-item-section> Transactions </q-item-section>
          </q-item>
          <q-item :to="{ name: 'conversion.page' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-table-3"></i>
            </q-item-section>

            <q-item-section> Conversions </q-item-section>
          </q-item> -->
          <q-item :to="{ name: 'user.dashboard' }" clickable v-ripple>
            <q-item-section avatar>
              <i class="ri-table-3"></i>
            </q-item-section>

            <q-item-section> User Dashboard </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useBootstrapStore } from 'src/stores/bootstrap-store';
import { useGlobalStore } from 'src/stores/global-store';
import { notify } from 'src/utils/helpers';
import { computed, ref } from 'vue';

const user = computed(() => useBootstrapStore().user);
const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

useGlobalStore().$subscribe((e, { error }) => {
  if (error.message) {
    useGlobalStore().clearError();
    notify({
      alert: true,
      title: 'System Error',
      status: 'error',
      message: error.message,
    });
  }
});
</script>

<style lang="scss" scoped>
.q-header {
  color: #646464;

  & > div {
    .left {
      // flex: 2;
      div {
        width: 100%;
      }
    }
  }
}

.logo {
  padding: 1.8rem 2rem;
}

.review_small.text {
  font-weight: 700;
}
.menu-list .q-item.q-router-link--active.q-router-link--exact-active {
  margin-left: 1rem;
}
@media (min-width: 1100px) {
  .search_inp {
    width: 100%;
    min-width: 508px;
  }
}
</style>
