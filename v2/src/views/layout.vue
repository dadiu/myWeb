<template>
  <div class="wrap">    <!-- 首页 待完善 -->
    <p>当前注册人数：{{count.user}}</p>
    <br/>
    <p>当前todo条数：{{count.todo}}</p>

  </div>
</template>

<script>
import getData from "@/assets/js/getData";
export default {
  data() {
    return {
      count: {
        user : 0,
        todo :0
      }
    };
  },

  mounted() {
    getData.baseInfo(res => {
      // console.log(res);
      this.count = res.data;
    });
  },

  methods: {}
};
</script>

<style>
</style>
