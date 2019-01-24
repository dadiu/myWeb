<template>
  <div class="wrap message-bar">

    <!-- hd -->
    <el-row
      class="message-hd"
      :gutter="20"
    >

      <!-- level -->
      <el-col :span="3">
        <el-radio-group v-model="newLevel">
          <el-radio
            :label="1"
            class="fc-danger"
          >急</el-radio>
          <el-radio
            :label="2"
            class="fc-warning"
          >缓</el-radio>
        </el-radio-group>
      </el-col>

      <!-- add -->
      <el-col :span="16">
        <el-input
          placeholder="enter 创建"
          prefix-icon="el-icon-tickets"
          v-model="iptValue"
          clearable
          maxlength="100"
          size="medium"
          @keyup.enter.native="addMessage"
        >
          <!-- <el-button
            slot="append"
            icon="el-icon-check"
            @click="addMessage"
          ></el-button> -->
        </el-input>
      </el-col>

      <!-- search -->
      <el-col :span="5">
        <el-input
          placeholder="enter 搜索"
          prefix-icon="el-icon-search"
          v-model="searchValue"
          maxlength="100"
          size="medium"
          @keyup.enter.native="searchMessage"
        >
        </el-input>
      </el-col>

    </el-row>

    <!-- list -->
    <ul
      v-if="list.length > 0"
      class="message-list"
    >
      <li
        class="message-item"
        v-for="(item, idx) in list"
        :key="item.l"
        v-if="!item.isSearch"
      >
        <!-- left -->
        <div class="message-left">
          <p class="message-date">
            <i class="el-icon-time"></i>
            {{item.createTime | dateDetailFormat("-")}}
          </p>
          <p :class="['message-info', {'message-info-danger' : item.level == 1}]">
            {{item.info}}
          </p>
        </div>

        <!-- btns -->
        <p class="message-btns">

          <!-- delete -->
          <el-button
            size="mini"
            icon="el-icon-minus"
            circle
            @click="showDeleteMessage(item)"
          ></el-button>

          <!-- level2 -->
          <el-button
            size="mini"
            type="danger"
            circle
            v-if="item.level != 1"
            @click="editMessage(idx, 1)"
          >急</el-button>

          <!-- level1 -->
          <el-button
            size="mini"
            type="warning"
            circle
            v-if="item.level != 2"
            @click="editMessage(idx)"
          >缓</el-button>

          <!-- move -->
          <el-button
            size="mini"
            type="success"
            icon="el-icon-edit"
            circle
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
    ViewDelete,
    ViewAddTodo,
    ViewNone
  },
  data() {
    return {
      iptValue: "",
      newLevel: 2, //  [默认level为2  {1：急， 2：缓} ]
      searchValue: "",
      searchLevel: 0,
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
      getData.messageAdd({ info, level: this.newLevel }, res => {
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

    editMessage(idx, level = 2) {
      let id = this.list[idx]._id;

      getData.messageUpdate({ id, level }, res => {
        if (res.code == 0) {
          this.iptValue = "";
          this.$message({
            showClose: true,
            type: "success",
            message: "修改成功"
          });

          this.list[idx].level = level;
          return;
        }
      });
    },

    searchMessage() {
      let info = filters.trimFn(this.searchValue);
      let len = info.length;
      let filterData = [];

      if (info.length > 100) {
        this.$message({
          showClose: true,
          type: "error",
          message: "便签内容长度在 1 到 100 个字符"
        });
        return;
      }

      this.list.forEach(element => {
        if (element.info.indexOf(info) > -1) {
          element.isSearch = false;
        } else {
          element.isSearch = true;
        }
        filterData.push(element);
      });

      this.list = filterData;
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
        status: 1,
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
