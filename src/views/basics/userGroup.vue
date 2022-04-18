<template>
  <div class="app-container">
    <!-- 搜索 -->
    <Search
      :searchData="searchData"
      :pageParams="pageParams"
      :searchItem="searchItem"
      @getRefresh="getRefresh"
      @getDataList="getDataList"
    ></Search>
    <el-button
      style="margin-bottom: 10px"
      type="primary"
      icon="el-icon-plus"
      size="small"
      @click="handleAdd"
      >添加</el-button
    >
    <!-- 表格 -->
    <Table
      :isShowIndex="true"
      :tableData="tableData"
      :tableItem="tableItem"
      :tableBtnItem="tableBtnItem"
      @getDataList="getDataList"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      :pageParams="pageParams"
    >
    </Table>
    <!-- 弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" width="25%">
      <el-form :model="diaForm" :rules="rules" ref="diaForm">
        <el-form-item label="客户组名称" prop="name">
          <el-input v-model="diaForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm('diaForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import mixinTable from "../../components/mixinTable.vue";
import {
  customerGroupAddApi,
  customerGroupApi,
  customerGroupDelApi,
} from "@s/api";
export default {
  mixins: [mixinTable],
  data() {
    return {
      isEdit: false, // 是否是编辑
      diaForm: {
        // 弹窗表单
        name: "", // 客户组名
      },
      isShowDialog: false, // 是否显示弹窗
      isShowHelp: false,
      workerdetail: {},
      searchData: {
        name: "", // 客户组名
      },
      rules: {
        name: [{ required: true, message: "请填写客户组名", trigger: "blur" }],
      },
    };
  },
  created() {
    this.tableItem = [
      { prop: "name", label: "客户组名" },
      { label: "操作", type: "btn", width: "90", fixed: "right" },
    ];
    this.tableBtnItem = [
      // {
      //   name: "编辑",
      //   type: "text",
      //   fnName: "handleEdit",
      // },
      {
        name: "删除",
        type: "text",
        fnName: "handleDelete",
      },
    ];
    this.searchItem = [
      {
        type: "input",
        label: "客户组名",
        prop: "name",
        placeholder: "请输入客户组名",
      },
    ];
  },
  methods: {
    handleClose() {
      // 关闭帮助弹窗
      this.isShowHelp = false;
    },
    handleHelp() {
      // 点击帮助按钮
      this.isShowHelp = true;
    },
    // 弹窗确认提交按钮
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            customerGroupAddApi({ ...this.diaForm }).then((res) => {
              this.$message({
                message: res.message,
                type: "success",
              });
              this.isShowDialog = false;
              this.getDataList();
            });
          } else {
            customerGroupAddApi({ ...this.diaForm }).then((res) => {
              this.$message({
                message: res.message,
                type: "success",
              });
              this.isShowDialog = false;
              this.getDataList();
            });
          }
        } else {
          return false;
        }
      });
    },
    // 新增按钮，打开弹窗
    handleAdd() {
      this.isShowDialog = true;
      this.dialogTitle = "新增";
      this.isEdit = false;
    },
    // 删除按钮
    handleDelete(row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          customerGroupDelApi({ cgid: row.cgid, isDeletingAll: true }).then((res) => {
            this.$message({
              type: "success",
              message: res.message,
            });
            this.getDataList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleEdit(row) {
      // 点击编辑按钮
      this.diaForm = row;
      this.isShowDialog = true;
      this.isEdit = true;
      this.dialogTitle = "修改";
    },
    getDataList() {
      // 获取列表数据
      customerGroupApi({ ...this.searchData, ...this.pageParams }).then((res) => {
        this.tableData = res.data.records;
        this.pageParams.total = res.data.total;
        console.log(this.tableData, this.pageParams.total);
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.app-container {
  background: #fff;
}
.help-wap {
  border-top: 1px solid #cecece;
  padding: 10px 20px;
  > p {
    color: rgba(0, 0, 0, 0.65);
    line-height: 30px;
    font-size: 14px;
  }
}
.line {
  text-align: center;
}
</style>
