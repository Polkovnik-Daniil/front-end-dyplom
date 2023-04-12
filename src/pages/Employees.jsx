import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { HOME_ROUTE } from "../utils/consts";
import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";



const Employees = observer(() => {
    const navigate = useNavigate();
    const { user } = useContext(Context);
    if (!user.Access) {
        navigate(HOME_ROUTE);
        return;
    }
    return (
        <div>Employees</div>
    );
});

export default Employees;