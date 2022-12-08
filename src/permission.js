/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 12:06:01
 * @Function: Please Input Function
 */
import router from "./router";
import store from "./store";

router.beforeEach((to, from, next) => {
  if (store.getters.userRouters.length === 0) {
    // 生成路由
    store.dispatch("permission/GenerateRoutes").then(() => {
      store.getters.userRouters.forEach((routerObj) => {
        router.addRoute(routerObj);
      });

      // 请求带有 redirect 重定向时，登录自动重定向到该地址
      const redirect = decodeURIComponent(from.query.redirect || to.path);
      if (to.path === redirect) {
        next({ ...to, replace: true });
      } else {
        next({ path: redirect });
      }
    });
  } else {
    next();
  }
});
