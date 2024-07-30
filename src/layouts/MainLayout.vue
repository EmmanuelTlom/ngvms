<template>
  <q-layout view="lHh Lpr lFf">
    <header class="header bg-grey-3">
      <div class="container">
        <div class="row justify-between">
          <div style="gap: 3rem" class="left row no-wrap items-center">
            <div class="logo row items-center">
              <img src="/images/logo.svg" alt="" />
            </div>
          </div>

          <div class="toggle_btn">
            <q-btn flat>
              <i class="fa-solid fa-bars"></i>
            </q-btn>
          </div>
        </div>
      </div>
    </header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup></script>
