import AboutUs from "./pages/AboutUs";
import Books from "./pages/Books";
import Employees from "./pages/Employees";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Readers from "./pages/Readers";
import Genre from "./pages/Genre";
import { ABOUTUS_ROUTE, BOOKS_ROUTE, EMPLOYEES_ROUTE, HOME_ROUTE, LOGIN_ROUTE, READERS_ROUTE, REGISTRATION_ROUTE, NOTFOUND_ROUTE, GENRE_ROUTE, AUTHOR_ROUTE, HISTORY_ROUTE } from "./utils/consts";
import Author from "./pages/Author";
import History from "./pages/History";



export const authRoutes = [
    {
        path: HOME_ROUTE,
        element: <Home />
    },
    {
        path: ABOUTUS_ROUTE,
        element: <AboutUs />
    },
    {
        path: BOOKS_ROUTE,
        element: <Books />
    },
    {
        path: EMPLOYEES_ROUTE,
        element: <Employees />
    },
    {
        path: READERS_ROUTE,
        element: <Readers />
    },
    {
        path: NOTFOUND_ROUTE,
        element: <NotFound />
    },
    {
        path: GENRE_ROUTE,
        element: <Genre />
    },
    {
        path: AUTHOR_ROUTE,
        element: <Author />
    },
    {
        path: HISTORY_ROUTE,
        element: <History />
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        element: <Login />
    }
]