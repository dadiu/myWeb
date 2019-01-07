<template>
  <div
    class="award-signIn"
    v-loading.fullscreen="isLoading"
  >
    <!-- form -->
    <div class="award-signIn-bar">
      <p class="award-title">奖励配置表单</p>
      <el-form
        class="award-form"
        label-position="left"
      >
        <!-- 月份 -->
        <el-form-item label="选择日期：">
          <el-date-picker
            v-model="list.month"
            type="month"
            placeholder="选择月"
            value-format="yyyy-MM"
            @change="init"
          >
          </el-date-picker>
        </el-form-item>

        <!-- 道具id -->
        <el-form-item
          class="award-ipt-bar award-daily"
          label="每天奖励："
        >
          <el-input
            v-for="item in list.daily"
            :key="item.daily"
            v-model="item.id"
            maxlength="5"
            class="award-ipt-min"
            placeholder="id"
            :disabled="submitType == 'read'"
          ></el-input>
        </el-form-item>

        <!-- 累计奖励 -->
        <el-form-item class="award-ipt-bar">
          <p>累计奖励：</p>
          <div class="award-form-inline">

            <el-form
              v-for="item in list.up"
              :key="item.up"
            >

              <!-- 天数 -->
              <el-form-item>
                <el-input
                  type="type"
                  v-model="item.day"
                  class="award-ipt-min"
                  :disabled="submitType == 'read'"
                >
                  <span slot="suffix">
                    天
                  </span>
                </el-input>
              </el-form-item>

              <!-- id -->
              <el-form-item>
                <el-input
                  type="type"
                  v-model="item.id"
                  class="award-ipt-min"
                  maxlength="5"
                  placeholder="id"
                  :disabled="submitType == 'read'"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-form-item>
      </el-form>
      <div class="award-form-btn">
        <el-button
          type="primary"
          @click="createFn"
          v-if="submitType == 'create'"
        >创建</el-button>
        <el-button
          type="primary"
          @click="updetaFn"
          v-if="submitType == 'update'"
        >更新</el-button>
      </div>
    </div>

    <!-- 预览 -->
    <div class="award-signIn-bar">

      <!-- 每天奖励 -->
      <p class="award-title">奖励预览 </p>
      <ul class="award-preview">
        <li
          class="award-preview-item"
          v-for="item in list.daily"
          :key="item.daily"
        >
          <img
            :src="'//www.dadadiu.cn/common/tool/' + item.id + '.png'"
            :alt="item.id | filterTool('name')"
            v-if="item.id && item.id != ''"
            class="award-preview-pic"
          >
        </li>
      </ul>

      <!-- 累计奖励 -->
      <p class="award-h4">累计奖励</p>
      <ul class="award-preview">
        <li
          class="award-preview-item"
          v-for="item in list.up"
          :key="item.up"
        >
          <p>{{item.day}}天</p>

          <img
            :src="'//www.dadadiu.cn/common/tool/' + item.id + '.png'"
            :alt="item.id | filterTool('name')"
            v-if="item.id && item.id != ''"
            class="award-preview-pic"
          >
        </li>
      </ul>
    </div>

    <!-- table log -->
    <div class="award-log">
      <el-table
        :data="log"
        border
        max-height="300"
        stripe
        style="width: 100%"
      >
        <el-table-column label="日期">
          <template slot-scope="scope">
            {{scope.row | filterDate}}
          </template>
        </el-table-column>

        <el-table-column
          prop="nick"
          label="操作人"
        >
        </el-table-column>

        <el-table-column label="备注">
          <template slot-scope="scope">
            {{scope.row.createAt? '创建' : '更新'}}
          </template>
        </el-table-column>
      </el-table>

    </div>

  </div>

</template>

<script>
import filters from "@/assets/js/filters";
import getData from "@/admin/js/getData";
import toolData from "@/assets/js/tool";

export default {
  data() {
    return {
      submitType: "create", // ['read', 'update', 'create']
      isLoading: false,
      list: {
        month: filters.dateFormat(null, "-", "yyyy-mm"),
        // month: "2019-01",
        daily: [],
        up: []
      },
      log: [],
      id: ""
    };
  },

  filters: {
    filterDate(val) {
      let date = val.createAt ? val.createAt : val.updateAt;
      // console.log(date);
      return filters.dateDetailFormat(parseInt(date), "-");
    },

    filterTool(val, type) {
      return toolData[val] && toolData[val][type];
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    // 初始化 获取月份信息
    init() {
      let crtMonth = filters.dateFormat(null, "-", "yyyy-mm");

      getData.awardList(
        {
          month: this.list.month
        },
        res => {
          // 存在
          if (res.code == 0) {
            this.list = res.data.list;
            this.log = res.data.log;
            this.id = res.data._id;

            if (this.list.month > crtMonth) {
              // 未来 -> 可编辑
              this.submitType = "update";
            } else {
              // 过去或本月 -> 只读
              this.submitType = "read";
            }

            return;
          }

          // 不存在
          this.list.daily = this.dailyCreateFn(28);
          this.list.up = [
            { day: 3, id: "" },
            { day: 5, id: "" },
            { day: 7, id: "" },
            { day: 10, id: "" },
            { day: 15, id: "" },
            { day: 20, id: "" },
            { day: 25, id: "" }
          ];
          this.log = [];
          this.submitType = "create";
        }
      );
    },

    dailyCreateFn(max) {
      let i = 0;
      let cbData = [];

      for (; i < max; i++) {
        cbData.push({
          day: i + 1,
          id: ""
        });
      };

      return cbData;
    },

    createFn() {
      getData.awardCreate(this.list, res => {
        if (res.code == 0) {
          this.$message({
            type: "success",
            message: res.msg
          });

          this.init();

          this.submitType = "update";
          return;
        }
      });
    },

    updetaFn() {
      getData.awardUpdate(
        {
          id: this.id,
          list: this.list
        },
        res => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: res.msg
            });

            this.init();

            this.submitType = "update";
            return;
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/admin/styles/award.scss";
</style>