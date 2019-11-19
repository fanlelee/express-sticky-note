const path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, './js/app/index.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../public/js')
  },
  module: {
      rules: [
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },

  resolve: {
    alias: {
        jquery: path.join(__dirname, "js/lib/jquery-2.0.3.min.js"),
        less: path.join(__dirname, "less"),
        mod: path.join(__dirname, "js/mod")
    }
  },

  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery"
    })
  ]

  // module: {
  //   rules: [{
  //       test: /\.less$/,
  //       use: ExtractTextPlugin.extract({
  //               fallback: "style-loader",
  //               use: ["css-loader", "less-loader", "postcss-loader"]
  //           }) //把 css 抽离出来生成一个文件
  //   }]
  // },
};