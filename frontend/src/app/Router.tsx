import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Fallback } from '../shared/components/Fallback';
import RootLayout from '../pages/RootPage';
import ProtectedRoute from '../features/auth/components/ProtectedRoute';

// Pagine caricate in modo "lazy"
const LandingPage = lazy(() => import('../pages/LandingPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const BuilderPage = lazy(() => import('../pages/BuilderPage'));
const CharacterSheetPage = lazy(() => import('../pages/CharacterSheetPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Conditionally import DevPage
const DevPage = lazy(() => import('../pages/DevPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      // Public Routes
      {
        index: true,
        element: (
          <Suspense fallback={<Fallback />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<Fallback />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<Fallback />}>
            <RegisterPage />
          </Suspense>
        ),
      },

      // Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'builder',
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
            ),
          },
        ],
      },

      // Development Route (Conditional)
      ...(process.env.NODE_ENV === 'development'
        ? [
          {
            path: 'dev',
            element: (
              <Suspense fallback={<Fallback />}>
                <DevPage />
              </Suspense>
            ),
          },
        ]
        : []),

      // Not Found Route
      {
        path: '*',
        element: (
          <Suspense fallback={<Fallback />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);
