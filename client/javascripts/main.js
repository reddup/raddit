import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
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
);
