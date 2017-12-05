
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
// import React from 'react';
import { render } from 'react-dom';
// import ReactDOM from 'react-dom';
// Import routing components
import {Router, Route, browserHistory} from 'react-router';

import Grid from './components/grid';
import store from './store';


class App extends React.Component {
  render() {
    return (
      <Grid />
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('content')

render(
  <Router history={history}>
    <Route path="/" component={Grid} />
    <Route path="/grid" component={Grid} />
  </Router>
, document.getElementById('content')

);




// class App extends React.Component {
//   render() {
//     return (
//       <Grid />
//     )
//   }
// }

// ReactDOM.render(
//   <App />, document.getElementById('content')
// );

// render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// ), document.getElementById('content')
