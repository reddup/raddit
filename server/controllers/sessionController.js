const jwt = require('jsonwebtoken');
const jwtsecret = process.env.JWTSECRET || 'NotASecret';

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  if(req.cookies.ssid){
    try {
      let hasActiveSession = jwt.verify(req.cookies.ssid, jwtsecret);
      next();
    } catch(err) {
      return res.redirect('/auth/login');
    }
  }else{
    return res.redirect('/auth/login');
  }
};

module.exports = sessionController;
