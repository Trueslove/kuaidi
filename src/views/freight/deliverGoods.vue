<template>
  <div class="app-container">
    <el-upload
      action="http://150.158.35.138:443/freightsystem/basic/freight/upload"
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
      @handleEdit="handleEdit"
      :pageParams="pageParams"
    >
    </Table>
  </div>
</template>
<script>
import mixinTable from "../../components/mixinTable.vue";
import { freightGetApi, splitDownloadApi } from "@s/api";
export default {
  mixins: [mixinTable],
  data() {
    return {
      token: JSON.parse(localStorage.getItem("userInfo")).token,
    };
  },
  created() {
    this.tableItem = [
      { prop: "uploadName", label: "上传表名" },
      { prop: "downloadName", label: "下载账单名称" },
      { label: "操作", type: "btn", width: "90", fixed: "right" },
    ];
    this.tableBtnItem = [
      {
        name: "下载",
        type: "text",
        fnName: "handleDownLoad",
      },
      // {
      //   name: "拆分下载",
      //   type: "text",
      //   fnName: "handleSplitDownLoad",
      // },
    ];
    this.getDataList();
    this.tableData = [{}];
  },
  methods: {
    handleSplitDownLoad(row) {
      splitDownloadApi({ tid: row.tid }).then((res) => {});
    },
    handleDownLoad(row) {
      downloadByCustomerApi({ tid: row.tid }).then((res) => {});
    },
    handleSuccess() {
      this.getDataList();
    },
    getDataList() {
      freightGetApi({
        ...this.searchData,
        ...this.pageParams,
      }).then((res) => {
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
