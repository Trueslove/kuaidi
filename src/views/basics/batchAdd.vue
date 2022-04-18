<template>
  <div class="app-container batch-add" style="padding: 10px">
    <div>
      <el-form :model="formParams" :rules="rules" ref="formParams">
        <el-form-item label="目的地" prop="dest" style="width:500px">
          <el-select
            v-model="formParams.dest"
            multiple
            placeholder="请选择目的地"
          >
            <el-option
              v-for="(item, index) in missingDest"
              :label="item.desc"
              :value="item.key"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <div style="margin-top: 20px">
          <el-button type="primary" @click="handleAdd" size="mini"
            >添加</el-button
          >
          <el-table
            :data="tableData"
            border
            style="width: 100%; margin-top: 10px"
          >
            <el-table-column prop="startMass" label="*起始重量（KG）">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入起始重量"
                  v-model="scope.row.startMass"
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="endMass" label="*截止重量（KG）">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入截止重量"
                  v-model="scope.row.endMass"
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="method" label="*计价方式">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.method"
                  placeholder="请选择计价方式"
                >
                  <el-option label="固定价格" :value="0"></el-option>
                  <el-option label="首续重不同价" :value="1"></el-option>
                  <el-option label="首续重同价" :value="2"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="firstPrice" label="*价格（元）">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入价格"
                  v-model="scope.row.firstPrice"
                  :disabled="scope.row.method != 0"
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="firstMass" label="*首重重量（KG）">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入首重重量"
                  v-model="scope.row.firstMass"
                  :disabled="scope.row.method != 1 && scope.row.method != 2"
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="firstPrice" label="*首重价格（元）">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入首重价格"
                  :disabled="scope.row.method != 1 && scope.row.method != 2"
                  v-model="scope.row.firstPrice"
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="moreMass" label="*续重递增重量（KG）">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入续重重量"
                  :disabled="scope.row.method != 1"
                  v-model="scope.row.moreMass"
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="morePrice" label="*续重价格（元）">
              <template slot-scope="scope">
                <el-input
                  placeholder="请输入续重价格"
                  :disabled="scope.row.method != 1"
                  v-model="scope.row.morePrice"
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="50">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.$index)"
                  type="text"
                  size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 10px">
            <el-input size="mini" placeholder="请输入重量" v-model="mass">
              <template slot="append">KG</template>
            </el-input>
            <el-button
              style="margin: 0 10px"
              type="primary"
              size="mini"
              @click="handleSum"
              :disabled="!mass"
              >计算</el-button
            >
            <el-input size="mini" disabled v-model="freight">
              <template slot="append">元</template>
            </el-input>
          </div>
          <div class="" style="margin-top: 10px">
            <el-button
              type="primary"
              size="mini"
              @click="handleSave('formParams')"
              >保 存</el-button
            >
            <el-button type="danger" size="mini" @click="handleCloseDia"
              >关 闭</el-button
            >
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import mixinTable from "../../components/mixinTable.vue";
import {
  pdetailApi,
  pdetailAddApi,
  getAllDestApi,
  getCompleteDestApi,
  getMissingDestApi,
  testCalcApi,
  pdetailUpdateApi,
} from "@s/api";
export default {
  mixins: [mixinTable],
  props: {
    pid: {
      // 是否显示序号
      type: String,
    },
    dest: {
      type: String,
    },
  },
  data() {
    return {
      city: "",
      formParams: {
        dest: "",
        startMass: "", // 起始重量
        endMass: "", // 截止重量
        method: "", // 计价方式
        price: "", // 价格
        firstPrice: "", // 首重价格
        firstMass: "", // 首重重量
        morePrice: "", // 续重价格
        moreMass: "", // 续重重量
      },
      sumPrice: "", // 试算金额
      mass: "", // 重量
      activeNames: ["1"],
      isShowDialog: false, // 是否显示弹窗
      isShowHelp: false,
      rules: {
        dest: [{ required: true, message: "请选择目的地", trigger: "blur" }],
      },
      completeDest: [],
      allDest: [],
      missingDest: [],
      freight: null,
    };
  },
  created() {
    // this.getAllDestApi();
    this.getCompleteDestApi();
    this.getMissingDestApi();
  },
  watch: {
    pid(newVal) {
      this.getDataList();
    },
  },
  methods: {
    handleGetDetail() {
      pdetailUpdateApi({
        dest: this.dest,
        pid: this.pid,
      }).then((res) => {
        this.freight = res.data.freight;
      });
    },
    handleClick(index) {
      this.tableData.splice(index, 1);
      console.log(index);
    },
    handleCloseDia() {
      this.$emit("handleClose");
    },
    handleAdd() {
      this.tableData.push({
        startMass: 0,
        endMass: 0,
        method: 0,
        firstMass: 0,
        firstPrice: 0,
        moreMass: 0,
        morePrice: 0,
      });
    },
    handleSum() {
      console.log("计算");
      // 点击计算按钮
      testCalcApi({
        mass: this.mass,
        pid: this.pid,
        dest: "nihao",
        list: this.tableData,
      }).then((res) => {
        this.freight = res.data.freight;
      });
    },
    handleSave(formName) {
      // 点击保存按钮
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.pid) {
            pdetailUpdateApi({
              pid: this.pid,
              dest: this.formParams.dest,
              list: this.tableData,
            }).then((res) => {
              this.$message({
                message: res.message,
                type: "success",
              });
              this.$emit("getDataListBatch");
              this.handleCloseDia();
            });
          } else {
            pdetailAddApi({
              pid: this.pid,
              dest: this.formParams.dest,
              list: this.tableData,
            }).then((res) => {
              this.$message({
                message: res.message,
                type: "success",
              });
              this.$emit("getDataListBatch");
              this.handleCloseDia();
            });
          }
        } else {
          return false;
        }
      });
    },
    getDataList() {
      // 获取列表
      pdetailApi({ dest: this.dest, pid: this.pid, ...this.pageParams }).then(
        (res) => {
          this.tableData = res.data.records;
          this.formParams.dest = this.tableData[0].dest;
        }
      );
    },
    getAllDestApi() {
      // 获取所有地址
      getAllDestApi({ pid: this.pid }).then((res) => {
        let { data } = res;
        let dest = [];
        data.forEach((item) => {
          dest.push({
            key: item,
            desc: item,
          });
        });
        this.allDest = dest;
      });
    },
    getCompleteDestApi() {
      // 获取未选中地址
      getCompleteDestApi({ pid: this.pid }).then((res) => {
        let { data } = res;
        let dest = [];
        data.forEach((item) => {
          dest.push({
            key: item,
            desc: item,
          });
        });
        this.completeDest = dest;
      });
    },
    getMissingDestApi() {
      // 获取已选中地址
      getMissingDestApi({ pid: this.pid }).then((res) => {
        let { data } = res;
        let dest = [];
        data.forEach((item) => {
          dest.push({
            key: item,
            desc: item,
          });
        });
        this.missingDest = dest;
      });
    },
    // 弹窗确认提交按钮
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang='scss'>
.batch-add {
  .el-form-item__content {
    width: 1000px !important;
  }
  .el-input,
  .el-input__inner {
    width: 150px !important;
  }
  .el-select {
    .el-input,
    .el-input__inner {
      width: 800px !important;
    }
  }
}
</style>
<style lang='scss' scoped>
.batch-add-wap {
  display: flex;
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
