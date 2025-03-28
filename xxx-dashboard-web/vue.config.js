'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'Robot Admin' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/

// 本地走mock prod 走接口
const mockServer = {
  port: port,
  open: true,
  overlay: {
    warnings: false,
    errors: true
  },
  before: require('./mock/mock-server.js')
}
//  prod 走接口
const apiServer = {
  port: port,
  open: true,
  overlay: {
    warnings: false,
    errors: true
  },
  proxy: {
    '/api/v1/screen/ai': {
      target: process.env.VUE_APP_AGENT_DASHBOARD_BASE_API,
      source: true,
      changeOrigin: true,
      pathRewrite: {
        ['^' + process.env.VUE_APP_AGENT_DASHBOARD_BASE_API]: ''
      }
    },
    // '/sapi': {
    //   target: process.env.VUE_APP_AGENT_DASHBOARD_BASE_API,
    //   source: true,
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/sapi': ''
    //   }
    // },
    '/api': {
      target: process.env.VUE_APP_BASE_API,
      source: true,
      changeOrigin: false,
      pathRewrite: {
        ['^' + process.env.VUE_APP_BASE_API]: ''
      }
    },
    '/ts-api': {
      target: process.env.VUE_APP_TS_BASE_API,
      source: true,
      changeOrigin: false,
      pathRewrite: {
        ['^' + process.env.VUE_APP_TS_BASE_API]: ''
      }
    }
  }
}
const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'localapi'
var webpack = require('webpack')
module.exports = {
  /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // lintOnSave: isDev,
  lintOnSave: false,
  productionSourceMap: false,
  devServer: process.env.NODE_ENV === 'development' ? mockServer : apiServer,
  configureWebpack: {
    // devtool: 'source-map',
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      })
    ],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    externals: isDev ? {
      // 'wxLogin': 'WwLogin'
    } : {
      // 'wxLogin': 'WwLogin',
      // vue: 'Vue',
      // echarts: 'echarts',
      // 'element-ui': 'ELEMENT'
    }
  },
  chainWebpack(config) {
    const cdn = {
      css: [],
      js: [
        // 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
        // 'https://cdn.jsdelivr.net/npm/vue-router@3.0.2/dist/vue-router.min.js',
        // 'https://cdn.jsdelivr.net/npm/vuex@3.1.0/dist/vuex.common.min.js',
        // 'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
        // 'https://cdn.jsdelivr.net/npm/element-ui@2.13.2/lib/element-ui.common.min.js',
        // 'https://unpkg.com/element-ui@2.15.5/lib/index.js'
        // 'https://cdn.jsdelivr.net/npm/echarts@5.1.1/dist/echarts.min.js'
        // 'https://cdn.jsdelivr.net/npm/echarts@5.2.0/dist/echarts.min.js'
      ]
    }

    // 如果使用多页面打包，使用 vue inspect --plugins 查看 html 是否在结果数组中
    config.plugin('html').tap(args => {
      // html中添加cdn
      args[0].cdn = isDev ? { css: [], js: [] } : cdn
      return args
    })

    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(!isDev,
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')

          const CompressionPlugin = require('compression-webpack-plugin')
          const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
          config.resolve.alias.set('@', resolve('src'))
          config.plugin('compressionPlugin')
            .use(new CompressionPlugin({
              filename: '[path].gz[query]',
              algorithm: 'gzip',
              test: productionGzipExtensions,
              threshold: 10240,
              minRatio: 0.8,
              deleteOriginalAssets: false
            }))
        }
      )
  }
}
