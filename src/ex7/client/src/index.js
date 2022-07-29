import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ReactDOM from 'react-dom/client';
import App from './App';
import "monday-ui-react-core/dist/main.css"
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
  </React.StrictMode>
);
