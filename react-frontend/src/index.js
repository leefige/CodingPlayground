import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CodeGameApp from './components/CodeGameApp';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

ReactDOM.render((
  <Router>
    <Route path="/" component={CodeGameApp}/>
  </Router>),
  document.getElementById('root')
);