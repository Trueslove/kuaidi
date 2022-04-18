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
  getByCustomerApi,
  downloadByCustomerApi,
  customerGroupApi,
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
      { prop: "customerName", label: "客户" },
      { prop: "totalFailure", label: "发货数量" },
      { prop: "totalMass", label: "总重量" },
      { prop: "totalFreight", label: "总运费" },
      { prop: "totalAmount", label: "未计算数量" },
      { label: "操作", type: "btn", width: "60", fixed: "right" },
    ];
    this.tableBtnItem = [
      {
        name: "下载",
        type: "text",
        fnName: "handleDownLoad",
      },
    ];
    this.searchItem = [
      {
        type: "daterange",
        label: "发货时间",
        prop: ["startTime", "endTime"],
      },
      {
        type: "input",
        label: "客户名称",
        prop: "name",
        placeholder: "请输入客户名称",
      },
    ];
  },
  methods: {
    handleDownLoad(row) {
      downloadByCustomerApi({ name: row.customerName }).then((res) => {});
    },
    getDataList() {
      // 获取列表数据
      getByCustomerApi({ ...this.searchData, ...this.pageParams }).then(
        (res) => {
          this.tableData = res.data.records;
          this.pageParams.total = res.data.total;
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
