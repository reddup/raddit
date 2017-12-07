import * as types from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  posts: [],
  showPosts: []
};


const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case types.RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        posts: action.posts,
        showPosts: action.posts,
        lastUpdated: action.receivedAt
      })
    case types.SEARCH_POSTS:
      let results = state.posts.filter(el => {
        let string = el.title + ' ' + el.subreddit;
        if (el.post_metadata) string += ' ' + el.post_metadata.toString();
        return string.toLowerCase().match(new RegExp(action.value))
      });
      return Object.assign({}, state, {
        showPosts: results
      })
    default:
      return state
  }
}

export default postsReducer
