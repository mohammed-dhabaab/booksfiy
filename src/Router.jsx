import { createBrowserRouter, ScrollRestoration } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Registration from './pages/Registration/Registration';
import Favorites from './pages/Favorites/Favorites';
import Book from './pages/Book/Book';
import Read from './pages/Read/Read';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Registration />,
        errorElement: <ErrorPage />
    },
    {
        path: '/home',
        element: (
            <>
                <ScrollRestoration />
                <Navbar />
                <Home />
                <Footer />
            </>
        )
    },
    {
        path: '/book/:id',
        element: (
            <>
                <ScrollRestoration />
                <Navbar />
                <Book />
                <Footer />
            </>
        )
    },
    {
        path: '/favorites',
        element: (
            <>
                <ScrollRestoration />
                <Navbar />
                <Favorites />
                <Footer />
            </>
        )
    },
    {
        path: '/read',
        element: (
            <>
                <ScrollRestoration />
                <Navbar />
                <Read />
                <Footer />
            </>
        )
    },
]);

export default router;