const jwt = require('jsonwebtoken');
const jwtsecret = process.env.JWTSECRET || 'NotASecret';

const cookieController = {};

cookieController.setAuthCookies = (req, res, next) => {
  let token = req.specialData.access_token;
  req.specialData.jwtId = jwt.sign({token}, jwtsecret, {algorithm:'HS256', expiresIn: req.specialData.expires_in});
  let ssid = req.specialData.jwtId;
  res.cookie('ssid', ssid, {httpOnly: true});
  res.cookie('rrt', req.specialData.refresh_token, {expires: new Date(Date.now() + 900000), httpOnly: true});
  next();
};

module.exports = cookieController;
