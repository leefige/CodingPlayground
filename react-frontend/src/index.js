import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CodeGameApp from './components/CodeGameApp';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render((
    <Router forceRefresh={true}>
      <Route path="/" component={props =>
        <CookiesProvider>
          <CodeGameApp {...props} />
        </CookiesProvider>
      }/>
    </Router>
  ),
  document.getElementById('root')
);
