<template>
  <div class="wrap">
    <div class="m-title">
      <div>

        <!-- 菜单 -->
        <el-button
          :class="{'el-button--primary' : isShow == 0}"
          @click="changeMenu(0)"
        >
          <i class="iconfont">&#xe7d1;</i>今天
        </el-button>
        <el-button
          :class="{'el-button--primary' : isShow == 1}"
          @click="changeMenu(1)"
        >
          未来
        </el-button>
        <el-button
          :class="{'el-button--primary' : isShow == -1}"
          @click="changeMenu(-1)"
        >
          过去
        </el-button>

      </div>

      <div>
        <!-- 筛选 -->
        <el-input
          placeholder="enter键搜索"
          v-model="searchValue"
          maxlength="8"
          class="m-search"
          @keyup.enter.native="searchFn"
        >

          <el-select
            v-model="selectType"
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

        <!-- add -->
        <el-button
          icon="el-icon-plus"
          @click="showAddFn(false)"
        >添加</el-button>
      </div>
    </div>

    <!-- today -->
    <ViewDay
      v-if="isShow == 0 && !loading"
      :list="list"
      :istoday="'0'"
      @showEditFn="showAddFn"
      @resetList="changeMenu(0)"
    />

    <!-- future -->
    <div
      class="todo-future"
      v-if="isShow == 1 && !loading"
    >
      <p class="todo-hd-tips">
        <i class="el-icon-info"></i>
        计划最多7天
      </p>
      <div
        class="todo-bar"
        v-if="list.length>0"
      >
        <div
          class="todo-item"
          v-for="item in list"
          :key="item.f"
        >
          <ViewDay
            :list=item
            :istoday="'1'"
            class="todo-list-bar"
            @showEditFn="showAddFn"
            @resetList="changeMenu(1)"
          />
        </div>
      </div>
      <ViewNone v-else />
    </div>

    <!-- history -->
    <div
      class="todo-history"
      v-if="isShow == -1 && !loading"
    >
      <div
        class="todo-bar"
        v-if="list.length>0"
      >
        <div
          class="todo-item"
          v-for="item in list"
          :key="item.h"
        >
          <ViewDay
            :list=item
            :istoday="'-1'"
            class="todo-list-bar"
            @showEditFn="showAddFn"
            @resetList="changeMenu(-1)"
          />
        </div>
      </div>
      <ViewNone v-else />
    </div>

    <!-- dialog -->
    <!-- add -->
    <ViewAdd
      v-if="isAddShow"
      :dialogVisible="isAddShow"
      @closeFn="isAddShow = !isAddShow"
      @saveAddFn="saveAddFn"
      :itemForm="itemForm"
      :crtEditType="isShow"
    />

    <!-- delete -->
    <ViewDelete
      v-if="isDeleteShow"
      :dialogVisible="isDeleteShow"
      @closeFn="isDeleteShow = !isDeleteShow"
      :item="deleteData"
      @deleteNow="deleteNow"
    />

  </div>
</template>

<script>
import getData from "@/assets/js/getData";
import filters from "@/assets/js/filters";
import event from "@/util/event";

import ViewAdd from "./components/add.vue";
import ViewDay from "./components/day.vue";
import ViewDelete from "./components/delete.vue";
import { ViewNone } from "@/components/";

export default {
  components: { ViewDay, ViewAdd, ViewDelete, ViewNone },
  data() {
    return {
      isShow: 0,
      isAddShow: false,
      isDeleteShow: false,
      itemForm: false,
      list: [],
      loading: false,
      selectType: "标签",
      searchValue: "",
      selectOption: [
        {
          label: "标签",
          value: 1
        },
        {
          label: "任务",
          value: 2,
          disabled: true
        }
      ],
      deleteData: {}
    };
  },

  mounted() {
    this.changeMenu();
    event.$on("todoDelete", res => {
      this.showDeleteFn(res);
    });
  },

  methods: {
    changeMenu(type = this.isShow) {
      this.isShow = type;
      this.searchValue = "";
      this.loading = true;

      getData.todoList({ istoday: this.isShow, searchType: 0 }, res => {
        this.loading = false;
        // history
        this.list = this.isShow == -1 ? res.data.reverse() : res.data;
      });
    },

    // 显示添加 || 编辑
    // item = { false: 添加, object:编辑 }
    showAddFn(item) {
      // console.log(idx);
      this.itemForm = item;
      this.isAddShow = true;
    },

    // 保存添加和编辑的内容 todoTime
    saveAddFn(todoDate) {
      this.loading = true;
      let type = 0;

      let nowDate = filters.dateFormat();

      if (nowDate > todoDate) {
        type = -1;
      } else if (nowDate < todoDate) {
        type = 1;
      } else {
        type = 0;
      }

      getData.todoList({ istoday: type, searchType: 0 }, res => {
        this.loading = false;
        this.isShow = type;
        this.list = this.isShow == -1 ? res.data.reverse() : res.data;
      });
    },

    // 显示删除弹窗 传入要删除的对象
    showDeleteFn(data) {
      // console.log(data);
      this.deleteData = data;
      this.isDeleteShow = true;
    },

    // 确定删除
    deleteNow(id) {
      getData.todoDelete({ id }, res => {
        this.isDeleteShow = false;
        this.changeMenu(this.isShow);
      });
    },

    selsctTypeFn(data) {
      console.log(`change : ${data}`);
    },

    searchFn() {
      // console.log(this.searchValue);

      let val = filters.trimFn(this.searchValue);
      // 查找类别
      let type = 1;

      if (val.length == 0) {
        type = 0;
      } else if (this.selectType != "标签") {
        type = this.selectType;
      }

      this.loading = true;
      getData.todoList(
        {
          istoday: this.isShow,
          searchType: type,
          searchValue: val
        },
        res => {
          this.loading = false;
          // history
          this.list = this.isShow == -1 ? res.data.reverse() : res.data;
        }
      );
    }
  }
};
</script>
