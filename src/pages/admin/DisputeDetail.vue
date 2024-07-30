<template>
  <div class="container users_detail">
    <div class="backbtn">
      <q-btn @click="router.go(-1)" flat no-caps no-wrap>
        <i class="fa-solid fa-chevron-left"></i>
      </q-btn>
    </div>

    <div style="gap: 1.5rem" class="row q-mt-lg items-center no-wrap">
      <h5 class="review_big text-weight-bold text-uppercase">
        DATA SUBSCRIPTION
      </h5>
      <div style="gap: 1.5rem" class="row dispute items-center no-wrap">
        <q-btn rounded flat no-wrap class="close_"> Close dispute </q-btn>
        <q-btn rounded flat no-wrap class="resolve_"> Resolve dispute </q-btn>
      </div>
    </div>

    <div class="contain">
      <div class="q-mt-lg">
        <h5 class="review_big">User profile</h5>

        <div class="grid q-mt-md">
          <div>
            <div class="row items-center">
              <p class="smalltext bold">SERVICE</p>
              <p class="smalltext">Data Subscription</p>
            </div>
            <div class="row items-center">
              <p class="smalltext bold">DATA UNIT</p>
              <p class="smalltext">Damilola23</p>
            </div>
            <div class="row items-center">
              <p class="smalltext bold">PHONE NUMBER</p>
              <p class="smalltext">0903884388</p>
            </div>
            <div class="row items-center">
              <p class="smalltext bold">TIME</p>
              <p class="smalltext verified_text">11:07PM</p>
            </div>
          </div>
          <div>
            <div class="row items-center">
              <p class="smalltext bold">REFERENCE</p>
              <p class="smalltext">djsjjsjjs</p>
            </div>
            <div class="row items-center">
              <p class="smalltext bold">AMOUNT</p>
              <p class="smalltext">270</p>
            </div>
            <div class="row items-center">
              <p class="smalltext bold">DATE</p>
              <p class="smalltext">2/11/2024</p>
            </div>
            <div class="row items-center">
              <p class="smalltext bold">STATUS</p>
              <p class="smalltext">SUCCESSFUL</p>
            </div>
          </div>
        </div>
      </div>
      <div class="q-mt-xl">
        <div class="suspension">
          <!-- <label for="">Suspend User</label> -->
          <div class="input_wrap">
            <input placeholder="Raised Dispute" type="text" />
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

          <div class="row edit_profile justify-start">
            <q-btn class="smalltext q-px-xl" flat no-wrap> Submit </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
let viewData = ref("profile");
</script>

<style lang="scss" scoped>
.contain {
  max-width: 90%;
}

.review_big {
  font-weight: 700;
}

.edit_profile {
  .q-btn {
    border-radius: 10px;
  }
}
</style>
