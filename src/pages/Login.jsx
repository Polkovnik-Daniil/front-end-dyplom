import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import React, { useContext, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react-lite";
import { login } from "../http/userAPI";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../utils/consts";

const Login = observer(() => {
    const { user } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [status, setStatus] = useState(0);

    const navigate = useNavigate();
    if (user.isAuth) {
        navigate(HOME_ROUTE);
        return;
    }
    const handleSubmit = async (event) => {
        //проверка значений
        if (email === "" || password === "" || !IsEmail(email)) {
            setStatus(-1);
            return;
        }
        setStatus(0);
        var stat = true;
        await login(email, password).catch((error) => {
            setStatus(error.response.status);
            stat = false;
        });
        if (!stat) {
            return;
        }
        user.setUser(true);
        if (status === 0) {
            navigate(HOME_ROUTE);
            return;
        }
        return;
    }
    function IsEmail(value) {
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
        if (regEx.test(value)) {
            return true;
        }
        return false;
    }
    let message = '';
    switch (status) {
        case -1:
            message = "Fields is empty!";
            break;
        case 401:
        case 400:
            message = "Uncorrected username or password!";
            break;
        case 403:
            message = "Your account is blocked!";
            break;
        default:
            message = "Exception!";
            break;
    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card className="p-5">
                <h2 className="m-auto">Authorization</h2>
                <Form className="d-flex flex-column">
                    <Form.Label className="fs-5 mt-3">Username</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className=""
                        placeholder="Enter email..." />
                    <Form.Label className="fs-5 mt-3">Password</Form.Label>
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className=""
                        placeholder="Enter password"
                        type="password" />
                    {
                        status !== 0 ? <Form.Label className="mt-3" style={{ color: 'red' }}>{message}</Form.Label> : null
                    }

                    <Button className="mt-3" onClick={handleSubmit}>
                        Enter
                    </Button>

                </Form>
            </Card>
        </Container>
    );
});

export default Login;