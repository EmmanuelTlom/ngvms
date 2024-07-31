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

            <div class="q-ml-md">
              <div class="search_inp">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search" />
              </div>
            </div>
          </div>
        </div>

        <div class="row right items-center no-wrap">
          <q-btn-dropdown
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
          </q-btn-dropdown>
          <q-btn-dropdown class="review_small" flat no-caps no-wrap>
            <template v-slot:label>
              <div style="gap: 1rem" class="row items-center no-wrap">
                <img
                  style="width: 45px; height: 45px"
                  src="/images/pretty.png"
                  alt=""
                />
                <div>
                  <p class="review_small text text-weight-bold">Marv Joy</p>

                  <p class="dashsmalltext q-mt-xs">Admin</p>
                </div>
              </div>
            </template>

            <q-list>
              <q-item clickable v-close-popup>
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

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item :to="{ name: 'admin.users' }" clickable v-ripple>
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
import { ref } from 'vue';

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
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

@media (min-width: 1100px) {
  .search_inp {
    width: 100%;
    min-width: 508px;
  }
}
</style>
