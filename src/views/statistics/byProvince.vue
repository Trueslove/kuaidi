<template>
  <div>
    <div>
      <el-form ref="byForm" inline="true" :model="byForm" label-width="80px">
        <el-form-item label="活动名称">
          <el-date-picker
            v-model="byForm.name"
            type="month"
            placeholder="选择月"
            size="mini"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="第几页">
          <el-select
            v-model="byForm.pageNum"
            size="mini"
            placeholder="请选择第几页"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
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
export default {
  data() {
    return {
      byForm: {
        name: "", // 活动名称
        pageNum: "", // 第几页
      },
    };
  },
  mounted() {
    this.setMychartFy();
    this.setMychartYf();
  },
  methods: {
    handleSearch() {},
    // 网店发货量及运费统计
    setMychartFy() {
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
            data: ["宠物用品仓库", "宠物用品仓库1", "宠物用品仓库2"],
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
            data: [100, 300, 400, 1000, 2000, 1500],
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
            data: [0, 500, 1000, 1500, 2000, 2500],
          },
        ],
      });
    },
    // 网店平均运费
    setMychartYf() {
      // 接下来的使用就跟之前一样，初始化图表，设置配置项
      var myChart = echarts.init(document.getElementById("byYf"));
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
          data: ["平均运费", "平均重量"],
        },
        xAxis: [
          {
            type: "category",
            data: ["宠物用品仓库", "宠物用品仓库1", "宠物用品仓库2"],
            axisPointer: {
              type: "shadow",
            },
            interval: 10,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "平均运费",
            min: 0,
            max: 6,
            interval: 1,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "平均重量",
            min: 0,
            max: 0.6,
            interval: 0.1,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "平均运费",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return value;
              },
            },
            data: [1, 2, 3],
          },
          {
            name: "平均重量",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value;
              },
            },
            data: [0, 0.1, 0.2],
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