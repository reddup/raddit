import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './components/grid';

class App extends React.Component {
  render() {
    return (
      <Grid />
    )
  }
}

ReactDOM.render(
  <App />, document.getElementById('content')
);
