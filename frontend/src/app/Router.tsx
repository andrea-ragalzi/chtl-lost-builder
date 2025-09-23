import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Fallback } from '../shared/components/Fallback';
import RootLayout from '../pages/RootPage';

// Pagine caricate in modo "lazy"
const BuilderPage = lazy(() => import('../pages/BuilderPage'));
const CharacterSheetPage = lazy(() => import('../pages/CharacterSheetPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Fallback />}>
            <BuilderPage />
          </Suspense>
        ),
      },
      {
        path: 'sheet',
        element: (
          <Suspense fallback={<Fallback />}>
            <CharacterSheetPage />
          </Suspense>
        )
      },
      {
        path: '*', // Rotta per qualsiasi URL non trovato
        element: (
          <Suspense fallback={<Fallback />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);
