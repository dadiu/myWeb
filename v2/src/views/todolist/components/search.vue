<template>
  <el-form
    :inline="true"
    :model="search"
    class="todo-hd-form"
  >

    <!-- status -->
    <el-form-item>
      <el-radio-group
        v-model="search.status"
        @change="handSearchFn"
      >
        <el-radio :label="9">全部</el-radio>
        <el-radio :label="0">待完成</el-radio>
        <el-radio :label="2">搁置</el-radio>
        <el-radio :label="1">完成</el-radio>
      </el-radio-group>
    </el-form-item>

    <!-- time -->
    <el-form-item>
      <el-date-picker
        v-model="search.at"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        value-format="timestamp"
        size="medium"
      >
      </el-date-picker>
    </el-form-item>

    <!-- type -->
    <el-form-item>

      <el-input
        placeholder="enter 搜索"
        v-model="search.value"
        maxlength="8"
        class="m-search"
        size="medium"
        @keyup.enter.native="handSearchFn"
      >

        <el-select
          v-model="search.type"
          slot="prepend"
          @change="selsctTypeFn"
          class="m-search-left"
        >
          <el-option
            v-for="item in selectOption"
            :key="item.s"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
          </el-option>
        </el-select>
      </el-input>
    </el-form-item>

    <!-- btn -->
    <el-form-item>
      <el-button
        size="medium"
        icon="el-icon-search"
        @click="handSearchFn"
      ></el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import filters from "@/assets/js/filters";
export default {
  props: {
    searchFn: { type: Function }
  },
  data() {
    return {
      search: {
        type: "标签",
        value: "",
        status: 9, // 9:全部, 0:待完成, 1:已完成, 2:搁置
        at: "" // 搜索时间
      },
      selectOption: [
        {
          label: "标签",
          value: 1
        },
        {
          label: "任务",
          value: 2
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },

  methods: {
    selsctTypeFn(data) {
      console.log(`change : ${data}`);
    },

    handSearchFn() {
      let data = {};

      let startAt = 0;
      let lastAt = 0;
      // 查找时间
      if (this.search.at[0]) {
        startAt = filters.dateFormat(this.search.at[0]);
        lastAt = filters.dateFormat(this.search.at[1]);
      }

      let val = filters.trimFn(this.search.value);
      // 查找类别
      let type = 1;

      if (val.length == 0) {
        type = 0;
      } else if (this.search.type != "标签") {
        type = this.search.type;
      }

      data = {
        istoday: -1,
        searchType: type,
        searchValue: val,
        searchStatus: this.search.status,
        startAt,
        lastAt
      };

      this.$emit("searchFn", data);
    }
  }
};
</script>
