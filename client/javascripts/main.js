const React = require('react');
const ReactDOM = require('react-dom');
const Grid = require('./components/grid');

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
