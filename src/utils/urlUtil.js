/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-08 17:33:47
 * @Function: Please Input Function
 */
import defaultSettings from "@/config/defaultSettings";

const urlUtil = {
  /**
   * 返回url地址
   * @returns 返回url地址
   */
  href() {
    return window.location.href;
  },
  /**
   * 返回路由path
   * @returns 返回路由path
   */
  path() {
    return defaultSettings.routerMode === "history"
      ? window.location.pathname
      : window.location.hash;
  },
  /**
   * 获取url query参数
   * @param {*} key 非必传
   * @returns key 不传则获取所有 { a: '111', b: '222' }
   */
  getQuery: function (key) {
    let query = window.location.href.split("?")[1];
    if (!query) {
      return null;
    }
    let params = {};
    let paramArr = query.split("&");
    let len = paramArr.length;
    let itemParam = [];
    if (arguments.length) {
      //有参数
      for (let i = 0; i < len; i) {
        itemParam = paramArr[i].split("=");
        if (itemParam[0] == key) {
          return itemParam[1];
        }
      }
    } else {
      //没有参数
      for (let i = 0; i < len; i) {
        itemParam = paramArr[i].split("=");
        params[itemParam[0]] = itemParam[1];
      }
      return params;
    }
  },
};

export default urlUtil;
