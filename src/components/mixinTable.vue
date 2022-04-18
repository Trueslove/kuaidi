<script>
import Table from "./table";
import Search from "./search";
import Dialog from "./dialog";
export default {
  components: { Table, Search, Dialog }, // table列表与搜索组件
  data() {
    return {
      dialogTitle: "", // 弹窗标题
      showDialogForm: false, // 弹窗显隐
      diaItemBtn: [], // 弹窗操作按钮
      diaItemData: [], // 弹窗表单列
      diaFormData: {}, // 弹窗表单数据
      rulesItem: {}, // 弹窗表单必填规则
      tableBtnItem: [], // 表格操作按钮
      tableItem: [], // 表格prop
      tableData: [], // 表格数据
      pageParams: {
        currentPage: 1, // 当前页码
        total: 0, // 数据总条数
        pageSize: 10 // 每页显示多少条
      },
      checkTarget: [] // 勾选的内容
    };
  },
  created() {
    /**
     * @description: 获取table数据信息
     */
    this.getDataList();
  },
  methods: {
    /**
     * @description: 重置按钮
     */
    getRefresh() {
      this.searchData = this.$options.data().searchData;
      this.getDataList();
    },
    /**
     * @description: 批量导出数据
     * @param { Blob } data [二进制流]
     * @param { String } fileName [文件名]
     */
    download(data, fileName) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    }
  }
};
</script>