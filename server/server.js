'use strict';
require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const mcache = require('memory-cache');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = 3000;
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');

/**
 * create cache (not currently used)
 * @param {*} duration - how long to persist the cache data
 */
const cache = (duration) => {
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
};

/**
 * CORS middleware (api routes only)
 */
const allowCORS = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};

/**
 * static files middleware
 */
app.use(function(req, res, next) {
  if (req.url.match(/.js$|.html$|.css$|.png$|.woff|.woff2|.tff$/)) {
      res.sendFile(path.join(__dirname + '/..' + req.url));
  }
  else next();
});

/**
 * body and cookie parsing middleware
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());

/**
 * ROUTING
 */
// Auth routes
app.use('/auth', (req, res, next) => {
  console.log('hitting auth route');
  next();
}, allowCORS, authRoutes);
// Users / user posts routes
app.use('/api/users', allowCORS, userRoutes);
// Posts routes
app.use('/api/posts', allowCORS, postRoutes);

// Static HTML routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + './../index.html'));
});
// TEST DATA ROUTING
app.get('/test-data-please', (req, res) => {
  res.type('json');
  res.sendFile(path.join(__dirname + './../testData.json'));
});
// Catch-all for react-router
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + './../index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});

module.exports = app;
