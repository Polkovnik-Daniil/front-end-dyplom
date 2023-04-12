import React from "react";
import { useContext } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { Context } from "../index";



const AppRouter = () => {
    const { user } = useContext(Context);
    console.log(user);
    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />
            )}
            {publicRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />
            )}
            <Route path="*" element={<Navigate replace to="/Login" />} />
        </Routes>
    );
};

export default AppRouter;