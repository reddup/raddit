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
    const list = [];
    for (let i = 0; i < this.props.posts.length; i++) {
      let post = this.props.posts[i];
      let preview = post.preview;
      if (preview && preview.images && preview.images[0].source) preview = <img src={preview.images[0].source.url}/>;
      else preview = '';
      list.push(
        <div key={post.id}>
          <h1>{post.subreddit}</h1>
          <h3>{post.title}</h3>
          {preview}
          <a target="_blank" href={'https://reddit.com' + post.permalink}>Go Link</a>
        </div>
      )
    }

    return (
      <div>
       <h1>{this.props.showType}</h1>
      {list}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
