import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { router } from './app/router';
import '@mantine/core/styles.css';

const mount = () => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <MantineProvider defaultColorScheme='auto'>
        <RouterProvider router={router} />
      </MantineProvider>
    </React.StrictMode>
  );
};

mount();