// * IMPORTS
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// * MISCELLANEOUS
import './css/index.css';
import './css/fonts.css';
import reportWebVitals from './reportWebVitals';
// * COMPONENTS
import App from './app/App';
// * REDUX
import { ReduxStore } from './app/store';

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

