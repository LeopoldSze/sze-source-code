const path = require('path')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  mode: 'development',

  devtool: 'inline-source-map',

  output: {
    filename: 'scripts/[name].js',
    publicPath: '/'
  },

  devServer: {
    static: path.resolve(__dirname, '../dist'),
    compress: true, // 服务端启动代码压缩
    port: 3000,
    host: '0.0.0.0',
    // 响应头
    headers: {
      'X-Access-Token': 'abc123'
    },
    // http2: true, // 开启http2
    // 代理
    proxy: {
      '/api': 'http://localhost:9000'
    },
    // 代替路由404
    historyApiFallback: true,
    // 手动关闭页面报错展示
    client: {
      overlay: false
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /dist/],
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  },

  plugins: [
    // new BundleAnalyzerPlugin()
  ]
}
