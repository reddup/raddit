import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';


const mapStateToProps = store => ({
  posts: store.posts.posts
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(actions.fetchPosts()),
});

class Grid extends React.Component{
  constructor (props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchPosts('123');
  }

  render () {
    return (
      <h1>Grid</h1>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
