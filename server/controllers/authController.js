// import { react } from '../../../../../../Library/Caches/typescript/2.6/node_modules/@types/babel-types';

const rp = require('request-promise');

const authController = {};

/**
 * verifyReddit - redirect user to Reddit for authorization
 * @param req - http.IncomingRequest
 * @param res - http.ServerResponse
 */
// TO ADD: &state=RANDOM_STRING
authController.verifyReddit = (req, res) => res.redirect(`https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_CLIENT_ID}&response_type=code&state=abcd&redirect_uri=${process.env.REDDIT_REDIRECT_URI}&duration=permanent&scope=identity history`);

// ================================= //
// ================================= //
// ================================= //

/**
 * getTokenReddit - request access token for Reddit user
 * @param req - http.IncomingRequest
 * @param res - http.ServerResponse
 * @param next
 */

authController.getTokenReddit = (req, res, next) => {
  if (req.query.error || req.query.state !== 'abcd') return res.status(404).send('Error authorizing Reddit account');

  const requestBody = {
    "grant_type": "authorization_code",
    "code": req.query.code,
    "redirect_uri": process.env.REDDIT_REDIRECT_URI
  };
  
  const tokenRequest = {
    method: 'POST',
    uri: `https://www.reddit.com/api/v1/access_token`,
    auth: {
      'user': process.env.REDDIT_CLIENT_ID,
      'password': process.env.REDDIT_CLIENT_SECRET
    },
    body: requestBody,
    json: true
  };
  rp(tokenRequest)
    .then(data => {
      console.log('received user access token', data);
      req.specialData = {
        "access_token": data.access_token,
        "refresh_token": data.refresh_token
      };
      next();
    })
    .catch(err => res.status(404).send({'msg':'Error requesting access token from reddit', err}));
};

authController.resolveReddit = (req, res) => {
  console.log('auth successful, redirecting to home');
  res.redirect('/home');
};

// authController.getUserGithub = (req, res, next) => {
//   let token = jwt.decode(req.cookies.ssid);
//   const ghOptions = {
//     uri: `https://api.github.com/user`,
//     headers: {
//       'Authorization': `token ${token.id}`, 
//       'User-Agent':'Codesmith-Unit11-Authentication'
//     },
//     json: true
//   };
//   rp(ghOptions)
//     .then(data => {
//       req.specialData = {
//         user: data
//       };
//       next();
//     })
//     .catch(err => res.status(404).send({'msg':'Error requesting user data from github', err}));
// };

module.exports = authController;
