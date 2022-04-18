<template>
  <div class="app-container temp-wap">
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
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" width="70%">
      <el-form
        :model="diaForm"
        :rules="rules"
        ref="diaForm"
        inline
        label-width="100px"
      >
        <el-form-item label="上传表头" style="display: block">
          <el-upload
            action="http://150.158.35.138:443/freightsystem/basic/model/upload"
            class="upload-demo"
            ref="upload"
            :multiple="true"
            :limit="1"
            :on-success="handleSuccess"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
          </el-upload>
          <el-input
            style="width: 300%"
            type="textarea"
            v-model="headerValue"
            :rows="5"
          ></el-input>
        </el-form-item>
        <el-form-item label="模板名称" prop="name">
          <el-input
            v-model="diaForm.name"
            @blur="handleBlur('name')"
          ></el-input>
        </el-form-item>
        <el-form-item label="运单号列" prop="colPanelNum">
          <el-input
            v-model="diaForm.colPanelNum"
            @blur="handleBlur('colPanelNum')"
          ></el-input>
        </el-form-item>
        <el-form-item label="时间列" prop="colTime">
          <el-input
            v-model="diaForm.colTime"
            @blur="handleBlur('colTime')"
          ></el-input>
        </el-form-item>
        <el-form-item label="目的地列" prop="colDest">
          <el-input
            v-model="diaForm.colDest"
            @blur="handleBlur('colDest')"
          ></el-input>
        </el-form-item>
        <el-form-item label="重量列" prop="colMass">
          <el-input
            v-model="diaForm.colMass"
            @blur="handleBlur('colMass')"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户列" prop="colCus">
          <el-input
            v-model="diaForm.colCus"
            @blur="handleBlur('colCus')"
          ></el-input>
        </el-form-item>
        <el-form-item label="重量单位" prop="unit">
          <el-radio-group v-model="diaForm.unit">
            <el-radio :label="0">公斤（kg）</el-radio>
            <el-radio :label="1">克（g）</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备用1">
          <el-input v-model="diaForm.col1"></el-input>
        </el-form-item>
        <el-form-item label="备用2">
          <el-input v-model="diaForm.col2"></el-input>
        </el-form-item>
        <el-form-item label="备用3">
          <el-input v-model="diaForm.col3"></el-input>
        </el-form-item>
        <el-form-item label="备用4">
          <el-input v-model="diaForm.col4"></el-input>
        </el-form-item>
        <el-form-item label="备用5">
          <el-input v-model="diaForm.col5"></el-input>
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
import { modelAddApi, modelGetApi, modelDelApi } from "@s/api";
export default {
  mixins: [mixinTable],
  data() {
    return {
      isEdit: false, // 是否是编辑
      headerTable: {}, // 表头
      headerValue: "",
      diaForm: {
        // 弹窗表单
        name: "", // 模板名称
        colPanelNum: "", // 运单号列
        colTime: "", //时间列
        colDest: "", //目的地列
        colMass: "", //重量列
        colCus: "", //客户列
        unit: 0, //重量单位
        col1: "", //备用1
        col2: "", //
        col3: "", //
        col4: "", //
        col5: "", //
      },
      isShowDialog: false, // 是否显示弹窗
      isShowHelp: false,
      workerdetail: {},
      searchData: {
        name: "", // 用户组名
      },
      rules: {
        name: [{ required: true, message: "请填写模板名称", trigger: "blur" }],
        colPanelNum: [
          { required: true, message: "请填写运单号列", trigger: "blur" },
        ],
        colTime: [{ required: true, message: "请填写时间列", trigger: "blur" }],
        colDest: [
          { required: true, message: "请填写目的地列", trigger: "blur" },
        ],
        colMass: [{ required: true, message: "请填写重量列", trigger: "blur" }],
        colCus: [{ required: true, message: "请填写客户列", trigger: "blur" }],
        unit: [{ required: true, message: "请填写重量单位", trigger: "blur" }],
      },
    };
  },
  created() {
    this.tableItem = [
      { prop: "name", label: "模板名称" },
      { prop: "colPanelNum", label: "运单号列" },
      { prop: "colTime", label: "时间列" },
      { prop: "colDest", label: "目的地列" },
      { prop: "colMass", label: "重量列" },
      { prop: "colCus", label: "客户列" },
      { prop: "unit", label: "重量单位" },
      { prop: "col1", label: "备用1" },
      { prop: "col2", label: "备用2" },
      { prop: "col3", label: "备用3" },
      { prop: "col4", label: "备用4" },
      { prop: "col5", label: "备用5" },
      { label: "操作", type: "btn", width: "60", fixed: "right" },
    ];
    this.tableBtnItem = [
      {
        name: "删除",
        type: "text",
        fnName: "handleDelete",
      },
    ];
    this.searchItem = [
      {
        type: "input",
        label: "模板名称",
        prop: "name",
        placeholder: "请输入模板名称",
      },
    ];
  },
  methods: {
    handleBlur(key) { // 校验输入内容与
      let value = this.diaForm[key];
      if (this.headerTable[value]) {
        this.diaForm[key] = this.headerTable[value];
      } else {
        this.diaForm[key] = "";
      }
    },
    handleSuccess(e) {
      // 上传成功
      this.headerTable = e.data;
      let str = "";
      for (let i in e.data) {
        let key = i;
        let value = e.data[key];
        str += `${Number(key) + 1}:${value} `;
      }
      this.headerValue = str;
      console.log(e);
    },
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
            modelAddApi({ ...this.diaForm }).then((res) => {
              this.$message({
                message: res.message,
                type: "success",
              });
              this.isShowDialog = false;
              this.diaForm = this.$options.data().diaForm;
              this.getDataList();
            });
          } else {
            modelAddApi({ ...this.diaForm }).then((res) => {
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
          modelDelApi({ mid: row.mid }).then((res) => {
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
      modelGetApi({ ...this.searchData, ...this.pageParams }).then((res) => {
        this.tableData = res.data.records;
        this.pageParams.total = res.data.total;
        console.log(this.tableData, this.pageParams.total);
      });
    },
  },
};
</script>
<style lang='scss'>
.temp-wap {
  .el-upload-list .el-upload-list--text {
    display: none !important;
  }
}
</style>
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
