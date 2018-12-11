<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->

    <!-- nav -->
    <ViewHeader />

    <!-- main -->
    <router-view class="c-main" />

    <!-- footer -->
    <ViewFooter />
  </div>
</template>

<script>

import ViewHeader from "@/views/header";
import ViewFooter from "@/views/footer";
import "@/assets/js/master.js";
export default {
  name: "App",
  components: { ViewHeader, ViewFooter }
};
</script>

<style lang="sass">
@import '~@/assets/styles/main.scss';
</style>

