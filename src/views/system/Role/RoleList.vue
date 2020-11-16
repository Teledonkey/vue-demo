<template>
  <el-main>
    <!-- 搜索框 -->
    <el-form size="mini" :model="roleForm" label-width="80px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="名称">
            <el-input
              v-model="roleForm.roleName"
              placeholder="请输入角色名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-button
          size="mini"
          class="btn-left"
          type="primary"
          icon="el-icon-search"
          >查询</el-button
        >
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click="openAddRole"
          >新增</el-button
        >
      </el-row>
    </el-form>
    <!-- 数据表格 -->
    <el-table
      size="mini"
      :data="tableData"
      :height="tableHeight"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column prop="date" label="日期"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作" align="center" width="250px">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editRole(scope.row)"
            >编辑</el-button
          >
          <el-button type="success" size="small" @click="assignRole(scope.row)"
            >分配权限</el-button
          >
          <el-button type="danger" size="small" @click="deleteRole(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 
        分页组件：
        size-change：page-size改变时调用
        current-change：当前页改变时调用
        current-page：当前页
        page-size：页容量
        total：总页数
     -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="this.tableData.length"
    >
    </el-pagination>
    <!-- 新增角色对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="42%">
      <el-form
        ref="addRole"
        :rules="rules"
        :model="addRoleForm"
        size="mini"
        :inline="true"
      >
        <el-form-item prop="name" label="角色名称" label-width="80px">
          <el-input
            v-model="addRoleForm.name"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="角色描述" label-width="80px">
          <el-input
            v-model="addRoleForm.remark"
            placeholder="请输入角色描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限弹框 -->
    <el-dialog :title="autnTitle" :visible.sync="autnDialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="autnDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="autnDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
//引入ztree组件
import tree from "vue-giant-tree";

export default {
  components() {
    tree;
  },
  data() {
    return {
      innerVisible: false, //控制弹框显示
      ztreeObj: null,
      setting: {
        check: {
          enable: true,
        },
        data: {
          simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: "0",
          },
        },
        callback: {
          onCheck: this.ztreeOnCheck,
        },
      },

      //控制分配弹框的显示和隐藏
      autnDialogVisible: false,
      //分配权限弹框标题
      autnTitle: "",
      //表单验证规则
      rules: {
        name: [
          {
            required: true,
            trigger: "change",
            message: "请输入角色名称",
          },
        ],
        remark: [
          {
            required: true,
            trigger: "change",
            message: "请输入角色描述",
          },
        ],
      },
      //新增或编辑角色时数据绑定对象
      addRoleForm: {
        name: "",
        remark: "",
      },
      //对话框标题
      dialogTitle: "",
      //控制角色对话框显示与隐藏
      dialogVisible: false,
      //搜索框数据绑定
      roleForm: {
        roleName: "",
      },
      //表格高度
      tableHeight: window.innerHeight,
      //表格数据
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      currentPage1: 1,
    };
  },
  methods: {
    //确认新增或编辑按钮事件
    confirmBtn() {
      this.$refs.addRole.validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
        }
      });
    },
    //打开新增角色对话框
    openAddRole() {
      this.resetForm("addRole");
      this.dialogTitle = "新增角色";
      this.dialogVisible = true;
    },
    resetForm(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //编辑角色事件
    editRole(row) {
      console.log(row);
    },
    //分配角色事件
    assignRole(row) {
      console.log(row);
      this.autnDialogVisible = true;
    },
    //删除角色事件
    deleteRole(row) {
      console.log(row);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 270; //后面的50：根据需求空出的高度，自行调整;
    });
  },
};
</script>

<style lang="scss" scoped>
.btn-left {
  margin-left: 30px;
}
</style>