import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/inter-tight';
import './styles/helvetica-now.css';
import './styles/global.css';
import './styles/home.css';
import './styles/lab.css';
import './styles/swatches.css';
import App from './App';

// The `hn` class tightens display tracking for Helvetica Now Display.
document.documentElement.classList.add('hn');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
