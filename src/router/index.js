/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 10:17:59
 * @Function: Please Input Function
 */
import Vue from "vue";
import VueRouter from "vue-router";
import defaultSettings from "@/config/defaultSettings";
import { constantRouter } from "./router.config";

// hack router push callback
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = constantRouter;

const router = new VueRouter({
  mode: defaultSettings.routerMode,
  base: process.env.BASE_URL,
  routes,
});

export default router;
