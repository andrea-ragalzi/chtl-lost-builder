// src/Providers.tsx
import { MantineProvider } from '@mantine/core';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import App from './App'; // Import the App component

// Import Mantine CSS files
import '@mantine/core/styles.css';

export const Providers = () => {
  return (
    // 1. Redux Provider (for state)
    <ReduxProvider store={store}>
      {/* 2. Mantine Provider (for UI) */}
      <MantineProvider defaultColorScheme="auto">
        {/* 3. The App (which contains the router) is now wrapped by all providers */}
        <App />
      </MantineProvider>
    </ReduxProvider>
  );
};