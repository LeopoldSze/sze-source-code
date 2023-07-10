const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const toml = require('toml')
const yaml = require('yaml')
const json5 = require('json5')

module.exports = {
  entry: {
    main: './src/main.js',
    another: './src/another.ts'
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    assetModuleFilename: 'images/[contenthash][ext]'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      title: '测试',
      inject: 'body',
      chunks: ['']
    }),

    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css'
    })
  ],

  module: {
    rules: [
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: { // 优先级高于assetModuleFilename
          filename: 'images/test[ext]'
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/inline'
      },
      {
        test: /\.txt$/,
        type: 'asset/source'
      },
      {
        test: /\.jpg$/,
        type: 'asset', // 在resource和inline之间自动选择，默认大小8kb
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 * 1024
          }
        }
      },
      // 加载css
      {
        test: /\.css$/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true // 开启css模块
            }
          },
          'postcss-loader']
      },
      // 加载less
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      // 加载字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)/,
        type: 'asset/resource'
      },
      // 加载XML
      {
        test: /\.xml$/i,
        use: 'xml-loader'
      },
      // 加载CSV|TSV
      {
        test: /\.(csv|tsv)$/i,
        use: 'csv-loader'
      },
      // 加载toml
      {
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse
        }
      },
      // 加载yaml
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse
        }
      },
      // 加载json5
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse
        }
      },
      // babel编译ES6
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime'
              ]
            ]
          }
        }
      },
      // 加载ts
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  optimization: {
    // 代码分割，公共模块拆分
    splitChunks: {
      // chunks: 'all',
      // 缓存第三方库
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all' // 对所有chunk做处理
        }
      }
    }
  }
}
