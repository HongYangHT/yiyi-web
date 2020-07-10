/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: webpack的打包构建
 * @Date: 2020-04-01 16:06:50
 * @LastEditTime: 2020-07-10 10:55:51
 */
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const ManifestPlugin = require('webpack-manifest-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const path = require('path')
const TerserJSPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const smp = new SpeedMeasurePlugin()

/**
 * 我们已经知道，想要使用 tree shaking 必须注意以下……

 * 使用 ES2015 模块语法（即 import 和 export）。
 * 确保没有 compiler 将 ES2015 模块语法转换为 CommonJS 模块（这也是流行的 Babel preset 中 @babel/preset-env 的默认行为 - 更多详细信息请查看 文档）。
 * 在项目 package.json 文件中，添加一个 "sideEffects" 属性。
 * 通过将 mode 选项设置为 production，启用 minification(代码压缩) 和 tree shaking
 */

/**
 * webpackChunkName 生成chunkfile的name
 * webpackPrefetch 预取 父chunk加载后，子chunk再加载
 */

const config = merge(webpackConfig, {
  // 运行 tree shaking 需要 ModuleConcatenationPlugin。通过 mode: "production" 可以添加此插件
  mode: 'production',
  // devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist/assets'),
    publicPath: '/assets/',
    libraryTarget: 'umd',
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    umdNamedDefine: true
  },
  // 打包后显示优化信息
  performance: {
    maxEntrypointSize: 300000,
    assetFilter: function(file) {
      return file.endsWith('.js')
    }
  },

  optimization: {
    // production模式是自动启动 tree-shaking
    // usedExports: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: module => {
            return (
              /[\\/]node_modules[\\/]/.test(module.context) &&
              !/vue|vuex|vue-router/.test(module.context)
            )
          },
          chunks: 'initial',
          name: 'commons',
          minSize: 0, //如果模块的大小大于多少的话才需要提取
          minChunks: 2, //最少最几个chunk引用才需要提取
          priority: -20
        },
        vendors: {
          test: module => {
            return (
              /[\\/]node_modules[\\/]/.test(module.context) &&
              !/vue|vuex|vue-router/.test(module.context)
            )
          },
          chunks: 'initial', //指定分割的类型，默认3种选项 all async initial
          name: 'vendors', //给分割出去的代码块起一个名字叫vendors
          priority: -10 //优先级
        },
        vueBase: {
          name: 'vueBase',
          test: module => {
            return /vue|vuex|vue-router/.test(module.context)
          },
          chunks: 'initial',
          priority: 12
        },
        componentCommon: {
          name: 'component-commons',
          test: path.resolve(__dirname, '../src/modules/components'), // 可自定义拓展你的规则
          minChunks: 2, // 最小共用次数
          priority: 5,
          reuseExistingChunk: true
        },
        commonStyle: {
          name: 'commonStyle',
          test: /\.(scss|sass|less|stylus|css)$/,
          chunks: 'all',
          enforce: true,
          priority: 20
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      // NOTE: 默认是启用，但是我们需要配置自己相关的配置
      new TerserJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,
            beautify: false
          },
          warnings: false,
          compress: {
            // 删除所有的 `console` 语句
            // 还可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
            warnings: false
          }
        }
      }),
      // Minimizing For Production
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css\.*(?!.*map)/g,
        cssProcessor: require('cssnano'), // 引入cssnano配置压缩选项
        cssProcessorPluginOptions: {
          preset: ['default', {
              map: {
              // 不生成内联映射,这样配置就会生成一个source-map文件
              inline: false,
              // 向css文件添加source-map路径注释
              // 如果没有此项压缩后的css会去除source-map路径注释
              annotation: true
            },
            discardComments: { removeAll: true },
            // 避免 cssnano 重新计算 z-index
            safe: true,
            // cssnano 集成了autoprefixer的功能
            // 会使用到autoprefixer进行无关前缀的清理
            // 关闭autoprefixer功能
            // 使用postcss的autoprefixer功能
            autoprefixer: false,
            normalizeUnicode: false // normalizeUnicode: 建议设置为false,否则在使用 unicode-range 的时候会产生乱码
          }],
        },
        canPrint: true // 是否将插件信息打印到控制台
      })
    ]
  },
  plugins: [
    new ManifestPlugin(),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      // NOTE: 设置生成`gzip`文件大小 100K
      threshold: 100 * 1024,
      minRatio: 0.8,
      cache: true
    })
  ]
})

module.exports = smp.wrap(config)
