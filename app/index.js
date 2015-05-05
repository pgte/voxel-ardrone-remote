var join = require('path').join;
var express = require('express');
var app = exports = module.exports = express();

app.use(express.static(join(__dirname, '..', 'browser')));