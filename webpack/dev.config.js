const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const YAML = require('yamljs');
const APP_CONFIG = YAML.load(__dirname + '/../config.yml').development;
const DEV_ORIGIN = APP_CONFIG.protocol + '://' + APP_CONFIG.host + ':' + APP_CONFIG.port;

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?path=' + DEV_ORIGIN + '/__webpack_hmr',
    './src/index',
  ],
  output: {
    publicPath: DEV_ORIGIN + '/dist/',
  },

  module: {
    rules: [{
      test: /\.(scss|sass|css)$/,
      use: [
        'style-loader',
        'css-loader?localIdentName=[path][name]--[local]',
        'postcss-loader',
        'sass-loader'
      ]
    }],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
      __DEVELOPMENT__: true,
      APP_CONFIG: JSON.stringify(APP_CONFIG),
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
};
