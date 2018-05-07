const webpack = require('webpack');
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';

const prodConfig = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  optimization: {
    minimize: true,
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      include: path.resolve(__dirname, 'src'),
      options: {
        failOnWarning: true,
        failOnError: true,
        emitWarning: true,
      },
    }, {
      use: 'babel-loader',
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
      path.resolve('demo'),
    ],
  },
  externals: {
    "react": "react",
    "react-dom": "ReactDOM",
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-mail-form.js',
    libraryTarget: 'umd',
    library: 'ReactContactForm',
    globalObject: 'this',
  },
};

const devConfig = {
  mode: 'development',
  devServer: {
    contentBase: path.resolve('demo'),
    hot: true,
    inline: true,
    port: 8888,
    historyApiFallback: true,
    compress: false,
  },
  entry: path.resolve(__dirname, 'demo', 'index.jsx'),
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify('development')
      }
    })
  ],
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      include: path.resolve(__dirname, 'demo'),
      options: {
        failOnWarning: true,
        failOnError: true,
        emitWarning: true,
      },
    }, {
      use: 'babel-loader',
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
      path.resolve('demo'),
    ],
  },
  output: {
    path: path.resolve('demo'),
    filename: 'bundle.js',
    publicPath: '/',
  },
};

module.exports = isProduction ? prodConfig : devConfig;
