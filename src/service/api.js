import Vue from "vue";
import {
  post,
  get,
  del,
  put,
  upload,
  uploadE,
  exportExcel,
  postForm
} from "./index";
// const _baseUrl = 'http://150.158.35.138:443/freightsystem/basic'
const _baseUrl = '/freightsystem/basic'
// const _baseUrl = 'http://150.158.35.138:443/freightsystem/basic';
/* eslint-disable */
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$del = del
Vue.prototype.$put = put
Vue.prototype.$upload = upload
Vue.prototype.$uploadE = uploadE
Vue.prototype.$exportExcel = exportExcel
Vue.prototype.$postForm = postForm
// 上传图片
const uploadURL = `${_baseUrl}/common/upload`
export const uploadApi = function (json) {
  return Vue.prototype.$upload(uploadURL, json)
}

// 登录
const loginInURL = `${_baseUrl}/user/login`
export const loginInApi = function (json) {
  return Vue.prototype.$post(loginInURL, json)
}
// 获取验证码
const getValidateCodeURL = `${_baseUrl}/validateCode/getValidateCode`
export const getValidateCodeApi = function (json) {
  return Vue.prototype.$get(getValidateCodeURL, json)
}
// 退出登录
const loginOutURL = `${_baseUrl}/company_center/logout`
export const loginOutApi = function (json) {
  return Vue.prototype.$post(loginOutURL, json)
}

// 新增特殊目的地
const keywordAddUrl = `${_baseUrl}/keyword/add`
export const keywordAddApi = function (json) {
  return Vue.prototype.$post(keywordAddUrl, json)
}
// 查询特殊目的地
const keywordGetUrl = `${_baseUrl}/keyword/get`
export const keywordGetApi = function (json) {
  return Vue.prototype.$post(keywordGetUrl, json)
}
// 删除特殊目的地
const keywordDelUrl = `${_baseUrl}/keyword/del`
export const keywordDelApi = function (json) {
  return Vue.prototype.$post(keywordDelUrl, json)
}



// 查询用户组
const customerGroupUrl = `${_baseUrl}/customerGroup/get`
export const customerGroupApi = function (json) {
  return Vue.prototype.$post(customerGroupUrl, json)
}
// 删除用户组
const customerGroupDelUrl = `${_baseUrl}/customerGroup/del`
export const customerGroupDelApi = function (json) {
  return Vue.prototype.$post(customerGroupDelUrl, json)
}
// 添加用户组
const customerGroupAddUrl = `${_baseUrl}/customerGroup/add`
export const customerGroupAddApi = function (json) {
  return Vue.prototype.$post(customerGroupAddUrl, json)
}


// 更新关键词
const keywordUpdateUrl = `${_baseUrl}/keyword/update`
export const keywordUpdateApi = function (json) {
  return Vue.prototype.$post(keywordUpdateUrl, json)
}

// 新增价格表
const priceAddUrl = `${_baseUrl}/price/add`
export const priceAddApi = function (json) {
  return Vue.prototype.$post(priceAddUrl, json)
}
// 查询价格表
const priceGetUrl = `${_baseUrl}/price/get`
export const priceGetApi = function (json) {
  return Vue.prototype.$post(priceGetUrl, json)
}
// 删除价格表
const priceDelUrl = `${_baseUrl}/price/del`
export const priceDelApi = function (json) {
  return Vue.prototype.$post(priceDelUrl, json)
}
// 复制价格表
const pricedUplicateUrl = `${_baseUrl}/price/duplicate`
export const pricedUplicateApi = function (json) {
  return Vue.prototype.$post(pricedUplicateUrl, json)
}
// 复制价格表
const priceRrenameUrl = `${_baseUrl}/price/rename`
export const priceRrenameApi = function (json) {
  return Vue.prototype.$post(priceRrenameUrl, json)
}

// 上传价格条目
const pdetailUploadUrl = `${_baseUrl}/pdetail/upload`
export const pdetailUploadApi = function (json) {
  return Vue.prototype.$post(pdetailUploadUrl, json)
}
// 查询价格条目
const pdetailUrl = `${_baseUrl}/pdetail/get`
export const pdetailApi = function (json) {
  return Vue.prototype.$post(pdetailUrl, json)
}
// 新增价格条目
const pdetailAddUrl = `${_baseUrl}/pdetail/add`
export const pdetailAddApi = function (json) {
  return Vue.prototype.$postForm(pdetailAddUrl, json)
}
// 修改价格条目
const pdetailUpdateUrl = `${_baseUrl}/pdetail/update`
export const pdetailUpdateApi = function (json) {
  return Vue.prototype.$postForm(pdetailUpdateUrl, json)
}
// 试算价格
const testCalcUrl = `${_baseUrl}/pdetail/testCalc`
export const testCalcApi = function (json) {
  return Vue.prototype.$postForm(testCalcUrl, json)
}
// 删除价格条目
const pdetailDelUrl = `${_baseUrl}/pdetail/del`
export const pdetailDelApi = function (json) {
  return Vue.prototype.$post(pdetailDelUrl, json)
}
// 获取缺失地点
const getMissingDestUrl = `${_baseUrl}/pdetail/getMissingDest`
export const getMissingDestApi = function (json) {
  return Vue.prototype.$post(getMissingDestUrl, json)
}
// 获取存在地点
const getCompleteDestUrl = `${_baseUrl}/pdetail/getCompleteDest`
export const getCompleteDestApi = function (json) {
  return Vue.prototype.$post(getCompleteDestUrl, json)
}
// 获取全部地点
const getAllDestUrl = `${_baseUrl}/pdetail/getAllDest`
export const getAllDestApi = function (json) {
  return Vue.prototype.$get(getAllDestUrl, json)
}
// 获取模板
const downloadModelUrl = `${_baseUrl}/pdetail/downloadModel`
export const downloadModelApi = function (json) {
  return Vue.prototype.$exportExcel(downloadModelUrl, json)
}


// 查询客户
const customerGetUrl = `${_baseUrl}/customer/get`
export const customerGetApi = function (json) {
  return Vue.prototype.$post(customerGetUrl, json)
}
// 删除客户
const customerDelUrl = `${_baseUrl}/customer/del`
export const customerDelApi = function (json) {
  return Vue.prototype.$post(customerDelUrl, json)
}
// 编辑客户
const customerUpdateUrl = `${_baseUrl}/customer/update`
export const customerUpdateApi = function (json) {
  return Vue.prototype.$post(customerUpdateUrl, json)
}
// 重置客户
const customerResetUrl = `${_baseUrl}/customer/reset`
export const customerResetApi = function (json) {
  return Vue.prototype.$del(customerResetUrl, json)
}
// 新建客户
const customerAddUrl = `${_baseUrl}/customer/add`
export const customerAddApi = function (json) {
  return Vue.prototype.$post(customerAddUrl, json)
}



// 添加模板
const modelAddUrl = `${_baseUrl}/model/add`
export const modelAddApi = function (json) {
  return Vue.prototype.$post(modelAddUrl, json)
}
// 获取模板
const modelGetUrl = `${_baseUrl}/model/get`
export const modelGetApi = function (json) {
  return Vue.prototype.$post(modelGetUrl, json)
}
// 删除模板
const modelDelUrl = `${_baseUrl}/model/del`
export const modelDelApi = function (json) {
  return Vue.prototype.$post(modelDelUrl, json)
}




// 获取所有发货表格
const freightGetUrl = `${_baseUrl}/freight/get`
export const freightGetApi = function (json) {
  return Vue.prototype.$post(freightGetUrl, json)
}
// 按客户查询
const getByCustomerUrl = `${_baseUrl}/downloadinfo/getByCustomer`
export const getByCustomerApi = function (json) {
  return Vue.prototype.$post(getByCustomerUrl, json)
}
// 按客户下载
const downloadByCustomerUrl = `${_baseUrl}/download/downloadByCustomer`
export const downloadByCustomerApi = function (json) {
  return Vue.prototype.$exportExcel(downloadByCustomerUrl, json)
}
// 按表格时间
const getByTableTimeUrl = `${_baseUrl}/downloadinfo/getByTableTime`
export const getByTableTimeApi = function (json) {
  return Vue.prototype.$post(getByTableTimeUrl, json)
}
// 按表格时间下载
const downloadByTableUrl = `${_baseUrl}/download/downloadByTable`
export const downloadByTableApi = function (json) {
  return Vue.prototype.$exportExcel(downloadByTableUrl, json)
}
// 按数据明细
const getByDataRowTimeUrl = `${_baseUrl}/downloadinfo/getByDataRowTime`
export const getByDataRowTimeApi = function (json) {
  return Vue.prototype.$post(getByDataRowTimeUrl, json)
}
// 按数据明细下载
const downloadByTimeUrl = `${_baseUrl}/download/downloadByTime`
export const downloadByTimeApi = function (json) {
  return Vue.prototype.$exportExcel(downloadByTimeUrl, json)
}
// 拆分下载
const splitDownloadUrl = `${_baseUrl}/download/splitDownload`
export const splitDownloadApi = function (json) {
  return Vue.prototype.$exportExcel(splitDownloadUrl, json)
}


// 图表
const filterDataRowUrl = `${_baseUrl}/stat/get`
export const filterDataRowApi = function (json) {
  return Vue.prototype.$post(filterDataRowUrl, json)
}


// ip管理 添加
const ipAddUrl = `${_baseUrl}/ip/add`
export const ipAddApi = function (json) {
  return Vue.prototype.$post(ipAddUrl, json)
}
// ip管理 删除
const ipDelUrl = `${_baseUrl}/ip/del`
export const ipDelApi = function (json) {
  return Vue.prototype.$post(ipDelUrl, json)
}
// ip管理
const ipGetUrl = `${_baseUrl}/ip/get`
export const ipGetApi = function (json) {
  return Vue.prototype.$post(ipGetUrl, json)
}

// 用户管理 添加
const userAddUrl = `${_baseUrl}/user/add`
export const userAddApi = function (json) {
  return Vue.prototype.$post(userAddUrl, json)
}
// 用户管理 删除
const userDelUrl = `${_baseUrl}/user/del`
export const userDelApi = function (json) {
  return Vue.prototype.$post(userDelUrl, json)
}
// 用户管理 更新
const userUpdateUrl = `${_baseUrl}/user/update`
export const userUpdateApi = function (json) {
  return Vue.prototype.$post(userUpdateUrl, json)
}
// 用户管理 
const userGetUrl = `${_baseUrl}/user/get`
export const userGetApi = function (json) {
  return Vue.prototype.$post(userGetUrl, json)
}