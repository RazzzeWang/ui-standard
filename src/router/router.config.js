/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 10:42:25
 * @Function: Please Input Function
 *

 */
import { RouteView, BasicLayout, BlankLayout } from "@/layouts";
import genMeta from "./genMeta";
import defaultRouter from "./config/router.default";
import componentsRouter from "./config/router.components";
import themeRouter from "./config/router.theme";

// 固定路由
export const constantRouter = [
  {
    path: "/404",
    component: () =>
      import(
        /* webpackChunkName: "fail" */ "@/views/default/exception/404.vue"
      ),
  },
];

// 默认的路由表
const defaultRouterList = defaultRouter("/default");
// 组件的路由表
const componentsRouterList = componentsRouter("/components");
// 主题的路由表
const themeRouterList = themeRouter("/theme");

// 根级路由
export const rootRouter = [
  {
    path: "/default",
    name: "default",
    component: BasicLayout,
    meta: genMeta({ title: "default", menuType: "headMenu", isShow: false }),
    redirect: defaultRouterList.length > 0 ? defaultRouterList[0].path : "/404",
    children: defaultRouterList,
  },
  {
    path: "/components",
    name: "components",
    component: BasicLayout,
    meta: genMeta({ title: "组件", menuType: "headMenu" }),
    redirect:
      componentsRouterList.length > 0 ? componentsRouterList[0].path : "/404",
    children: componentsRouterList,
  },
  {
    path: "/theme",
    name: "theme",
    component: BasicLayout,
    meta: genMeta({ title: "主题", menuType: "headMenu" }),
    redirect: themeRouterList.length > 0 ? themeRouterList[0].path : "/404",
    children: themeRouterList,
  },
];
