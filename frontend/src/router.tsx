import { createBrowserRouter } from 'react-router-dom';
import AuthPage from 'views/auth/AuthPage';
import HomePage from 'views/home/HomePage';
import Layout from 'views/layout/Layout';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <AuthPage />,
    },
    {
        element: <Layout />,
        children: [
            {
                path: "/home",
                element: <HomePage />,
            },
        ]
    }
]);

export default router;
