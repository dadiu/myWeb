<template>
  <div class="wrap">
    <div class="m-title">
      <div>

        <!-- 菜单 -->
        <el-button :class="{'el-button--primary' : isShow == 0}" @click="changeMenu(0)">
          <i class="iconfont">&#xe7d1;</i>今天
        </el-button>
        <el-button :class="{'el-button--primary' : isShow == 1}" @click="changeMenu(1)">
          未来
        </el-button>
        <el-button :class="{'el-button--primary' : isShow == -1}" @click="changeMenu(-1)">
          过去
        </el-button>

      </div>

      <div>
        <!-- 筛选 -->
        <el-input placeholder="enter键搜索" v-model="searchValue" maxlength="8" class="m-search" @keyup.enter.native="searchFn">

          <el-select v-model="selectType" slot="prepend" @change="selsctTypeFn" class="m-search-left">
            <el-option v-for="item in selectOption" :key="item.s" :label="item.label" :value="item.value" :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-input>

        <!-- add -->
        <el-button icon="el-icon-plus" @click="showAddFn(false)">添加</el-button>
      </div>
    </div>

    <!-- add -->
    <ViewAdd v-if="isAddShow" :isAddShow="isAddShow" @closeFn="isAddShow = !isAddShow" @saveAddFn="saveAddFn" :itemForm="itemForm" :crtEditType="isShow" />

    <!-- today -->
    <Viewday v-if="isShow == 0 && !loading" :list="list" @showEditFn="showAddFn" :isbetween="true" @resetList="changeMenu(0)" />

    <!-- future -->
    <div class="todo-future" v-if="isShow == 1 && !loading">
      <p class="todo-hd-tips">
        <i class="el-icon-info"></i>
        计划最多7天
      </p>
      <div class="todo-bar" v-if="list.length>0">
        <div class="todo-item" v-for="item in list" :key="item.f">
          <Viewday :list=item class="todo-item-bar" @showEditFn="showAddFn" @resetList="changeMenu(1)" />
        </div>
      </div>
      <p v-else class="todo-none">
        <img src="~@/assets/img/todo-total-none.png" />
      </p>
    </div>

    <!-- history -->
    <div class="todo-history" v-if="isShow == -1 && !loading">
      <div class="todo-hd-tips">
        <i class="el-icon-menu"></i>
        2018
      </div>
      <div class="todo-bar" v-if="list.length>0">
        <div class="todo-item" v-for="item in list" :key="item.h">
          <Viewday :list=item class="todo-item-bar" @showEditFn="showAddFn" @resetList="changeMenu(-1)" />
        </div>
      </div>
      <p v-else class="todo-none">
        <img src="~@/assets/img/todo-total-none.png" />
      </p>
    </div>

  </div>
</template>

<script>
import getData from "@/assets/js/getData";
import filters from "@/assets/js/filters";
import ViewAdd from "./components/add.vue";
import Viewday from "./components/day.vue";

export default {
  components: { Viewday, ViewAdd },
  data() {
    return {
      isShow: 0,
      isAddShow: false,
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
      ]
    };
  },

  mounted() {
    this.changeMenu();
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
        this.list = res.data;
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
      } else if(this.selectType != "标签"){
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
