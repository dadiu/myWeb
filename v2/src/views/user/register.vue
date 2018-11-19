<template>
  <div class="user-form">
    <el-form v-loading="loading" ref="form" :model="form" :rules="rules" label-width="80px" @keyup.enter.native="onSubmit('form')">
      <el-form-item label="昵称" prop="nick">
        <el-input v-model="form.nick" clearable maxlength="6"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" clearable maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="form.phone" clearable maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="form.pwd" clearable maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="pwdAgain">
        <el-input type="password" v-model="form.pwdAgain" clearable maxlength="20"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即注册</el-button>
      </el-form-item>
    </el-form>

    <p class="user-form-ft">
      <router-link :to="{name : 'login'}" class="user-form-link">已有账号，去登录 <i class="el-icon-caret-right"></i></router-link>
    </p>
  </div>
</template>

<script>
import getData from "@/assets/js/getData";

export default {
  data() {
    return {
      loading: false,
      form: {
        nick: "",
        username: "",
        pwd: "",
        pwdAgain: ""
      },
      rules: {
        nick: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 1 到 6 个字符", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请填写手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度为 11 个字符", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!/^(13|14|15|16|17|18|19)[0-9]{9}$/.test(value)) {
                callback(new Error("手机号码格式不对"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        pwdAgain: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.pwd) {
                callback(new Error("两次输入的密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },

  mounted() {},

  methods: {
    onSubmit(formName) {
      let self = this;

      if (this.loading) {
        return;
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          self.loading = true;

          getData.userRegister(self.form, res => {
            self.loading = false;

            if (res.code == 0) {
              this.$message({
                showClose: true,
                type: "success",
                duration: 1000,
                message: `提示: ${res.msg}`,
                onClose() {
                  self.$router.push({
                    name: "login"
                  });
                }
              });
              return;
            }

            // other
            this.$message({
              type: "warning",
              message: `提示: ${res.msg}`
            });
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>
