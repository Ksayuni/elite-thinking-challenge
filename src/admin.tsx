import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AdminReport from './components/AdminReport';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminReport />
  </StrictMode>
);
