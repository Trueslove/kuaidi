<!--
 * @Description: 封装table组件
 -->
/**
*  tableData: table列表的值
*  tableItem: 表格信息配置（prop：绑定参数，label：表头名称，width：单元格宽度，type：单元格类型[img, btn, selection], fixed: 固定列）
*  tableBtnItem: 表格操作按钮（type：按钮类型，icon：按钮图标，size：按钮大小[默认mini]，name：按钮名字，fnName: 按钮事件名称[一定要在父组件绑定该事件]）
*  getSelecData: 固定写法，为了在父组件中，获取勾选的数组。（有用到的时候，父组件必须绑定该方法）
*  pageParams: currentPage：当前页码，pageSize：每页条数，total：总共多少条
*  exportUrl: 导出链接以及信息
*  isShowDelete: 是否显示批量删除按钮
*/
<template>
  <div class="table1">
    <el-table
      :data="tableData"
      :header-cell-style="headerCell"
      :cell-style="cellCss"
      @selection-change="handleSelectionChange"
      @sort-change="handleChangeSort"
      @row-dblclick="handRowClick"
      style="width: 100%"
    >
      <el-table-column v-if="isShowIndex" type="index" width="50">
      </el-table-column>
      <template v-for="(item, index) in tableItem">
        <!-- 普通文案展示 -->
        <el-table-column
          :key="index"
          v-if="!item.type"
          :prop="item.prop"
          :sortable="item.isSort"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <span v-if="scope.row[item.prop] || scope.row[item.prop] == 0">{{ scope.row[item.prop] }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <!-- 时间格式化 -->
        <el-table-column
          :key="index"
          v-if="item.type == 'time'"
          :prop="item.prop"
          :sortable="item.isSort"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <span v-if="scope.row[item.prop]">{{formatDate(scope.row[item.prop])}}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <!-- 升降序展示 -->
        <el-table-column
          type="selection"
          v-if="item.type === 'selection'"
          :key="index"
          :sortable="item.isSort"
          :width="item.width"
        >
        </el-table-column>
        <!-- 有颜文本展示 -->
        <el-table-column
          :key="index"
          v-if="item.type === 'textColor'"
          :prop="item.prop"
          :sortable="item.isSort"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <p v-html="formatterTextColor(scope.row[item.prop])"></p>
          </template>
        </el-table-column>
        <!-- 提示文案展示 -->
        <el-table-column
          :key="index"
          v-if="item.type === 'tooltip'"
          :prop="item.prop"
          :sortable="item.isSort"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              :content="scope.row[item.prop]"
              placement="top"
            >
              <p class="tooltip-dark" v-if="scope.row[item.prop]">
                {{ scope.row[item.prop] }}
              </p>
              <p class="tooltip-dark" v-else>-</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- 多行文本展示 -->
        <el-table-column
          :key="index"
          v-if="item.type === 'Mtext'"
          :prop="item.prop"
          :label="item.label"
          :sortable="item.isSort"
          :width="item.width"
        >
          <template slot-scope="scope">
            <p v-html="formatterMtext(scope.row[item.prop])"></p>
          </template>
        </el-table-column>
        <!-- 金额展示 -->
        <el-table-column
          :key="index"
          v-if="item.type === 'money'"
          :prop="item.prop"
          :label="item.label"
          :sortable="item.isSort"
          :width="item.width"
        >
          <template slot-scope="scope">
            <p v-html="formatterMoney(scope.row[item.prop])"></p>
          </template>
        </el-table-column>
        <!-- 图片展示 -->
        <el-table-column
          :key="index"
          v-if="item.type === 'img'"
          :prop="item.prop"
          :sortable="item.isSort"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <img
              :src="scope.row[item.prop]"
              style="width: 100px; height: 100px"
              alt=""
            />
            <!-- <p
              @click="handleSwipeImg(scope.row[item.prop])"
              v-html="formatterImg(scope.row[item.prop])"
            ></p> -->
          </template>
        </el-table-column>
        <!-- 操作按钮 -->
        <el-table-column
          :key="index"
          v-if="item.type === 'btn'"
          :label="item.label"
          :width="item.width"
          :fixed="item.fixed"
        >
          <template slot-scope="scope">
            <!-- 根据条件展示操作按钮 -->
            <template v-if="isShowBtn">
              <div
                v-show="scope.row.btnShow[index]"
                class="item-btn"
                v-for="(item, index) in tableBtnItem"
                :key="index"
              >
                <el-button
                  :class="item.className"
                  :key="index"
                  :type="item.type"
                  :icon="item.icon"
                  :size="item.size || 'mini'"
                  @click="handleFn(item.fnName, scope.$index, scope.row)"
                >
                  {{ item.name }}
                </el-button>
              </div>
            </template>
            <!-- 默认展示操作按钮 -->
            <template v-else>
              <el-button
                v-for="(item, index) in tableBtnItem"
                :class="item.className"
                :key="index"
                :type="item.type"
                :icon="item.icon"
                :size="item.size || 'mini'"
                @click="handleFn(item.fnName, scope.$index, scope.row)"
              >
                {{ item.name }}
              </el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      background
      :hide-on-single-page="pageParams.total < 1"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageParams.currentPage"
      :page-size="pageParams.pageSize"
      layout="total, prev, pager, next"
      :total="pageParams.total"
    >
    </el-pagination>
    <!-- 点击图片查看大图 -->
    <el-dialog
      title="查看图片"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
    >
      <el-carousel :autoplay="false">
        <el-carousel-item v-for="(item, index) in itemUrl" :key="index">
          <img :src="'https://agencytest-res.huisou.cn/' + item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios"; // 引入axios
export default {
  props: {
    isShowIndex: {
      // 是否显示序号
      type: Boolean,
      default: false,
    },
    tableData: {
      // 表格数据
      type: Array,
    },
    tableItem: {
      // 表格prop
      type: Array,
    },
    tableBtnItem: {
      // 表格按钮
      type: Array,
    },
    pageParams: {
      // 分页配置
      type: Object,
    },
    exportUrl: {
      // 导出链接
      type: String,
    },
    isShowBtn: {
      // 是否按条件显示操作按钮
      type: Boolean,
      default: false,
    },
    isShowDelete: {
      // 是否显示批量删除按钮
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cdn_url: "https://agencytest-res.huisou.cn/",
      itemUrl: [], // 轮播图片
      dialogTableVisible: false, // 弹出框状态
      activeData: [], // 勾选内容
      disable: true, // 是否可以导出
    };
  },
  watch: {
    /**
     * @description: 当有勾选数据时，批量按钮可以点击
     */
    activeData() {
      if (this.activeData.length <= 0) {
        this.disable = true;
      } else {
        this.disable = false;
      }
    },
  },
  methods: {
    formatDate(data) {
      let dt = new Date(data);
      let yyyy = dt.getFullYear();
      let MM = (dt.getMonth() + 1).toString().padStart(2, "0");
      let dd = dt.getDate().toString().padStart(2, "0");
      let h = dt.getHours().toString().padStart(2, "0");
      let m = dt.getMinutes().toString().padStart(2, "0");
      let s = dt.getSeconds().toString().padStart(2, "0");
      return yyyy + "-" + MM + "-" + dd + " " + h + ":" + m + ":" + s;
    },
    /**
     * @description: 双击
     * @param { Object } column [当前列表数据]
     */
    handRowClick(row) {
      this.$emit("handRowClick", row);
    },
    /**
     * @description: 批量删除
     * @param { Object } column [当前列表数据]
     */
    handleDeleteBatch() {
      this.$emit("handleDeleteBatch");
    },
    /**
     * @description: 排序发生变化时
     * @param { Object } column [当前列表数据]
     */
    handleChangeSort(column) {
      this.$emit("handleSort", [column.order, column.prop]);
    },
    /**
     * @description: 是否显示操作按钮
     * @param { Object } row [当前列表index值]
     * @param { Object } btn [操作按钮]
     */
    handleShowBtn(btn, row) {
      row.btnShow.forEach((item) => {
        if (item === btn.name) {
          return true;
        }
      });
    },
    /**
     * @description: 多行文本
     * @param { Object } row [当前列表数据]
     */
    formatterMtext(row) {
      let str = "";
      if (row) {
        row.forEach((item) => {
          if (
            item[0] !== "blue" &&
            item[0] !== "redTxt" &&
            item[0] !== "green"
          ) {
            str += `<p class="mText">${item}</p>`;
          } else {
            str += `<p class=${item[0]}>${item[1]}</p>`;
          }
        });
        return str;
      } else {
        return "-";
      }
    },
    /**
     * @description: 金额的字段，添加￥，并除以100保留两位小数
     * @param { Object } row [当前列表数据]
     * @return: 格式化文本标签
     */
    formatterMoney(row) {
      let str;
      if (row === 0 || row) {
        let num = Number(row / 100).toFixed(2);
        str = `<span>￥${num}</span>`;
        return str;
      } else {
        str = `<span>-</span>`;
        return str;
      }
    },
    /**
     * @description: 单元格格式化文本颜色
     * @param { Object } row [当前列表数据]
     * @return: 格式化文本标签
     */
    formatterTextColor(row) {
      let str;
      if (row) {
        str = `<span class=${row[0]}>${row[1]}</span>`;
        return str;
      } else {
        return "-";
      }
    },
    /**
     * @description: 单元格格式化图片
     * @param { Object } row [当前列表数据]
     * @return: 格式化文本标签
     */
    formatterImg(row) {
      try {
        row = JSON.parse(row);
      } catch (error) {}
      let str;
      let rowArr = row;
      if (row) {
        let urlImg = `https://agencytest-res.huisou.cn/${rowArr[0]}`;
        if (rowArr.length === 1) {
          str = `<img class="table1-img" src=${urlImg} alt=""/>`;
          return str;
        } else if (rowArr.length < 1) {
          str = "-";
          return str;
        } else {
          str = `<img class="table1-img" src=${urlImg} alt=""/><p>${rowArr.length}张</p>`;
          return str;
        }
      } else {
        str = "-";
        return str;
      }
    },
    /**
     * @description: 图片轮播
     * @param { Array } row [图片数组]
     */
    handleSwipeImg(row) {
      this.itemUrl = [];
      this.$nextTick(() => {
        this.itemUrl = eval(row);
      });
      this.dialogTableVisible = true;
    },
    /**
     * @description: 全部导出按钮
     */
    handleExportAll() {
      // let tableAllData = this.$store.state.tableData.tableSaveData;
      let searchObj = this.$store.state.searchData.searchSaveData;
      let userToken = JSON.parse(localStorage.getItem("token")).userToken;
      axios.defaults.headers = {
        // 请求头设置userToken
        userToken: userToken,
      };
      delete searchObj["currentPage"]; // 删除currentPage字段
      delete searchObj["total"]; // 删除total字段
      delete searchObj["pageSize"]; // 删除pageSize字段
      let keyArr = Object.keys(searchObj); // 搜索对象的key
      let valueArr = Object.values(searchObj); // 搜索对象的value值
      let downUrl = ""; // 拼接所需参数
      keyArr.forEach((item, index) => {
        downUrl += `&${item}=${valueArr[index]}`;
      });
      location.href = `${this.exportUrl}?userToken=${userToken}${downUrl}`;
    },
    /**
     * @description: 批量导出按钮
     */
    handleExport() {
      this.$emit("exportExcel");
    },
    /**
     * @description: 当每页条数发生变化时
     * @param { Number } val [当前页码条数值]
     */
    handleSizeChange(val) {
      this.pageParams.pageSize = val;
      this.$emit("getDataList");
    },
    /**
     * @description: 列表操作按钮函数
     * @param { Number } val [当前页码]
     */
    // 当前页码发生改变
    handleCurrentChange(val) {
      this.pageParams.currentPage = val;
      this.$emit("getDataList");
    },
    /**
     * @description: 列表勾选
     * @param { Array } selection [选中列表数据]
     */
    handleSelectionChange(selection) {
      this.activeData = selection;
      this.$emit("getSelecData", selection);
    },
    /**
     * @description: 列表操作按钮函数
     * @param { String } fn [函数名字]
     * @param { Number } index [当前列表index值]
     * @param { Object } row [当前列表数据]
     */
    handleFn(fn, index, row) {
      this.$emit(fn, row);
    },
    // 表头样式
    headerCell({ row, rowIndex }) {
      return "text-align:center";
    },
    // 单元格样式
    cellCss({ row, rowIndex }) {
      return "text-align:center";
    },
  },
};
</script>
<style lang="scss">
.table1 {
  border: 1px solid rgba(229, 229, 229, 1);
  border-radius: 4px;
  border-bottom: none;
  background: #e5e5e5;
  th {
    font-size: 14px;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    background: rgba(247, 248, 250, 1);
  }
  td {
    color: #666666;
    font-size: 14px;
    font-weight: 400;
  }
  .pagination {
    float: right;
    margin-top: 20px;
  }
  .el-pagination__total {
    font-size: 14px;
    font-weight: 400;
  }
  .table-btn {
    margin-top: 20px;
    float: left;
    background: #fff;
  }
  .red {
    color: #ff7b8c;
  }
  .blue {
    color: #4da1ff;
  }
  .redTxt {
    color: #ff7b8c;
    font-size: 12px;
    font-weight: 400;
  }
  .green {
    color: #83d587;
    font-size: 12px;
    font-weight: 400;
  }
  .el-dialog {
    width: 800px !important;
  }
  .el-carousel__container {
    height: 400px;
    background: #f5f5f5;
  }
}
.tooltip-dark {
  height: 40px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.table1-img {
  width: 50px;
  height: 50px;
  background: rgba(204, 204, 204, 1);
  border-radius: 4px;
}
.btnRed {
  color: #ff8d9c;
  text-align: right;
}
.el-pagination {
  float: left;
}
.el-carousel__item {
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
