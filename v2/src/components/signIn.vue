<template>
  <el-dialog
    title="签到"
    :visible.sync="dialogTableVisible"
    custom-class="signin-bar"
    v-loading.fullscreen="loading"
    :before-close="handleClose"
  >
    <div class="signin-map">
      <!-- daily -->
      <ul class="signin-daily signin-item">
        <li
          :class="['signin-daily-item signin-li', {'fn-check':item.day <= signInList.count}]"
          v-for="item in awardList.daily"
          :key="item.d"
        >
          <i class="signin-daily-count">{{item.day}}</i>
          <img
            v-if="item.id"
            :src="'//www.dadadiu.cn/common/tool/' + item.id + '.png'"
            :alt="item"
            class="signin-pic"
          >
        </li>
      </ul>
      <!-- up -->
      <ul class="signin-up signin-item">

        <li
          :class="['signin-daily-item signin-li', {'fn-check':item.day <= signInList.count}]"
          v-for="item in awardList.up"
          :key="item.d"
        >
          <img
            v-if="item.id"
            :src="'//www.dadadiu.cn/common/tool/' + item.id + '.png'"
            :alt="item.id"
            class="signin-pic"
          >
          <p class="signin-up-count">{{item.day}}天</p>
        </li>
      </ul>
    </div>

    <div class="signin-desc">
      <div class="signin-desc-item">
        <p><i class="iconfont">&#xe604;</i> {{signInList.count}}/{{awardList.daily.length}}</p>
        <el-button
          type="primary"
          size="mini"
          :disabled="signInList.isToday"
          @click="checkInFn"
        >签到</el-button>
      </div>

      <div
        class="signin-desc-item"
        v-if="toolData.pushCard"
      >
        <p><i class="iconfont">&#xe628;</i> {{toolData.pushCard.count}}</p>
        <el-button
          type="primary"
          size="mini"
          :disabled="toolData.pushCard.count == 0"
          @click="pushFn"
        >补签</el-button>
      </div>

      <div
        class="signin-desc-item"
        v-if="toolData.point"
      >
        <p><i class="iconfont">&#xe658;</i> {{toolData.point.count}}</p>
        <el-button
          type="info"
          size="mini"
          disabled="false"
        >兑换</el-button>
      </div>
    </div>

  </el-dialog>

</template>

<script>
import getData from "@/assets/js/getData";

export default {
  props: {
    dialogTableVisible: { type: Boolean },
    closeFn: { type: Function }
  },
  data() {
    return {
      loading: true,
      awardList: {
        up: [],
        daily: []
      },
      signInList: {
        count: 0,
        isToday: false,
        id: 0
      },
      toolData: {}
    };
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {
        this.loading = true;

      // 奖励列表
      getData.awardDaily(res => {
        if (res.code == 0) {
          this.awardList = res.data;
          return;
        }

        this.$message(res.msg);
      });

      // 已签列表
      getData.signInList(res => {

        if (res.code == 0) {
          this.signInList = res.data;
          return;
        }

        this.$message(res.msg);
      });

      // 道具信息
      getData.userTool(res => {
        this.loading = false;

        if (res.code == 0) {
          this.toolData = res.data;
          return;
        }

        this.$message(res.msg);
      });

    },

    // 签到
    checkInFn() {
      this.loading = true;
      getData.signInCheckIn(
        {
          id: this.signInList.id
        },
        res => {
          this.loading = false;

          if (res.code == 0) {
            this.$message({
              type: "success",
              message: res.msg
            });

            this.toolData= res.list;
            this.signInList.count += 1;
            this.signInList.isToday = !this.signInList.isToday;
            return;
          }

          this.$message(res.msg);
        }
      );
    },

    pushFn() {
      this.loading = true;

      // 当前月是否需要补签

      // 补签卡是否足够

      getData.signInPush(
        {
          id: this.signInList.id
        },
        res => {
          this.loading = false;
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.signInList.count += 1;
            this.toolData= res.list;
            return;
          }
          this.$message(res.msg);
        }
      );
    },

    handleClose(done) {
      this.$emit("closeFn");
    }
  }
};
</script>

<style>
</style>
