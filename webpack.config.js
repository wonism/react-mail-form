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
        failOnWarning: false,
        failOnError: true,
        emitWarning: true,
      },
    }, {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'source-map-loader',
    }, {
      loader: 'awesome-typescript-loader',
      test: /\.tsx?$/,
      exclude: /node_modules/,
      options: {
        declaration: true,
      },
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-mail-form.js',
    libraryTarget: 'umd',
    library: 'ReactMailForm',
    globalObject: 'this',
    umdNamedDefine: true,
  },
};

const devConfig = {
  ...baseConfig,
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve('demo'),
    hot: true,
    inline: true,
    port: 8888,
    historyApiFallback: true,
    compress: false,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: false,
      publicPath: false,
    },
  },
  entry: path.resolve(__dirname, 'demo', 'index.tsx'),
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: path.resolve('demo'),
    filename: 'bundle.js',
    publicPath: '/',
  },
};

module.exports = isProduction ? prodConfig : devConfig;
