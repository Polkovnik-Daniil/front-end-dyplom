import { useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import React, { useContext } from "react";



const NotFound = observer(() => {
    const navigate = useNavigate();
    const { user } = useContext(Context);
    if (!user.isAuth) {
        navigate(LOGIN_ROUTE);
        return;
    }
    return (
        <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center">
                <h1 class="display-1 fw-bold">404</h1>
                <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
                <p class="lead">
                    The page you`re looking for doesn`t exist.
                </p>
                <a class="btn btn-primary" onClick={() => {
                    navigate(HOME_ROUTE);
                    return;
                }}>Go Home</a>
            </div>
        </div>
    );
});

export default NotFound;