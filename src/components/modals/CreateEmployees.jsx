import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form, Row, Col } from "react-bootstrap";
import { createEmployees, updateEmployees, deleteEmployees, fetchEmployees } from "../../http/employeesAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";


const CreateEmployees = observer(({ show, onHide }) => {
    const { employees } = useContext(Context);
    var status = employees.Id === '';
    function IsEmail(value) {
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
        if (regEx.test(value)) {
            return true;
        }
        return false;
    }

    const crudBook = async () => {
        var oper = employees.Oper;
        switch (oper) {
            case 'u':
                var a = document.getElementById("checkbox");
                updateEmployees(Number(employees.Id), employees.Name, employees.Email, employees.Password, employees.RoleId, employees.RefreshToken, employees.RefreshTokenExpiryTime, employees.IsLocked);
                break;
            case 'c':
                createEmployees(employees.Name, employees.Email, employees.Password, employees.RoleId, employees.IsLocked);
                break;
            case 'd':
                deleteEmployees(Number(employees.Id));
                break;
            default:
                break;
        }
        onHide();
        employees.setData(await fetchEmployees(0));
        setTimeout(window.location.reload(true), 1500);
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    { status? "Add new employees" : "Employees"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label className="mx-1 mt-2">Id</Form.Label>
                    <Form.Control
                        value={employees.Id}
                        onChange={e => employees.setId(e.target.value)}
                        placeholder={"Id"}
                        disabled
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: employees.Name === '' ? 'red' : 'black' }}>Name</Form.Label>
                    <Form.Control
                        value={employees.Name}
                        onChange={e => employees.setName(e.target.value)}
                        placeholder={"Enter name"}
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: employees.Email === '' ? 'red' : 'black' }}>Email</Form.Label>
                    <Form.Control
                        value={employees.Email}
                        onChange={e => employees.setEmail(e.target.value)}
                        placeholder={"Enter email"}
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: employees.Password === '' ? 'red' : 'black' }}>Password</Form.Label>
                    <Form.Control
                        type="text"
                        value={employees.Password}
                        onChange={e => employees.setPassword(e.target.value)}
                        placeholder={"Enter password"}
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: employees.RoleId === '' ? 'red' : 'black' }}>Role Id</Form.Label>
                    <Form.Control
                        type="number"
                        min="1"
                        max="3"
                        value={employees.RoleId}
                        onChange={e => {
                            if (e.target.value !== '-' && e.target.value !== '') {
                                e.target.value = e.target.value.replace('-', '');
                                employees.setRoleId(e.target.value);
                            }
                        }}
                        placeholder={"Enter role id"}
                    />
                    {
                        !status ?
                            <>
                                <Form.Label className="mx-1 mt-2" style={{ color: employees.RefreshToken === '' ? 'red' : 'black' }}>Refresh token</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={employees.RefreshToken}
                                    onChange={e => employees.setRefreshToken(e.target.value)}
                                    disabled
                                />
                                <Form.Label className="mx-1 mt-2" style={{ color: employees.RefreshTokenExpiryTime === '' ? 'red' : 'black' }}>Refresh token expiry time</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={employees.RefreshTokenExpiryTime}
                                    onChange={e => employees.setRefreshTokenExpiryTime(e.target.value)}
                                />
                            </> : null

                    }

                    <Form.Check
                        type="switch"
                        className="mt-2"
                        checked={employees.IsLocked}
                        id="checkbox"
                        onChange={e => {
                            employees.setIsLocked(e.target.checked)
                        }}
                        label="Block user?"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {!status ? <Button variant="outline-success" onClick={() => {
                    if (employees.Name === '' || employees.Email === '' || employees.Password === '' || employees.RoleId === '' || !IsEmail(employees.Email)) {
                        employees.setEmail('');
                        return;
                    }
                    employees.setOper('u');
                    crudBook();
                }}>Update</Button> : null}
                <Button variant={status ? "outline-success" : "outline-danger"} onClick={() => {
                    if (employees.Name === '' || employees.Email === '' || employees.Password === '' || employees.RoleId === '' || !IsEmail(employees.Email)) {
                        employees.setEmail('');
                        return;
                    }
                    employees.setOper(status ? 'c' : 'd');
                    crudBook();
                }}>{status ? "Add" : "Delete"}</Button>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateEmployees;