import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/inter-tight';
import './styles/global.css';
import './styles/home.css';
import './styles/lab.css';
import App from './App';

if (import.meta.env.VITE_HELVETICA_NOW === 'true') {
  import('./styles/helvetica-now.css');
  document.documentElement.classList.add('hn');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
