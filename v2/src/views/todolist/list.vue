<template>
  <div class="wrap">
    <div class="m-title">
      <p>
        <el-button :class="{'el-button--primary' : isShow === 'today'}" @click="isShow = 'today'">今天</el-button>
        <el-button :class="{'el-button--primary' : isShow === 'future'}" @click="isShow = 'future'">未来</el-button>
        <el-button :class="{'el-button--primary' : isShow ==='history'}" @click="isShow = 'history'">过去</el-button>
      </p>
      <el-button icon="el-icon-plus" @click="isAddShow = !isAddShow">添加</el-button>
    </div>
    <ViewAdd :class="[{'fn-show' : isAddShow}]" @closeFn="isAddShow = !isAddShow"/>

    <!-- today -->
    <ViewToday v-if="isShow == 'today'" />

    <!-- future -->
    <ViewFuture v-if="isShow == 'future'" />

    <!-- history -->
    <ViewHistory v-if="isShow == 'history'"/>

  </div>
</template>

<script>
import ViewAdd from "./components/add.vue";
import ViewToday from "./components/today.vue";
import ViewFuture from "./components/future.vue";
import ViewHistory from "./components/history.vue";

export default {
  components: { ViewToday, ViewFuture, ViewHistory,ViewAdd },
  data() {
    return {
      isShow: "future",
      isAddShow : false
    };
  },

  mounted() {},

  methods: {}
};
</script>
