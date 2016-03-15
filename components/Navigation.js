import React from 'react';
import { Link } from 'react-router';

class Navigation extends React.Component {
  render() {
    return <div className="navigation">
      <div className="logo">
        <img src="/build/svg/jelly.svg" width="20" />
      </div>
      <h1>THE JELLY TANK</h1>
      <nav>
        <Link to="/">POSTS</Link>
        <Link to="/about">ABOUT</Link>
      </nav>
    </div>;
  }
}

export default Navigation;