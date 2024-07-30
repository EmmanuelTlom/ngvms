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
            label="Upload Logo"
            outlined
            class="authUpload"
            v-model="data.profile_image"
          />
        </div>

        <div class="dash_inputs q-mt-md">
          <form>
            <div class="grid">
              <div class="input_wrap">
                <label for="">Site Name</label>
                <div class="input">
                  <input
                    v-model="data.site_name"
                    type="text"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>
              <div class="input_wrap">
                <label for="">Copy Right</label>
                <div class="input">
                  <input
                    v-model="data.copy_right"
                    type="text"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>
            <div class="grid">
              <div class="input_wrap_hold">
                <div class="input_wrap">
                  <label for="">SEO Title</label>
                  <div class="input">
                    <input
                      v-model="data.seo_title"
                      type="text"
                      placeholder="SEO title"
                    />
                  </div>
                </div>
                <div class="input_wrap">
                  <label for="">SEO Keywords</label>
                  <div class="input">
                    <input
                      v-model="data.seo_keywords"
                      type="text"
                      placeholder="SEO Keywords"
                    />
                  </div>
                </div>
              </div>
              <div class="input_wrap">
                <label for="">SEO Description</label>
                <div class="input">
                  <textarea
                    v-model="data.seo_desc"
                    placeholder="SEO Description"
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="row q-mt-lg save_btn justify-center">
              <q-btn
                class="bg-secondary q-px-xl q-py-sm text-white"
                no-caps
                no-wrap
                type="submit"
              >
                Save
              </q-btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

let data = ref({
  profile_image: null,
  site_name: "NGVMS",
  copy_right: "All rights Reserved@NGVMS",
  seo_title: "NGVMS converts all your excess airtime to cash.",
  seo_desc: "NGVMS is an airtime to cash and data sales company.",
  seo_keywords: "CEO",
});
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
