const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

const baseConfig = {
  mode,
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.tsx?$/,
      loader: 'eslint-loader',
      include: path.resolve(__dirname, 'lib'),
      options: {
        failOnWarning: true,
        failOnError: true,
        emitWarning: true,
      },
    }, {
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      exclude: /\*\.d\.tsx?/,
    }, {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'source-map-loader',
    }, {
      use: 'babel-loader',
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [
      'node_modules',
    ],
  },
};

const prodConfig = {
  ...baseConfig,
  entry: path.resolve(__dirname, 'lib', 'index.tsx'),
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
  ...baseConfig,
  devServer: {
    contentBase: path.resolve('demo'),
    hot: true,
    inline: true,
    port: 8888,
    historyApiFallback: true,
    compress: false,
  },
  entry: path.resolve(__dirname, 'demo', 'index.tsx'),
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify('development')
      }
    })
  ],
  output: {
    path: path.resolve('demo'),
    filename: 'bundle.js',
    publicPath: '/',
  },
};

module.exports = isProduction ? prodConfig : devConfig;
