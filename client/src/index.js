import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {reduxStore} from './app/store';
import {BrowserRouter} from 'react-router-dom';
import App from './app/App.jsx';
import './css/fonts.css';
import './css/index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
