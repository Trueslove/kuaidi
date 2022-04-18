<template>
  <div class="search">
    <el-form :inline="true" :model="searchData" ref="searchData">
      <template v-for="(item, index) in searchItem">
        <!-- 输入框 -->
        <el-form-item
          v-if="!item.type || item.type === 'input'"
          :label="item.label"
          :key="item.prop"
          :prop="item.prop"
          :label-width="item.width"
        >
          <el-input
            v-model="searchData[item.prop]"
            maxlength="40"
            clearable
            :placeholder="item.placeholder"
            size="mini"
          ></el-input>
        </el-form-item>
        <!-- 下拉框 -->
        <el-form-item
          v-if="item.type === 'select'"
          :label="item.label"
          :key="item.prop"
          :prop="item.prop"
          :label-width="item.option_width"
        >
          <el-select
            v-model="searchData[item.prop]"
            :placeholder="item.placeholder"
            :clearable="!item.isClear"
            @change="handleChange"
            size="mini"
          >
            <el-option
              v-for="i in item.selectList"
              :placeholder="i.placeholder"
              :label="i.label"
              :value="i.value"
              :key="i.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 城市联动 -->
        <el-form-item
          v-if="item.type === 'city'"
          :label="item.label"
          :key="item.prop"
          :label-width="item.label_width"
        >
          <el-select
            v-model="searchData[item.cityItem[0]]"
            size="mini"
            clearable
            placeholder="请选择省"
            @change="handleChangeAddress(item.cityItem)"
          >
            <el-option
              v-for="(item, index) in addressItem"
              :key="item.value"
              @click.native="handleClickAddress(index)"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            class="city-select"
            v-model="searchData[item.cityItem[1]]"
            clearable
            placeholder="请选择市"
            @change="
              handleChangeCity(item.cityItem, searchData[item.cityItem[1]])
            "
          >
            <el-option
              v-for="item in cityItemList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 时间选择器 -->
        <el-form-item
          v-if="item.type === 'time'"
          :label="item.label"
          :key="index"
        >
          <el-form-item :prop="item.timeList[0]">
            <el-date-picker
              clearable
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
              v-model="searchData[item.timeList[0]]"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <span class="search-time">-</span>
          <el-form-item :prop="item.timeList[0]">
            <el-date-picker
              clearable
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择时间"
              v-model="searchData[item.timeList[1]]"
              style="width: 100%"
              size="mini"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <!-- 月选择器 -->
        <el-form-item
          v-if="item.type === 'monthrange'"
          :label="item.label"
          :key="index"
        >
          <el-date-picker
            v-model="monthrangeDate"
            :editable="false"
            type="monthrange"
            value-format="yyyy-MM"
            range-separator="-"
            :picker-options="pickerOptions"
            @change="handleOnPick(item.prop)"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            size="mini"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 天选择器 -->
        <el-form-item
          v-if="item.type === 'daterange'"
          :label="item.label"
          :key="index"
          class="daterange"
        >
          <el-date-picker
            v-model="monthrangeDate"
            :editable="false"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            :picker-options="pickerOptions"
            @change="handleOnPick(item.prop)"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            size="mini"
          >
          </el-date-picker>
        </el-form-item>
      </template>
      <el-form-item class="searchFloat">
        <el-button
          class="search_btn"
          @click="handleSearch"
          type="primary"
          icon="el-icon-search"
          size="mini"
          >查询</el-button
        >
        <el-button
          class="search_btn"
          @click="handleRefresh('searchData')"
          type="danger"
          icon="el-icon-refresh"
          size="mini"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import addressData from "../assets/json/address.json";
export default {
  props: {
    searchData: {
      // 搜索数据
      type: Object,
    },
    searchItem: {
      // 搜索框数据
      type: Array,
    },
    pageParams: {
      // 分页数据
      type: Object,
    },
  },
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
      addressItem: [], // 省级数据
      cityItemList: [], // 市级数据
      monthrangeDate: [], // 日期选择数据
    };
  },
  created() {
    // this.addressItem = addressData;
  },
  watch: {
    searchItem: {
      handler(newVal) {
        console.log(newVal)
      },
      deep: true
    },
    /**
     * @description: 当搜索数据发生变化时，保存数据到vuex
     * @param { Object } newData [变化的数据]
     */
    searchData(newData) {
      this.searchData = newData;
      // this.$store.dispatch("searchData/changeSearch", newData);
    },
  },
  methods: {
    /**
     * @description: 日期时间发生变化时
     * @param { Array } prop [时间选择prop值]
     */
    handleOnPick(prop) {
      if (this.monthrangeDate) {
        this.searchData[prop[0]] = this.monthrangeDate[0];
        this.searchData[prop[1]] = this.monthrangeDate[1];
      } else {
        this.searchData[prop[0]] = "";
        this.searchData[prop[1]] = "";
      }
      this.pageParams.currentPage = 1;
      this.$emit("getDataList", this.searchData);
    },
    /**
     * @description: 省选择框发生变化时 通过index, 获取市级内容
     * @param { Number } index [当前选择省级index值]
     */
    handleClickAddress(index) {
      this.cityItemList = this.addressItem[index].children;
    },
    /**
     * @description: 日期时间发生变化时
     * @param { String } city [市级prop值]
     */
    handleChangeAddress(city) {
      if (this.searchData[city[1]]) {
        this.searchData[city[1]] = "";
      }
    },
    /**
     * @description: 市级选择框有值时,请求接口数据
     * @param { String } value [城市值]
     * @param { Object } city [城市对象]
     */
    handleChangeCity(city, value) {
      this.pageParams.currentPage = 1;
      this.$emit("getDataList", this.searchData);
    },
    /**
     * @description: 按钮事件
     * @param { String } fn [函数名字]
     * @param { Object } row [当前列表数据]
     * @return: 父组件调用函数
     */
    handleClick(row, fn) {
      return this.$parent[fn](row);
    },
    /**
     * @description: 搜索按钮
     */
    handleSearch() {
      this.pageParams.currentPage = 1;
      this.$emit("getDataList", this.searchData);
    },
    handleRefresh(formName) {
      this.$refs[formName].resetFields();
      this.$emit("getRefresh");
    },
    /**
     * @description: 下拉框修改
     * @Date: 2019-09-24 16:43:01
     */
    handleChange() {
      this.pageParams.currentPage = 1;
      this.$emit("getDataList", this.searchData);
    },
  },
};
</script>
<style lang="scss">
.search {
  .daterange {
    .el-input__inner {
      width: 240px;
    }
  }
  .search_btn {
    margin-left: 40px;
    font-size: 14px;
    border: none；;
  }
  .el-form--inline .el-form-item {
    margin-bottom: 5px;
    // margin: 0 20px 20px;
  }
  .el-form-item__label {
    font-weight: 400;
    font-size: 14px;
  }
  .el-input__inner {
    width: 200px;
  }
  .el-input {
    width: 200px;
  }
  .el-select {
    width: 200px;
  }
  .city-select {
    margin-left: 20px;
  }
  .search-time {
    width: 30px;
    text-align: center;
    display: inherit;
    font-weight: 400;
    font-size: 14px;
  }
}
</style>