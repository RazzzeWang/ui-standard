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
      path: `${ROOT_PATH}/result/success`,
      name: "ResultSuccess",
      component: () =>
        import(
          /* webpackChunkName: "resultSuccess" */ "@/views/result/Success"
        ),
      meta: genMeta({ title: "成功", permission: ["result"] }),
    },
  ];
}
