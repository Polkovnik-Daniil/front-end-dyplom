import React, { useContext, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createAuthorship, updateAuthorship, deleteAuthorship, fetchAuthorship, fetchAuthorItem, fetchBookItem } from "../../http/authorshipAPI";

import { observer } from "mobx-react-lite";
import { Context } from "../../index";


const CreateAuthorship = observer(({ show, onHide }) => {
    const { authorship } = useContext(Context);
    var status = authorship.New;
    const crudBook = async () => {
        var oper = authorship.Oper;
        switch (oper) {
            case 'c':
                createAuthorship(Number(authorship.BookId), Number(authorship.AuthorId));
                break;
            case 'd':
                deleteAuthorship(Number(authorship.AuthorId), Number(authorship.BookId));
                break;
        }
        onHide();
        authorship.setData(await fetchAuthorship(0));
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
                    {status ? "Add new authorship" : "Authorship"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label className="mx-1 mt-2">Book Id</Form.Label>
                    <Form.Control
                        type="number"
                        value={authorship.BookId}
                        onChange={async (e) => {
                            authorship.setBookId(e.target.value);
                            var data = await fetchBookItem(authorship.BookId);
                            authorship.setBookTitle(data.title);
                        }}
                        placeholder={"Enter book Id"}
                        disabled={!status}
                    />
                    <Form.Label className="mx-1 mt-2">Book Title</Form.Label>
                    <Form.Control
                        value={authorship.BookTitle}
                        onChange={e => authorship.setBookTitle(e.target.value)}
                        placeholder={"Title"}
                        disabled
                    />
                    <Form.Label className="mx-1 mt-2">Author Id</Form.Label>
                    <Form.Control
                        type="number"
                        value={authorship.AuthorId}
                        onChange={async (e) => {
                            authorship.setAuthorId(e.target.value)
                            var data = await fetchAuthorItem(authorship.AuthorId);
                            authorship.setAuthorName(data.name);
                        }}
                        placeholder={"Enter author Id"}
                        disabled={!status}

                    />
                    <Form.Label className="mx-1 mt-2">Author name</Form.Label>
                    <Form.Control
                        value={authorship.AuthorName}
                        onChange={e => authorship.setAuthorName(e.target.value)}
                        placeholder={"Enter author name"}
                        disabled
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={status ? "outline-success" : "outline-danger"} onClick={() => {
                    authorship.setOper(status ? 'c' : 'd');
                    crudBook();
                }}>{status ? "Add" : "Delete"}</Button>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateAuthorship;