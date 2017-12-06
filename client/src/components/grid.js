import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Card, Col, Row } from 'antd';
const { Meta } = Card;

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
      if (preview && preview.images && preview.images[0].source) preview = preview.images[0].source.url;
      else preview = './client/assets/images/raddit-square.png';
      list.push(
        <span key={post.id}>
          <a target="_blank"
            href={'https://reddit.com' + post.permalink}
            className="one-card"
          >
            <Card
              hoverable
              style={{ width: 400 }}
            >
              <span className="hard-card-cover" style={{ backgroundImage: `url('${preview}')` }}>
              </span>
              <Meta
                title={post.title}
                description={post.subreddit}
              />
            </Card>
          </a>
        </span>

      )
    }
    return (
      <div>
        <h1>{this.props.showType}</h1>
        <div className="card-grid">
          {list}
          <div className="one-card fake-card"></div>
          <div className="one-card fake-card"></div>
          <div className="one-card fake-card"></div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
