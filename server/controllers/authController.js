const rp = require('request-promise');
const db = require('../db');

const authController = {};

/**
 * verifyReddit - redirect user to Reddit for authorization
 * @param req - http.IncomingRequest
 * @param res - http.ServerResponse
 */
// TO ADD: &state=RANDOM_STRING
authController.verifyReddit = (req, res) => res.redirect(`https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_CLIENT_ID}&response_type=code&state=abcd&redirect_uri=${process.env.REDDIT_REDIRECT_URI}&duration=permanent&scope=identity history`);

/**
 * getTokenReddit - request access token for Reddit user
 * @param req - http.IncomingRequest
 * @param res - http.ServerResponse
 * @param next
 */

authController.getTokenReddit = (req, res, next) => {
  if (req.query.error || req.query.state !== 'abcd') return res.status(404).send('Error authorizing Reddit account');

  const requestBody = `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${process.env.REDDIT_REDIRECT_URI}`;
  
  const tokenRequest = {
    method: 'POST',
    uri: `https://www.reddit.com/api/v1/access_token`,
    auth: {
      'user': process.env.REDDIT_CLIENT_ID,
      'password': process.env.REDDIT_CLIENT_SECRET
    },
    body: requestBody
  };
  rp(tokenRequest)
    .then(data => JSON.parse(data))
    .then(data => {
      req.specialData = data;
      next();
    })
    .catch(err => res.status(404).send({'msg':'Error requesting access token from reddit', err}));
};

authController.getRedditUser = (req, res, next) => {
  const userRequest = {
    method: 'GET',
    uri: `https://oauth.reddit.com/api/v1/me`,
    headers: {
      'User-Agent': 'raddit/1.0 by vuetron',
      'Authorization': `bearer ${req.specialData.access_token}`
    }
  };

  rp(userRequest)
    .then(data => JSON.parse(data))
    .then(data => {
      req.specialData.userId = data.id;
      req.specialData.username = data.name;
      next();
    })
    .catch(err => res.status(404).send({'msg':'Error requesting user data from reddit', err}));
};

const runGoogleTagging = (pid, img) => {
  const data = {
    "requests": [
      {
        "image": {
          "source": {
            "imageUri": img
          }
        },
        "features": [
          {
            "type": "LABEL_DETECTION",
            "maxResults": 10
          },
          {
            "type": "TEXT_DETECTION",
            "maxResults": 100
          }
        ]
      }
    ]
  };

  const request = {
    method: 'POST',
    uri: `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_KEY}`,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: data,
    json: true
  };

  rp(request)
    .then(response => {
      let labelTags = [];
      let textTags = [];
      if (response.responses[0].labelAnnotations) {
        labelTags = response.responses[0].labelAnnotations.reduce((acc, el) => {
          if (el.score > 0.6) acc.push(el.description);
          return acc;
        }, []);
      }
      if (response.responses[0].textAnnotations) {
        textTags = response.responses[0].textAnnotations.reduce((acc, el, i) => {
          if (i > 0) acc.push(el.description);
          return acc;
        }, []);
      }
      return labelTags.concat(textTags);
    })
    .then(tags => {
      const query = {
        text: "UPDATE \"Posts\" SET metadata=$2 WHERE post_id=$1",
        values: [pid, tags]
      };
  
      db.conn.any(query)
        .then(done => console.log('done adding image tags'))
        .catch(err => console.log('error adding image tag', err));
    })
    .catch(err => console.log('error', err));
};

const getUserPosts = (uid) => {
  const query = {
    text: "SELECT u.user_id, p.post_id, up._id FROM \"UserPosts\" as up INNER JOIN \"Posts\" as p ON up.post_id=p.post_id INNER JOIN \"Users\" as u ON up.user_id=u.user_id WHERE up.user_id=$1;",
    values: [uid]
  };

  return db.conn.any(query);
};

const addUserPost = (postObj) => {
  const query = {
    text: "INSERT INTO \"UserPosts\"(user_id, post_id) VALUES($1, $2) RETURNING _id;",
    values: [postObj.uid, postObj.pid]
  };
  return db.conn.one(query);
};

const findOrInsertPost = (postObj) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: "INSERT INTO \"Posts\" (post_id, title, permalink, subreddit, image) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (post_id) DO NOTHING RETURNING *;",
      values: [postObj.post_id, postObj.title, postObj.permalink, postObj.subreddit, postObj.image]
    };

    db.conn.any(query)
      .then(post => {
        if (post && post[0] && post[0].image) runGoogleTagging(post[0].post_id, post[0].image);
        resolve(postObj);
      })
      .catch(err => reject(err));
  });
};


authController.getRedditUserSaved = (req, res, next) => {
  const userRequest = {
    method: 'GET',
    uri: `https://oauth.reddit.com/user/${req.specialData.username}/saved`,
    headers: {
      'User-Agent': 'raddit/1.0 by vuetron',
      'Authorization': `bearer ${req.specialData.token}`
    }
  };

  rp(userRequest)
    .then(response => JSON.parse(response))
    .then(response => {
      return response.data.children.map(item => {
        let img = (item.data.preview && item.data.preview.images && item.data.preview.images[0].source) ? item.data.preview.images[0].source.url : null;
        return {
          post_id: item.data.id,
          title: item.data.title,
          permalink: `https://www.reddit.com${item.data.permalink}`,
          subreddit: item.data.subreddit,
          image: img
        };
      });
    })
    .then(redditPostData => {
      let proms = [];
      redditPostData.forEach(item => {
        proms.push(findOrInsertPost(item));
      });
      Promise.all(proms)
        .then(completedPosts => {
          req.specialData.savedPosts = completedPosts;
          return getUserPosts(req.cookies.rid);
        })
        .then(allUserPosts => {
          let postsToAdd;
          if (!allUserPosts.length) {
            postsToAdd = req.specialData.savedPosts.map(p => {
              return {
                uid: req.cookies.rid,
                pid: p.post_id
              };
            });
          }
          else {
            postsToAdd = {};
            let savedPosts = req.specialData.savedPosts.slice(0);
            for (let i = 0; i < savedPosts; i++) {
              postsToAdd[req.cookies.rid + savedPosts[i].post_id] = {
                uid: req.cookies.rid,
                pid: savedPosts[i].post_id
              };
            }

            for (let i = 0; i < allUserPosts; i++) {
              if (postsToAdd[allUserPosts[i].user_id + allUserPosts[i].post_id]) delete postsToAdd[allUserPosts[i].user_id + allUserPosts[i].post_id];
            }
          }
          if (Object.values(postsToAdd).length > 0) {
            let addedPosts = [];
            Object.values(postsToAdd).forEach(p2a => {
              addedPosts.push(addUserPost(p2a));
            });
            Promise.all(addedPosts)
              .then(userPostsAdded => next())
              .catch(err => res.status(400).send(err));
          } else {
            next();
          }
        })
        .catch(err => res.status(400).send(err));
    })
    .catch(err => res.status(404).send({'msg':'Error requesting user saved posts from reddit', err}));
};

module.exports = authController;
