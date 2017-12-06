const jwt = require('jsonwebtoken');
const jwtsecret = process.env.JWTSECRET || 'NotASecret';

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {  
  if(req.cookies.ssid && req.cookies.run){
    try {
      let decodedToken = jwt.verify(req.cookies.ssid, jwtsecret);      
      let decodedUsername = jwt.verify(req.cookies.run, jwtsecret);      
      if (!req.specialData) req.specialData = {};
      req.specialData.token = decodedToken.token;
      req.specialData.username = decodedUsername.un;      
      next();
    } catch(err) {
      return res.redirect('/auth/login');
    }
  }else{
    return res.redirect('/auth/login');
  }
};

module.exports = sessionController;
