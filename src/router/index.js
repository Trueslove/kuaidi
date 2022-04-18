import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
// import { Message } from "element-ui";
// import Cookie from "@u/cookie";
Vue.use(Router);

import Layout from "@/layout";
import getTitle from "@u/getTitle";

/**
 * 路由相关属性说明
 * hidden: 当设置hidden为true时，意思不在sideBars侧边栏中显示
 * mete{
 * title: xxx,  设置sideBars侧边栏名称
 * icon: xxx,  设置ideBars侧边栏图标
 * noCache: true  当设置为true时不缓存该路由页面
 * }
 */

/*通用routers*/
export const currencyRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@v/login"),
    meta: { title: "登录", satisfy: "" },
    hidden: true
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@v/error-page/404.vue"),
    meta: { title: "404", satisfy: "" },
    hidden: true
  },
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: "/home",
    meta: { title: "首页", icon: "el-icon-s-data", satisfy: "012" },
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@v/home/index"),
        meta: { title: "首页", icon: "el-icon-s-data", satisfy: "" }
      }
    ]
  },
  {
    path: "/basics",
    name: "basics",
    component: Layout,
    redirect: "/basics/",
    meta: {
      title: "基础设置",
      icon: "el-icon-lock",
      satisfy: "12"
    },
    children: [
      {
        path: "destination",
        name: "destination",
        component: () => import("@v/basics/destination"),
        meta: { title: "特殊目的地", satisfy: "" }
      },
      {
        path: "price",
        name: "price",
        component: () => import("@v/basics/price"),
        meta: { title: "价格管理", satisfy: "" }
      },
      {
        path: "customer",
        name: "customer",
        component: () => import("@v/basics/customer"),
        meta: { title: "客户管理", satisfy: "" }
      },
      {
        path: "templates",
        name: "templates",
        component: () => import("@v/basics/templates"),
        meta: { title: "模板管理", satisfy: "" }
      },
      {
        path: "userGroup",
        name: "userGroup",
        component: () => import("@v/basics/userGroup"),
        meta: { title: "客户组设置", satisfy: "" }
      },
    ]
  },
  {
    path: "/freight",
    name: "freight",
    component: Layout,
    redirect: "/freight/",
    meta: {
      title: "运费计算",
      icon: "el-icon-lock",
      satisfy: "012"
    },
    children: [
      {
        path: "deliverGoods",
        name: "deliverGoods",
        component: () => import("@v/freight/deliverGoods"),
        meta: { title: "发货表格上传", satisfy: "" }
      },
      {
        path: "byTable",
        name: "byTable",
        component: () => import("@v/freight/byTable"),
        meta: { title: "按表格下载账单", satisfy: "" }
      },
      {
        path: "byCustomer",
        name: "byCustomer",
        component: () => import("@v/freight/byCustomer"),
        meta: { title: "按客户下载账单", satisfy: "" }
      },
      {
        path: "byDetailed",
        name: "byDetailed",
        component: () => import("@v/freight/byDetailed"),
        meta: { title: "按明细下载账单", satisfy: "" }
      }
    ]
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: Layout,
    redirect: "/statistics/",
    meta: {
      title: "统计图表",
      icon: "el-icon-lock",
      satisfy: "12"
    },
    children: [
      {
        path: "byCustomer",
        name: "byCustomerC",
        component: () => import("@v/statistics/byCustomer"),
        meta: { title: "按客户统计", satisfy: "" }
      },
      // {
      //   path: "byProvince",
      //   name: "byProvince",
      //   component: () => import("@v/statistics/byProvince"),
      //   meta: { title: "按省份统计" }
      // },
      // {
      //   path: "byDetailed",
      //   name: "byDetailedC",
      //   component: () => import("@v/statistics/byDetailed"),
      //   meta: { title: "客户明细统计" }
      // }
    ]
  },
  {
    path: "/user",
    name: "User",
    component: Layout,
    redirect: "/user/",
    meta: {
      title: "信息设置",
      icon: "el-icon-setting",
      satisfy: "2"
    },
    children: [
      {
        path: "index",
        name: "userSetting",
        component: () => import("@v/user/index"),
        meta: { title: "用户管理", satisfy: "" }
      },
      {
        path: "ipConfig",
        name: "ipConfig",
        component: () => import("@v/user/ipConfig"),
        meta: { title: "ip名单", satisfy: "" }
      }
    ]
  }
];
/*动态添加routers*/
export const asyncRoutes = [];
const creatRouter = () => {
  return new Router({
    routes: currencyRoutes,
    scrollBehavior() {
      return { x: 0, y: 0 };
    }
  });
};
const router = creatRouter();
// 解决addRoute不能删除动态路由问题
export function resetRouter() {
  const reset = creatRouter();
  router.matcher = reset.matcher;
}

// 导航守卫
router.beforeEach(async (to, from, next) => {
  document.title = getTitle(to.meta.title);
  if (to.path === "/login" || to.path === "/register") {
    next();
  } else {
    if (store.getters.token) {
      const hasRoles = store.getters.addRoutes.length > 0;
      if (hasRoles || store.getters.isFindRouter) {
        next();
      } else {
        var roles = [];
        const addRoutes = await store.dispatch(
          "permission/getAsyncRoutes",
          roles
        );
        // window.console.log(addRoutes);
        router.addRoutes(addRoutes);
        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true });
      }
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    }
  }
});

export default router;
