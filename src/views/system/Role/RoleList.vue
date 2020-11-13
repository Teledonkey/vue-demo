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
          icon="el-icon-edit"
          >查询</el-button
        >
        <el-button size="mini" type="primary" icon="el-icon-edit"
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
  </el-main>
</template>

<script>
export default {
  data() {
    return {
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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