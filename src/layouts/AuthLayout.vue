<template>
  <q-layout view="lHh Lpr lFf" class="authlayout">
    <header class="header">
      <div class="container">
        <div
          :class="
            route.name === 'register' ? 'row justify-end' : 'row justify-start'
          "
        >
          <div style="gap: 3rem" class="left row no-wrap items-center">
            <router-link :to="{ name: 'home' }"
              ><div class="logo row items-center">
                <img src="/images/logo.svg" alt="" /></div
            ></router-link>
          </div>
        </div>
      </div>
    </header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRoute } from 'vue-router';

let route = useRoute();
</script>
