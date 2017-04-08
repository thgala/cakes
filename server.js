const http = require('http');
const express = require('express');
const app = express();

const YAML = require('yamljs');
const APP_CONFIG = YAML.load(__dirname + '/config.yml').development;

app.set('view engine', 'ejs');
app.use(require('morgan')('short'));

(function initWebpack() {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack/common.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    stats: {
      chunkModules: false,
      colors: true
    },
    noInfo: false,
    publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    heartbeat: 10 * 1000
  }));

  app.use(express.static(__dirname + '/'));
})();

app.get(/.*/, function root(req, res) {
  res.render(__dirname + '/index.ejs', {
    APP_CONFIG: APP_CONFIG
  })
});

const server = http.createServer(app);
server.listen(process.env.PORT || APP_CONFIG.port, function onListen() {
  const address = server.address();
  console.log('Listening on: %j', address);
  console.log(' -> that probably means: http://localhost:%d', address.port);
});
