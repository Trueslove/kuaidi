<template>
  <div>
    <div>
      <el-form ref="byForm" inline="true" :model="byForm" label-width="80px">
        <el-form-item label="客户">
          <el-input
            v-model="byForm.name"
            size="mini"
            placeholder="请输入客户"
          ></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="byForm.time"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            :picker-options="pickerOptions"
            @change="handleChangeTime"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            size="mini"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="handleSearch"
            >查询</el-button
          >
          <el-button size="mini">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="byProL" id="byFy"></div>
    <div class="byProL" id="byYf"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { filterDataRowApi } from "@s/api";

export default {
  data() {
    return {
      // 时间选择限制
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        },
      },
      byForm: {
        name: "", // 活动名称
        time: [], // 第几页
        startTime: "",
        endTime: "",
      },
    };
  },
  mounted() {
    this.handleDataList();
  },
  methods: {
    handleChangeTime() {
      if (this.byForm.time.length > 0) {
        this.byForm.startTime = this.byForm.time[0];
        this.byForm.endTime = this.byForm.time[1];
      }
    },
    handleDataList() {
      let { name, startTime, endTime } = this.byForm;
      filterDataRowApi({ name, startTime, endTime }).then((res) => {
        let { data } = res;
        let key = Object.keys(data);
        let count = [];
        let freight = [];
        for (let i in data) {
          count.push(data[i].count);
          freight.push(data[i].freight);
        }
        this.setMychartFy(key, count, freight);
      });
    },
    handleSearch() {
      this.handleDataList();
    },
    // 网店发货量及运费统计
    setMychartFy(key, count, freight) {
      // 接下来的使用就跟之前一样，初始化图表，设置配置项
      var myChart = echarts.init(document.getElementById("byFy"));
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        legend: {
          data: ["总运费", "发件量"],
        },
        xAxis: [
          {
            type: "category",
            data: key,
            axisPointer: {
              type: "shadow",
            },
            interval: 10,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "总运费",
            min: 0,
            max: 10000,
            interval: 2000,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "发件量",
            min: 0,
            max: 2500,
            interval: 500,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "总运费",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value;
              },
            },
            data: count,
          },
          {
            name: "发件量",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + " °C";
              },
            },
            data: freight,
          },
        ],
      });
    },
  },
};
</script>

<style>
.byProL {
  width: 100%;
  height: 300px;
}
</style>