import * as types from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  posts: []
};


const posts = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        posts: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
