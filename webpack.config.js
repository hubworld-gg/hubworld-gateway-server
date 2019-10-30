const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    ...slsw.lib.entries
  },
  optimization: {
    minimize: false
  },
  devtool: '',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.graphql']
  },
  module: {
    rules: [
      { test: /\.ts(x?)$/, loader: 'ts-loader' },
      { test: /\.graphql|gql?$/, loader: 'webpack-graphql-loader' }
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '/build'),
    filename: '[name].js',
    sourceMapFilename: '[file].map'
  }
};
