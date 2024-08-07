import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Loan from './views/Loan/Loan.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Loan />
  </React.StrictMode>,
);
