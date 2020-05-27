const dotenv = require('dotenv');
dotenv.config();

// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');
const gaAuth = require('./ga-auth');
gaAuth.authGAServiceAccount(Storage);

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('./../webpack.config.js');
const compiler = webpack(config);
const app = express();
const router = require('./routes/analyticsRoute');

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// allows access to the body object of the request
app.use(express.json());

// exposes static resources in public folder
app.use(express.static('public'));

// router middleware
app.use('/api/v1/analytics', router);

module.exports = app;
