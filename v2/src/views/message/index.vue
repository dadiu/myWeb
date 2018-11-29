<template>
  <div class="wrap message-bar">

    <!-- hd -->
    <div class="message-hd">
      <el-input
        placeholder="请输入便签内容，enter键保存"
        v-model="iptValue"
        clearable
        maxlength="100"
        @keyup.enter.native="addMessage"
      >
        <el-button
          slot="append"
          icon="el-icon-plus"
          @click="addMessage"
        >
          添加</el-button>
      </el-input>
    </div>

    <!-- list -->
    <ul
      v-if="list.length > 0"
      class="message-list"
    >
      <li
        class="message-item"
        v-for="item in list"
        :key="item.l"
      >
        <!-- left -->
        <div class="message-left">
          <p class="message-date">
            <i class="el-icon-time"></i>
            {{item.createTime | dateDetailFormat("-")}}
          </p>
          <p class="message-info">
            {{item.info}}
          </p>
        </div>

        <!-- btns -->
        <p class="message-btns">

          <!-- delete -->
          <el-button
            circle
            size="mini"
            icon="el-icon-delete"
            @click="showDeleteMessage(item)"
          ></el-button>

          <!-- move -->
          <el-button
            circle
            size="mini"
            icon="el-icon-edit"
            @click="moveMessage(item)"
          ></el-button>
        </p>
      </li>

    </ul>

    <!-- list none -->
    <ViewNone v-else />

    <!-- dialog -->
    <ViewDelete
      v-if="isDeleteShow"
      :item="crtItem"
      :dialogVisible="isDeleteShow"
      @closeFn="isDeleteShow = !isDeleteShow"
      @deleteNow="deleteMessage"
    />

    <!-- add -->
    <ViewAddTodo
      v-if="isAddShow"
      :dialogVisible="isAddShow"
      @closeFn="isAddShow = !isAddShow"
      @saveCallBack="deleteMessage"
      :itemForm="itemForm"
      :activeType="'create'"
    />

  </div>
</template>

<script>
import event from "@/util/event";
import filters from "@/assets/js/filters";
import getData from "@/assets/js/getData";

import ViewDelete from "./components/delete.vue";
import { ViewNone, ViewAddTodo } from "@/components/";

export default {
  components: {
    ViewNone,
    ViewDelete,
    ViewAddTodo
  },
  data() {
    return {
      iptValue: "",
      isDeleteShow: false,
      isAddShow: false,
      list: [],
      crtItem: {},
      itemForm: {}
    };
  },
  filters: {
    dateDetailFormat: filters.dateDetailFormat
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getData.messageList({}, res => {
        if (res.code == 0) {
          this.list = res.data;
          return;
        }

        this.$message({
          showClose: true,
          type: "error",
          message: res.msg
        });
      });
    },

    addMessage() {
      let info = filters.trimFn(this.iptValue);
      let len = info.length;

      if (len == 0 || info.length > 100) {
        this.$message({
          showClose: true,
          type: "error",
          message: "便签内容长度在 1 到 100 个字符"
        });
        return;
      }

      // 请求接口
      getData.messageAdd({ info }, res => {
        if (res.code == 0) {
          this.iptValue = "";
          this.$message({
            showClose: true,
            type: "success",
            message: "便签添加成功"
          });
          this.getList();
          return;
        }
      });
    },

    showDeleteMessage(item) {
      this.crtItem = item;
      this.isDeleteShow = true;
    },

    deleteMessage() {
      getData.messageDelete({ id: this.crtItem._id }, res => {
        if (res.code == 0) {
          this.isDeleteShow = false;
          this.list.remove(this.crtItem);
          return;
        }
      });
    },

    moveMessage(item) {
      this.crtItem = item;

      this.itemForm = Object.assign({}, item, {
        types: [],
        updateTime: Date.parse(new Date())
      });
      this.isAddShow = true;
    }
  }
};
</script>

<style>
</style>
