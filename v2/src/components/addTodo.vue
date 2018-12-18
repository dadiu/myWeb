<template>

  <!-- 表格 -->
  <el-form
    v-if="showType == 'form'"
    class="todo-push"
    :inline="true"
    :model="form"
    :rules="rules"
    ref="form"
  >
    <el-form-item prop="date">
      <el-date-picker
        size="small"
        type="date"
        placeholder="选择时间"
        :editable="false"
        :clearable="false"
        v-model="form.todoTime"
        value-format="timestamp"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </el-form-item>

    <el-form-item prop="info">
      <el-input
        size="small"
        v-model="form.info"
        placeholder="待完成内容"
        prefix-icon="el-icon-news"
        clearable
        maxlength="100"
        @keyup.enter.native="createFn('form')"
      >
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        @click="createFn('form')"
        icon="el-icon-check"
        size="small"
      ></el-button>
    </el-form-item>
  </el-form>

  <!-- 弹窗 -->
  <el-dialog
    v-else
    class="todo-add"
    :visible.sync="isShow"
    width="450px"
    :before-close="cancelFn"
  >

    <!-- form -->
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="60px"
    >

      <el-form-item
        label="时间"
        prop="date"
      >
        <el-date-picker
          type="date"
          placeholder="选择时间"
          :editable="false"
          :clearable="false"
          v-model="form.todoTime"
          value-format="timestamp"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>

      <el-form-item
        label="状态"
        prop="status"
      >
        <el-radio-group v-model="form.status">
          <el-radio :label="0">待完成</el-radio>
          <el-radio :label="1">已完成</el-radio>
          <el-radio :label="2">搁置（待定）</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="任务"
        prop="info"
      >
        <el-input
          v-model="form.info"
          placeholder="待完成内容"
          clearable
          maxlength="100"
          @keyup.enter.native="createFn('form')"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="标签"
        prop="type"
      >
        <el-input
          v-model="type"
          v-show="types.length < typeMaxCount"
          @keyup.enter.native="addType"
          :placeholder="'enter键确定 标签最多' + typeMaxCount + '个'"
          maxlength="8"
        >
        </el-input>
        <el-tag
          :key="tag.k"
          v-for="tag in types"
          closable
          :disable-transitions="false"
          @close="deleteTypeFn(tag)"
        >
          {{tag}}
        </el-tag>
      </el-form-item>
    </el-form>

    <!-- foot -->
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancelFn">取 消</el-button>
      <el-button
        type="primary"
        @click="createFn('form')"
        v-if="itemForm"
      >修改</el-button>
      <el-button
        type="primary"
        @click="createFn('form')"
        v-if="!itemForm"
      >创建</el-button>
    </span>
  </el-dialog>
</template>

<script>
import filters from "@/assets/js/filters";
import getData from "@/assets/js/getData";
export default {
  props: {
    closeFn: { type: Function },
    saveCallBack: { type: Function },
    itemForm: { type: [Object, Boolean] },
    activeType: { type: String },
    showType: { type: String },
    dialogVisible: { type: Boolean }
  },
  data() {
    return {
      form: {
        todoTime: Date.parse(new Date()), // 任务时间
        status: 0,
        info: "" // 内容
      },
      types: [], // 标签
      type: "", //子标签
      typeMaxCount: 5,
      rules: {
        todoTime: [{ required: true }],
        status: [{ required: true }],
        info: [
          { required: true, message: "请输入任务", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          // console.log(new Date(time.getTime()));
          // 可选择今天开始往后30天的项目安排
          let startTime = new Date(time.getTime() - 30 * 24 * 60 * 60 * 1000);
          let endTime = new Date(
            Date.parse(new Date()) + 30 * 24 * 60 * 60 * 1000
          );
          return time.getTime() > endTime;
        }
      },
      isShow: false
    };
  },

  mounted() {
    this.isShow = this.dialogVisible;
    console.log(this.itemForm);

    if (this.itemForm) {
      Object.assign(this.form, this.itemForm);
      this.types = [].concat(this.form.types);
    } else {
      Object.assign(this.form, {
        todoTime: Date.parse(new Date()), // 任务时间
        status: 0,
        info: "" // 内容
      });
      this.types = []; // 标签
      this.type = ""; //子标签
    }
  },

  methods: {
    deleteTypeFn(tag) {
      this.types.remove(tag);
    },

    addType() {
      if (this.type == "" || this.types.length === this.typeMaxCount) {
        return;
      }

      this.types.push(this.type);
      this.type = "";
    },

    createFn(formName) {
      let self = this;
      let data = {};

      this.$refs[formName].validate(valid => {
        if (valid) {
          Object.assign(data, self.form, {
            types: self.types.join("|"),
            date: filters.dateFormat(self.form.todoTime) // 任务时间 [年月日]
          });

          if (self.activeType == "create") {
            // 创建
            getData.todoAdd(data, function(res) {
              self.$emit("saveCallBack", data);
              self.$emit("closeFn");
              self.form.info = "";
              self.types = [];
            });
          } else {
            // 编辑
            getData.todoUpdate(data, res => {
              self.$emit("saveCallBack", data, "update");
              self.$emit("closeFn");
              self.form.info = "";
              self.types = [];
            });
          }
        } else {
          console.log("error");
          return false;
        }
      });
    },

    cancelFn() {
      this.$emit("closeFn");
    }
  }
};
</script>

<style>
</style>
