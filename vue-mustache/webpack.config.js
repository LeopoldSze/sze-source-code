const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/main.js',
  output: {
    filename: "bundle.js"
  },
  devServer: {
    // 静态文件根目录
    contentBase: path.join(__dirname, 'www'),
    // 压缩
    compress: false,
    // 端口号
    port: 8080,
    // 虚拟打包的路径，bundle.js文件并没有真正的生成
    publicPath: '/virtual/'
  }
}