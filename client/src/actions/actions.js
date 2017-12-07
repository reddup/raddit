import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes'
import * as helpers from '../constants/helpers'

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
    posts: json,
    showPosts: json,
    receivedAt: Date.now()
  }
}

export const searchPosts = (value) => {
  return {
    type: types.SEARCH_POSTS,
    value
  }
}

export const fetchPosts = (user_id) => {
  return dispatch => {
    dispatch(requestPosts(user_id))
    return fetch(`/api/users/${helpers.readCookie('rid')}/posts`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(user_id, json)))
  }
}
