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
    this.state = {

    }
  }

  render () {
    return (
      <div></div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
