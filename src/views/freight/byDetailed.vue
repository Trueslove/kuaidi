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
    <el-button
      type="primary"
      @click="handleDownLoad"
      size="mini"
      style="margin-bottom: 10px"
      >下载</el-button
    >
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
import { getByDataRowTimeApi, downloadByTimeApi } from "@s/api";
export default {
  mixins: [mixinTable],
  data() {
    return {
      searchData: {},
    };
  },
  created() {
    this.tableItem = [
      { prop: "panelNum", label: "单号" },
      { prop: "panelTime", label: "发货时间" },
      { prop: "customer", label: "客户" },
      { prop: "dest", label: "地区" },
      { prop: "mass", label: "重量" },
      { prop: "freight", label: "运费" },
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
    handleDownLoad() {
      downloadByTimeApi({ ...this.searchData }).then((res) => {});
    },
    getDataList() {
      // 获取列表数据
      getByDataRowTimeApi({ ...this.searchData, ...this.pageParams }).then(
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
