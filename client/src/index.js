import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {ReduxStore} from './app/store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import './css/index.css';
import './css/fonts.css';
import {BrowserRouter} from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={ReduxStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
