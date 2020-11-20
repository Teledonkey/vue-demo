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
      <el-form size="mini" :model="searchForm" label-width="80px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="部门名称">
              <el-input v-model="searchForm.deptName" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="部门电话">
              <el-input
                v-model="searchForm.deptPhone"
                placeholder=""
              ></el-input>
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
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="addDept"
            >新增</el-button
          >
        </el-row>
      </el-form>
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
        <el-table-column align="center" width="170px" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
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
    <!-- 新增部门弹窗 -->
    <el-dialog
      :title="addDeptDialogTitle"
      :visible.sync="addDeptDialogVisible"
      width="30%"
    >
      <el-form
        size="mini"
        :model="addDeptFrom"
        ref="addForm"
        label-width="80px"
      >
        <el-form-item label="上级部门">
          <el-input
            v-model="addDeptFrom.parentName"
            placeholder=""
            @click.native="selectDept()"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input v-model="addDeptFrom.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="部门编码">
          <el-input v-model="addDeptFrom.deptCode" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="部门电话">
          <el-input v-model="addDeptFrom.deptPhone" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="部门地址">
          <el-input v-model="addDeptFrom.deptAddress" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model="addDeptFrom.orderNum" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <!-- 内嵌上级部门弹窗 -->
      <el-dialog
        width="30%"
        :title="innerUpperDeptDialogTitle"
        :visible.sync="innerUpperDeptDialogVisible"
        append-to-body
      >
        <tree
          :nodes="parentNodes"
          :setting="parentSetting"
          @onCreated="handleParentCreated"
        ></tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerUpperDeptDialogCancle"
            >取 消</el-button
          >
          <el-button type="primary" @click="innerUpperDeptDialogVisible = false"
            >确 定</el-button
          ></span
        >
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDeptDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDeptDialogVisible = false"
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
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 250; //后面的50：根据需求空出的高度，自行调整;
    });
  },
  methods: {
    //内嵌上级部门弹窗取消事件
    innerUpperDeptDialogCancle(){
      this.innerUpperDeptDialogVisible = false;
      this.addDeptFrom.parentName = "";
    },
    //上级部门机构树节点点击事件
    ztreeParentOnClick(evt, treeId, treeNode) {
      console.log(treeNode.name);
      this.addDeptFrom.parentName = treeNode.name;
      console.log(evt, treeId, treeNode);
    },
    //初始化上级部门机构树对象
    handleParentCreated(treeObj) {
      this.parentZtreeObj = treeObj;
      //设置展开
      treeObj.expandAll(true);
    },
    //选择上级部门点击事件
    selectDept() {
      this.innerUpperDeptDialogTitle = "上级部门";
      this.innerUpperDeptDialogVisible = true;
      this.parentNodes = [
        {
          id: "0",
          pid: "-1",
          likeId: "0,",
          parentName: null,
          manager: null,
          name: "顶级部门",
          deptCode: null,
          deptAddress: null,
          deptPhone: null,
          orderNum: null,
        },
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
      ];
    },
    //新增部门点击事件
    addDept() {
      this.addDeptDialogTitle = "新增部门";
      this.addDeptDialogVisible = true;
    },
    //初始化组织机构树对象
    handleCreated(treeObj) {
      this.ztreeObj = treeObj;
      //设置展开
      treeObj.expandAll(true);
    },
    //组织机构树节点点击事件
    ztreeOnClick(evt, treeId, treeNode) {
      console.log(evt);
      console.log(treeId);
      console.log(treeNode);
    },
    //编辑部门点击事件
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
    },
    //删除部门点击事件
    handleDelete(index, row) {
      console.log(index);
      console.log(row);
    },
    //页容量改变时调用
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //点击页数时候调用
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  data() {
    return {
      //上级部门树对象
      parentZtreeObj: null,
      //上级部门树数据
      parentNodes: [],
      //上级部门树配置
      parentSetting: {
        view: {
          showLine: true,
          showIcon: false,
          fontCss: { "font-size": "12px", color: "#333" },
        }, //设置这里会显示复选框 // check: {
        // enable: true
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
      //内嵌上级部门弹窗标题
      innerUpperDeptDialogTitle: "",
      //控制内嵌上级部门弹窗或隐藏
      innerUpperDeptDialogVisible: false,
      //新增部门弹窗表单
      addDeptFrom: {
        id: "",
        pid: "",
        parentName: "",
        name: "",
        deptCode: "",
        deptPhone: "",
        deptAddress: "",
        orderNum: "",
      },
      //控制新增部门弹窗显示或隐藏
      addDeptDialogVisible: false,
      //新增部门弹窗标题
      addDeptDialogTitle: "",
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
      //树绑定数据
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
      //搜索数据域绑定
      searchForm: {
        deptName: "",
        deptPhone: "",
      },
      //当前页数
      currentPage: 1,
      //表格高度
      tableHeight: 0,
      //部门列表数据绑定
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
    };
  },
};
</script>

<style lang="scss" scoped>
.el-aside {
  border-right: 1px solid #e6e6e6;
}
.el-dialog__wrapper /deep/ .el-dialog__body {
  padding-top: 5px !important;
}
</style>