<template>
  <el-container>
    <el-aside width="200px">
      <div class="ub cross-center" style="margin-left: 5px; font-size: 14px">
        <i class="el-icon-menu"></i>
        <span style="margin-left: 3px">组织机构</span>
      </div>
      <tree
        style="padding-left: 0px; padding-top: 5px"
        :nodes="nodes"
        :setting="setting"
        @onCreated="handleCreated"
      />
    </el-aside>
    <el-main>
      <el-form
        size="mini"
        :model="searchForm"
        ref="searchForm"
        label-width="80px"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item label="用户名">
              <el-input v-model="searchForm.username" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="电话">
              <el-input v-model="searchForm.phone" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="邮箱">
              <el-input
                v-model="searchForm.email"
                placeholder=""
              ></el-input> </el-form-item
          ></el-col>
          <el-button
            size="mini"
            class="btn-left"
            type="primary"
            icon="el-icon-search"
            style="margin-left: 20px"
            >查询</el-button
          >
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="addUser"
            >新增</el-button
          >
        </el-row>
      </el-form>
      <!-- 用户列表插件 -->
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%"
        :height="tableHeight"
      >
        <el-table-column prop="date" label="日期"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column label="操作" width="250px" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="assignRole(scope.$index, scope.row)"
              >分配角色</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页插件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </el-main>
    <!-- 新增用户弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="35%">
      <el-form
        :model="addForm"
        ref="addForm"
        label-width="80px"
        :inline="true"
        size="mini"
      >
        <el-form-item label="姓名">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="登录名">
          <el-input v-model="addForm.loginname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="机构">
          <el-input
            v-model="addForm.deptName"
            @click.native="selectDept"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
      <!-- 内嵌上级机构弹框 -->
      <el-dialog
        title="选择部门"
        :visible.sync="parentDialogVisible"
        width="30%"
        append-to-body
      >
        <tree
          :nodes="parentNodes"
          @onCreated="createdParent"
          :setting="parentSetting"
        ></tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="parentDialogCancle">取 消</el-button>
          <el-button type="primary" @click="parentDialogCommit"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-dialog>
    <!-- 分配权限弹窗 -->
    <el-dialog
      class="roleClass"
      title="分配权限"
      :visible.sync="roleDialogVisible"
      width="50%"
    >
      <el-table
        :data="roleTableData"
        @current-change="selectRoleRow"
        highlight-current-row
        style="width: 100%"
        border
        stripe
      >
        <el-table-column prop="id" label="序号" width="180"> </el-table-column>
        <el-table-column prop="roleName" label="名称"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="roleDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import tree from "vue-giant-tree";
export default {
  components: {
    tree,
  },
  data() {
    return {
      //分配权限数据绑定
      roleTableData: [],
      //控制分配权限弹框显示或隐藏
      roleDialogVisible: false,
      //控制上级部门树弹框显示影藏
      parentDialogVisible: false,
      parentZtreeObj: null,
      parentNodes: [], //上级部门树数据
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
      //新增用户数据绑定
      addForm: {
        username: "",
        sex: "0",
        mobile: "",
        loginname: "",
        password: "",
        deptId: "",
        deptName: "",
      },
      //新增弹窗标题
      dialogTitle: "",
      //控制新增弹窗显示或隐藏
      dialogVisible: false,
      //搜索框form表单数据
      searchForm: {
        username: "",
        phone: "",
        email: "",
      },
      //树插件配置
      ztreeObj: null,
      setting: {
        view: {
          //是否显示节点之间的连线
          showLine: true,
          //是否显示节点的图标
          showIcon: false,
          //个性化文字样式
          fontCss: { "font-size": "12px", color: "#333" },
        },
        //设置这里会显示复选框
        // check: {
        //   enable: true
        // },
        data: {
          //ztree数据模式配置
          simpleData: {
            // 使用 / 不使用 简单数据模式
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: "0",
          },
        },
        //回调函数配置
        callback: {
          //；配置树的点击事件
          onClick: this.ztreeOnClick,
        },
      },
      nodes: [
        {
          id: "1000000362292826",
          pid: "1000001251633881",
          likeId: "0,100000177618509910000012516338811000000362292826",
          parentName: "销售部门",
          manager: null,
          name: "销售1",
          deptCode: "",
          deptAddress: "",
          deptPhone: "",
          orderNum: 0,
        },
        {
          id: "1000001251633881",
          pid: "1000001776185099",
          likeId: "0,10000017761850991000001251633881",
          parentName: "秘咖科技有限公司",
          manager: null,
          name: "销售部门",
          deptCode: null,
          deptAddress: null,
          deptPhone: null,
          orderNum: null,
        },
        {
          id: "1000001341234088",
          pid: "1000001776185099",
          likeId: "0,1000001776185099",
          parentName: "秘咖网络科技有限公司",
          manager: null,
          name: "人才管理部1",
          deptCode: "RCGL",
          deptAddress: "",
          deptPhone: "",
          orderNum: 0,
        },
        {
          id: "1000001620535597",
          pid: "1000001776185099",
          likeId: "0,10000017761850991000001620535597",
          parentName: "秘咖网络科技有限公司",
          manager: null,
          name: "软件研发部",
          deptCode: null,
          deptAddress: null,
          deptPhone: null,
          orderNum: null,
        },
        {
          id: "1000001776185099",
          pid: "0",
          likeId: "0,1000001776185099",
          parentName: "顶级部门",
          manager: null,
          name: "秘咖网络科技有限公司",
          deptCode: null,
          deptAddress: null,
          deptPhone: null,
          orderNum: null,
        },
        {
          id: "1000002097176073",
          pid: "1000001776185099",
          likeId: "0,10000017761850991000002097176073",
          parentName: "秘咖网络科技有限公司",
          manager: "464156",
          name: "售后服务部",
          deptCode: "SHFWB",
          deptAddress: "昆明",
          deptPhone: "18687171906",
          orderNum: null,
        },
      ],
      //分页插件当前页
      currentPage: 1,
      //用户列表高度
      tableHeight: 0,
      //用户列表数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    //当前选择的角色
    selectRoleRow(row) {
      console.log(row);
    },
    //嵌套上级机构确定按钮事件
    parentDialogCommit() {
      this.parentDialogVisible = false;
    },
    //嵌套上级机构取消按钮事件
    parentDialogCancle() {
      this.addForm.deptName = "";
      this.parentDialogVisible = false;
    },
    //上级部门树创建成功回调
    createdParent(obj) {
      this.parentZtreeObj = obj;
      obj.expandAll(true);
    },
    //上级部门树点击事件
    ztreeParentOnClick(event, treeId, treeNode) {
      this.addForm.deptId = treeNode.id;
      this.addForm.deptName = treeNode.name;
      console.log(event);
      console.log(treeId);
      console.log(treeNode);
    },
    //选择上级部门点击事件
    selectDept() {
      (this.parentNodes = [
        {
          id: "1000000362292826",
          pid: "1000001251633881",
          likeId: "0,100000177618509910000012516338811000000362292826",
          parentName: "销售部门",
          manager: null,
          name: "销售1",
          deptCode: "",
          deptAddress: "",
          deptPhone: "",
          orderNum: 0,
        },
        {
          id: "1000001251633881",
          pid: "1000001776185099",
          likeId: "0,10000017761850991000001251633881",
          parentName: "秘咖科技有限公司",
          manager: null,
          name: "销售部门",
          deptCode: null,
          deptAddress: null,
          deptPhone: null,
          orderNum: null,
        },
        {
          id: "1000001341234088",
          pid: "1000001776185099",
          likeId: "0,1000001776185099",
          parentName: "秘咖网络科技有限公司",
          manager: null,
          name: "人才管理部1",
          deptCode: "RCGL",
          deptAddress: "",
          deptPhone: "",
          orderNum: 0,
        },
        {
          id: "1000001620535597",
          pid: "1000001776185099",
          likeId: "0,10000017761850991000001620535597",
          parentName: "秘咖网络科技有限公司",
          manager: null,
          name: "软件研发部",
          deptCode: null,
          deptAddress: null,
          deptPhone: null,
          orderNum: null,
        },
        {
          id: "1000001776185099",
          pid: "0",
          likeId: "0,1000001776185099",
          parentName: "顶级部门",
          manager: null,
          name: "秘咖网络科技有限公司",
          deptCode: null,
          deptAddress: null,
          deptPhone: null,
          orderNum: null,
        },
        {
          id: "1000002097176073",
          pid: "1000001776185099",
          likeId: "0,10000017761850991000002097176073",
          parentName: "秘咖网络科技有限公司",
          manager: "464156",
          name: "售后服务部",
          deptCode: "SHFWB",
          deptAddress: "昆明",
          deptPhone: "18687171906",
          orderNum: null,
        },
      ]),
        (this.parentDialogVisible = true);
    },
    //新增用户点击事件
    addUser() {
      this.dialogVisible = true;
      this.dialogTitle = "新增用户";
    },
    //编辑事件
    handleEdit(index, row) {
      console.log(index, row);
    },
    //分配权限事件
    assignRole(index, row) {
      console.log(index, row);
      this.roleTableData = [
        { id: "1", roleName: "超级管理员" },
        { id: "2", roleName: "系统管理员" },
        { id: "3", roleName: "财务管理员" },
      ];
      this.roleDialogVisible = true;
      console.log(this.roleTableData);
    },
    //删除事件
    handleDelete(index, row) {
      console.log(index, row);
    },
    //分页插件页容量改变时调用
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //分页插件当前页改变时调用
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //树创建后返回ztree对象
    handleCreated(treeObj) {
      this.ztreeObj = treeObj;
      treeObj.expandAll(true);
    },
    //树点击回调函数
    ztreeOnClick(evt, treeId, treeNode) {
      console.log(evt);
      console.log(treeId);
      console.log(treeNode);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 250; //后面的50：根据需求空出的高度，自行调整;
    });
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  border-right: 1px solid #e6e6e6;
}
.roleClass /deep/ .el-table__body tr.current-row > td {
  background: #409eff !important;
  color: #fff;
}
</style>