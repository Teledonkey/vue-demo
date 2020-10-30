<template>
  <div class="login-container ub main-center cross-center">
    <el-form
      :rules="rules"
      ref="loginForm"
      :model="loginForm"
      class="login-form"
    >
      <el-form-item label="">
        <div class="login-title ub main-center cross-center">系统登录</div>
      </el-form-item>

      <el-form-item label="" prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="code">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input
              v-model="loginForm.code"
              placeholder="请输入验证码"
            ></el-input>
          </el-col>
          <el-col :span="8">
            <el-input readonly placeholder="点击刷新"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button type="primary" class="my-button" @click="submit"
              >登录</el-button
            >
          </el-col>
          <el-col :span="12">
            <el-button class="my-button">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "change",
            message: "请输入用户名",
          },
        ],
        password: [
          {
            required: true,
            trigger: "change",
            message: "请输入密码",
          },
        ],
        code: [
          {
            required: true,
            trigger: "change",
            message: "请输入验证码",
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log(valid);
        }
      });
    },
    onSumbit() {
      //登录表单提交
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
}

.login-form {
  height: 300px;
  width: 350px;
  padding: 20px 35px;
  box-shadow: 0 0 25px #cac6c6;
  border-radius: 20px;
}

.login-title {
  font-size: 24px;
  font-weight: 600;
}

.login-form /deep/ .el-form-item__content {
  margin-left: 0px !important;
}

.my-button {
  width: 100%;
}
</style>
