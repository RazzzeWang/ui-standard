/*
 * @Author: wangze@linkstec.com
 * @Date: 2020-10-09 18:54:52
 * @Function: Please Input Function
 */

const loading = {
  namespaced: true,
  state: {
    showLoading: false,
  },

  mutations: {
    SET_LOADING_STATUS: (state, showLoading) => {
      state.showLoading = showLoading;
    },
  },

  actions: {
    // 显示loading
    ShowLoading({ commit }) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING_STATUS", true);
        resolve();
      });
    },
    // 隐藏loading
    HideLoading({ commit }) {
      return new Promise((resolve, reject) => {
        commit("SET_LOADING_STATUS", false);
        resolve();
      });
    },
  },
};

export default loading;
