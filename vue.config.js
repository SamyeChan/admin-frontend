// const path = require('path')
// const pathJoin = dir => path.join(__dirname, dir)

module.exports = {
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: process.env.NODE_ENV !== 'prod',
  // babel vuex-persist,兼容低版本浏览器
  transpileDependencies: ['vuex-persist'],
  devServer: {
    disableHostCheck: true,
    port: 8082,
    proxy: {
      '/auth': {
        target: 'https://yapi.leayun.cn/mock/142', // YApi
        changeOrigin: true,
        pathRewrite: {}
      },
      '/proj': {
        target: 'https://yapi.leayun.cn/mock/142', // YApi
        changeOrigin: true,
        pathRewrite: {}
      }
    }
  }
}
