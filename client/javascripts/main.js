import React, { Component } from 'react';
import { render } from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import Grid from './components/grid';
import store from './store';

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Grid} />
      <Route path="/grid" component={Grid} />
    </Router>
  </Provider>, document.getElementById('content')
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
