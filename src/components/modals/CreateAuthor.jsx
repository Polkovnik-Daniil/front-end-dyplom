import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createAuthor, updateAuthor, deleteAuthor, fetchAuthor } from "../../http/authorAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";


const CreateAuthor = observer(({ show, onHide }) => {
    const { author } = useContext(Context);
    var status = author.Id === '';

    const crudBook = async () => {
        var oper = author.Oper;
        switch (oper) {
            case 'u':
                updateAuthor(Number(author.Id), author.Name);
                break;
            case 'c':
                createAuthor(author.Name);
                break;
            case 'd':
                deleteAuthor(Number(author.Id));
                break;
        }
        onHide();
        author.setData(await fetchAuthor(0));
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
                    Add new author
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={author.Id}
                        onChange={e => author.setId(e.target.value)}
                        placeholder={"Id"}
                        disabled
                    />
                    <Form.Control
                        value={author.Name}
                        className="mt-2"
                        onChange={e => author.setName(e.target.value)}
                        placeholder={"Name"}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                {!status ? <Button variant="outline-success" onClick={() => {
                    author.setOper('u');
                    crudBook();
                }}>Update</Button> : null}
                <Button variant={status ? "outline-success" : "outline-danger"} onClick={() => {
                    author.setOper(status ? 'c' : 'd');
                    crudBook();
                }}>{status ? "Add" : "Delete"}</Button>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateAuthor;