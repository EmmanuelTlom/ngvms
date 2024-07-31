<template>
  <div>
    <!-- Select a picture for cropping -->
    <!-- Set a button that invokes selecting an image -->
    <slot
      :open="() => $refs.uploadInput.click()"
      :dataURL="result.dataURL"
      :blobURL="result.blobURL"
    >
      <button class="select-picture" @click="$refs.uploadInput.click()">
        <span>{{ locales.selectPictureButtonText }}</span>
      </button>
    </slot>
    <input
      class="hidden"
      aria-hidden="true"
      ref="uploadInput"
      type="file"
      accept="image/jpg, image/jpeg, image/png, image/gif"
      @change="selectFile"
    />

    <!-- A Popup for cropping -->
    <!-- You can replace it with the framework's Modal component -->
    <q-dialog class="modal-wrap" v-model="isShowModal">
      <q-card>
        <q-toolbar class="q-px-md">
          <q-toolbar-title>
            {{ locales.modal.title }}
          </q-toolbar-title>
        </q-toolbar>

        <q-card-section class="q-pa-none">
          <VuePictureCropper
            :boxStyle="{
              width: '100%',
              height: '100%',
              backgroundColor: '#f8f8f8',
              margin: 'auto',
              overflow: 'hidden',
              maxHeight: '75vh',
            }"
            :img="pic"
            :options="{
              viewMode: 2,
              dragMode: 'move',
              aspectRatio,
            }"
            @ready="ready"
          />
        </q-card-section>
        <q-card-actions class="flex justify-center full-width">
          <q-btn
            dense
            @click="exec(btn)"
            :color="
              buttons[btn]?.color ?? locales.modal[btn]?.color ?? 'primary'
            "
            :key="i"
            v-for="(btn, i) in buttonList"
          >
            {{
              buttons[btn]?.label ??
              buttons[btn] ??
              locales.modal[btn]?.label ??
              btn
            }}
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import VuePictureCropper, { cropper } from 'vue-picture-cropper';

const emit = defineEmits(['result']);
const props = defineProps({
  aspectRatio: {
    default: 16 / 9,
  },
  fileName: {
    type: String,
    default: 'file',
  },
  /**
   * @description An array or object map of allowed buttons.
   * @type {Object[]|Array<T>}
   * @example ["cancel", "clear", "reset", "crop"]
   * @example {cancel: 'Cancel', crop: 'Accept'}
   * @example {
   *              cancel: {
   *                  label: 'Cancel',
   *                  color: 'red',
   *              },
   *              crop: {
   *                  label: 'Accept',
   *                  color: 'green',
   *              }
   *          }
   */
  buttons: {
    type: [Array, Object],
    default: () => ['cancel', 'clear', 'reset', 'crop'],
  },
});

const locales = reactive({
  selectPictureButtonText: 'Select Picture',
  modal: {
    title: 'Picture Cropping',
    cancel: { label: 'Cancel', color: 'red' },
    clear: { label: 'Clear', color: 'red' },
    reset: { label: 'Reset', color: 'primary' },
    crop: { label: 'Crop', color: 'green' },
  },
  fileName: props.fileName,
});

const buttonList = Array.isArray(props.buttons)
  ? props.buttons
  : Object.keys(props.buttons);

const isShowModal = ref(false);
const uploadInput = ref(null);
const pic = ref('');
const result = reactive({
  dataURL: '',
  blobURL: '',
});

/**
 * Select the picture to be cropped
 */
const selectFile = (e) => {
  // Reset last selection and results
  pic.value = '';
  result.dataURL = '';
  result.blobURL = '';

  // Get selected files
  const { files } = e.target;
  if (!files || !files.length) return;

  // Convert to dataURL and pass to the cropper component
  const file = files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    // Update the picture source of the `img` prop
    pic.value = String(reader.result);

    // Show the modal
    isShowModal.value = true;

    // Clear selected files of input element
    if (!uploadInput.value) return;
    uploadInput.value.value = '';
  };
};

/**
 * Get cropping results
 */
const getResult = async () => {
  if (!cropper) return;
  const base64 = cropper.getDataURL();
  const blob = await cropper.getBlob();
  if (!blob) return;

  const file = await cropper.getFile({
    fileName: locales.fileName,
  });

  emit('result', { base64, blob, file });
  result.dataURL = base64;
  result.blobURL = URL.createObjectURL(blob);
  isShowModal.value = false;
};

/**
 * Clear the crop box
 */
const clear = () => {
  if (!cropper) return;
  cropper.clear();
};

/**
 * Reset the default cropping area
 */
const reset = () => {
  if (!cropper) return;
  cropper.reset();
};

/**
 * The ready event passed to Cropper.js
 */
const ready = () => {
  console.log('Cropper is ready.');
};

const exec = (type) => {
  const actions = {
    cancel: () => (isShowModal.value = false),
    clear: () => clear(),
    reset: () => reset(),
    crop: () => getResult(),
  };

  typeof actions[type] == 'function' && actions[type]();
};
</script>
