<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- nav -->
    <ViewHeader />

    <!-- main -->
    <router-view />
  </div>
</template>

<script>
import ViewHeader from '@/views/header.vue';
import '@/assets/js/master.js';
export default {
  name: "App",
  components : {ViewHeader},
};
</script>

<style lang="sass">
@import '~@/assets/styles/main.scss';
</style>

