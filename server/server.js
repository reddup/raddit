'use strict';
require('dotenv').config();

const express = require('express');
const app = express();

var mcache = require('memory-cache');
var path = require('path');

app.use(function(req, res, next) {
  if (req.url.match(/.js$|.html$|.css$|.woff|.woff2|.tff$/)) {
      res.sendFile(path.join(__dirname + '/..' + req.url));
  }
  else {
      // if (req.url !== '/') {
      //     res.header("Access-Control-Allow-Origin", "*");
      //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      //     res.type('json');
      // }
      next();
  }
});

var cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key);

    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.end
      res.end = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next();
    }
  }
}



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.listen(3000);

module.exports = app;
