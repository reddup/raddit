import React, { Component } from 'react';
// import React from 'react';
import { render } from 'react-dom';
// import ReactDOM from 'react-dom';
// Import routing components
import {Router, Route, browserHistory} from 'react-router';
import Grid from './components/grid';

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
