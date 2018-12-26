const webpack = require('webpack')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ?
    '/static/' : '/',
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        output: 'js'
      }),
      new webpack.ContextReplacementPlugin(/lazy-debug-legacy(\\|\/)src/, __dirname)
    ],
    externals: {
      'vue': 'Vue',
      'muse-ui': 'MuseUI',
      'element-ui': 'ELEMENT'
    },
    node: {
      process: false
    },
  }
}