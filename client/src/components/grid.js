import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { Card, Col, Row } from 'antd';
const { Meta } = Card;

import * as actions from '../actions/actions';

import { Input } from 'antd';


const mapStateToProps = store => ({
  posts: store.posts.posts,
  showPosts: store.posts.showPosts
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(actions.fetchPosts()),
  searchPosts: (e) => dispatch(actions.searchPosts(e.target.value.toLowerCase()))
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
    for (let i = 0; i < this.props.showPosts.length; i++) {
      let post = this.props.showPosts[i];
      let preview;
      if (post.image) preview = post.image
      else preview = './client/assets/images/raddit-square.png';
      list.push(
        <span key={post.id}>
          <a target="_blank"
            href={post.permalink}
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
        <div className="search-bar">
          <Input placeholder="Search posts" onKeyUp={this.props.searchPosts} />
        </div>
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
