(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9009c100"],{"34f5":function(e,t,a){"use strict";a("47d0")},"47d0":function(e,t,a){},e382:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("Search",{attrs:{searchData:e.searchData,pageParams:e.pageParams,searchItem:e.searchItem},on:{getRefresh:e.getRefresh,getDataList:e.getDataList}}),a("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"primary",icon:"el-icon-plus",size:"small"},on:{click:e.handleAdd}},[e._v("添加")]),a("Table",{attrs:{isShowIndex:!0,tableData:e.tableData,tableItem:e.tableItem,tableBtnItem:e.tableBtnItem,pageParams:e.pageParams},on:{getDataList:e.getDataList,handleEdit:e.handleEdit,handleDelete:e.handleDelete}}),a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.isShowDialog,width:"25%"},on:{"update:visible":function(t){e.isShowDialog=t}}},[a("el-form",{ref:"diaForm",attrs:{model:e.diaForm,rules:e.rules}},[a("el-form-item",{attrs:{label:"用户名",prop:"username"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.diaForm.username,callback:function(t){e.$set(e.diaForm,"username",t)},expression:"diaForm.username"}})],1),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.diaForm.password,callback:function(t){e.$set(e.diaForm,"password",t)},expression:"diaForm.password"}})],1),a("el-form-item",{attrs:{label:"用户身份",prop:"gid"}},[a("el-select",{attrs:{placeholder:"请选择用户身份"},model:{value:e.diaForm.gid,callback:function(t){e.$set(e.diaForm,"gid",t)},expression:"diaForm.gid"}},[a("el-option",{attrs:{label:"游客",value:0}}),a("el-option",{attrs:{label:"员工",value:1}})],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.isShowDialog=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleConfirm("diaForm")}}},[e._v("确 定")])],1)],1)],1)},s=[],r=(a("ac67"),a("32ea"),a("1bc7"),a("0578")),o=a("226f"),n=a("408b");function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){Object(r["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var d={mixins:[o["a"]],data:function(){return{isEdit:!1,diaForm:{gid:"",username:"",password:""},isShowDialog:!1,isShowHelp:!1,workerdetail:{},searchData:{username:""},rules:{username:[{required:!0,message:"请填写用户名",trigger:"blur"}],password:[{required:!0,message:"请填写密码",trigger:"blur"}],gid:[{required:!0,message:"请选择权限",trigger:"change"}]}}},created:function(){this.tableItem=[{prop:"username",label:"用户名"},{prop:"password",label:"密码"},{prop:"gidName",label:"用户身份"},{label:"操作",type:"btn",width:"90",fixed:"right"}],this.tableBtnItem=[{name:"编辑",type:"text",fnName:"handleEdit"},{name:"删除",type:"text",fnName:"handleDelete"}],this.searchItem=[{type:"input",label:"用户名",prop:"username",placeholder:"请输入用户名"}]},methods:{handleClose:function(){this.isShowHelp=!1},handleConfirm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.isEdit?Object(n["S"])(c({},t.diaForm)).then((function(e){t.$message({message:e.message,type:"success"}),t.isShowDialog=!1,t.getDataList()})):Object(n["P"])(c({},t.diaForm)).then((function(e){t.$message({message:e.message,type:"success"}),t.isShowDialog=!1,t.getDataList()}))}))},handleAdd:function(){this.isShowDialog=!0,this.dialogTitle="新增",this.isEdit=!1},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该记录, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(n["Q"])({uid:e.uid}).then((function(e){t.$message({type:"success",message:e.message}),t.getDataList()}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},handleEdit:function(e){this.diaForm=e,this.isShowDialog=!0,this.isEdit=!0,this.dialogTitle="修改"},getDataList:function(){var e=this;Object(n["R"])(c(c({},this.searchData),this.pageParams)).then((function(t){var a=t.data.records;a.forEach((function(e){0==e.gid?e.gidName="游客":1==e.gid?e.gidName="员工":e.gidName="超级管理员"})),e.tableData=a,e.pageParams.total=t.data.total,console.log(e.tableData,e.pageParams.total)}))}}},m=d,u=(a("34f5"),a("cba8")),p=Object(u["a"])(m,i,s,!1,null,"660bcc40",null);t["default"]=p.exports}}]);