/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 12:11:29
 * @Function: Please Input Function
 */
import themeVars from "@/assets/themeConfig/variables.module.scss";

const permission = {
  namespaced: true,
  state: {
    primaryColor: themeVars.primaryColor,
  },
  mutations: {
    SET_PRIMARY_COLOR: (state, primaryColor) => {
      state.primaryColor = primaryColor;
    },
  },
  actions: {},
};

export default permission;
