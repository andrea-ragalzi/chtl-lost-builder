import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import { Fallback } from '../components/Fallback';


const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));


export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: (
            <Suspense fallback={<Fallback />}>
                <NotFoundPage />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Fallback />}>
                        <HomePage />
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
