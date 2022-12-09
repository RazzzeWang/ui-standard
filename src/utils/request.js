/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-09 14:22:58
 * @Function: Please Input Function
 */
import axios from "axios";
import store from "@/store";
import { Notification } from "element-ui";

const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 150000, // 请求超时时间
});

let lodingNum = 0; // loading 次数
// 异常拦截处理器
const errorHandler = (error) => {
  lodingNum--;
  if (lodingNum === 0) {
    store.dispatch("loading/HideLoading");
  }
  if (error.response && !process.env.VUE_APP_STATIC) {
    // 非静态页面开发
    const data = error.response.data;
    const statusText = error.response.statusText;
    if (!(error.response.status >= 200 && error.response.status < 300)) {
      Notification.error({
        message: statusText,
        description: data.message,
      });
    }
  }
  return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use((config) => {
  if (lodingNum === 0) {
    store.dispatch("loading/ShowLoading");
  }
  lodingNum++;
  return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use((response) => {
  const { data } = response;
  lodingNum--;
  if (lodingNum === 0) {
    store.dispatch("loading/HideLoading");
  }

  // zip下载
  const type = response.headers["content-type"];
  if (type.indexOf("zip") > -1) {
    let filename = "raze-ui-standard.zip";
    const disposition = response.headers["content-disposition"];
    if (disposition && disposition.indexOf("attachment") !== -1) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      var matches = filenameRegex.exec(disposition);
      // if (matches != null && matches[1]) {
      //   filename = matches[1].replace(/['"]/g, "");
      // }
    }
    var blob = new Blob([data], { type });
    var zipUrl = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = zipUrl;
    link.download = filename;
    link.click();
    return data;
  }

  return data;
}, errorHandler);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(axios, request);
  },
};

export default request;

export { installer as VueAxios, request as axios };
