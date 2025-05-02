import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/index';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage />
  </StrictMode>
);