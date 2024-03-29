import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createGenre, updateGenre, deleteGenre, fetchGenres } from "../../http/genreAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";


const CreateGenre = observer(({ show, onHide }) => {
    const { genres, user } = useContext(Context);
    var status = genres.Id === '';

    const crudBook = async () => {
        var oper = genres.Oper;
        switch (oper) {
            case 'u':
                updateGenre(Number(genres.Id), genres.Name);
                break;
            case 'c':
                createGenre(genres.Name);
                break;
            case 'd':
                deleteGenre(Number(genres.Id));
                break;
            default:
                break;
        }
        onHide();
        genres.setData(await fetchGenres(0));
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
                    {status ? "Add new genre" : "Genre"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label className="mx-1 mt-2">Id</Form.Label>
                    <Form.Control
                        value={genres.Id}
                        onChange={e => genres.setId(e.target.value)}
                        placeholder={"Id"}
                        disabled
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: genres.Name === '' ? 'red' : 'black' }}>Name</Form.Label>
                    <Form.Control
                        value={genres.Name}
                        onChange={e => genres.setName(e.target.value)}
                        placeholder={"Name"}
                    />

                </Form>
            </Modal.Body>
            {user.Role !== 'User' ?
                <Modal.Footer>
                    {!status ? <Button variant="outline-success" onClick={() => {
                        if (genres.Name === '') {
                            return;
                        }
                        genres.setOper('u');
                        crudBook();
                    }}>Update</Button> : null}
                    <Button variant={status ? "outline-success" : "outline-danger"} onClick={() => {
                        if (genres.Name === '') {
                            return;
                        }
                        genres.setOper(status ? 'c' : 'd');
                        crudBook();
                    }}>{status ? "Add" : "Delete"}</Button>
                    <Button variant="outline-danger" onClick={onHide}>Close</Button>
                </Modal.Footer> : null
            }
        </Modal>
    );
});

export default CreateGenre;