<template>
  <q-item-label class="q-py-xs" header v-if="title">{{ title }}</q-item-label>

  <q-item v-ripple="!!clickable" :clickable="clickable" v-bind="$attrs">
    <q-item-section avatar>
      <q-avatar rounded>
        <img :src="person.imageUrl" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>
        {{ person.name }}
        <q-badge v-if="iCan(undefined, person as User)">
          <q-icon name="admin_panel_settings" />&nbsp;Admin
        </q-badge>
      </q-item-label>
      <q-item-label caption lines="1" v-if="person.email">
        {{ person.email }}
      </q-item-label>
      <q-item-label caption lines="1" v-if="person.phone && !hidePhone">
        {{ person.phone }}
      </q-item-label>
    </q-item-section>
    <!-- <q-item-section side>
      <q-icon name="chat_bubble" color="grey" />
    </q-item-section> -->
  </q-item>
</template>

<script setup lang="ts">
import { Person, User } from 'app/repository/models';
import { iCan } from 'src/utils/proccessor';

defineProps<{
  title?: string;
  clickable?: boolean;
  hideEmail?: boolean;
  hidePhone?: boolean;
}>();

const person = defineModel<User | Person>('person', {
  default: {},
});
</script>
