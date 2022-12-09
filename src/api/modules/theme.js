/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-09 14:35:11
 * @Function: Please Input Function
 */
import request from "@/utils/request";
import defaultSettings from "@/config/defaultSettings";

export default {
  // 初始化查询变量
  getVars: () =>
    request({
      url: `/element/theme/getVariable?version=${defaultSettings.elementUIVersion}`,
      method: "GET",
    }),

  // 更新自定义变量
  updateVars: (data, config = {}) =>
    request({
      url: `/element/theme/updateVariable?version=${defaultSettings.elementUIVersion}`,
      method: "POST",
      data,
      ...config,
    }),
};
