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
      size="small"
      @click="handleAdd"
      >新建客户</el-button
    >
    <!-- <el-button
      style="margin-bottom: 10px"
      type="primary"
      icon="el-icon-question"
      size="small"
      @click="handleHelp"
      >帮助</el-button
    > -->
    <!-- 表格 -->
    <Table
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
    <el-dialog :title="dialogTitle" :visible.sync="isShowDialog" width="35%">
      <el-form :model="diaForm" :rules="rules" ref="diaForm">
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="diaForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格规则" prop="pid">
          <el-select v-model="diaForm.pid" placeholder="请选择价格规则">
            <el-option
              v-for="(item, index) in priceOptions"
              :key="index"
              :label="item.name"
              :value="item.pid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="特殊费用" prop="fee">
          <el-input
            v-model="diaForm.fee"
            type="number"
            autocomplete="off"
            placeholder="请输入特殊费用"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户分类" prop="cgid">
          <el-select v-model="diaForm.cgid" placeholder="请选择客户分类">
            <el-option
              v-for="(item, index) in cgOptions"
              :key="index"
              :label="item.name"
              :value="item.cgid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运费取整">
          <el-radio-group v-model="diaForm.round">
            <el-radio :label="0">不取整</el-radio>
            <el-radio :label="1">按0.5元取整</el-radio>
            <el-radio :label="2">按1元取整</el-radio>
          </el-radio-group>
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
  customerGetApi,
  customerDelApi,
  customerUpdateApi,
  customerAddApi,
  priceGetApi,
  customerGroupApi,
} from "@s/api";
export default {
  mixins: [mixinTable],
  data() {
    return {
      diaForm: {
        // 弹窗表单
        name: "", // 客户名称
        pid: "", // 价格规格
        fee: "", // 特殊费用
        cgid: "", // 客户分类
        round: "0", // 运费取整
      },
      isShowDialog: false, // 是否显示弹窗
      isShowHelp: false,
      workerdetail: {},
      searchData: {
        name: "", // 客户名称
        pid: "", // 价格规格
        fee: "", // 特殊费用
        cgid: "", // 客户分类
      },
      rules: {
        name: [{ required: true, message: "请填写客户名称", trigger: "blur" }],
        pid: [{ required: true, message: "请填写价格规格", trigger: "change" }],
      },
      priceOptions: [], // 价格表
      cgOptions: [], // 客户分类
    };
  },
  created() {
    this.tableItem = [
      { prop: "name", label: "客户名称" },
      { prop: "priceName", label: "价格表" },
      { prop: "fee", label: "特殊费用" },
      { prop: "groupName", label: "客户分类" },
      { prop: "roundName", label: "运费取整" },
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
        label: "客户名称",
        prop: "name",
        placeholder: "请输入客户名称",
      },
      {
        type: "select",
        label: "价格规则",
        prop: "pid",
        placeholder: "请选择价格规则",
      },
      {
        label: "特殊费用",
        prop: "fee",
        placeholder: "请输入特殊费用",
      },
      {
        label: "客户分类",
        prop: "cgid",
        placeholder: "请输入客户分类",
      },
    ];
    this.getDataList();
    this.handleGetPriceData();
    this.handleGetCgData();
    this.tableData = [{}];
  },
  methods: {
    handleGetPriceData() {
      priceGetApi({ name: "", currentPage: 1, pageSize: 20000 }).then((res) => {
        this.priceOptions = res.data.records;
      });
    },
    handleGetCgData() {
      customerGroupApi({ name: "", currentPage: 1, pageSize: 20000 }).then(
        (res) => {
          this.cgOptions = res.data.records;
        }
      );
    },
    handleClose() {
      this.isShowHelp = false;
    },
    handleHelp() {
      this.isShowHelp = true;
    },
    // 弹窗确认提交按钮
    handleConfirm(formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          if (this.diaForm.cid) {
            customerUpdateApi({ ...this.diaForm }).then((res) => {
              this.$message({
                message: res.message,
                type: "success",
              });
              this.isShowDialog = false;
              this.diaForm = this.$options.data().diaForm;
              this.getDataList();
            });
          } else {
            customerAddApi({ ...this.diaForm }).then((res) => {
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
      this.dialogTitle = "客户设置方法";
    },
    // 删除按钮
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          customerDelApi({
            cid: row.cid,
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
    handleEdit(row) {
      // 编辑按钮
      this.diaForm = row;
      this.isShowDialog = true;
    },
    getDataList() {
      customerGetApi({
        ...this.searchData,
        ...this.pageParams,
      }).then((res) => {
        let { records } = res.data;
        records.forEach((item) => {
          if (item.round == 0) {
            item.roundName = "不取整";
          } else if (item.round == 1) {
            item.roundName = "按0.5元取整";
          } else if (item.round == 2) {
            item.roundName = "按1元取整";
          }
        });
        this.tableData = res.data.records;
        this.pageParams.total = res.data.total;
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
