import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './utils/store';
import { DirectionProvider } from './contexts/DirectionContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DirectionProvider>
      <App />
      </DirectionProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
