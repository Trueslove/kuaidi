<template>
  <div class="app-container" style="padding: 10px">
    <el-button
      style="margin-bottom: 10px"
      type="primary"
      icon="el-icon-plus"
      size="mini"
      @click="handleAdd"
      >批量新建明细</el-button
    >
    <el-button type="primary" @click="handleDownLoad" size="mini"
      >下载模版</el-button
    ><el-upload
      action="http://150.158.35.138:443/freightsystem/basic/pdetail/upload"
      class="upload-demo"
      :headers="{ token: token }"
      ref="upload"
      :multiple="true"
      :on-success="handleSuccess"
    >
      <el-button slot="trigger" size="small" type="primary">上传</el-button>
    </el-upload>
    <!-- 表格 -->
    <Table
      :tableData="tableData"
      :tableItem="tableItem"
      :tableBtnItem="tableBtnItem"
      @getDataList="getDataList"
      @handleDelete="handleDelete"
      @handleEdit="handleEdit"
      :pageParams="pageParams"
    >
    </Table>
    <!-- <el-dialog :title="dialogTitle" :visible.sync="isEdit" width="100%">
      <el-form :inline="true" :model="formParams" class="demo-form-inline">
        <el-form-item label="起始重量" prop="startMass">
          <el-input placeholder="请输入起始重量" v-model="formParams.startMass">
            <template slot="append">KG</template>
          </el-input>
        </el-form-item>
        <el-form-item label="截止重量" prop="endMass">
          <el-input placeholder="请输入截止重量" v-model="formParams.endMass">
            <template slot="append">KG</template>
          </el-input>
        </el-form-item>
        <el-form-item label="计价方式" prop="method">
          <el-select v-model="formParams.method" placeholder="请选择计价方式">
            <el-option label="固定价格" :value="0"></el-option>
            <el-option label="首续重不同价" :value="1"></el-option>
            <el-option label="首续重同价" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" v-if="formParams.method == 0" prop="price">
          <el-input placeholder="请输入价格" v-model="formParams.price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="首重重量"
          v-if="formParams.method == 1 || formParams.method == 2"
          prop="firstMass"
        >
          <el-input placeholder="请输入首重重量" v-model="formParams.firstMass">
            <template slot="append">KG</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="首重价格"
          v-if="formParams.method == 1 || formParams.method == 2"
          prop="firstPrice"
        >
          <el-input
            placeholder="请输入首重价格"
            v-model="formParams.firstPrice"
          >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="续重重量"
          v-if="formParams.method == 1"
          prop="moreMass"
        >
          <el-input placeholder="请输入续重重量" v-model="formParams.endMass">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="续重价格"
          v-if="formParams.method == 1"
          prop="morePrice"
        >
          <el-input placeholder="请输入续重价格" v-model="formParams.morePrice">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="isEdit = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm('formParams')"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog> -->
    <!-- 弹窗 -->
    <div v-if="isShowDialog">
      <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" width="100%">
        <BatchAdd
          :pid="pid"
          :dest="formParams.dest"
          @getDataListBatch="getDataList"
          @handleClose="handleClose"
        ></BatchAdd>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import mixinTable from "../../components/mixinTable.vue";
import { pdetailApi, pdetailDelApi, downloadModelApi } from "@s/api";
import BatchAdd from "./batchAdd.vue";
export default {
  mixins: [mixinTable],
  components: { BatchAdd },
  props: {
    pid: {
      // 是否显示序号
      type: String,
    },
  },
  data() {
    return {
      token: JSON.parse(localStorage.getItem("userInfo")).token,
      isEdit: false,
      rules: {
        userName: [
          { required: true, message: "请填写价格名称", trigger: "blur" },
        ],
        startMass: [
          { required: true, message: "请填写起始重量", trigger: "blur" },
        ],
        endMass: [
          { required: true, message: "请填写截止重量", trigger: "blur" },
        ],
        method: [
          { required: true, message: "请选择计价方式", trigger: "change" },
        ],
        price: [{ required: true, message: "请填写价格", trigger: "blur" }],
        firstPrice: [
          { required: true, message: "请填写首重价格", trigger: "blur" },
        ],
        firstMass: [
          { required: true, message: "请填写首重价格", trigger: "blur" },
        ],
        morePrice: [
          { required: true, message: "请填写续重价格", trigger: "blur" },
        ],
        moreMass: [
          { required: true, message: "请填写续重重量", trigger: "blur" },
        ],
      },
      formParams: {
        startMass: "", // 起始重量
        endMass: "", // 截止重量
        method: "", // 计价方式
        price: "", // 价格
        firstPrice: "", // 首重价格
        firstMass: "", // 首重重量
        morePrice: "", // 续重价格
        moreMass: "", // 续重重量
      },
      activeNames: ["1"],
      diaForm: {
        // 弹窗表单
        userName: "", // 匹配词
      },
      isShowDialog: false, // 是否显示弹窗
    };
  },
  created() {
    this.tableItem = [
      { prop: "dest", label: "目的地" },
      { prop: "startMass", label: "起始重量" },
      { prop: "endMass", label: "截止重量" },
      { prop: "methodName", label: "计价方式" },
      { prop: "firstMass", label: "首重重量" },
      { prop: "firstPrice", label: "首重价格" },
      { prop: "moreMass", label: "续重递增重量" },
      { prop: "morePrice", label: "续重价格" },
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
  },
  watch: {
    pid(newVal) {
      this.getDataList();
    },
  },
  methods: {
    handleDownLoad() {
      downloadModelApi().then((res) => {});
    },
    handleSuccess() {
      this.getDataList();
    },
    handleClose() {
      this.isShowDialog = false;
      this.$emit("getDataListBatch");
    },
    // 弹窗确认提交按钮
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    },
    // 新增按钮，打开弹窗
    handleAdd() {
      this.isShowDialog = true;
      this.dialogTitle = "新增";
    },
    handleEdit(row) {
      // 编辑按钮
      this.formParams = row;
      this.isShowDialog = true;
    },
    // 删除按钮
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          pdetailDelApi({
            pid: row.pid,
            did: row.did,
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
    getDataList() {
      this.pageParams.pageSize = 1000;
      pdetailApi({ pid: this.pid, ...this.pageParams }).then((res) => {
        let methodName = ["固定价格", "首续重不同价", "首续重同价"];
        this.tableData = res.data.records;
        this.tableData.forEach((item) => {
          item.methodName = methodName[item.method];
        });
        this.pageParams.total = res.data.total;
      });
    },
  },
};
</script>

<style lang='scss' scoped>
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
