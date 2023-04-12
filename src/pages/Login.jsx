import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react-lite";


const Login = observer(() => {
    const handleSubmit = async (event) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            })
        };
        var response = await fetch('' + "/Authorization", requestOptions);
        const jsonData = await response.json();
        localStorage.setItem('AccessToken', jsonData.accessToken);
        localStorage.setItem('RefreshToken', jsonData.refreshToken);
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
                        id = "email"
                        className="mt-3"
                        placeholder="Enter email..."/>
                    <Form.Control
                        id="password"
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