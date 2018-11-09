<template>
  <div class="todo-add">
    <el-form :model="form" :rules="rules" ref="form" label-width="60px">

      <el-form-item label="时间" prop="date">
        <el-date-picker type="date" placeholder="选择时间" :editable="false" :clearable="false" v-model="form.date" format="yyyy 年 MM 月 dd 日" :picker-options="pickerOptions"></el-date-picker>
      </el-form-item>

      <el-form-item label="任务" prop="info">
        <el-input v-model="form.info" placeholder="待完成内容" clearable maxlength="100"></el-input>
      </el-form-item>

      <el-form-item label="标签" prop="type">
        <el-input v-model="form.type" v-show="form.types.length < typeMaxCount" @keyup.enter.native="addType" 
          :placeholder="'enter键确定 标签最多' + typeMaxCount + '个'" maxlength="8">
        </el-input>
        <el-tag :key="tag.k" v-for="tag in form.types" closable :disable-transitions="false" @close="deleteTypeFn(tag)">
          {{tag}}
        </el-tag>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="form.more" maxlength="20" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitFn('form')">创建</el-button>
        <el-button @click="$emit('closeFn')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    closeFn: {
      type: Function
    }
  },
  data() {
    return {
      form: {
        info: "", // 内容
        date: new Date(), // 任务时间
        types: [], // 标签
        type: "", //子标签
        stamp: Number, // 当前创建的时间戳
        more: "" // 补充备注
      },
      typeMaxCount : 5,
      rules: {
        date: [{ required: true }],
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
          let startTime = new Date(time.getTime() - 7 * 24 * 60 * 60 * 1000);
          let endTime = new Date(
            Date.parse(new Date()) + 7 * 24 * 60 * 60 * 1000
          );
          return time.getTime() > endTime;
        }
      }
    };
  },

  methods: {
    deleteTypeFn(tag) {
      this.form.types.remove(tag);
    },

    addType() {
      if (this.form.type == "" || this.form.types.length === this.typeMaxCount) {
        return;
      }

      this.form.types.push(this.form.type);
      this.form.type = "";
    },

    submitFn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit");
          this.$emit('closeFn');
        } else {
          console.log("error");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>
