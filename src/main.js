/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 10:17:59
 * @Function: Please Input Function
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./permission"; // 路由拦截器
import "./global.scss"; // 默认样式全局复写
import "@/components/standardComponents"; // 当前标准使用的组件

import ElementUI from "element-ui";
import "@/assets/themeConfig/element-variables.scss";

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
