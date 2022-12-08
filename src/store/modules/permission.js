/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 12:11:29
 * @Function: Please Input Function
 */
import { generatorDynamicRouter } from "@/router/generatorRouters";
import urlUtil from "@/utils/urlUtil";

const permission = {
  namespaced: true,
  state: {
    allMenus: [],
    headerMenus: [],
    currentHeaderMenu: null,
    userRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.userRouters = routers;
    },
    SET_ALL_MENUS: (state, allMenus) => {
      state.allMenus = allMenus;
    },
    SET_HEADER_MENUS: (state, headerMenus) => {
      state.headerMenus = headerMenus;
      if (headerMenus.length > 0) {
        for (let i = 0; i < headerMenus.length; i++) {
          if (urlUtil.path().indexOf(headerMenus[i].path + "/") > -1) {
            state.currentHeaderMenu = headerMenus[i].name;
          }
        }
      } else {
        state.currentHeaderMenu = null;
      }
    },
    SET_CURRENT_HEADER_MENU: (state, currentHeaderMenu) => {
      state.currentHeaderMenu = currentHeaderMenu;
    },
  },
  actions: {
    GenerateRoutes({ commit, state }) {
      return new Promise((resolve) => {
        generatorDynamicRouter(state.currentHeaderMenu).then(
          ({ routers, allMenus }) => {
            const headerMenus = [];
            allMenus.forEach((hm) => {
              if (hm.meta.menuType === "headMenu") {
                headerMenus.push(hm);
              }
            });
            commit("SET_ROUTERS", routers);
            commit("SET_ALL_MENUS", allMenus);
            commit("SET_HEADER_MENUS", headerMenus);
            resolve();
          }
        );
      });
    },
  },
};

export default permission;
