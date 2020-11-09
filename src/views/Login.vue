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
          type="text"
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
            <el-button class="my-button" type="primary" @click="submit"
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
        username: "", //用户名
        password: "", //密码
        code: "", //验证码
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
          //  后台登录成功返回的菜单数据
          let menuList = [
            {
              children: [
                {
                  children: [],
                  code: "sys:dept",
                  createTime: 1586703509000,
                  icon: "el-icon-copy-document",
                  id: 33,
                  isHome: 0,
                  label: "机构管理",
                  name: "departmentList",
                  orderNum: 2,
                  parentId: 17,
                  path: "/departmentList",
                  remark: "机构管理",
                  type: "1",
                  updateTime: 1586337139000,
                  url: "/system/Department/DepartmentList",
                },
                {
                  children: [],
                  code: "sys:user",
                  createTime: 1691464271000,
                  icon: "el-icon-s-custom",
                  id: 18,
                  isHome: 0,
                  label: "用户管理",
                  name: "userList",
                  orderNum: 3,
                  parentId: 17,
                  path: "/userList",
                  type: "1",
                  updateTime: 1691565988000,
                  url: "/system/User/UserList",
                },
                {
                  children: [],
                  code: "sys:role",
                  createTime: 1691464271000,
                  icon: "el-icon-rank",
                  id: 23,
                  isHome: 0,
                  label: "角色管理",
                  name: "roleList",
                  orderNum: 4,
                  parentId: 17,
                  path: "/roleList",
                  type: "1",
                  updateTime: 1691565988000,
                  url: "/system/Role/RoleList",
                },
                {
                  children: [],
                  code: "sys:menu",
                  createTime: 1691464271000,
                  icon: "el-icon-menu",
                  id: 28,
                  isHome: 0,
                  label: "权限管理",
                  name: "menuList",
                  orderNum: 5,
                  parentId: 17,
                  path: "/menuList",
                  type: "1",
                  updateTime: 1691565988000,
                  url: "/system/Menu/MenuList",
                },
              ],
              code: "sys:manage",
              createTime: 1691464271000,
              icon: "el-icon-document",
              id: 17,
              isHome: 0,
              label: "系统管理",
              orderNum: 1,
              parentId: 0,
              path: "/system",
              type: "0",
              updateTime: 1691565988000,
            },
            {
              children: [
                {
                  children: [],
                  code: "sys:goodsCategory",
                  createTime: 1586703272000,
                  icon: "el-icon-s-data",
                  id: 36,
                  isHome: 0,
                  label: "分类管理",
                  name: "goodCategory",
                  orderNum: 1,
                  parentId: 34,
                  path: "/goodCategory",
                  type: "1",
                  updateTime: 1586683590000,
                  url: "/goods/goodsCategory/goodsCategoryList",
                },
                {
                  children: [],
                  code: "sys:goodsBrand",
                  createTime: 1586683924000,
                  icon: "el-icon-tickets",
                  id: 37,
                  isHome: 0,
                  label: "品牌管理",
                  name: "goodsBrand",
                  orderNum: 2,
                  parentId: 34,
                  path: "/goodsBrand",
                  type: "1",
                  updateTime: 1586683924000,
                  url: "/goods/goodsBrand/goodsBrandList",
                },
              ],
              code: "sys:goods",
              createTime: 1586702987000,
              icon: "el-icon-picture",
              id: 34,
              isHome: 0,
              label: "商品管理",
              name: "",
              orderNum: 2,
              parentId: 0,
              path: "/goods",
              type: "0",
              updateTime: 1586683323000,
            },
            {
              children: [
                {
                  children: [],
                  code: "sys:systemCode",
                  createTime: 1587012282000,
                  icon: "el-icon-files",
                  id: 43,
                  isHome: 0,
                  label: "代码生成",
                  name: "systemCode",
                  orderNum: 0,
                  parentId: 42,
                  path: "/systemCode",
                  type: "1",
                  updateTime: 1586684646000,
                  url: "/system/config/code",
                },
                {
                  children: [],
                  code: "sys:document",
                  createTime: 1586748705000,
                  icon: "el-icon-s-operation",
                  id: 77,
                  isHome: 0,
                  label: "接口文档",
                  name: "document",
                  orderNum: 0,
                  parentId: 42,
                  path: "/document",
                  type: "1",
                  updateTime: 1586748705000,
                  url: "/system/config/systemDocument",
                },
              ],
              code: "sys:systenConfig",
              createTime: 1586703003000,
              icon: "el-icon-receiving",
              id: 42,
              isHome: 0,
              label: "系统工具",
              name: "",
              orderNum: 3,
              parentId: 0,
              path: "/systenConfig",
              type: "0",
              updateTime: 1586684441000,
            },
          ];
          //路由数据
          let routerList = [
            {
              children: [],
              code: "sys:systemCode",
              createTime: 1587012282000,
              icon: "el-icon-files",
              id: 43,
              isHome: 0,
              label: "代码生成",
              name: "systemCode",
              orderNum: 0,
              parentId: 42,
              path: "/systemCode",
              type: "1",
              updateTime: 1586684646000,
              url: "/system/config/code",
            },
            {
              children: [],
              code: "sys:document",
              createTime: 1586748705000,
              icon: "el-icon-s-operation",
              id: 77,
              isHome: 0,
              label: "接口文档",
              name: "document",
              orderNum: 0,
              parentId: 42,
              path: "/document",
              type: "1",
              updateTime: 1586748705000,
              url: "/system/config/systemDocument",
            },
            {
              children: [],
              code: "sys:goodsCategory",
              createTime: 1586703272000,
              icon: "el-icon-s-data",
              id: 36,
              isHome: 0,
              label: "分类管理",
              name: "goodCategory",
              orderNum: 1,
              parentId: 34,
              path: "/goodCategory",
              type: "1",
              updateTime: 1586683590000,
              url: "/goods/goodsCategory/goodsCategoryList",
            },
            {
              children: [],
              code: "sys:goodsBrand",
              createTime: 1586683924000,
              icon: "el-icon-tickets",
              id: 37,
              isHome: 0,
              label: "品牌管理",
              name: "goodsBrand",
              orderNum: 2,
              parentId: 34,
              path: "/goodsBrand",
              type: "1",
              updateTime: 1586683924000,
              url: "/goods/goodsBrand/goodsBrandList",
            },
            {
              children: [],
              code: "sys:dept",
              createTime: 1586703509000,
              icon: "el-icon-copy-document",
              id: 33,
              isHome: 0,
              label: "机构管理",
              name: "departmentList",
              orderNum: 2,
              parentId: 17,
              path: "/departmentList",
              remark: "机构管理",
              type: "1",
              updateTime: 1586337139000,
              url: "/system/Department/DepartmentList",
            },
            {
              children: [],
              code: "sys:user",
              createTime: 1691464271000,
              icon: "el-icon-s-custom",
              id: 18,
              isHome: 0,
              label: "用户管理",
              name: "userList",
              orderNum: 3,
              parentId: 17,
              path: "/userList",
              type: "1",
              updateTime: 1691565988000,
              url: "/system/User/UserList",
            },
            {
              children: [],
              code: "sys:role",
              createTime: 1691464271000,
              icon: "el-icon-rank",
              id: 23,
              isHome: 0,
              label: "角色管理",
              name: "roleList",
              orderNum: 4,
              parentId: 17,
              path: "/roleList",
              type: "1",
              updateTime: 1691565988000,
              url: "/system/Role/RoleList",
            },
            {
              children: [],
              code: "sys:menu",
              createTime: 1691464271000,
              icon: "el-icon-menu",
              id: 28,
              isHome: 0,
              label: "权限管理",
              name: "menuList",
              orderNum: 5,
              parentId: 17,
              path: "/menuList",
              type: "1",
              updateTime: 1691565988000,
              url: "/system/Menu/MenuList",
            },
          ];
          //存储菜单数据
          sessionStorage.setItem("menuList", JSON.stringify(menuList));
          //存储路由数据
          sessionStorage.setItem("routerList", JSON.stringify(routerList));
          //提交到store
          this.$store.commit("getMenuList",this.$router);
          //登陆成功跳转到首页
          this.$router.push("home");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
}

.login-title {
  font-size: 24px;
  font-weight: 600;
}

.login-form {
  height: 300px;
  width: 350px;
  padding: 20px 35px;
  border-radius: 10px;
  box-shadow: 0 0 25px #cac6c6;
}

.login-container /deep/ .el-form-item__content {
  margin-left: 0px !important;
}

.my-button {
  width: 100%;
}
</style>
