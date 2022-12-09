/*
 * @Author: ze.wang@diact.com
 * @Date: 2022-12-07 10:17:59
 * @Function: Please Input Function
 */
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "0.0.0.0",
    port: process.env.port,
    proxy: {
      "/element/theme": {
        target: "https://element-api.ele.me", // 要使用url模块解析的url字符串
        changeOrigin: true, // true / false，默认值: false - 将主机标头的原点更改为目标URL
        secure: true,
        onProxyRes: function (proxyRes, req, res) {
          // proxyRes.headers['set-cookie'] = 'LMSPToken=620BB1FD3E2D40EDAB810E0ACAAE5D68;';
        },
      },
    },
  },
  // chainWebpack(config) {
  //   config.module
  // }
});
