<template>
  <div class="app-container">
    <div class="parice-one-wap">
      <div style="width: 30%; background: #fff; padding: 10px">
        <!-- 搜索 -->
        <Search
          :searchData="searchData"
          :pageParams="pageParams"
          :searchItem="searchItem"
          @getRefresh="getRefresh"
          @getDataList="getDataList"
        ></Search>
        <!-- 表格 -->
        <div class="price-table">
          <el-button
            style="margin-bottom: 10px"
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="handleAdd"
            >新建价格</el-button
          >
          <!-- <el-button
            style="margin-bottom: 10px"
            type="primary"
            icon="el-icon-question"
            size="small"
            @click="handleHelp"
            >帮助</el-button
          > -->
          <Table
            :tableData="tableData"
            :tableItem="tableItem"
            :tableBtnItem="tableBtnItem"
            @getDataList="getDataList"
            @handleCopy="handleCopy"
            @hangleRename="hangleRename"
            @handleDelete="handleDelete"
            @handRowClick="handRowClick"
            :pageParams="pageParams"
          >
          </Table>
        </div>
      </div>
      <div
        style="flex: 1; background: #fff; margin-left: 10px"
        v-if="isShowBatch"
      >
        <BatchPrice :pid="pid" @getDataListBatch="getDataList"></BatchPrice>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" width="25%">
      <el-form :model="diaForm" :rules="rules" ref="diaForm">
        <el-form-item label="价格名称" prop="name">
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

    <!-- 复制，重命名弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="isShowCopy" width="25%">
      <el-form :model="diaForm" :rules="rules" ref="diaForm">
        <el-form-item label="原价格表名称" prop="name">
          <el-input
            v-model="diaForm.name"
            disabled
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新价格表名称" prop="newName">
          <el-input v-model="diaForm.newName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowCopy = false">取 消</el-button>
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
  priceAddApi,
  priceGetApi,
  priceDelApi,
  pricedUplicateApi,
  priceRrenameApi,
} from "@s/api";
import BatchPrice from "./batchPrice.vue";
export default {
  mixins: [mixinTable],
  components: { BatchPrice },
  data() {
    return {
      isShowBatch: false,
      pid: "",
      dialogType: "", // 弹窗类型
      isShowCopy: false, // 是否显示copy 重命名弹窗
      activeNames: ["1"],
      diaForm: {
        // 弹窗表单
        name: "", // 价目表名称
        newName: "", // 新价格表名称
      },
      isShowDialog: false, // 是否显示弹窗
      workerdetail: {},
      searchData: {
        name: "", // 价目表名称
      },
      rules: {
        name: [{ required: true, message: "请填写价格名称", trigger: "blur" }],
        newName: [
          { required: true, message: "请填写新价格名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.tableItem = [
      { prop: "name", label: "价格名称" },
      { label: "操作", type: "btn", width: "140", fixed: "right" },
    ];
    this.tableBtnItem = [
      {
        name: "复制",
        type: "text",
        fnName: "handleCopy",
      },
      {
        name: "删除",
        type: "text",
        fnName: "handleDelete",
      },
      {
        name: "重命名",
        type: "text",
        fnName: "hangleRename",
      },
    ];
    this.searchItem = [
      {
        type: "input",
        label: "价格名称",
        prop: "name",
        placeholder: "请输入价格名称",
      },
    ];
    this.getDataList();
  },
  methods: {
    handRowClick(row) {
      // 双击行
      this.pid = row.pid;
      this.isShowBatch = true;
    },
    // 点击复制按钮
    handleCopy(row) {
      this.isShowCopy = true;
      this.dialogType = "copy";
      this.diaForm.name = row.name;
      this.pid = row.pid;
      this.dialogTitle = "复制价格表";
    },
    // 点击删除按钮
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          priceDelApi({
            pid: row.pid,
          }).then((res) => {
            this.$message({
              message: res.message,
              type: "success",
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
    // 点击重命名按钮
    hangleRename(row) {
      this.diaForm.name = row.name;
      this.isShowCopy = true;
      this.pid = row.pid;
      this.dialogTitle = "重命名价格表";
      this.dialogType = "rename";
    },
    handleChange(val) {
      console.log(val);
    },
    handleClose() {},
    // 弹窗确认提交按钮
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialogType == "rename") {
            priceRrenameApi({
              newName: this.diaForm.newName,
              pid: this.pid,
            }).then((res) => {
              this.$message({
                message: res.message,
                type: "success",
              });
              this.isShowCopy = false;
              this.diaForm = this.$options.data().diaForm;
              this.getDataList();
            });
          } else if (this.dialogType == "copy") {
            pricedUplicateApi({
              newName: this.diaForm.newName,
              pid: this.pid,
            }).then((res) => {
              this.$message({
                message: res.message,
                type: "success",
              });
              this.isShowCopy = false;
              this.diaForm = this.$options.data().diaForm;
              this.getDataList();
            });
          } else {
            priceAddApi({ ...this.diaForm }).then((res) => {
              this.$message({
                message: res.message,
                type: "success",
              });
              this.isShowDialog = false;
              this.diaForm = this.$options.data().diaForm;
              this.getDataList();
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增按钮，打开弹窗
    handleAdd() {
      this.isShowDialog = true;
      this.dialogTitle = "新增";
      this.dialogType = "add";
    },
    getDataList() {
      priceGetApi({ ...this.searchData, ...this.pageParams }).then((res) => {
        this.tableData = res.data.records;
        this.pageParams.total = res.data.total;
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.parice-one-wap {
  display: flex;
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
