/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: webpack的基础设置
 * @Date: 2020-04-01 16:06:17
 * @LastEditTime: 2020-07-10 10:57:29
 */
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// webpack4 用于css懒加载
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 用于style验证
const StyleLintPlugin = require('stylelint-webpack-plugin')

const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')
const pkg = require('../package.json')
const flexibility = require('postcss-flexibility')
const sorting = require('postcss-sorting')
const color_rgba_fallback = require('postcss-color-rgba-fallback')
const opacity = require('postcss-opacity')
const pseudoelements = require('postcss-pseudoelements')
const will_change = require('postcss-will-change')
const cssnano = require('cssnano')

const banner = `
  ${pkg.name}
  ${pkg.description}\n
  @version v${pkg.version}
  @homepage ${pkg.homepage}
  @repository ${pkg.repository && pkg.repository.url}\n
  @ 2020 sam.hongyang
  Released under the MIT License.
  hash: [hash]
`

/**
 * vue 模版中资源转化规则
 * 1. 绝对路径 (例如 /images/foo.png)，会原样保留
 * 2. 路径以 . 开头，将会被看作相对的模块依赖，并按照你的本地文件系统上的目录结构进行解析
 * 3. 路径以 ~ 开头，其后的部分将会被看作模块依赖。这意味着你可以用该特性来引用一个 Node 依赖中的资源
 * 4. 路径以 @ 开头，也会被看作模块依赖。如果你的 webpack 配置中给 @ 配置了 alias，这就很有用了
 */
const vueLoader = [{
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      extractCSS: true
    }
  }/* ,
  {
    loader: 'iview-loader',
    options: {
      prefix: false
    }
  } */
]

const vuePlugins = [
  new VueLoaderPlugin()
]
const fileLoader = [{
  test: /\.(png|jpe?g|gif)(\?.*)?$/,
  use: [{
      loader: 'file-loader',
      options: {
        // 具体配置见插件官网
        limit: 8192,
        // 具体配置见插件官网
        name: '[name]-[contenthash].[ext]',
        outputPath: 'img/',
        publicPath: process.env.NODE_ENV === 'production' ?
          '/assets/img' : '/img'
      }
    },
    {
      loader: 'image-webpack-loader',
      options: {
        disable: true,
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false
        },
        pngquant: {
          quality: [0.65, 0.90],
          speed: 4,
          enabled: false
        },
        gifsicle: {
          interlaced: false
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75
        }
      }
    }
  ]
}]
const fontLoader = [{
  test: /\.(svg|woff|woff2|ttf|oft|eot)(\?.*)?$/,
  use: [{
    loader: 'file-loader',
    options: {
      // 具体配置见插件官网
      limit: 8192,
      // 具体配置见插件官网
      name: '[name]-[contenthash].[ext]',
      outputPath: 'fonts/',
      publicPath: process.env.NODE_ENV === 'production' ?
        '/assets/fonts' : '/fonts'
    }
  }]
}]
const sassLoader = [{
  test: /\.(sc|sa)ss$/,
  use: [{
      loader: process.env.NODE_ENV !== 'production' ?
        'vue-style-loader' : MiniCssExtractPlugin.loader,
      options: {
        sourceMap: true,
        hmr: process.env.NODE_ENV === 'development',
        publicPath: process.env.NODE_ENV === 'production' ?
          '/assets' :
          '/css'
      }
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true/* ,
        modules: true */
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        sourceMap: true,
        plugins: () => [
          // 可以配置多个插件
          cssnano({
            // 关闭cssnano的autoprefixer选项，不然会和前面的autoprefixer冲突
            autoprefixer: false,
            reduceIdents: false,
            zindex: false,
            discardUnused: false,
            mergeIdents: false
          }),
          // NOTE: new feature should change browsers to overrideBrowserslist
          require('autoprefixer')({
            overrideBrowserslist: [
              'last 10 Chrome versions',
              'last 5 Firefox versions',
              'Safari >= 6',
              'ie > 8'
            ],
            grid: false
          }),
          flexibility,
          will_change,
          color_rgba_fallback,
          opacity,
          pseudoelements,
          sorting
        ]
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        // indentedSyntax: false,
        // sass-loader version >= 8
        implementation: require('dart-sass'),
        sassOptions: {
          indentedSyntax: false
        }
      }
    }
  ]
}]
const lessLoader = [{
  test: /\.less$/,
  use: [{
      loader: process.env.NODE_ENV !== 'production' ?
        'vue-style-loader' : MiniCssExtractPlugin.loader,
      options: {
        sourceMap: true,
        hmr: process.env.NODE_ENV === 'development',
        publicPath: process.env.NODE_ENV === 'production' ?
          '/assets' :
          '/css'
      }
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true/* ,
        modules: true */
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        sourceMap: true,
        plugins: () => [
          // 可以配置多个插件
          cssnano({
            // 关闭cssnano的autoprefixer选项，不然会和前面的autoprefixer冲突
            autoprefixer: false,
            reduceIdents: false,
            zindex: false,
            discardUnused: false,
            mergeIdents: false
          }),
          // NOTE: new feature should change browsers to overrideBrowserslist
          require('autoprefixer')({
            overrideBrowserslist: [
              'last 10 Chrome versions',
              'last 5 Firefox versions',
              'Safari >= 6',
              'ie > 8'
            ],
            grid: false
          }),
          flexibility,
          will_change,
          color_rgba_fallback,
          opacity,
          pseudoelements,
          sorting
        ]
      }
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: true,
        javascriptEnabled: true
      }
    }
  ]
}]
const stylusLoader = [{
  test: /\.styl(us)?$/,
  use: [{
      loader: process.env.NODE_ENV !== 'production' ?
        'vue-style-loader' : MiniCssExtractPlugin.loader,
      options: {
        sourceMap: true,
        hmr: process.env.NODE_ENV === 'development',
        publicPath: process.env.NODE_ENV === 'production' ?
          '/assets' :
          '/css'
      }
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true/* ,
        modules: true */
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        sourceMap: true,
        plugins: () => [
          // 可以配置多个插件
          cssnano({
            // 关闭cssnano的autoprefixer选项，不然会和前面的autoprefixer冲突
            autoprefixer: false,
            reduceIdents: false,
            zindex: false,
            discardUnused: false,
            mergeIdents: false
          }),
          // NOTE: new feature should change browsers to overrideBrowserslist
          require('autoprefixer')({
            overrideBrowserslist: [
              'last 10 Chrome versions',
              'last 5 Firefox versions',
              'Safari >= 6',
              'ie > 8'
            ],
            grid: false
          }),
          flexibility,
          will_change,
          color_rgba_fallback,
          opacity,
          pseudoelements,
          sorting
        ]
      }
    },
    {
      loader: 'stylus-loader',
      options: {
        sourceMap: true
      }
    }
  ]
}]
const cssLoader = [{
  test: /\.css$/,
  use: [{
      loader: process.env.NODE_ENV !== 'production' ?
        'vue-style-loader' : MiniCssExtractPlugin.loader,
      options: {
        sourceMap: true,
        hmr: process.env.NODE_ENV === 'development',
        publicPath: process.env.NODE_ENV === 'production' ?
          '/assets' :
          '/css'
      }
    },
    {
      loader: 'css-loader',
      // 开启模块化
      options: {
        importLoaders: 1,
        sourceMap: true
        // NOTE: 不启用模块化样式
        /* ,
        modules: true, */
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        sourceMap: true,
        plugins: () => [
          // 可以配置多个插件
          cssnano({
            // 关闭cssnano的autoprefixer选项，不然会和前面的autoprefixer冲突
            autoprefixer: false,
            reduceIdents: false,
            zindex: false,
            discardUnused: false,
            mergeIdents: false
          }),
          // NOTE: new feature should change browsers to overrideBrowserslist
          require('autoprefixer')({
            overrideBrowserslist: [
              'last 10 Chrome versions',
              'last 5 Firefox versions',
              'Safari >= 6',
              'ie > 8'
            ],
            grid: false
          }),
          flexibility,
          will_change,
          color_rgba_fallback,
          opacity,
          pseudoelements,
          sorting
        ]
      }
    },
  ]
}]
const jsLoader = [{
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: file => (
    /node_modules/.test(file) &&
    !/\.vue\.js/.test(file)
  )
}]
const tsLoader = [{
  test: /\.ts$/,
  loader: 'ts-loader',
  options: {
    appendTsSuffixTo: [/\.vue$/],
    transpileOnly: true,
    experimentalWatchApi: true,
  }
}]
module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src')
  },
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    // 其中 __dirname 表示当前工作目录，也就是项目根目录
    extensions: ['.js', '.vue', '.json', '.tsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [{
        enforce: 'pre',
        test: /\.(js|vue|jsx)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src/**')],
        loader: 'eslint-loader',
        options: {
          fix: config.autoFix,
          formatter: require('eslint-friendly-formatter'),
          emitWarning: config.useEslint
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      ...vueLoader,
      ...fileLoader,
      ...fontLoader,
      ...sassLoader,
      ...lessLoader,
      ...stylusLoader,
      ...cssLoader,
      ...jsLoader,
      ...tsLoader
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: path.resolve(__dirname, '../dist/index.html'),
      favicon: path.resolve(__dirname, '../src/assets/ico/favicon.ico'),
      minify: {
        collapseWhitespace: true, //移除空格
        removeAttributeQuotes: true, //移除属性的双引号
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.BannerPlugin(banner),
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV !== 'production' ? 'css/[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: process.env.NODE_ENV !== 'production' ? 'css/[id].css' : 'css/[name].[contenthash].css',
      // 是否启用删除有关冲突顺序的警告
      // Enable to remove warnings about conflicting order
      ignoreOrder: true,
    }),
    new StyleLintPlugin({
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
      fix: config.autoFix,
      lintDirtyModulesOnly: true,
      emitWarning: config.useEslint
    }),
    ...vuePlugins
  ]
}
