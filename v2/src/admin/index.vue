<template>
  <div
    id="admin"
    v-if="!isPower"
    v-loading="isLoading"
  >
    <!-- side menu -->
    <div class="admin-side-menu">

      <router-link
        class="admin-side-item"
        v-for="item in menuList"
        :key="item.m"
        :to="{name : item.path}"
      >
        {{item.desc}}
      </router-link>
    </div>
    <!-- container -->
    <div class="admin-main">
      <router-view />
    </div>
  </div>
  <div
    v-else
    id="admin-error"
  >
    <p><img src="~@/assets/img/error.jpg"></p>
    无管理员权限，禁止入内
  </div>
</template>


<script>
import event from "@/util/event";
import menuData from "@/admin/js/menu";
import getData from "@/admin/js/getData";

export default {
  data() {
    return {
      isLoading: false,
      isPower: false, // 是否有查看权限
      menuList: []
    };
  },

  mounted() {
    this.isLoading = true;

    getData.userPower(res => {
      this.isLoading = false;
      // 有权限
      if (res.code == 0) {
        this.menuInit(res.data);
        return;
      }
      // 无权限
      this.isPower = true;
    });
  },

  methods: {
    menuInit(data) {
      let newMenu = {};

      if (data[0] == 99) {
        this.menuList = menuData;
        this.$router.push({
          name: menuData["userlist"].path
        });
        return;
      }

      // 其他
      data.forEach(element => {

        if (menuData[element]) {
      console.log(element);
          newMenu[element] = menuData[element];
        }
      });


      this.menuList = newMenu;
      this.$router.push({
        name: newMenu[data[0]].path
      });
    }
  }
};
</script>

<style lang="scss">
@import "~@/admin/styles/admin.scss";
</style>

