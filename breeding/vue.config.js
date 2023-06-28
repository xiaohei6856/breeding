const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://xiaohei6856.cn:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/breeding/server'
        },
        // headers: {
        //   'Access-Control-Allow-Origin': 'http://your-domain.com'
        //   // 其他请求头...
        // },
        // withCredentials: true // 根据需要设置是否发送凭据
      }
    }
  }
})
