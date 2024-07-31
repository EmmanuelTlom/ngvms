<template>
  <div class="container users_detail">
    <div class="backbtn">
      <q-btn @click="router.go(-1)" flat no-caps no-wrap>
        <i class="fa-solid fa-chevron-left"></i>
      </q-btn>
    </div>

    <div style="gap: 1.5rem" class="row toggle_btns items-center no-wrap">
      <q-btn
        :class="viewData === 'profile' ? 'active' : ''"
        @click="setView('profile')"
        rounded
        flat
        no-wrap
      >
        Profile
      </q-btn>
      <q-btn
        :class="viewData === 'status' ? 'active' : ''"
        @click="setView('status')"
        rounded
        flat
        no-wrap
      >
        Status
      </q-btn>
      <q-btn
        :class="viewData === 'transaction' ? 'active' : ''"
        @click="setView('transaction')"
        rounded
        flat
        no-wrap
      >
        Transaction
      </q-btn>
      <q-btn
        :class="viewData === 'wallet' ? 'active' : ''"
        @click="setView('wallet')"
        rounded
        flat
        no-wrap
      >
        Wallet Summary
      </q-btn>
      <q-btn
        :class="viewData === 'manager' ? 'active' : ''"
        @click="setView('manager')"
        rounded
        flat
        no-wrap
      >
        Manager
      </q-btn>
    </div>

    <div class="contain">
      <div class="q-mt-lg">
        <div class="row items-center justify-between">
          <div
            style="gap: 1rem"
            class="row items-center no-wrap justify-center"
          >
            <div>
              <img
                style="width: 89px; height: 89px; border-radius: 50%"
                src="/images/manager.png"
                alt=""
              />
            </div>

            <div v-if="viewData !== 'manager'">
              <p class="dashsmalltext bold">Damilola</p>
              <p class="dashsmalltext q-my-sm bold">damilola@gmail.com</p>
              <p class="dashsmalltext bold verified_text">Verified</p>
            </div>
            <div v-if="viewData === 'manager'">
              <p class="p_sub_text bold">Manager Name</p>
            </div>
          </div>
          <!-- {{ viewData }} -->
          <div
            v-if="viewData === 'profile'"
            style="gap: 1rem"
            class="row wallet_bg items-end no-wrap"
          >
            <div class="">
              <p class="bal_text">User Wallet Balance</p>
              <p class="bal">21, 293</p>
            </div>

            <div class="edit_wallet">
              <q-btn flat no-caps> Edit wallet </q-btn>
            </div>
          </div>
          <div
            v-if="viewData === 'transaction'"
            style="gap: 1rem"
            class="row wallet_bg items-end no-wrap"
          >
            <div class="">
              <p class="bal_text">User Wallet Balance</p>
              <p class="bal">21, 293</p>
            </div>

            <div class="edit_wallet">
              <q-btn flat no-caps> Edit wallet </q-btn>
            </div>
          </div>
          <div
            v-if="viewData === 'status'"
            style="gap: 1rem"
            class="row wallet_bg items-end no-wrap"
          >
            <div class="">
              <p class="bal_text">User Wallet Balance</p>
              <p class="bal">21, 293</p>
            </div>

            <div class="edit_wallet">
              <q-btn flat no-caps> Edit wallet </q-btn>
            </div>
          </div>
          <div
            v-if="viewData === 'wallet'"
            style="gap: 1rem"
            class="row wallet_bg items-end no-wrap"
          >
            <div class="">
              <p class="bal_text">
                Total Amount of <br />
                transactions
              </p>
              <p class="bal">212, 293</p>
            </div>
            <div class="">
              <p class="bal_text">
                Total Number of <br />
                transactions
              </p>
              <p class="bal">67</p>
            </div>
          </div>

          <div
            v-if="viewData === 'manager'"
            class="row edit_profile justify-start"
          >
            <q-btn class="smalltext" flat no-wrap no-caps>
              Change manager
            </q-btn>
          </div>
        </div>
      </div>

      <div v-if="viewData === 'profile'" class="q-mt-xl">
        <h5 class="review_big">User profile</h5>

        <div class="grid q-mt-md">
          <div>
            <div class="row items-center">
              <p class="smalltext bold">NAME</p>
              <p class="smalltext">Damilola</p>
            </div>
            <div class="row items-center">
              <p class="smalltext bold">USERNAME</p>
              <p class="smalltext">Damilola23</p>
            </div>
            <div class="row items-center">
              <p class="smalltext bold">EMAIL</p>
              <p class="smalltext">damilola@gmail.com</p>
            </div>
            <div class="row items-center">
              <p class="smalltext bold">VERIFICATION STATUS</p>
              <p class="smalltext verified_text">VERIFIED</p>
            </div>
          </div>
          <div>
            <div class="row items-center">
              <p class="smalltext bold">DATE JOINED</p>
              <p class="smalltext">2/9/24</p>
            </div>
            <div class="row items-center">
              <p class="smalltext bold">PHONE NUMBER</p>
              <p class="smalltext">0809454276</p>
            </div>
            <div class="row items-center">
              <p class="smalltext bold">KYC LEVEL</p>
              <p class="smalltext">LEVEL 1</p>
            </div>
          </div>
        </div>
        <div class="row edit_profile justify-start">
          <q-btn class="smalltext" flat no-wrap> EDIT PROFILE </q-btn>
        </div>
      </div>
      <div v-if="viewData === 'status'" class="q-mt-xl">
        <h5 class="review_big">User Status</h5>

        <div class="suspension">
          <label for="">Suspend User</label>
          <div class="input_wrap">
            <input placeholder="Enter duration (in days)" type="text" />
          </div>

          <div class="input_wrap">
            <textarea
              placeholder="Enter suspension note"
              name=""
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>

          <div class="row edit_profile justify-end">
            <q-btn class="smalltext" flat no-wrap no-caps> Suspend user </q-btn>
          </div>
        </div>
      </div>
      <div v-if="viewData === 'transaction'" class="q-mt-xl">
        <h5 class="review_big">User Transaction Summary</h5>

        <div class="trans_sum">
          <UserTransationSummaryVue />
        </div>
      </div>
      <div v-if="viewData === 'wallet'" class="q-mt-xl">
        <h5 class="review_big">User Wallet Summary</h5>

        <div class="trans_sum">
          <WalletSummaryVue />
        </div>
      </div>

      <div v-if="viewData === 'manager'" class="q-mt-xl">
        <div class="suspension manager">
          <div style="gap: 1rem" class="grid no-wrap items-center">
            <div>
              <label for="">First Name</label>
              <div class="input_wrap">
                <input placeholder="Enter duration (in days)" type="text" />
              </div>
            </div>

            <div>
              <label for="">Last Name</label>
              <div class="input_wrap">
                <input placeholder="Enter duration (in days)" type="text" />
              </div>
            </div>
          </div>
          <div>
            <label for="">Email address</label>
            <div class="input_wrap">
              <input type="email" />
            </div>
          </div>

          <div>
            <label for="">Phone number</label>
            <div class="input_wrap">
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserTransationSummaryVue from 'src/components/UserTransationSummary.vue';
import WalletSummaryVue from 'src/components/WalletSummary.vue';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
let router = useRouter();
let viewData = ref('profile');

const setView = (view) => {
  viewData.value = view;
};
</script>

<style lang="scss" scoped>
.contain {
  max-width: 800px;
}
</style>
