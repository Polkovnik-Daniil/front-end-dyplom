import React from "react";
import { useContext } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { Context } from "../index";
import { observer } from "mobx-react-lite";




const AppRouter = observer(() => {
    const { user } = useContext(Context); 
    user.setUser(true);
    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />
            )}
            {publicRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />
            )}
            {/*was deleted row*/ }
            {user.isAuth ? <Route path="*" element={<Navigate replace to="/NotFound" />} /> : null}
            {!user.isAuth ? <Route path="*" element={<Navigate replace to="/Login" />} /> : null}

        </Routes>
    );
});

export default AppRouter;