import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { NOTFOUND_ROUTE } from "../utils/consts";
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

const Employees = observer(() => {
    const navigate = useNavigate();
    const { user } = useContext(Context);
    if (!user.Access) {
        navigate(NOTFOUND_ROUTE);
        return;
    }
    return (
        <div>Employees</div>
    );
});

export default Employees;