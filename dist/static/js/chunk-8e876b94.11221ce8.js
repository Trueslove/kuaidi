(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8e876b94"],{"02a6":function(e,t,a){"use strict";a("671e")},"53ef":function(e,t,a){},"671e":function(e,t,a){},"85d5":function(e,t,a){"use strict";a("ed82")},a783:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"parice-one-wap"},[a("div",{staticStyle:{width:"30%",background:"#fff",padding:"10px"}},[a("Search",{attrs:{searchData:e.searchData,pageParams:e.pageParams,searchItem:e.searchItem},on:{getRefresh:e.getRefresh,getDataList:e.getDataList}}),a("div",{staticClass:"price-table"},[a("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"primary",icon:"el-icon-plus",size:"small"},on:{click:e.handleAdd}},[e._v("新建价格")]),a("Table",{attrs:{tableData:e.tableData,tableItem:e.tableItem,tableBtnItem:e.tableBtnItem,pageParams:e.pageParams},on:{getDataList:e.getDataList,handleCopy:e.handleCopy,hangleRename:e.hangleRename,handleDelete:e.handleDelete,handRowClick:e.handRowClick}})],1)],1),e.isShowBatch?a("div",{staticStyle:{flex:"1",background:"#fff","margin-left":"10px"}},[a("BatchPrice",{attrs:{pid:e.pid},on:{getDataListBatch:e.getDataList}})],1):e._e()]),a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.isShowDialog,width:"25%"},on:{"update:visible":function(t){e.isShowDialog=t}}},[a("el-form",{ref:"diaForm",attrs:{model:e.diaForm,rules:e.rules}},[a("el-form-item",{attrs:{label:"价格名称",prop:"name"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.diaForm.name,callback:function(t){e.$set(e.diaForm,"name",t)},expression:"diaForm.name"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.isShowDialog=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleConfirm("diaForm")}}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.isShowCopy,width:"25%"},on:{"update:visible":function(t){e.isShowCopy=t}}},[a("el-form",{ref:"diaForm",attrs:{model:e.diaForm,rules:e.rules}},[a("el-form-item",{attrs:{label:"原价格表名称",prop:"name"}},[a("el-input",{attrs:{disabled:"",autocomplete:"off"},model:{value:e.diaForm.name,callback:function(t){e.$set(e.diaForm,"name",t)},expression:"diaForm.name"}})],1),a("el-form-item",{attrs:{label:"新价格表名称",prop:"newName"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.diaForm.newName,callback:function(t){e.$set(e.diaForm,"newName",t)},expression:"diaForm.newName"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.isShowCopy=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleConfirm("diaForm")}}},[e._v("确 定")])],1)],1)],1)},i=[],r=(a("ac67"),a("1bc7"),a("32ea"),a("0578")),o=(a("a450"),a("226f")),n=a("408b"),l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container",staticStyle:{padding:"10px"}},[a("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"primary",icon:"el-icon-plus",size:"mini"},on:{click:e.handleAdd}},[e._v("批量新建明细")]),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.handleDownLoad}},[e._v("下载模版")]),a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"http://150.158.35.138:443/freightsystem/basic/pdetail/upload",headers:{token:e.token},multiple:!0,"on-success":e.handleSuccess}},[a("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("上传")])],1),a("Table",{attrs:{tableData:e.tableData,tableItem:e.tableItem,tableBtnItem:e.tableBtnItem,pageParams:e.pageParams},on:{getDataList:e.getDataList,handleDelete:e.handleDelete,handleEdit:e.handleEdit}}),e.isShowDialog?a("div",[a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.isShowDialog,width:"100%"},on:{"update:visible":function(t){e.isShowDialog=t}}},[a("BatchAdd",{attrs:{pid:e.pid,dest:e.formParams.dest},on:{getDataListBatch:e.getDataList,handleClose:e.handleClose}})],1)],1):e._e()],1)},c=[],d=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container batch-add",staticStyle:{padding:"10px"}},[a("div",[a("el-form",{ref:"formParams",attrs:{model:e.formParams,rules:e.rules}},[a("el-form-item",{staticStyle:{width:"500px"},attrs:{label:"目的地",prop:"dest"}},[a("el-select",{attrs:{multiple:"",placeholder:"请选择目的地"},model:{value:e.formParams.dest,callback:function(t){e.$set(e.formParams,"dest",t)},expression:"formParams.dest"}},e._l(e.missingDest,(function(e,t){return a("el-option",{key:t,attrs:{label:e.desc,value:e.key}})})),1)],1),a("div",{staticStyle:{"margin-top":"20px"}},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.handleAdd}},[e._v("添加")]),a("el-table",{staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"startMass",label:"*起始重量（KG）"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{placeholder:"请输入起始重量"},model:{value:t.row.startMass,callback:function(a){e.$set(t.row,"startMass",a)},expression:"scope.row.startMass"}})]}}])}),a("el-table-column",{attrs:{prop:"endMass",label:"*截止重量（KG）"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{placeholder:"请输入截止重量"},model:{value:t.row.endMass,callback:function(a){e.$set(t.row,"endMass",a)},expression:"scope.row.endMass"}})]}}])}),a("el-table-column",{attrs:{prop:"method",label:"*计价方式"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{attrs:{placeholder:"请选择计价方式"},model:{value:t.row.method,callback:function(a){e.$set(t.row,"method",a)},expression:"scope.row.method"}},[a("el-option",{attrs:{label:"固定价格",value:0}}),a("el-option",{attrs:{label:"首续重不同价",value:1}}),a("el-option",{attrs:{label:"首续重同价",value:2}})],1)]}}])}),a("el-table-column",{attrs:{prop:"firstPrice",label:"*价格（元）"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{placeholder:"请输入价格",disabled:0!=t.row.method},model:{value:t.row.firstPrice,callback:function(a){e.$set(t.row,"firstPrice",a)},expression:"scope.row.firstPrice"}})]}}])}),a("el-table-column",{attrs:{prop:"firstMass",label:"*首重重量（KG）"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{placeholder:"请输入首重重量",disabled:1!=t.row.method&&2!=t.row.method},model:{value:t.row.firstMass,callback:function(a){e.$set(t.row,"firstMass",a)},expression:"scope.row.firstMass"}})]}}])}),a("el-table-column",{attrs:{prop:"firstPrice",label:"*首重价格（元）"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{placeholder:"请输入首重价格",disabled:1!=t.row.method&&2!=t.row.method},model:{value:t.row.firstPrice,callback:function(a){e.$set(t.row,"firstPrice",a)},expression:"scope.row.firstPrice"}})]}}])}),a("el-table-column",{attrs:{prop:"moreMass",label:"*续重递增重量（KG）"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{placeholder:"请输入续重重量",disabled:1!=t.row.method},model:{value:t.row.moreMass,callback:function(a){e.$set(t.row,"moreMass",a)},expression:"scope.row.moreMass"}})]}}])}),a("el-table-column",{attrs:{prop:"morePrice",label:"*续重价格（元）"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{placeholder:"请输入续重价格",disabled:1!=t.row.method},model:{value:t.row.morePrice,callback:function(a){e.$set(t.row,"morePrice",a)},expression:"scope.row.morePrice"}})]}}])}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.handleClick(t.$index)}}},[e._v("删除")])]}}])})],1),a("div",{staticStyle:{"margin-top":"10px"}},[a("el-input",{attrs:{size:"mini",placeholder:"请输入重量"},model:{value:e.mass,callback:function(t){e.mass=t},expression:"mass"}},[a("template",{slot:"append"},[e._v("KG")])],2),a("el-button",{staticStyle:{margin:"0 10px"},attrs:{type:"primary",size:"mini",disabled:!e.mass},on:{click:e.handleSum}},[e._v("计算")]),a("el-input",{attrs:{size:"mini",disabled:""},model:{value:e.freight,callback:function(t){e.freight=t},expression:"freight"}},[a("template",{slot:"append"},[e._v("元")])],2)],1),a("div",{staticStyle:{"margin-top":"10px"}},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleSave("formParams")}}},[e._v("保 存")]),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:e.handleCloseDia}},[e._v("关 闭")])],1)],1)],1)],1)])},p=[];function m(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,s)}return a}function u(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?m(Object(a),!0).forEach((function(t){Object(r["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):m(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var f={mixins:[o["a"]],props:{pid:{type:String},dest:{type:String}},data:function(){return{city:"",formParams:{dest:"",startMass:"",endMass:"",method:"",price:"",firstPrice:"",firstMass:"",morePrice:"",moreMass:""},sumPrice:"",mass:"",activeNames:["1"],isShowDialog:!1,isShowHelp:!1,rules:{dest:[{required:!0,message:"请选择目的地",trigger:"blur"}]},completeDest:[],allDest:[],missingDest:[],freight:null}},created:function(){this.getCompleteDestApi(),this.getMissingDestApi()},watch:{pid:function(e){this.getDataList()}},methods:{handleGetDetail:function(){var e=this;Object(n["H"])({dest:this.dest,pid:this.pid}).then((function(t){e.freight=t.data.freight}))},handleClick:function(e){this.tableData.splice(e,1),console.log(e)},handleCloseDia:function(){this.$emit("handleClose")},handleAdd:function(){this.tableData.push({startMass:0,endMass:0,method:0,firstMass:0,firstPrice:0,moreMass:0,morePrice:0})},handleSum:function(){var e=this;console.log("计算"),Object(n["O"])({mass:this.mass,pid:this.pid,dest:"nihao",list:this.tableData}).then((function(t){e.freight=t.data.freight}))},handleSave:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;t.pid?Object(n["H"])({pid:t.pid,dest:t.formParams.dest,list:t.tableData}).then((function(e){t.$message({message:e.message,type:"success"}),t.$emit("getDataListBatch"),t.handleCloseDia()})):Object(n["E"])({pid:t.pid,dest:t.formParams.dest,list:t.tableData}).then((function(e){t.$message({message:e.message,type:"success"}),t.$emit("getDataListBatch"),t.handleCloseDia()}))}))},getDataList:function(){var e=this;Object(n["F"])(u({dest:this.dest,pid:this.pid},this.pageParams)).then((function(t){e.tableData=t.data.records,e.formParams.dest=e.tableData[0].dest}))},getAllDestApi:function(){var e=this;Object(n["n"])({pid:this.pid}).then((function(t){var a=t.data,s=[];a.forEach((function(e){s.push({key:e,desc:e})})),e.allDest=s}))},getCompleteDestApi:function(){var e=this;Object(n["r"])({pid:this.pid}).then((function(t){var a=t.data,s=[];a.forEach((function(e){s.push({key:e,desc:e})})),e.completeDest=s}))},getMissingDestApi:function(){var e=this;Object(n["s"])({pid:this.pid}).then((function(t){var a=t.data,s=[];a.forEach((function(e){s.push({key:e,desc:e})})),e.missingDest=s}))},handleConfirm:function(e){this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;alert("submit!")}))}}},h=f,g=(a("f96b"),a("e0a0"),a("cba8")),b=Object(g["a"])(h,d,p,!1,null,"580551a0",null),y=b.exports;function w(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,s)}return a}function v(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?w(Object(a),!0).forEach((function(t){Object(r["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):w(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var D={mixins:[o["a"]],components:{BatchAdd:y},props:{pid:{type:String}},data:function(){return{token:JSON.parse(localStorage.getItem("userInfo")).token,isEdit:!1,rules:{userName:[{required:!0,message:"请填写价格名称",trigger:"blur"}],startMass:[{required:!0,message:"请填写起始重量",trigger:"blur"}],endMass:[{required:!0,message:"请填写截止重量",trigger:"blur"}],method:[{required:!0,message:"请选择计价方式",trigger:"change"}],price:[{required:!0,message:"请填写价格",trigger:"blur"}],firstPrice:[{required:!0,message:"请填写首重价格",trigger:"blur"}],firstMass:[{required:!0,message:"请填写首重价格",trigger:"blur"}],morePrice:[{required:!0,message:"请填写续重价格",trigger:"blur"}],moreMass:[{required:!0,message:"请填写续重重量",trigger:"blur"}]},formParams:{startMass:"",endMass:"",method:"",price:"",firstPrice:"",firstMass:"",morePrice:"",moreMass:""},activeNames:["1"],diaForm:{userName:""},isShowDialog:!1}},created:function(){this.tableItem=[{prop:"dest",label:"目的地"},{prop:"startMass",label:"起始重量"},{prop:"endMass",label:"截止重量"},{prop:"methodName",label:"计价方式"},{prop:"firstMass",label:"首重重量"},{prop:"firstPrice",label:"首重价格"},{prop:"moreMass",label:"续重递增重量"},{prop:"morePrice",label:"续重价格"},{label:"操作",type:"btn",width:"90",fixed:"right"}],this.tableBtnItem=[{name:"编辑",type:"text",fnName:"handleEdit"},{name:"删除",type:"text",fnName:"handleDelete"}]},watch:{pid:function(e){this.getDataList()}},methods:{handleDownLoad:function(){Object(n["k"])().then((function(e){}))},handleSuccess:function(){this.getDataList()},handleClose:function(){this.isShowDialog=!1,this.$emit("getDataListBatch")},handleConfirm:function(e){this.$refs[e].validate((function(e){if(!e)return!1;alert("submit!")}))},handleAdd:function(){this.isShowDialog=!0,this.dialogTitle="新增"},handleEdit:function(e){this.formParams=e,this.isShowDialog=!0},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(n["G"])({pid:e.pid,did:e.did}).then((function(e){t.$message({message:e.message,type:"success"}),t.getDataList()}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},getDataList:function(){var e=this;this.pageParams.pageSize=1e3,Object(n["F"])(v({pid:this.pid},this.pageParams)).then((function(t){var a=["固定价格","首续重不同价","首续重同价"];e.tableData=t.data.records,e.tableData.forEach((function(e){e.methodName=a[e.method]})),e.pageParams.total=t.data.total}))}}},O=D,P=(a("85d5"),Object(g["a"])(O,l,c,!1,null,"33aacf64",null)),S=P.exports;function k(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,s)}return a}function j(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?k(Object(a),!0).forEach((function(t){Object(r["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):k(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var x={mixins:[o["a"]],components:{BatchPrice:S},data:function(){return{isShowBatch:!1,pid:"",dialogType:"",isShowCopy:!1,activeNames:["1"],diaForm:{name:"",newName:""},isShowDialog:!1,workerdetail:{},searchData:{name:""},rules:{name:[{required:!0,message:"请填写价格名称",trigger:"blur"}],newName:[{required:!0,message:"请填写新价格名称",trigger:"blur"}]}}},created:function(){this.tableItem=[{prop:"name",label:"价格名称"},{label:"操作",type:"btn",width:"140",fixed:"right"}],this.tableBtnItem=[{name:"复制",type:"text",fnName:"handleCopy"},{name:"删除",type:"text",fnName:"handleDelete"},{name:"重命名",type:"text",fnName:"hangleRename"}],this.searchItem=[{type:"input",label:"价格名称",prop:"name",placeholder:"请输入价格名称"}],this.getDataList()},methods:{handRowClick:function(e){this.pid=e.pid,this.isShowBatch=!0},handleCopy:function(e){this.isShowCopy=!0,this.dialogType="copy",this.diaForm.name=e.name,this.pid=e.pid,this.dialogTitle="复制价格表"},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(n["J"])({pid:e.pid}).then((function(e){t.$message({message:e.message,type:"success"}),t.getDataList()}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},hangleRename:function(e){this.diaForm.name=e.name,this.isShowCopy=!0,this.pid=e.pid,this.dialogTitle="重命名价格表",this.dialogType="rename"},handleChange:function(e){console.log(e)},handleClose:function(){},handleConfirm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;"rename"==t.dialogType?Object(n["L"])({newName:t.diaForm.newName,pid:t.pid}).then((function(e){t.$message({message:e.message,type:"success"}),t.isShowCopy=!1,t.diaForm=t.$options.data().diaForm,t.getDataList()})):"copy"==t.dialogType?Object(n["M"])({newName:t.diaForm.newName,pid:t.pid}).then((function(e){t.$message({message:e.message,type:"success"}),t.isShowCopy=!1,t.diaForm=t.$options.data().diaForm,t.getDataList()})):Object(n["I"])(j({},t.diaForm)).then((function(e){t.$message({message:e.message,type:"success"}),t.isShowDialog=!1,t.diaForm=t.$options.data().diaForm,t.getDataList()}))}))},handleAdd:function(){this.isShowDialog=!0,this.dialogTitle="新增",this.dialogType="add"},getDataList:function(){var e=this;Object(n["K"])(j(j({},this.searchData),this.pageParams)).then((function(t){e.tableData=t.data.records,e.pageParams.total=t.data.total}))}}},C=x,M=(a("02a6"),Object(g["a"])(C,s,i,!1,null,"81ec3de4",null));t["default"]=M.exports},bfe1:function(e,t,a){},e0a0:function(e,t,a){"use strict";a("bfe1")},ed82:function(e,t,a){},f96b:function(e,t,a){"use strict";a("53ef")}}]);