<template>

  <header id="g-hd">
    <router-link
      :to="{name:'home'}"
      class="hd-logo"
    >
      <img
        src="~@/assets/img/logo.jpg"
        alt="logo"
        height="60"
      >
    </router-link>
    <nav class="hd-nav">
      <router-link
        :to="{name : 'todo.list'}"
        class="nav-item"
      >
        <i class="el-icon-bell"></i>
        每日一清
      </router-link>
      <router-link
        :to="{name : 'message'}"
        class="nav-item"
      >
        <i class="el-icon-document"></i>
        便签
      </router-link>
      <router-link
        :to="{name : 'secret.aunt'}"
        class="nav-item"
        v-if="isGirl"
      >
        <i class="iconfont">&#xe7d1;</i>
        秘密基地
      </router-link>
      <router-link
        :to="{name : 'md'}"
        class="nav-item"
      >
        <i class="el-icon-view"></i>
        自助手册
      </router-link>
      <router-link
        :to="{name : 'admin'}"
        class="nav-item"
        v-if="isAdmin != 0"
      >
        <i class="el-icon-setting"></i>
        控制台
      </router-link>
    </nav>

    <!-- user info -->
    <p
      v-if="isLogin"
      class="hd-right"
    >
      <!-- 登录-->
      <span class="hd-nick">
        <i class="iconfont">&#xe63a;</i>
        {{nick}}
      </span>
      <el-button @click="dialogSignIn=true" size="mini">
        签到
      </el-button>
      <el-button
        @click="logoutFn"
        class="hd-logout" size="mini">
        注销
      </el-button>
    </p>

    <p
      v-else
      class="hd-right"
    >
      <!-- 未登录 -->
      <router-link
        tag="button"
        class="el-button el-button--default el-button--small"
        :to="{name:'register'}"
      >
        注册
      </router-link>
      <router-link
        tag="button"
        class="el-button el-button--default el-button--small"
        :to="{name:'login'}"
      >
        <i class="iconfont">&#xe63a;</i>登录
      </router-link>
    </p>

    <ViewSignIn
      v-if="dialogSignIn"
      :dialogTableVisible="dialogSignIn"
      @closeFn="dialogSignIn=false"
      :toolData="toolData"
    />
  </header>
</template>

<script>
import event from "@/util/event";
import getData from "@/assets/js/getData";
import { ViewSignIn } from "@/components/";
export default {
  components: { ViewSignIn },
  data() {
    return {
      isLogin: false,
      nick: "",
      toolData:{},
      isAdmin: 0,
      isGirl: false,
      dialogSignIn: true
    };
  },

  mounted() {
    this.userInfoFn();

    // 绑定全局
    event.$on("reset-login", () => {
      this.userInfoFn();
    });
  },

  methods: {
    userInfoFn() {
      let self = this;

      getData.userInfo(res => {
        self.nick = res.data.nick;
        self.toolData = res.data.tool;
        self.isAdmin = res.data.power;

        //  {0:保密; 1:女; 2：男}
        self.isGirl = res.data.sex == 2 ? false : true;
        self.isLogin = true;
      });
    },

    logoutFn() {
      let self = this;

      getData.userLogout(res => {
        self.nick = "";
        self.isLogin = false;
        this.$router.push("/");
      });
    }
  }
};
</script>

<style>
</style>
