/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 17:37:35
 * @Function: 默认的路由表 - [ 异常页, 结果页 ]
 */
import { RouteView, BasicLayout, BlankLayout } from "@/layouts";
import genMeta from "../genMeta";

// 默认异常页面、结果页面路由
export default function (ROOT_PATH = "") {
  return [
    // result
    {
      path: `${ROOT_PATH}/result`,
      name: "result",
      component: RouteView,
      redirect: `${ROOT_PATH}/result/success`,
      meta: genMeta({ title: "结果页", permission: ["result"] }),
      children: [
        {
          path: `${ROOT_PATH}/result/success`,
          name: "ResultSuccess",
          component: () =>
            import(
              /* webpackChunkName: "resultSuccess" */ "@/views/default/result/Success"
            ),
          meta: genMeta({ title: "成功", permission: ["result"] }),
        },
        {
          path: `${ROOT_PATH}/result/fail`,
          name: "ResultFail",
          component: () =>
            import(
              /* webpackChunkName: "resultError" */ "@/views/default/result/Error"
            ),
          meta: genMeta({ title: "失败", permission: ["result"] }),
        },
      ],
    },

    // Exception
    {
      path: `${ROOT_PATH}/exception`,
      name: "exception",
      component: RouteView,
      redirect: `${ROOT_PATH}/exception/403`,
      meta: genMeta({ title: "异常页", permission: ["exception"] }),
      children: [
        {
          path: `${ROOT_PATH}/exception/403`,
          name: "Exception403",
          component: () =>
            import(
              /* webpackChunkName: "exception403" */ "@/views/default/exception/403"
            ),
          meta: genMeta({ title: "403", permission: ["exception"] }),
        },
        {
          path: `${ROOT_PATH}/exception/404`,
          name: "Exception404",
          component: () =>
            import(
              /* webpackChunkName: "exception404" */ "@/views/default/exception/404"
            ),
          meta: genMeta({ title: "404", permission: ["exception"] }),
        },
        {
          path: `${ROOT_PATH}/exception/500`,
          name: "Exception500",
          component: () =>
            import(
              /* webpackChunkName: "exception500" */ "@/views/default/exception/500"
            ),
          meta: genMeta({ title: "500", permission: ["exception"] }),
        },
      ],
    },
  ];
}
