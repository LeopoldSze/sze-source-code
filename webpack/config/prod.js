const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',

  output: {
    filename: 'scripts/[name].[contenthash].js',
    publicPath: '/'
  },

  optimization: {
    minimizer: [
      new CssMinimizerWebpackPlugin(), // 压缩css
      new TerserWebpackPlugin() // 压缩js
    ]
  },

  performance: {
    hints: false
  }
}
