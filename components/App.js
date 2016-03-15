import React from 'react';
import Navigation from './Navigation';

class App extends React.Component {
  render() {
    return <div>
      <Navigation />
      { this.props.children }
    </div>;
  }
}

export default App;