import React from 'react';
import ReactDOM from 'react-dom/client';
import { Providers } from './app/Providers';

// Function to register the Service Worker
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // The path must be relative to the root of your application
      navigator.serviceWorker.register('./../public/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered successfully:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  } else {
    console.warn('Service Workers are not supported in this browser.');
  }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>
);

// Register the Service Worker after the root component renders
registerServiceWorker();
