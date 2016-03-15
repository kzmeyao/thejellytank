import './less/styles.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import About from './components/About';
import Posts from './components/Posts';

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={Posts} />
        <Route path="/about" component={About} />
      </Route>
    </Router>
  ),
  document.getElementById('app')
);