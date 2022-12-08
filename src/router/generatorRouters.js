/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 11:21:37
 * @Function: Please Input Function
 */
import { rootRouter } from "./router.config.js";

const notFoundRouter = {
  path: "*",
  redirect: "/404",
  hidden: true,
};
/**
 * 动态生成菜单、路由
 */
export const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    // TODO:之后异步处理
    const routers = rootRouter;
    routers.push(notFoundRouter);

    const allMenus = generatorMenu(rootRouter);

    resolve({
      routers,
      allMenus,
    });
  });
};

/**
 * 格式化生成菜单
 */
export const generatorMenu = (routerMap) => {
  return routerMap
    .filter(
      (item) =>
        item.meta &&
        item.meta.isShow &&
        ["headMenu", "menu"].includes(item.meta.menuType)
    )
    .map((item) => {
      let currentMenu = {
        ...item,
      };

      // 是否有子菜单，并递归处理
      if (item.children && item.children.length > 0) {
        currentMenu.children = generatorMenu(item.children);
      }
      return currentMenu;
    });
};
