import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createBook, updateBook, deleteBook } from "../../http/bookAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";


const CreateBook = observer(({ show, onHide }) => {
    const { books } = useContext(Context);
    var status = books.Id === '';

    const crudBook = () => {
        var oper = books.Oper;
        switch (oper) 
        {
            case 'u':
                updateBook(Number(books.Id), books.Title, books.Realise, Number(books.Quantity));
                break;
            case 'c':
                createBook(books.Title, books.Realise, Number(books.Quantity));
                break;
            case 'd':
                deleteBook(books.Id);
                break;
        }
        onHide();
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new book
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={books.Id}
                        onChange={e => books.setId(e.target.value)}
                        placeholder={"Id"}
                        disabled
                    />
                    <Form.Control
                        value={books.Title}
                        className="mt-2"
                        onChange={e => books.setTitle(e.target.value)}
                        placeholder={"Title"}
                    />
                    <Form.Control
                        type="number"
                        className="mt-2"
                        value={books.Quantity}
                        onChange={e => books.setQuantity(e.target.value)}
                        placeholder={"Quantity"}
                    />
                    <Form.Control
                        type="date"
                        className="mt-2"
                        value={books.Realise}
                        onChange={e => books.setRealise(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {!status ? <Button variant="outline-success" onClick={() => {
                    books.setOper('u');
                    crudBook();
                }}>Update</Button> : null}
                <Button variant={status ? "outline-success" : "outline-danger"} onClick={() => {
                    books.setOper(status ? 'c' : 'd'); 
                    crudBook();
                }}>{status ? "Add" : "Delete"}</Button>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateBook;