<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->

    <!-- nav -->
    <ViewHeader @showSignIn="dialogSignIn=true"/>

    <!-- main -->
    <router-view class="c-main" />

    <!-- signin -->
    
    <ViewSignIn
      v-if="dialogSignIn"
      :dialogTableVisible="dialogSignIn"
      @closeFn="dialogSignIn=false"
    />

    <!-- footer -->
    <ViewFooter />
  </div>
</template>

<script>

import ViewHeader from "@/views/header";
import ViewFooter from "@/views/footer";
import { ViewSignIn } from "@/components/";

import "@/assets/js/master.js";
export default {
  name: "App",
  components: { ViewHeader, ViewFooter,ViewSignIn  },
  data(){
    return{
      dialogSignIn: false,
    }
  }
};
</script>

<style lang="sass">
@import '~@/assets/styles/main.scss';
</style>

