import * as types from '../constants/actionTypes'

function requestPosts(user_id) {
  return {
    type: types.REQUEST_POSTS,
    user_id
  }
}

function receivePosts(subreddit, json) {
  return {
    type: types.RECEIVE_POSTS,
    user_id,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}
