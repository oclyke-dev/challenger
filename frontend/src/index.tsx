/*
// This file is subject to the terms and conditions defined in
// file 'LICENSE.md', which is part of this source code package.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  BrowserRouter as Router,
} from 'react-router-dom';

import {
  ThemeProvider
} from '@material-ui/core/styles';

// theme
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
