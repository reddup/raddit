import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';

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
      <div className="home-page">
        <img className="home-logo" src="./client/assets/images/raddit-logo.png" />
        <a href="/auth/login">
          <Button type="primary" size="large">Login</Button>
        </a>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
