import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';


const mapStateToProps = store => ({
  posts: store.posts.posts
});

const mapDispatchToProps = dispatch => ({

});


class Grid extends React.Component{
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <h1>Grid</h1>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
