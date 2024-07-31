<template>
  <div class="container">
    <div class="q-mt-lg">
      <h4 class="dashboardmain_text">Add Data</h4>
    </div>

    <div class="add_manager">
      <div class="container">
        <div class="column justify-center items-center">
          <img
            style="width: 80px; height: 80px; object-fit: cover"
            v-if="!profile_imageValue"
            src="/images/image.png"
            alt=""
          />
          <img
            style="
              width: 80px;
              height: 80px;
              border-radius: 50%;
              object-fit: cover;
            "
            v-else
            :src="profile_imageValue"
          />
          <q-file
            @update:model-value="setFile"
            accept=".jpg,.png,.svg,.jpeg"
            label="Upload Image"
            outlined
            class="authUpload"
            v-model="data.profile_image"
          />
        </div>

        <div class="dash_inputs q-mt-md">
          <form>
            <div class="grid">
              <div class="input_wrap">
                <label for="">NMDPRA</label>
                <div class="input">
                  <select name="" id="">
                    <option value=""></option>
                    <option value=""></option>
                  </select>
                </div>
              </div>
              <div class="input_wrap">
                <label for="">Licensed CNG Filling Outlets</label>
                <div class="input">
                  <select name="" id="">
                    <option value=""></option>
                    <option value=""></option>
                  </select>
                </div>
              </div>
            </div>
            <div class="grid">
              <div class="input_wrap">
                <label for="">SON Approved Kit & Storage Dealership</label>
                <div class="input">
                  <select name="" id="">
                    <option value=""></option>
                    <option value=""></option>
                  </select>
                </div>
              </div>
              <div class="input_wrap">
                <label for="">Unique Identifier</label>
                <div class="input">
                  <input type="text" placeholder="Enter your first name" />
                </div>
              </div>
            </div>

            <div class="grid">
              <div class="input_wrap">
                <label for="">FRSC REG Verification</label>
                <div class="input">
                  <select name="" id="">
                    <option value=""></option>
                    <option value=""></option>
                  </select>
                </div>
              </div>
              <div class="input_wrap">
                <label for="">Financial Service Providers</label>
                <div class="input">
                  <select name="" id="">
                    <option value=""></option>
                    <option value=""></option>
                  </select>
                </div>
              </div>
            </div>
            <div class="input_wrap">
              <label for=""
                >NADDC(National Automotive Design & Development Council)
                Accredited Conversion Centers</label
              >
              <div class="input">
                <select name="" id="">
                  <option value=""></option>
                  <option value=""></option>
                </select>
              </div>
            </div>

            <div class="row q-mt-lg justify-center items-center">
              <q-btn
                class="bg-secondary text-white q-px-xl"
                flat
                no-caps
                no-wrap
              >
                Submit
              </q-btn>
            </div>

            <p class="text-red q-mt-md text-weight-bold text-center">
              Data editing can only function within the first 24 hours of data
              upload
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let data = ref({ profile_image: null });
let profile_imageValue = ref(null);
const setFile = (props) => {
  data.value.profile_image = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    profile_imageValue.value = e.target.result;
  };
  reader.readAsDataURL(props);
};
</script>

<style lang="scss" scoped></style>
