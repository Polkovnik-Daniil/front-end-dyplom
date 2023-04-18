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
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    if (user.isAuth) {
        navigate(HOME_ROUTE);
        return;
    }
    const handleSubmit = async (event) => {
        //проверка значений
        if (email === "" || password === "" || !IsEmail(email)) {
            alert("Uncorrected values!");
            return;
        }
        await login(email, password).catch((error) => {
            if (error.response.status == 403) {
                alert("Your account is blocked!");
            }
        }
        );
        user.setUser(true);
        navigate(HOME_ROUTE);
        return;
    }
    function IsEmail(value) {
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
        if (regEx.test(value)) {
            return true;
        }
        return false;
    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card className="p-5">
                <h2 className="m-auto">Authorization</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="mt-3"
                        placeholder="Enter email..."/>
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="mt-3"
                        placeholder="Enter password"
                        type="password"/>

                    <Button className="mt-3" onClick={handleSubmit}>
                        Enter
                    </Button>

                </Form>
            </Card>
        </Container>
    );
});

export default Login;