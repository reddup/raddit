import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';


const mapStateToProps = store => ({

});

const mapDispatchToProps = dispatch => ({

});


class Login extends React.Component{
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <h1>raddit</h1>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
