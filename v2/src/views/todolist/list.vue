<template>
  <div class="wrap">
    <div class="m-title">
      <div>

        <!-- 菜单 -->
        <el-button
          :class="{'el-button--primary' : isShow == 0}"
          @click="changeMenu(0)"
        >
          今天
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
        <!-- add form -->
        <ViewAddTodo
          v-if="isShow == 0"
          @saveCallBack="saveCallBack"
          :itemForm="false"
          activeType="create"
          :showType="'form'"
        />
        <!-- add btn -->
        <el-button
          type="success"
          size="small"
          icon="el-icon-plus"
          @click="showAddTodoFn"
        ></el-button>

      </div>
    </div>

    <div v-loading="loading">
      <!-- today -->
      <ViewDay
        v-if="isShow == 0 && !loading"
        :list="list"
        :istoday="'0'"
        @showEditFn="showUpdateTodoFn"
        @showCreatFn="showAddTodoFn"
        @resetList="changeMenu(0)"
      />

      <!-- future -->
      <div
        class="todo-future"
        v-if="isShow == 1 && !loading"
      >
        <p class="todo-hd-tips">
          <i class="el-icon-info"></i>
          计划最多30天
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
              @showEditFn="showUpdateTodoFn"
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

        <!-- 筛选 -->
        <el-row
          class="todo-hd-form"
          :gutter="20"
        >
          <el-col :span="15">
            <el-input
              size="small"
              placeholder="enter 搜索"
              v-model="search.value"
              maxlength="8"
              class="m-search"
              @keyup.enter.native="searchFn"
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

              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchFn"
              ></el-button>
            </el-input>
          </el-col>

          <!-- status -->
          <el-col :span="9">
            <el-radio-group
              v-model="search.status"
              @change="searchFn"
            >
              <el-radio :label="9">全部</el-radio>
              <el-radio :label="0">待完成</el-radio>
              <el-radio :label="2">搁置</el-radio>
              <el-radio :label="1">已完成</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>

        <!-- bar -->
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
              @showEditFn="showUpdateTodoFn"
              @resetList="changeMenu(-1)"
            />
          </div>
        </div>
        <ViewNone v-else />
      </div>
    </div>

    <!-- dialog -->
    <!-- add -->
    <ViewAddTodo
      v-if="isAddShow"
      :dialogVisible="isAddShow"
      @closeFn="isAddShow = !isAddShow"
      @saveCallBack="saveCallBack"
      :itemForm="itemForm"
      :activeType="activeType"
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

import ViewDay from "./components/day.vue";
import ViewDelete from "./components/delete.vue";
import { ViewNone, ViewAddTodo } from "@/components/";

export default {
  components: { ViewDay, ViewDelete, ViewNone, ViewAddTodo },
  data() {
    return {
      isShow: 0,
      isAddShow: false,
      isDeleteShow: false,
      itemForm: false,
      list: [],
      loading: false,
      activeType: "create",
      search: {
        type: "标签",
        value: "",
        status: 9
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
      // this.search.value = "";
      this.loading = true;

      getData.todoList(
        {
          istoday: this.isShow,
          searchType: this.search.type,
          searchValue: this.search.value,
          searchStatus: this.search.status
        },
        res => {
          this.loading = false;
          // history
          this.list = this.isShow == -1 ? res.data.reverse() : res.data;
        }
      );
    },

    // 显示添加
    showAddTodoFn() {
      this.itemForm = false;
      this.activeType = "create";
      this.isAddShow = true;
    },

    // 显示编辑 item => 原有的数据
    showUpdateTodoFn(item) {
      this.itemForm = item;
      // console.log(this.itemForm);
      this.activeType = "update";
      this.isAddShow = true;
    },

    // 保存添加和编辑的内容 todoTime
    saveCallBack(todoData, activeType = "create") {
      this.loading = true;

      let nowDate = filters.dateFormat();
      let todoDate = todoData.date;
      let type = this.isShow;

      // 创建
      if (activeType == "create") {
        if (nowDate > todoDate) {
          type = -1;
        } else if (nowDate < todoDate) {
          type = 1;
        } else {
          type = 0;
        }
      }

      getData.todoList(
        {
          istoday: type,
          searchType: this.search.type,
          searchValue: this.search.value,
          searchStatus: this.search.status
        },
        res => {
          this.loading = false;
          if (activeType == "create") {
            this.isShow = type;
          }

          this.list = this.isShow == -1 ? res.data.reverse() : res.data;
        }
      );
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

    // 查找类别
    searchFn() {
      let val = filters.trimFn(this.search.value);
      // 查找类别
      let type = 1;

      if (val.length == 0) {
        type = 0;
      } else if (this.search.type != "标签") {
        type = this.search.type;
      }

      this.loading = true;
      getData.todoList(
        {
          istoday: this.isShow,
          searchType: type,
          searchValue: val,
          searchStatus: this.search.status
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
