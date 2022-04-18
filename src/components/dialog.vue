<template>
  <el-dialog
    :title="dialogTitle"
    class="diaLog"
    :visible.sync="dialogFormVisible"
  >
    <el-form
      :model="diaFormData"
      :rules="rulesItem"
      ref="diaFormData"
      :inline="dialogFormVisible"
    >
      <template v-for="(item, key) in diaItemData">
        <!-- 输入框 -->
        <el-form-item
          :label="item.label"
          :prop="item.prop"
          v-if="!item.type"
          :placeholder="item.placeholder"
          :label-width="formLabelWidth"
          :key="key"
        >
          <el-input
            v-model="diaFormData[item.prop]"
            clearable
            :disabled="item.disabled || false"
          ></el-input>
        </el-form-item>
        <!-- 下拉框 -->
        <el-form-item
          v-if="item.type === 'select'"
          :label="item.label"
          :prop="item.prop"
          :label-width="formLabelWidth"
          :key="key"
        >
          <el-select
            v-model="diaFormData[item.prop]"
            clearable
            :disabled="item.disabled || false"
            placeholder="请选择活动区域"
          >
            <el-option
              v-for="(item, key) in item.options"
              :label="item.label"
              :value="item.value"
              :key="key"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        v-for="(item, index) in diaItemBtn"
        :type="item.color"
        @click="handleFn(item.type, item.fn)"
        :icon="item.icon"
        :key="index"
        size="mini"
        >{{ item.name }}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogTitle: {
      type: String,
    },
    showDialogForm: {
      type: Boolean,
      default: false,
    },
    diaItemData: {
      type: Array,
      default: [],
    },
    diaFormData: {
      type: Object,
    },
    rulesItem: {
      type: Object,
      default() {
        return {};
      },
    },
    diaItemBtn: {
      type: Array,
    },
  },
  watch: {
    showDialogForm(val) {
      this.dialogFormVisible = true;
    },
    dialogFormVisible(val) {
      this.$emit("update:showDialogForm", false);
    },
  },
  data() {
    return {
      formLabelWidth: "80px",
      dialogFormVisible: false,
    };
  },
  methods: {
    // 按钮操作
    handleFn(type, Fn) {
      if (type === "confirm") {
        this.handleConfirmFn("diaFormData", Fn);
      }
      if (type === "cancel") {
        this.handleCancelFn("diaFormData", Fn);
      }
    },
    // 取消按钮操作
    handleCancelFn(formName, Fn) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
      Fn ? this.$parent[Fn]() : "";
    },
    // 确认按钮操作
    handleConfirmFn(formName, Fn) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          Fn ? this.$parent[Fn]() : "";
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.dialog-footer {
  // border-top: 1px solid #cecece;
}
.el-input {
  width: 200px;
}
.diaLog {
  .el-dialog__body {
    margin-top: 20px;
    padding: 0 !important;
  }
}
</style>

