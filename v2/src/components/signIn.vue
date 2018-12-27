<template>
  <el-dialog
    title="签到"
    :visible.sync="dialogTableVisible"
    custom-class="signin-bar"
  >

    <div class="signin-desc">
      <p><span>
          <i class="iconfont">&#xe658;</i> 0
        </span>
        <span>
          <i class="iconfont">&#xe628;</i> 0
        </span>
      </p>
      <p>
        <a href="javascript:;">business</a>
        <a href="javascript:;">push</a>
        <a href="javascript:;">check in</a>
      </p>
    </div>
    <!-- daily -->
    <ul class="signin-daily signin-item">
      <li
        :class="['signin-daily-item signin-li', {'fn-check':idx < signInList.count}]"
        v-for="(item,idx) in awardList.daily"
        :key="item.d"
      >
        <img
          :src="'//www.dadadiu.cn/common/tool/' + item + '.png'"
          :alt="item"
          class="signin-pic"
        >
      </li>
    </ul>

    <div class="signin-desc">
      <span>本月签到 ： {{signInList.count}}/{{awardList.daily.length}}</span>
      <span>本月缺勤 ： {{lessCount}} </span>
    </div>
    <!-- up -->
    <ul class="signin-up signin-item">

      <li
        :class="['signin-daily-item signin-li', {'fn-check':item.count < signInList.count}]"
        v-for="item in awardList.up"
        :key="item.d"
      >
        <img
          :src="'//www.dadadiu.cn/common/tool/' + item.id + '.png'"
          :alt="item.id"
          class="signin-pic"
        >
        <p class="signin-up-count">{{item.count}}天</p>
      </li>
    </ul>
    <el-progress
      :percentage="percentageCount"
      :text-inside="true"
      color="#e0620d"
    ></el-progress>

  </el-dialog>

</template>

<script>
import getData from "@/assets/js/getData";

export default {
  props: {
    dialogTableVisible: { type: true }
  },
  data() {
    return {
      lessCount: 0,
      percentageCount: false,
      awardList: {
        up: [],
        daily: []
      },
      signInList: {
        count: 0,
        isToday: false,
        id: 0
      }
    };
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {
      getData.awardDaily(res => {
        this.awardList = res.data;
      });

      getData.signInList(res => {
        this.signInList = res.data;
        this.lessCount = new Date().getDate() - res.data.count;

        // [待优化 daily依赖awardDaily]
        this.percentageCount = parseInt(
          (res.data.count / this.awardList.daily.length) * 100
        );
      });
    }
  }
};
</script>

<style>
</style>
