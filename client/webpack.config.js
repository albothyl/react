var webpack = require('webpack');

/*
 * Default webpack configuration for development
 */
var config = {
  devtool: 'eval-source-map',
  // entry:  __dirname + "/apps/chap_1_grocery/GreceryApp.js",
  // entry:  __dirname + "/apps/chap_2_kanban/KanbanApp.js",
  // entry:  __dirname + "/apps/chap_3_contract/ContractsApp.js",
  // entry:  __dirname + "/apps/chap_5_router/App.js",
  // entry:  __dirname + "/apps/chap_6_bank/App.js",
  // entry:  __dirname + "/apps/chap_6_bank_apply_improvement/App.js",
  entry:  __dirname + "/apps/chap_6_bank_async/App.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015','react']
      }
    }]
  },
  devServer: {
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true,
    host: "127.0.0.1",
    port: 3000
  },
}

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ];
};

module.exports = config;
