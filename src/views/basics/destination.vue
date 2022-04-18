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
        <el-form-item label="匹配词" prop="keyword">
          <el-input v-model="diaForm.keyword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="目的地" prop="dest">
          <el-input v-model="diaForm.dest" autocomplete="off"></el-input>
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
import { keywordAddApi, keywordGetApi, keywordDelApi, keywordUpdateApi } from "@s/api";
export default {
  mixins: [mixinTable],
  data() {
    return {
      isEdit: false, // 是否是编辑
      diaForm: {
        // 弹窗表单
        keyword: "", // 匹配词
        dest: "", // 目的地
      },
      isShowDialog: false, // 是否显示弹窗
      isShowHelp: false,
      workerdetail: {},
      searchData: {
        keyword: "", // 匹配词
        dest: "", // 目的地
      },
      rules: {
        keyword: [{ required: true, message: "请填写匹配词", trigger: "blur" }],
        dest: [
          { required: true, message: "请填写目的地", trigger: "blur" },
          { max: 4, message: "不能超过四个字", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.tableItem = [
      { prop: "keyword", label: "匹配词" },
      { prop: "dest", label: "目的地" },
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
        label: "匹配词",
        prop: "keyword",
        placeholder: "请输入匹配词",
      },
      {
        type: "input",
        label: "目的地",
        prop: "dest",
        placeholder: "请输入目的地",
      },
    ];
  },
  methods: {
    // 弹窗确认提交按钮
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            keywordUpdateApi({ ...this.diaForm }).then((res) => {
              this.$message({
                message: res.message,
                type: "success",
              });
              this.isShowDialog = false;
              this.getDataList();
            });
          } else {
            keywordAddApi({ ...this.diaForm }).then((res) => {
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
          keywordDelApi({ kid: row.kid }).then((res) => {
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
      keywordGetApi({ ...this.searchData, ...this.pageParams }).then((res) => {
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
