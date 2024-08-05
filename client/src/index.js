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
import { ThemeProvider } from '@material-tailwind/react';

const container = document.getElementById('root');
const root = createRoot(container);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

root.render(
  <React.StrictMode>
    <Provider store={ReduxStore}>
      <BrowserRouter>
        <ThemeProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

