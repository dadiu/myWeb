<template>
  <div class="wrap">
    <!-- 首页 待完善 -->

    <div class="home-item">
      <p class="home-title">网站数据</p>
      <p>当前注册人数：{{count.user}}</p>
      <p>当前每日一清数：{{count.todo}}</p>
      <p>当前便签数：{{count.message}}</p>
    </div>

    <el-row :gutter="20">
      <el-col :span="16">
        <div class="home-item">
          <p class="home-title">技术栈</p>
          <p>前端：vue + element-ui</p>
          <p>后台：node + express</p>
          <p>数据库：mongodb</p>
        </div>

        <div class="home-item">
          <p class="home-title">系统介绍</p>
          <p>每日一清 ： 每日需要做的事情的增删改查</p>
          <p>便签 : 未来不确定哪天需要做的事备忘，可移动只每日一清，可标记"缓急"</p>
          <p>秘密基地 ：记录每月姨妈等</p>
          <p>控制台 ：管理员系统</p>
        </div>

      </el-col>

      <el-col :span="8">
        <div class="home-item">
          <p class="home-title">鸣谢</p>
          <p>
            <el-tag>立哥</el-tag>
            <el-tag>KSB</el-tag>
            <el-tag>王靖</el-tag>
          </p>
        </div>

        <div class="home-item">
          <p class="home-title">作者</p>
          <p class="home-flex">
            <i class="iconfont">&#xe63a;</i>
            大丢
          </p>
          <p class="home-flex">
            <i class="iconfont">&#xe71f;</i>
            前端开发（转全栈中...）
          </p>
          <p class="home-flex">
            <i class="iconfont">&#xe67b;</i>
            <a href="mailto:1004609378@qq.com" class="m-link">1004609378@qq.com</a>
          </p>
          <p class="home-flex">
            <i class="iconfont">&#xe68a;</i>
            宅，猫奴。<br/>
            学过3年动漫，干过1年设计，1年产品&前端开发，5年纯前端开发。
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import getData from "@/assets/js/getData";
export default {
  data() {
    return {
      count: {
        user: 0,
        todo: 0,
        message:0,
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
