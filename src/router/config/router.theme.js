/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-08 16:00:35
 * @Function: Please Input Function
 */
import { RouteView, BasicLayout, BlankLayout } from "@/layouts";
import genMeta from "../genMeta";

// 默认异常页面、结果页面路由
export default function (ROOT_PATH = "") {
  return [
    {
      path: `${ROOT_PATH}/preview`,
      name: "ThemePreview",
      component: () =>
        import(/* webpackChunkName: "themePreview" */ "@/views/theme/Preview"),
      meta: genMeta({ title: "预览", permission: ["theme"], isShow: false }),
    },
  ];
}
