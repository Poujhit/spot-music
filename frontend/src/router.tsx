import { createBrowserRouter } from 'react-router-dom';
import AuthPage from 'views/auth/AuthPage';
import HomePage from 'views/home/HomePage';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <AuthPage />,
    },
    {
        path: '/home',
        element: <HomePage />
    }
]);

export default router;
