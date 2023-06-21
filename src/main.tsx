import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import '../i18n';

const container = document.getElementById('barbieri-widget');
const root = createRoot(container!);

root.render(
  // <React.StrictMode>
  <HashRouter>
    <App />
  </HashRouter>,
  // </React.StrictMode>,
);
