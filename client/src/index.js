import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';
import './index.scss';

// inject App to root id
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
