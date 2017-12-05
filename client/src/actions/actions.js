import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes'

export const requestPosts = (user_id) => {
  return {
    type: types.REQUEST_POSTS,
    user_id
  }
}

export const receivePosts = (user_id, json) => {
  return {
    type: types.RECEIVE_POSTS,
    user_id,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export const fetchPosts = (user_id) => {
  return dispatch => {
    dispatch(requestPosts(user_id))
    return fetch(`/test-data-please`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(user_id, json)))
  }
}
