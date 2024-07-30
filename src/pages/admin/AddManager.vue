<template>
  <div class="container">
    <div class="">
      <h4 class="dashboardmain_text">Add Team Member</h4>
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
            label="Upload Photo"
            outlined
            class="authUpload"
            v-model="data.profile_image"
          />
        </div>

        <div class="dash_inputs q-mt-md">
          <form>
            <div class="grid">
              <div class="input_wrap">
                <label for="">First Name</label>
                <div class="input">
                  <input type="text" placeholder="Enter your first name" />
                </div>
              </div>
              <div class="input_wrap">
                <label for="">Last Name</label>
                <div class="input">
                  <input type="text" placeholder="Enter your last name" />
                </div>
              </div>
            </div>
            <div class="grid">
              <div class="input_wrap">
                <label for="">Your Email</label>
                <div class="input">
                  <input type="text" placeholder="Enter your email" />
                </div>
              </div>
              <div class="input_wrap">
                <label for="">Phone Number</label>
                <div class="input">
                  <input type="text" placeholder="Enter your phone number" />
                </div>
              </div>
            </div>
            <div class="grid">
              <div class="input_wrap">
                <label for="">Position</label>
                <div class="input">
                  <input type="text" placeholder="CEO" />
                </div>
              </div>
              <div class="input_wrap">
                <label for="">Gender</label>
                <div class="input select">
                  <select name="" id="">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

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
