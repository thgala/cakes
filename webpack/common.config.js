const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const development = require('./dev.config.js');
const staging = require('./staging.config.js');
const production = require('./prod.config.js');

require('babel-polyfill').default;

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../dist')
};

process.env.BABEL_ENV = TARGET;

const common = {
  entry: [
    PATHS.app,
  ],

  output: {
    path: PATHS.build,
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.scss'],
    modules: ['node_modules', PATHS.app],
  },

  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?name=assets/[hash].[ext]&limit=1024'],
      }, {
        test: /\.(jpg|png|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: ['file-loader?name=assets/[name].[ext]'],
      }, {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      }
    ],
  }

};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(development, common);
}

if (TARGET === 'build' || !TARGET) {
  module.exports = merge(production, common);
}

if (TARGET === 'staging' || !TARGET) {
  module.exports = merge(staging, common);
}
