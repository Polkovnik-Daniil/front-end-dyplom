import React from "react";
import { useContext } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { Context } from "../index";
import { observer } from "mobx-react-lite";




const AppRouter = observer(() => {
    const { user } = useContext(Context); 
    user.setParams();
    console.log(user);
    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />
            )}
            {publicRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />
            )}
            <Route path="/" element={<Navigate replace to="/Login" />} /> 
            <Route path="*" element={<Navigate replace to="/NotFound" />} /> 
        </Routes>
    );
});

export default AppRouter;