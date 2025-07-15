<template>
  <div>
    <section class="loginPage register">
      <div class="container">
        <div
          :class="
            submissionForm.type === 'conversion' ? 'class_' : 'grid order'
          "
        >
          <div class="left">
            <h4 class="section_header">Welcome to NGVMS.</h4>
            <div class="auth q-mt-lg">
              <form
                @submit.prevent="
                  submissionForm.type === 'conversion'
                    ? createAccountForConversionCenter()
                    : createAccountForConversionCenter()
                "
                id="form"
              >
                <div class="input-box active-grey">
                  <label class="input-label">Full name</label>
                  <input
                    v-model="submissionForm.name"
                    required
                    type="text"
                    class="input-1"
                    minlength="3"
                  />
                </div>
                <span class="error-message" v-if="errors.name">{{
                  errors.name
                }}</span>

                <div class="grid last">
                  <div>
                    <div class="input-box active-grey">
                      <label class="input-label">Email</label>
                      <input
                        v-model="submissionForm.email"
                        type="email"
                        required
                        class="input-1"
                        autocomplete="username"
                      />
                    </div>
                    <span class="error-message q-mb-xs" v-if="errors.email">{{
                      errors.email
                    }}</span>
                  </div>

                  <div>
                    <div class="input-box active-grey">
                      <label class="input-label">Phone Number</label>
                      <input
                        v-model="submissionForm.phone"
                        required
                        type="tel"
                        class="input-1"
                        maxlength="11"
                        placeholder="11-digit phone number"
                      />
                    </div>
                    <span
                      class="error-message q-mb-xs"
                      v-if="
                        submissionForm.phone &&
                        submissionForm.phone.length !== 11
                      "
                      >Phone number must be exactly 11 digits</span
                    >
                    <span class="error-message q-mb-xs" v-if="errors.phone">{{
                      errors.phone
                    }}</span>
                  </div>
                </div>

                <div class="input-box last active-grey">
                  <label class="input-label">Password</label>
                  <div class="row items-center justify-between no-wrap">
                    <input
                      v-model="submissionForm.password"
                      :type="togglePassword ? 'password' : 'text'"
                      class="input-1"
                      autocomplete="new-password"
                      minlength="6"
                    />
                    <q-btn @click="togglePassword = !togglePassword" flat>
                      <i class="fa-regular fa-eye-slash"></i>
                    </q-btn>
                  </div>
                </div>
                <span
                  class="error-message"
                  v-if="
                    submissionForm.password &&
                    submissionForm.password.length < 6
                  "
                  >Password must be at least 6 characters</span
                >
                <span class="error-message" v-if="errors.password">{{
                  errors.password
                }}</span>

                <div class="input-box last active-grey">
                  <label class="input-label">Confirm Password</label>
                  <div class="row items-center justify-between no-wrap">
                    <input
                      v-model="submissionForm.password_confirmation"
                      :type="togglePassword ? 'password' : 'text'"
                      class="input-1"
                      autocomplete="new-password"
                    />
                    <q-btn @click="togglePassword = !togglePassword" flat>
                      <i class="fa-regular fa-eye-slash"></i>
                    </q-btn>
                  </div>
                </div>
                <span
                  class="error-message"
                  v-if="
                    submissionForm.password_confirmation &&
                    submissionForm.password !==
                      submissionForm.password_confirmation
                  "
                  >Passwords do not match</span
                >
                <span
                  class="error-message"
                  v-if="errors.password_confirmation"
                  >{{ errors.password_confirmation }}</span
                >

                <div class="input-box last active-grey">
                  <label class="input-label">User Type</label>
                  <div class="row items-center justify-start q-pr-sm">
                    <q-radio
                      v-model="submissionForm.type"
                      :key="x"
                      :val="x"
                      :label="x.replace(':x', '').toUpperCase()"
                      :disable="x.includes(':x')"
                      v-for="x in [
                        'dealer',
                        'son',
                        'naddc',
                        'frsc',
                        'nmdpra',
                        'finance:x',
                        'insurance:x',
                        'conversion',
                      ]"
                    />
                  </div>
                </div>

                <div v-if="submissionForm.type === 'conversion'">
                  <div class="input-box active-grey">
                    <label class="input-label">Name of Conversion Center</label>
                    <input
                      v-model="submissionForm.name_of_conversion_center"
                      required
                      minlength="3"
                      class="input-1"
                    />
                  </div>
                  <div>
                    <div class="input-box active-grey">
                      <label class="input-label">CAC Number</label>
                      <input
                        v-model="submissionForm.cac_number"
                        required
                        maxlength="8"
                        class="input-1"
                        placeholder="8-digit CAC number"
                      />
                    </div>
                    <span
                      class="error-message"
                      v-if="
                        submissionForm.cac_number &&
                        submissionForm.cac_number.length !== 8
                      "
                      >CAC number must be exactly 8 digits</span
                    >
                  </div>
                  <div>
                    <div class="input-box active-grey">
                      <label class="input-label">Contact Number</label>
                      <input
                        v-model="submissionForm.contact_number"
                        required
                        maxlength="11"
                        class="input-1"
                        placeholder="11-digit contact number"
                      />
                    </div>
                    <span
                      class="error-message"
                      v-if="
                        submissionForm.contact_number &&
                        submissionForm.contact_number.length !== 11
                      "
                      >Contact number must be exactly 11 digits</span
                    >
                  </div>
                  <div>
                    <div class="input-box active-grey">
                      <label class="input-label">Full Address</label>
                      <input
                        v-model="submissionForm.full_address"
                        required
                        minlength="10"
                        class="input-1"
                      />
                    </div>
                  </div>
                  <div class="grid last">
                    <div class="input-box active-grey">
                      <label class="input-label">State</label>
                      <select
                        v-model="submissionForm.state"
                        required
                        class="input-1"
                      >
                        <option value="" disabled>Select state</option>
                        <option
                          v-for="state in nigeriaStates"
                          :key="state.name"
                          :value="state.name"
                        >
                          {{ state.name }}
                        </option>
                      </select>
                    </div>
                    <div class="input-box active-grey">
                      <label class="input-label">LGA</label>
                      <select
                        v-model="submissionForm.lga"
                        required
                        class="input-1"
                      >
                        <option value="" disabled>Select LGA</option>
                        <option
                          v-for="lga in nigeriaStates.find(
                            (s) => s.name === submissionForm.state,
                          )?.lgas || []"
                          :key="lga"
                          :value="lga"
                        >
                          {{ lga }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="input-box active-grey">
                    <label class="input-label">TIN</label>
                    <input
                      v-model="submissionForm.tin"
                      required
                      minlength="5"
                      class="input-1"
                    />
                  </div>
                  <div class="input-box active-grey">
                    <label class="input-label">CAC Certificate</label>
                    <q-file
                      accept=".jpg,.png,.jpeg,.pdf,.docx"
                      label="Upload"
                      use-chips
                      v-model="submissionForm.cac_certificate"
                    >
                      <template v-slot:prepend>
                        <q-icon name="attach_file" />
                      </template>
                    </q-file>
                  </div>
                  <div class="input-box active-grey">
                    <label class="input-label">NADDC Certificate</label>

                    <q-file
                      accept=".jpg,.png,.jpeg,.pdf,.docx"
                      label="Upload"
                      use-chips
                      v-model="submissionForm.naddc_certificate"
                    >
                      <template v-slot:prepend>
                        <q-icon name="attach_file" />
                      </template>
                    </q-file>
                  </div>
                </div>

                <div class="row items-center justify-between">
                  <div>
                    <q-checkbox
                      v-model="submissionForm.accept"
                      :rules="acceptTermsRule"
                    >
                      I agree to all the
                      <span class="text-negative">Terms</span> and
                      <span class="text-negative">Privacy Policies</span>
                    </q-checkbox>
                  </div>
                  <span class="error-message" v-if="errors.accept">{{
                    errors.accept
                  }}</span>
                </div>

                <div class="submit_btn row justify-center q-mt-lg q-mb-lg">
                  <q-btn
                    no-caps
                    no-wrap
                    :loading="loading"
                    type="submit"
                    flat
                    class="full-width bg-secondary review_small bold text-white"
                  >
                    Register
                  </q-btn>
                  <p class="text_poppins q-mt-sm">
                    Already have an account?
                    <router-link
                      :to="{ name: 'login' }"
                      class="text-negative text_serrat"
                    >
                      Login
                    </router-link>
                  </p>
                </div>

                <div class="clear"></div>
              </form>
            </div>
          </div>
          <div class="right">
            <img src="/images/auth.jpeg" alt="" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { useForm } from 'alova/client';
import { RequestErrors } from 'app/repository/models';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { registerRequest } from 'src/data/userRequests';
import { reboot, refreshUser } from 'src/utils/proccessor';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import nigeriaStates from 'src/utils/stateHelper';

const errors = computed(
  () => (error.value as unknown as RequestErrors)?.errors || {},
);
const router = useRouter();
const togglePassword = ref(true);
const acceptTermsRule = [(val: any) => val || 'You must accept terms'];

let submissionForm = ref({
  type: 'dealer',
  name: '',
  email: '',
  phone: '',
  accept: false,
  password: '',
  password_confirmation: '',
  name_of_conversion_center: '',
  cac_number: '',
  contact_number: '',
  full_address: '',
  state: '',
  lga: '',
  tin: '',
  cac_certificate: null,
  naddc_certificate: null,
});

const { send, form, error, loading, onSuccess } = useForm(registerRequest, {
  store: true,
  initialForm: {
    name: '',
    email: '',
    phone: '',
    accept: false,
    password: '',
    password_confirmation: '',
    name_of_conversion_center: '',
    cac_number: '',
    contact_number: '',
    full_address: '',
    state: '',
    lga: '',
    tin: '',
    cac_certificate: null,
    naddc_certificate: null,
    // type: 'dealer',
  },
  resetAfterSubmitting: true,
});

onSuccess(() => {
  loading.value = true;
  reboot().then(() => {
    loading.value = false;
    router.replace({ name: 'user.dashboard' });
  });
});

const createAccountForConversionCenter = () => {
  loading.value = true;
  const formData = new FormData();

  // Append core registration fields
  formData.append('name', submissionForm.value.name);
  formData.append('email', submissionForm.value.email);
  formData.append('phone', submissionForm.value.phone);
  formData.append('password', submissionForm.value.password);
  formData.append(
    'password_confirmation',
    submissionForm.value.password_confirmation,
  );
  formData.append('type', submissionForm.value.type);
  formData.append('accept', String(submissionForm.value.accept));

  // Append conversion metadata with proper prefixing
  const conversionFields = [
    'name_of_conversion_center',
    'cac_number',
    'contact_number',
    'full_address',
    'state',
    'lga',
    'tin',
  ];

  if (submissionForm.value.type === 'conversion') {
    conversionFields.forEach((key) => {
      const value =
        submissionForm.value[key as keyof typeof submissionForm.value];
      if (value !== null && value !== undefined) {
        formData.append(`conversion_metadata[${key}]`, String(value));
      }
    });

    if (submissionForm.value.cac_certificate) {
      formData.append(
        'conversion_metadata[cac_certificate]',
        submissionForm.value.cac_certificate,
      );
    }

    if (submissionForm.value.naddc_certificate) {
      formData.append(
        'conversion_metadata[naddc_certificate]',
        submissionForm.value.naddc_certificate,
      );
    }
  }

  api
    .post(`/auth/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(({ data }) => {
      loading.value = false;
      refreshUser();
      router.replace({ name: 'user.dashboard' });
      Notify.create({
        message: data.message || 'Successful',
        color: 'green',
        position: 'top',
      });
    })
    .catch(({ response }) => {
      loading.value = false;
      Notify.create({
        message: response?.data?.message || 'An error occurred',
        color: 'red',
        position: 'top',
      });
    });
};
</script>

<style lang="scss" scoped>
.q-mb-xs {
  margin-bottom: 4px;
}
.error-message {
  color: #e53935;
  font-size: 13px;
  margin-top: 4px;
  display: block;
}

.class_ {
  display: grid;
  place-items: center;
  align-items: center;
  width: 100%;
}
</style>
