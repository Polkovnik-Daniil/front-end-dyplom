import AboutUs from "./pages/AboutUs";
import Books from "./pages/Books";
import Employees from "./pages/Employees";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Readers from "./pages/Readers";
import Registration from "./pages/Registration";

import { ABOUTUS_ROUTE, BOOKS_ROUTE, EMPLOYEES_ROUTE, HOME_ROUTE, LOGIN_ROUTE, READERS_ROUTE, REGISTRATION_ROUTE, NOTFOUND_ROUTE } from "./utils/consts";


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
        path: REGISTRATION_ROUTE,
        element: <Registration />
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
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        element: <Login />
    }
]