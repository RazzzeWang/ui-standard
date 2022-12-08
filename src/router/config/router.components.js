/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 17:30:47
 * @Function: 组件的路由表
 */
import { RouteView, BasicLayout, BlankLayout } from "@/layouts";
import genMeta from "../genMeta";

export default function (ROOT_PATH = "") {
  return [
    {
      path: `${ROOT_PATH}/general`,
      name: "general",
      component: RouteView,
      redirect: `${ROOT_PATH}/general/colors`,
      meta: genMeta({ title: "通用", permission: ["general"] }),
      children: [
        {
          path: `${ROOT_PATH}/general/colors`,
          name: "GeneralColors",
          component: () =>
            import(
              /* webpackChunkName: "generalColors" */ "@/views/general/Colors"
            ),
          meta: genMeta({ title: "颜色", permission: ["general"] }),
        },
      ],
    },
  ];
}
