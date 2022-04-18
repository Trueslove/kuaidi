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
        <el-form-item label="用户名" prop="username">
          <el-input v-model="diaForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="diaForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户身份" prop="gid">
          <el-select v-model="diaForm.gid" placeholder="请选择用户身份">
            <el-option label="游客" :value="0"></el-option>
            <el-option label="员工" :value="1"></el-option>
            <!-- <el-option label="超级管理员" :value="2"></el-option> -->
          </el-select>
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
import { userAddApi, userGetApi, userDelApi, userUpdateApi } from "@s/api";
export default {
  mixins: [mixinTable],
  data() {
    return {
      isEdit: false, // 是否是编辑
      diaForm: {
        // 弹窗表单
        gid: "",
        username: "", // 用户名
        password: "",
      },
      isShowDialog: false, // 是否显示弹窗
      isShowHelp: false,
      workerdetail: {},
      searchData: {
        username: "", // 用户名
      },
      rules: {
        username: [
          { required: true, message: "请填写用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请填写密码", trigger: "blur" }],
        gid: [{ required: true, message: "请选择权限", trigger: "change" }],
      },
    };
  },
  created() {
    this.tableItem = [
      { prop: "username", label: "用户名" },
      { prop: "password", label: "密码" },
      { prop: "gidName", label: "用户身份" },
      { label: "操作", type: "btn", width: "90", fixed: "right" },
    ];
    this.tableBtnItem = [
      {
        name: "编辑",
        type: "text",
        fnName: "handleEdit",
      },
      {
        name: "删除",
        type: "text",
        fnName: "handleDelete",
      },
    ];
    this.searchItem = [
      {
        type: "input",
        label: "用户名",
        prop: "username",
        placeholder: "请输入用户名",
      },
    ];
  },
  methods: {
    handleClose() {
      // 关闭帮助弹窗
      this.isShowHelp = false;
    },
    // 弹窗确认提交按钮
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            userUpdateApi({ ...this.diaForm }).then((res) => {
              this.$message({
                message: res.message,
                type: "success",
              });
              this.isShowDialog = false;
              this.getDataList();
            });
          } else {
            userAddApi({ ...this.diaForm }).then((res) => {
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
          userDelApi({ uid: row.uid }).then((res) => {
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
      userGetApi({ ...this.searchData, ...this.pageParams }).then((res) => {
        let { records } = res.data;
        records.forEach(item => {
          if (item.gid == 0) {
            item.gidName = "游客";
          } else if (item.gid == 1) {
            item.gidName = "员工";
          } else {
            item.gidName = "超级管理员";
          }
        });
        this.tableData = records;
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
