<template>
  <el-main>
    <el-form
      :model="searchForm"
      ref="searchForm"
      label-width="80px"
      size="mini"
    >
      <el-row>
        <el-col :span="5">
          <el-form-item label="名称">
            <el-input v-model="searchForm.roleName"></el-input>
          </el-form-item>
        </el-col>
        <el-button
          style="margin-left: 20px"
          size="mini"
          type="primary"
          icon="el-icon-search"
          >搜索</el-button
        >
        <el-button
          @click="addMenu"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          >新增</el-button
        >
      </el-row>
    </el-form>

    <el-table
      size="mini"
      :height="tableHeight"
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      stripe
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="label" label="名称" sortable> </el-table-column>
      <el-table-column
        prop="icon"
        label="图标"
        sortable
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <i :class="scope.row.icon || ''"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === '0'" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === '1'" size="small" type="success"
            >菜单</el-tag
          >
          <el-tag v-else-if="scope.row.type === '2'" size="small" type="info"
            >按钮</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单URL"> </el-table-column>
      <el-table-column prop="path" label="路由地址"> </el-table-column>
      <el-table-column prop="code" label="权限标识"> </el-table-column>
      <el-table-column prop="orderNum" label="序号"> </el-table-column>
    </el-table>

    <!-- 新增按钮弹框 新增权限弹框 -->
    <el-dialog
      :title="addAuthDialogTitle"
      :visible.sync="addAuthDialogVisible"
      width="40%"
    >
      <el-form
        :model="addAuthForm"
        ref="form"
        label-width="80px"
        :inline="true"
        size="mini"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="菜单类型">
              <el-radio-group v-model="addAuthForm.type">
                <el-radio :label="0">目录</el-radio>
                <el-radio :label="1">菜单</el-radio>
                <el-radio :label="2">按钮</el-radio>
              </el-radio-group>
            </el-form-item></el-col
          >
        </el-row>
        <el-form-item label="上级菜单">
          <el-input
            v-model="addAuthForm.parentName"
            @click.native="selectParent"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="addAuthForm.label"></el-input>
        </el-form-item>
        <el-form-item v-if="addAuthForm.type != '2'" label="菜单图标">
          <el-input v-model="addAuthForm.icon"></el-input>
        </el-form-item>
        <el-form-item v-if="addAuthForm.type == '1'" label="路由名称">
          <el-input v-model="addAuthForm.name"></el-input>
        </el-form-item>
        <el-form-item v-if="addAuthForm.type != '2'" label="路由地址">
          <el-input v-model="addAuthForm.path"></el-input>
        </el-form-item>
        <el-form-item v-if="addAuthForm.type == '1'" label="组件路径">
          <el-input v-model="addAuthForm.url"></el-input>
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="addAuthForm.code"></el-input>
        </el-form-item>
        <el-form-item label="显示序号">
          <el-input-number v-model="addAuthForm.orderNum"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAuthDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAuthDialogVisible = false"
          >确 定</el-button
        >
      </span>
      <!-- 内嵌上级机构弹窗 -->
      <el-dialog
        title="上级机构"
        :visible.sync="parentDeptDialogVisible"
        width="25%"
        append-to-body
      >
        <tree
          :nodes="parentNodes"
          :setting="parentSetting"
          @onCreated="handleParentCreated"
        />
        <span slot="footer" class="dialog-footer">
          <el-button @click="parentDeptDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="parentDeptDialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-dialog>
  </el-main>
</template>

<script>
import tree from "vue-giant-tree";

export default {
  components: {
    tree,
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 250; //后面的50：根据需求空出的高度，自行调整;
    });
  },
  data() {
    return {
      //上级树对象
      parentZtreeObj: null,
      parentNodes: [
        {
          id: 0,
          pid: -1,
          name: "顶级菜单",
          open: true,
          checked: false,
        },
        {
          id: 17,
          pid: 0,
          name: "系统管理",
          open: true,
          checked: false,
        },
        {
          id: 18,
          pid: 17,
          name: "用户管理",
          open: true,
          checked: false,
        },
        {
          id: 23,
          pid: 17,
          name: "角色管理",
          open: true,
          checked: false,
        },
        {
          id: 28,
          pid: 17,
          name: "权限管理",
          open: true,
          checked: false,
        },
        {
          id: 33,
          pid: 17,
          name: "机构管理",
          open: true,
          checked: false,
        },
        {
          id: 34,
          pid: 0,
          name: "商品管理",
          open: true,
          checked: false,
        },
        {
          id: 36,
          pid: 34,
          name: "分类管理",
          open: true,
          checked: false,
        },
        {
          id: 37,
          pid: 34,
          name: "品牌管理",
          open: true,
          checked: false,
        },
        {
          id: 42,
          pid: 0,
          name: "系统工具",
          open: true,
          checked: false,
        },
        {
          id: 43,
          pid: 42,
          name: "代码生成",
          open: true,
          checked: false,
        },
        {
          id: 77,
          pid: 42,
          name: "接口文档",
          open: true,
          checked: false,
        },
      ],
      //上级部门树配置
      parentSetting: {
        view: {
          showLine: true,
          showIcon: false,
          fontCss: { "font-size": "12px", color: "#333" },
        },
        //设置这里会显示复选框
        // check: {
        //   enable: true
        // },
        data: {
          simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: "0",
          },
        },
        callback: {
          onClick: this.ztreeParentOnClick,
        },
      },
      //控制内嵌上级机构弹框显示或隐藏
      parentDeptDialogVisible: false,
      //存储新增权限表单数据
      addAuthForm: {
        id: "", //编辑id
        label: "",
        name: "",
        type: 0,
        parentId: "",
        orderNum: "",
        parentName: "",
        path: "",
        url: "",
        code: "",
        icon: "",
      },
      //新增权限弹框标题
      addAuthDialogTitle: "",
      //控制新增权限弹框显示或隐藏
      addAuthDialogVisible: false,
      //搜索框绑定对象
      searchForm: {
        roleName: "",
      },
      //表格高度
      tableHeight: 0,
      //表格数据绑定
      tableData: [
        {
          id: 17,
          parentId: 0,
          parentName: "顶级菜单",
          label: "系统管理",
          code: "sys:manage",
          path: "/system",
          name: null,
          url: null,
          orderNum: 1,
          type: "0",
          icon: "el-icon-document",
          remark: null,
          createTime: "2023-08-08T03:11:11.000+0000",
          updateTime: "2023-08-09T07:26:28.000+0000",
          isHome: 0,
          children: [
            {
              id: 33,
              parentId: 17,
              parentName: "系统管理",
              label: "机构管理",
              code: "sys:dept",
              path: "/departmentList",
              name: "departmentList",
              url: "/system/Department/DepartmentList",
              orderNum: 2,
              type: "1",
              icon: "el-icon-copy-document",
              remark: "机构管理",
              createTime: "2020-04-12T14:58:29.000+0000",
              updateTime: "2020-04-08T09:12:19.000+0000",
              isHome: 0,
              children: [
                {
                  id: 46,
                  parentId: 33,
                  parentName: null,
                  label: "新增",
                  code: "sys:addDepartment",
                  path: "",
                  name: "",
                  url: null,
                  orderNum: 0,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-12T11:58:48.000+0000",
                  updateTime: "2020-04-12T11:58:48.000+0000",
                  isHome: 0,
                  children: [],
                },
                {
                  id: 76,
                  parentId: 33,
                  parentName: null,
                  label: "编辑",
                  code: "sys:editDept",
                  path: "",
                  name: "",
                  url: null,
                  orderNum: 1,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-12T12:42:20.000+0000",
                  updateTime: "2020-04-12T12:42:20.000+0000",
                  isHome: 0,
                  children: [],
                },
                {
                  id: 78,
                  parentId: 33,
                  parentName: "机构管理",
                  label: "删除",
                  code: "sys:deleteDept",
                  path: "",
                  name: "",
                  url: "",
                  orderNum: 3,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-18T02:25:55.000+0000",
                  updateTime: "2020-04-18T02:25:55.000+0000",
                  isHome: 0,
                  children: [],
                },
              ],
            },
            {
              id: 18,
              parentId: 17,
              parentName: null,
              label: "用户管理",
              code: "sys:user",
              path: "/userList",
              name: "userList",
              url: "/system/User/UserList",
              orderNum: 3,
              type: "1",
              icon: "el-icon-s-custom",
              remark: null,
              createTime: "2023-08-08T03:11:11.000+0000",
              updateTime: "2023-08-09T07:26:28.000+0000",
              isHome: 0,
              children: [
                {
                  id: 20,
                  parentId: 18,
                  parentName: null,
                  label: "新增",
                  code: "sys:user:add",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: "",
                  remark: "新增用户",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: [],
                },
                {
                  id: 21,
                  parentId: 18,
                  parentName: null,
                  label: "修改",
                  code: "sys:user:edit",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: "",
                  remark: "修改用户",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: [],
                },
                {
                  id: 22,
                  parentId: 18,
                  parentName: null,
                  label: "删除",
                  code: "sys:user:delete",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: "",
                  remark: "删除用户",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: [],
                },
                {
                  id: 80,
                  parentId: 18,
                  parentName: "用户管理",
                  label: "分配角色",
                  code: "sys:user:assign",
                  path: "",
                  name: "",
                  url: "",
                  orderNum: 0,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-18T02:50:14.000+0000",
                  updateTime: "2020-04-18T02:50:14.000+0000",
                  isHome: 0,
                  children: [],
                },
              ],
            },
            {
              id: 23,
              parentId: 17,
              parentName: null,
              label: "角色管理",
              code: "sys:role",
              path: "/roleList",
              name: "roleList",
              url: "/system/Role/RoleList",
              orderNum: 4,
              type: "1",
              icon: "el-icon-rank",
              remark: null,
              createTime: "2023-08-08T03:11:11.000+0000",
              updateTime: "2023-08-09T07:26:28.000+0000",
              isHome: 0,
              children: [
                {
                  id: 25,
                  parentId: 23,
                  parentName: null,
                  label: "新增",
                  code: "sys:role:add",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: "",
                  remark: "新增角色",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: [],
                },
                {
                  id: 26,
                  parentId: 23,
                  parentName: null,
                  label: "修改",
                  code: "sys:role:edit",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: "",
                  remark: "修改角色",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: [],
                },
                {
                  id: 27,
                  parentId: 23,
                  parentName: null,
                  label: "删除",
                  code: "sys:role:delete",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: "",
                  remark: "删除角色",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: [],
                },
                {
                  id: 79,
                  parentId: 23,
                  parentName: "角色管理",
                  label: "分配权限",
                  code: "sys:role:assign",
                  path: "",
                  name: "",
                  url: "",
                  orderNum: 0,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-18T02:31:05.000+0000",
                  updateTime: "2020-04-18T02:31:05.000+0000",
                  isHome: 0,
                  children: [],
                },
              ],
            },
            {
              id: 28,
              parentId: 17,
              parentName: null,
              label: "权限管理",
              code: "sys:menu",
              path: "/menuList",
              name: "menuList",
              url: "/system/Menu/MenuList",
              orderNum: 5,
              type: "1",
              icon: "el-icon-menu",
              remark: null,
              createTime: "2023-08-08T03:11:11.000+0000",
              updateTime: "2023-08-09T07:26:28.000+0000",
              isHome: 0,
              children: [
                {
                  id: 30,
                  parentId: 28,
                  parentName: null,
                  label: "新增",
                  code: "sys:menu:add",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: null,
                  remark: "新增权限",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: [],
                },
                {
                  id: 31,
                  parentId: 28,
                  parentName: null,
                  label: "修改",
                  code: "sys:menu:edit",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: null,
                  remark: "修改权限",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: [],
                },
                {
                  id: 32,
                  parentId: 28,
                  parentName: null,
                  label: "删除",
                  code: "sys:menu:delete",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: "",
                  remark: "删除权限",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 34,
          parentId: 0,
          parentName: "顶级菜单",
          label: "商品管理",
          code: "sys:goods",
          path: "/goods",
          name: "",
          url: null,
          orderNum: 2,
          type: "0",
          icon: "el-icon-picture",
          remark: null,
          createTime: "2020-04-12T14:49:47.000+0000",
          updateTime: "2020-04-12T09:22:03.000+0000",
          isHome: 0,
          children: [
            {
              id: 36,
              parentId: 34,
              parentName: "商品管理",
              label: "分类管理",
              code: "sys:goodsCategory",
              path: "/goodCategory",
              name: "goodCategory",
              url: "/goods/goodsCategory/goodsCategoryList",
              orderNum: 1,
              type: "1",
              icon: "el-icon-s-data",
              remark: null,
              createTime: "2020-04-12T14:54:32.000+0000",
              updateTime: "2020-04-12T09:26:30.000+0000",
              isHome: 0,
              children: [
                {
                  id: 38,
                  parentId: 36,
                  parentName: null,
                  label: "新增",
                  code: "sys:addGoodsCategory",
                  path: "",
                  name: "",
                  url: null,
                  orderNum: 0,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-12T09:33:58.000+0000",
                  updateTime: "2020-04-12T09:33:58.000+0000",
                  isHome: 0,
                  children: [],
                },
                {
                  id: 39,
                  parentId: 36,
                  parentName: null,
                  label: "编辑",
                  code: "sys:editGoodsCategory",
                  path: "",
                  name: "",
                  url: null,
                  orderNum: 1,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-12T09:35:30.000+0000",
                  updateTime: "2020-04-12T09:35:30.000+0000",
                  isHome: 0,
                  children: [],
                },
              ],
            },
            {
              id: 37,
              parentId: 34,
              parentName: null,
              label: "品牌管理",
              code: "sys:goodsBrand",
              path: "/goodsBrand",
              name: "goodsBrand",
              url: "/goods/goodsBrand/goodsBrandList",
              orderNum: 2,
              type: "1",
              icon: "el-icon-tickets",
              remark: null,
              createTime: "2020-04-12T09:32:04.000+0000",
              updateTime: "2020-04-12T09:32:04.000+0000",
              isHome: 0,
              children: [
                {
                  id: 40,
                  parentId: 37,
                  parentName: null,
                  label: "新增",
                  code: "sys:addGoodsBrand",
                  path: "",
                  name: "",
                  url: null,
                  orderNum: 0,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-12T09:36:14.000+0000",
                  updateTime: "2020-04-12T09:36:14.000+0000",
                  isHome: 0,
                  children: [],
                },
                {
                  id: 41,
                  parentId: 37,
                  parentName: null,
                  label: "编辑",
                  code: "sys:editGoodsBrand",
                  path: "",
                  name: "",
                  url: null,
                  orderNum: 1,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-12T09:36:46.000+0000",
                  updateTime: "2020-04-12T09:36:46.000+0000",
                  isHome: 0,
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 42,
          parentId: 0,
          parentName: "顶级菜单",
          label: "系统工具",
          code: "sys:systenConfig",
          path: "/systenConfig",
          name: "",
          url: null,
          orderNum: 3,
          type: "0",
          icon: "el-icon-receiving",
          remark: null,
          createTime: "2020-04-12T14:50:03.000+0000",
          updateTime: "2020-04-12T09:40:41.000+0000",
          isHome: 0,
          children: [
            {
              id: 43,
              parentId: 42,
              parentName: "系统工具",
              label: "代码生成",
              code: "sys:systemCode",
              path: "/systemCode",
              name: "systemCode",
              url: "/system/config/code",
              orderNum: 0,
              type: "1",
              icon: "el-icon-files",
              remark: null,
              createTime: "2020-04-16T04:44:42.000+0000",
              updateTime: "2020-04-12T09:44:06.000+0000",
              isHome: 0,
              children: [],
            },
            {
              id: 77,
              parentId: 42,
              parentName: "系统工具",
              label: "接口文档",
              code: "sys:document",
              path: "/document",
              name: "document",
              url: "/system/config/systemDocument",
              orderNum: 0,
              type: "1",
              icon: "el-icon-s-operation",
              remark: null,
              createTime: "2020-04-13T03:31:45.000+0000",
              updateTime: "2020-04-13T03:31:45.000+0000",
              isHome: 0,
              children: [],
            },
          ],
        },
      ],
    };
  },
  methods: {
    //新增菜单事件
    addMenu() {
      this.addAuthDialogTitle = "新增权限";
      this.addAuthDialogVisible = true;
    },
    //选择上级机构事件
    selectParent() {
      this.parentDeptDialogVisible = true;
    },
    //树节点点击事件
    ztreeParentOnClick(evt, treeId, treeNode) {
      console.log(evt);
      console.log(treeId);
      console.log(treeNode);
      this.addAuthForm.parentName = treeNode.name;
      this.addAuthForm.parentId = treeNode.id;
    },
    //初始化上级机构树对象ß
    handleParentCreated(treeObj) {
      this.parentZtreeObj = treeObj;
      //设置展开
      treeObj.expandAll(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog__wrapper /deep/ .el-dialog__body {
  padding-top: 10px !important;
  padding-bottom: 5px !important;
}
</style>