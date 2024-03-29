import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createAuthor, updateAuthor, deleteAuthor, fetchAuthor } from "../../http/authorAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";


const CreateAuthor = observer(({ show, onHide }) => {
    const { author, user } = useContext(Context);
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
            default:
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
                    {status ? "Add new author" : "Author"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label className="mx-1 mt-2">Id</Form.Label>
                    <Form.Control
                        value={author.Id}
                        onChange={e => author.setId(e.target.value)}
                        placeholder={"Id"}
                        disabled
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: author.Name === '' ? 'red' : 'black' }}>Name</Form.Label>
                    <Form.Control
                        value={author.Name}
                        onChange={e => author.setName(e.target.value)}
                        placeholder={"Name"}
                    />

                </Form>
            </Modal.Body>
            {
                user.Role !== 'User' ?
                    <Modal.Footer>
                        {!status ? <Button variant="outline-success" onClick={() => {
                            if (author.Name === '') {
                                return;
                            }
                            author.setOper('u');
                            crudBook();
                        }}>Update</Button> : null}
                        <Button variant={status ? "outline-success" : "outline-danger"} onClick={() => {
                            if (author.Name === '') {
                                return;
                            }
                            author.setOper(status ? 'c' : 'd');
                            crudBook();
                        }}>{status ? "Add" : "Delete"}</Button>
                        <Button variant="outline-danger" onClick={onHide}>Close</Button>
                    </Modal.Footer> : null
            }
        </Modal>
    );
});

export default CreateAuthor;