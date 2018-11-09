<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- nav -->
    <el-header id="g-hd">
      <a href="/">logo</a>
      <nav id="g-nav">
        <router-link :to="{name : 'todolist.list'}">todolist</router-link>
      </nav>
      <p>
        <router-link :to="{name:'register'}">注册</router-link>
        <router-link :to="{name:'login'}">登录</router-link>
      </p>
    </el-header>
    <!-- main -->
    <router-view />
  </div>
</template>

<script>
import '@/assets/js/master.js';
export default {
  name: "App"
};
</script>

<style lang="sass">
@import '~@/assets/styles/main.scss';
</style>

