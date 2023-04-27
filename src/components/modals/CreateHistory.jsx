import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createHistory, updateHistory, deleteHistory, fetchHistory } from "../../http/historyAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";


const CreateHistory = observer(({ show, onHide }) => {
    const { history } = useContext(Context);
    var status = history.BookId === '';

    const crudBook = async () => {
        var oper = history.Oper;
        switch (oper) {
            case 'u':
                updateHistory(Number(history.Id), history.Name);
                break;
            case 'c':
                createHistory(history.Name);
                break;
            case 'd':
                deleteHistory(Number(history.Id));
                break;
        }
        onHide();
        history.setData(await fetchHistory(0));
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
                    {status ? "Add new history" : "History"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label className="mx-1 mt-2">Book Id</Form.Label>
                    <Form.Control
                        value={history.BookId}
                        onChange={e => history.setBookId(e.target.value)}
                        placeholder={"Enter book Id"}
                        disabled
                    />
                    <Form.Label className="mx-1 mt-2">Book Title</Form.Label>
                    <Form.Control
                        value={history.BookTitle}
                        onChange={e => history.setBookTitle(e.target.value)}
                        placeholder={"Title"}
                        disabled
                    />
                    <Form.Label className="mx-1 mt-2">Reader Id</Form.Label>
                    <Form.Control
                        value={history.ReaderId}
                        onChange={e => history.setReaderId(e.target.value)}
                        placeholder={"Enter reader Id"}
                    />
                    <Form.Label className="mx-1 mt-2">Reader name</Form.Label>
                    <Form.Control
                        value={history.ReaderName}
                        onChange={e => history.setReaderName(e.target.value)}
                        placeholder={"Enter reader name"}
                    />
                    <Form.Label className="mx-1 mt-2">Reader surname</Form.Label>
                    <Form.Control
                        value={history.ReaderSurname}
                        onChange={e => history.setReaderSurname(e.target.value)}
                        placeholder={"Enter reader surname"}
                    />
                    <Form.Label className="mx-1 mt-2">Reader patronymic</Form.Label>
                    <Form.Control
                        value={history.ReaderPatronymic}
                        onChange={e => history.setReaderPatronymic(e.target.value)}
                        placeholder={"Enter reader patronymic"}
                    />
                    <Form.Label className="mx-1 mt-2">Issue date of the book</Form.Label>
                    <Form.Control
                        type="date"
                        value={history.DateTimeStart}
                        onChange={e => history.setDateTimeStart(e.target.value)}
                    />
                    <Form.Label className="mx-1 mt-2">Due date of the book</Form.Label>
                    <Form.Control
                        type="date"
                        value={history.DateTimeEnd}
                        onChange={e => history.setDateTimeEnd(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {!status ? <Button variant="outline-success" onClick={() => {
                    history.setOper('u');
                    crudBook();
                }}>Update</Button> : null}
                <Button variant={status ? "outline-success" : "outline-danger"} onClick={() => {
                    history.setOper(status ? 'c' : 'd');
                    crudBook();
                }}>{status ? "Add" : "Delete"}</Button>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateHistory;