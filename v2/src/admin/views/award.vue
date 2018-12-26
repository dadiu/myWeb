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
            v-for="n in list.daily.length"
            :key="n.daily"
            v-model="list.daily[n-1]"
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
              v-for="n in list.up"
              :key="n.up"
            >

              <!-- 天数 -->
              <el-form-item>
                <el-input
                  type="type"
                  v-model="n.count"
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
                  v-model="n.id"
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
          v-for="n in list.daily.length"
          :key="n.daily"
        >
          <img
            :src="'//www.dadadiu.cn/common/tool/' + list.daily[n-1] + '.png'"
            :alt="list.daily[n-1] | filterTool('name')"
            v-if="list.daily[n-1] && list.daily[n-1] != ''"
            class="award-preview-pic"
          >
        </li>
      </ul>

      <!-- 累计奖励 -->
      <p class="award-h4">累计奖励</p>
      <ul class="award-preview">
        <li
          class="award-preview-item"
          v-for="n in list.up"
          :key="n.up"
        >
          <p>{{n.count}}天</p>

          <img
            :src="'//www.dadadiu.cn/common/tool/' + n.id + '.png'"
            :alt="n.id | filterTool('name')"
            v-if="n.id && n.id != ''"
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
          this.list.daily = new Array(28);
          this.list.up = [
            { count: 3, id: "" },
            { count: 5, id: "" },
            { count: 7, id: "" },
            { count: 10, id: "" },
            { count: 15, id: "" },
            { count: 20, id: "" },
            { count: 25, id: "" }
          ];
          this.log = [];
          this.submitType = "create";
        }
      );
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