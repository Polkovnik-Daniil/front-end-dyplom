import React, { useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createReader, updateReader, deleteReader, fetchReader } from "../../http/readerAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";


const CreateReader = observer(({ show, onHide }) => {
    const { readers } = useContext(Context);
    var status = readers.Id === '';
    readers.setSurname('a');
    const crudBook = async () => {
        var oper = readers.Oper;
        switch (oper) {
            case 'u':
                updateReader(Number(readers.Id), readers.Name, readers.Surname, readers.Patronymic, readers.PhoneNumber);
                break;
            case 'c':
                createReader(readers.Name, readers.Surname, readers.Patronymic, readers.PhoneNumber);
                break;
            case 'd':
                deleteReader(Number(readers.Id));
                break;
        }
        onHide();
        readers.setData(await fetchReader(0));
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
                    Add new reader
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={readers.Id}
                        onChange={e => readers.setId(e.target.value)}
                        placeholder={"Id"}
                        disabled
                    />
                    <Form.Control
                        value={readers.Name}
                        className="mt-2"
                        onChange={e => readers.setName(e.target.value)}
                        placeholder={"Enter name"}
                    />
                    <Form.Control
                        value={readers.Surname}
                        className="mt-2"
                        onChange={e => readers.setSurname(e.target.value)}
                        placeholder={"Enter surname"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {!status ? <Button variant="outline-success" onClick={() => {
                    readers.setOper('u');
                    crudBook();
                }}>Update</Button> : null}
                <Button variant={status ? "outline-success" : "outline-danger"} onClick={() => {
                    readers.setOper(status ? 'c' : 'd');
                    crudBook();
                }}>{status ? "Add" : "Delete"}</Button>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateReader;