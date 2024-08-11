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
          >
            Personal Profile
          </q-btn>
        </div>

        <q-separator />

        <q-linear-progress
          color="primary"
          track-color="grey"
          :value="uploading.total / uploading.loaded"
          :indeterminate="false"
          v-if="uploading.loaded && uploading.loaded <= 1"
        />
      </div>

      <div v-if="viewMode === 'personal'">
        <div style="gap: 1rem" class="row q-py-lg items-center no-wrap">
          <div class="img_profile">
            <ImageCropper
              :aspect-ratio="1 / 1"
              :buttons="{ cancel: 'Cancel', crop: 'Accept' }"
              @result="uploadAvatar"
            >
              <template #default="{ open, dataURL }">
                <img
                  style="
                    width: 70px;
                    height: 70px;
                    border-radius: 48px;
                    object-fit: cover;
                  "
                  :src="dataURL || user.imageUrl || placeholder"
                  :alt="user.username"
                />
                <q-btn class="authUpload q-mt-sm" @click="open">
                  <i class="fa-solid fa-camera"></i>
                </q-btn>
              </template>
            </ImageCropper>
          </div>

          <div>
            <h4 class="review_big">{{ user.fullName }}</h4>
            <p class="transactsmall color">{{ user.email }}</p>
          </div>
        </div>

        <q-separator />

        <div class="details">
          <div class="grid">
            <div class="left">
              <div>
                <p class="transactsmall color2">Username</p>
                <!-- <p class="transactsmall color2">First Name</p> -->
                <h4 class="review_big">{{ user.username }}</h4>
              </div>
              <div>
                <p class="transactsmall color2">Phone Number</p>
                <h4 class="review_big">{{ user.phone }}</h4>
              </div>
            </div>

            <div class="right">
              <div>
                <p class="transactsmall color2">Email</p>
                <!-- <p class="transactsmall color2">Last Name</p> -->
                <h4 class="review_big">{{ user.email }}</h4>
              </div>
              <div>
                <p class="transactsmall color2">Current IP</p>
                <!-- <p class="transactsmall color2">Location</p> -->
                <h4 class="review_big">{{ user.userData?.ip || 'Unknown' }}</h4>
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

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useBootstrapStore } from 'src/stores/bootstrap-store';
import ImageCropper from 'src/components/utilities/ImageCropper.vue';
import placeholder from 'src/assets/avatar.png';
import { useForm } from 'alova/client';
import { profileRequest } from 'src/data/userRequests';
import { User } from 'app/repository/models';
import { notify } from 'src/utils/helpers';

const user = computed({
  get: () => useBootstrapStore().user,
  set: useBootstrapStore().setUser,
});

const uploadAvatar = ({ file }: { file: File }) => {
  form.value.image = file;
  upload();
};

const {
  form,
  send: upload,
  uploading,
} = useForm((form) => profileRequest(form, 'image'), {
  initialForm: {
    image: null,
  } as unknown as User & { image: File },
}).onSuccess(({ data }) => {
  notify(data.message, data.status);
  user.value = data.data;
});

let viewMode = ref('personal');
const setViewMode = (view: 'personal') => {
  viewMode.value = view;
};
</script>

<style lang="scss" scoped>
.q-btn.active {
  color: #1c1c1e;
  border-bottom: 3px solid #1c1c1e;
}
.q-btn {
  color: #9a9fa5;
}
</style>
