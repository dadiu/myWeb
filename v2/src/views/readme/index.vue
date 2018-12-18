<template>
  <!-- <router-view/> -->
  <div
    class="wrap"
    id="md-bar"
  >

    <div id="md-nav">
      <el-menu
        :router="true"
        class="el-menu-vertical-demo"
      >

        <!-- MongoDB -->
        <el-submenu index="mongodb">
          <template slot="title">
            <i class="iconfont">&#xe63e;</i>
            <span slot="title">MongoDB</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="mongodb-user">用户管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 接口文档 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="iconfont">&#xe740;</i>
            <span>接口文档</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="user">账号</el-menu-item>
            <el-menu-item index="todo">每日一清</el-menu-item>
            <el-menu-item index="message">便签</el-menu-item>
            <el-menu-item index="aunt">秘密基地</el-menu-item>
            <el-menu-item index="admin">控制台</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- centos7.4 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="iconfont">&#xe60e;</i>
            <span>centos7.4</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="centos7-node">node - 安装</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>

    <!-- main -->
    <router-view id="md-main" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {
    let page = this.$route.params.page;
    if (typeof page == "undefined") {
      // page = 'admin';
      this.$router.push({
        path: "/md/mongodb"
      });
      return;
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/styles/markdown.scss";
</style>
