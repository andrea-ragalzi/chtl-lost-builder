import { MantineProvider } from '@mantine/core';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Importa PersistGate
import { store, persistor } from './store'; // Importa 'persistor' oltre a 'store'

import App from './App'; // Import the App component

// Import Mantine CSS files
import '@mantine/core/styles.css';

export const Providers = () => {
  return (
    // 1. Redux Provider (for state)
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider defaultColorScheme="auto">
          <App />
        </MantineProvider>
      </PersistGate>
    </ReduxProvider>
  );
};