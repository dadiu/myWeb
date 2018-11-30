<template>
  <div class="user-form">
    <el-form v-loading="loading" :model="form" :rules="rules" ref="form" label-width="80px" @keyup.enter.native="onSubmit('form')">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="form.pwd" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">登录</el-button>
      </el-form-item>
    </el-form>
    <p class="user-form-ft">
      <!-- <router-link :to="{name : 'forget'}" class="user-form-link">忘记密码 <i class="el-icon-caret-right"></i></router-link> -->
      <router-link :to="{name : 'register'}" class="user-form-link">暂无账号，去注册 <i class="el-icon-caret-right"></i></router-link>
    </p>
  </div>
</template>

<script>
import event from "@/util/event";
import getData from "@/assets/js/getData";
export default {
  data() {
    return {
      loading: false,
      form: {
        username: "",
        pwd: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
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

          getData.userLogin(self.form, res => {
            self.loading = false;

            // 成功
            event.$emit('reset-login');

            if (res.code == 0) {
              this.$message({
                showClose: true,
                type: "success",
                duration: 1000,
                message: `提示: ${res.msg}`,
                onClose() {
                  self.$router.push({
                    name: "home"
                  });
                }
              });
              return;
            };

            // other
            this.$message({
              type: "warning",
              message: `提示: ${res.msg}`
            });

          });

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
