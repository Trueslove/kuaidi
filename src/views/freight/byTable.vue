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
    <!-- 表格 -->
    <Table
      :tableData="tableData"
      :tableItem="tableItem"
      :tableBtnItem="tableBtnItem"
      @getDataList="getDataList"
      @handleDownLoad="handleDownLoad"
      :pageParams="pageParams"
    >
    </Table>
  </div>
</template>
<script>
import mixinTable from "../../components/mixinTable.vue";
import {
  getByTableTimeApi,
  downloadByTableApi,
  splitDownloadApi,
} from "@s/api";
export default {
  mixins: [mixinTable],
  data() {
    return {
      searchData: {},
    };
  },
  created() {
    this.tableItem = [
      { prop: "uploadName", label: "上传表名" },
      { prop: "uploadTime", label: "上传时间" },
      { prop: "downloadName", label: "下载账单名称" },
      { label: "操作", type: "btn", width: "60", fixed: "right" },
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
    this.searchItem = [
      {
        type: "daterange",
        label: "上传时间",
        prop: ["startTime", "endTime"],
      },
    ];
  },
  methods: {
    handleDownLoad(row) {
      downloadByTableApi({ tid: row.tid }).then((res) => {});
    },
    handleSplitDownLoad(row) {
      splitDownloadApi({ tid: row.tid }).then((res) => {});
    },
    getDataList() {
      // 获取列表数据
      getByTableTimeApi({ ...this.searchData, ...this.pageParams }).then(
        (res) => {
          this.tableData = res.data.records;
          this.pageParams.total = res.data.total;
          console.log(this.tableData, this.pageParams.total);
        }
      );
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
