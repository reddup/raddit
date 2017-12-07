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

cookieController.setUserCookie = (req, res, next) => {
  let un = req.specialData.username;
  req.specialData.jwtUn = jwt.sign({un}, jwtsecret, {algorithm:'HS256', expiresIn: 60*60});
  res.cookie('run', req.specialData.jwtUn, {httpOnly:true});
  res.cookie('rid', req.specialData.userId, {httpOnly:false});
  next();
};

module.exports = cookieController;
