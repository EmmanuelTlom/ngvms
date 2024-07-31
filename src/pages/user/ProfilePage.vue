<template>
  <div class="profile_page">
    <div class="container">
      <div class="top_">
        <div style="gap: 2rem" class="row items-center no-wrap">
          <q-btn
            :class="
              viewMode === 'personal'
                ? 'active review_small bold'
                : 'review_small bold'
            "
            @click="setViewMode('personal')"
            flat
            no-caps
            no-wrap
            >Personal Profile</q-btn
          >
        </div>
        <q-separator />
      </div>

      <div v-if="viewMode === 'personal'">
        <div style="gap: 1rem" class="row q-py-lg items-center no-wrap">
          <div class="img_profile">
            <img
              style="
                width: 70px;
                height: 70px;
                border-radius: 48px;
                object-fit: cover;
              "
              :src="
                userData.photoUrl
                  ? userData.photoUrl
                  : profile_imagePreview
                    ? profile_imagePreview
                    : '/images/avatar.png'
              "
              :alt="userData.username"
            />
            <!-- <q-btn flat no-caps no-wrap>
              <i class="fa-solid fa-camera"></i>
            </q-btn> -->
            <q-file
              @update:model-value="setFile"
              accept=".jpg,.png,.svg,.jpeg"
              class="authUpload q-mt-sm"
              v-model="profile_image"
              ><i class="fa-solid fa-camera"></i
            ></q-file>
          </div>

          <div>
            <h4 class="review_big">{{ userData.username }}</h4>
            <p class="transactsmall color">{{ userData.email }}</p>
          </div>
        </div>

        <q-separator />

        <div class="details">
          <div class="grid">
            <div class="left">
              <div>
                <p class="transactsmall color2">Username</p>
                <!-- <p class="transactsmall color2">First Name</p> -->
                <h4 class="review_big">{{ userData.username }}</h4>
              </div>
              <div>
                <p class="transactsmall color2">Phone Number</p>
                <h4 class="review_big">{{ userData.phone }}</h4>
              </div>
            </div>

            <div class="right">
              <div>
                <p class="transactsmall color2">Email</p>
                <!-- <p class="transactsmall color2">Last Name</p> -->
                <h4 class="review_big">{{ userData.email }}</h4>
              </div>
              <div>
                <p class="transactsmall color2">Current IP</p>
                <!-- <p class="transactsmall color2">Location</p> -->
                <h4 class="review_big">{{ userData.currentIp }}</h4>
              </div>
            </div>
          </div>
        </div>

        <q-separator />

        <div class="logout q-pt-lg">
          <q-btn
            :to="{ name: 'logout' }"
            no-wrap
            no-caps
            class="review_big"
            flat
          >
            <i class="fa-solid q-mr-sm fa-right-from-bracket"></i> Logout
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Loading, Notify, QSpinnerOval } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { userData } from 'src/data/dummy';
let viewMode = ref('personal');
let editState = ref(false);
let profile_image = ref(null);
let profile_imagePreview = ref('');
const setViewMode = (view) => {
  viewMode.value = view;
};

const setFile = (props) => {
  profile_image.value = props;
  var reader = new FileReader();
  reader.onload = (e) => {
    profile_imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(props);
  Loading.show({
    spinner: QSpinnerOval,
    message: 'Uploading profile image...',
  });
  const formData = new FormData();
  formData.append('file-upload', profile_image.value);
  api
    .post('/api/v1/users/upload-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log(response);
      Notify.create({
        message: response.data.message,
        color: 'green',
        position: 'top',
      });
      editState.value = false;
      userData = response.data.payload;

      Loading.hide();
    })
    .catch(({ response }) => {
      Loading.hide();
      Notify.create({
        message: response.data.message,
        color: 'red',
        position: 'top',
        actions: [{ icon: 'close', color: 'white' }],
      });
    });
};
</script>

<style lang="scss" scoped>
.q-btn.active {
  color: #1c1c1e;
  border-bottom: 3px solid #1c1c1e;
}
.q-btn {
  padding-bottom: 1rem;
  color: #9a9fa5;
}
</style>
