/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 13:51:40
 * @Function: Please Input Function
 */
const getters = {
  headerMenus: (state) => state.permission.headerMenus,
  currentHeaderMenu: (state) => state.permission.currentHeaderMenu,
  menus: (state) => {
    const { allMenus, currentHeaderMenu } = state.permission;
    for (let i = 0; i < allMenus.length; i++) {
      if (currentHeaderMenu === allMenus[i].name) {
        return allMenus[i].children;
      }
    }
  },
  userRouters: (state) => state.permission.userRouters,
};

export default getters;
