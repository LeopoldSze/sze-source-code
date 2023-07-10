const { merge } = require('webpack-merge')

const commonConfig = require('./common')
const devConfig = require('./dev')
const prodConfig = require('./prod')

module.exports = env => {
  switch (true) {
    case env.development:
      return merge(commonConfig, devConfig)

    case env.production:
      return merge(commonConfig, prodConfig)

    default:
      return new Error('未找到对应的配置文件')
  }
}
