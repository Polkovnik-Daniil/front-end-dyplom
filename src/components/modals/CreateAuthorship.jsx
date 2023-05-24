import React, { useContext, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createAuthorship, updateAuthorship, deleteAuthorship, fetchAuthorship, fetchAuthorItem, fetchBookItem } from "../../http/authorshipAPI";

import { observer } from "mobx-react-lite";
import { Context } from "../../index";


const CreateAuthorship = observer(({ show, onHide }) => {
    const { authorship, user } = useContext(Context);
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
            default:
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
                    <Form.Label className="mx-1 mt-2" >Book Id</Form.Label>
                    <Form.Control
                        type="number"
                        min={0 }
                        value={authorship.BookId}
                        onChange={async (e) => {
                            if (e.target.value !== '-' && e.target.value !== '') {
                                e.target.value = e.target.value.replace('-', '');
                                authorship.setBookId(e.target.value);
                            }
                            var data = await fetchBookItem(authorship.BookId).catch((error) => {
                                authorship.setBookTitle('');
                                return;
                            });
                            authorship.setBookTitle(data.title);
                        }}
                        placeholder={"Enter book Id"}
                        disabled={!status}
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: authorship.BookTitle === '' ? 'red' : 'black' }}>Book Title</Form.Label>
                    <Form.Control
                        min={ 0 }
                        value={authorship.BookTitle}
                        onChange={e => authorship.setBookTitle(e.target.value)}
                        placeholder={"Title"}
                        disabled
                    />
                    <Form.Label className="mx-1 mt-2">Author Id</Form.Label>
                    <Form.Control
                        type="number"
                        min={ 0 }
                        value={authorship.AuthorId}
                        onChange={async (e) => {
                            if (e.target.value !== '-' && e.target.value !== '') {
                                e.target.value = e.target.value.replace('-', '');
                                authorship.setAuthorId(e.target.value);
                            }
                            var data = await fetchAuthorItem(authorship.AuthorId).catch((error) => {
                                authorship.setAuthorName('');
                                return;
                            });
                            authorship.setAuthorName(data.name);
                        }}
                        placeholder={"Enter author Id"}
                        disabled={!status}

                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: authorship.AuthorName === '' ? 'red' : 'black' }}>Author name</Form.Label>
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
                    if (authorship.BookTitle === '' || authorship.AuthorName === '') {
                        return;
                    }
                    authorship.setOper(status ? 'c' : 'd');
                    crudBook();
                }}>{status ? "Add" : "Delete"}</Button>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateAuthorship;