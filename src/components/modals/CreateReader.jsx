import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createReader, updateReader, deleteReader, fetchReader } from "../../http/readerAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";


const CreateReader = observer(({ show, onHide }) => {
    const { readers, user } = useContext(Context);
    const [isCorrPhone, setCorrPhone] = useState(true);
    var status = readers.Id === '';
    const crudBook = async () => {
        var oper = readers.Oper;
        switch (oper) {
            case 'u':
                updateReader(Number(readers.Id), readers.Name, readers.Surname, readers.Patronymic, readers.PlaceOfResidence, readers.PhoneNumber);
                break;
            case 'c':
                createReader(readers.Name, readers.Surname, readers.Patronymic, readers.PlaceOfResidence, readers.PhoneNumber);
                break;
            case 'd':
                deleteReader(Number(readers.Id));
                break;
            default:
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
                    {status ? "Add new reader" : "Reader"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label className="mx-1 mt-2">Id</Form.Label>
                    <Form.Control
                        value={readers.Id}
                        onChange={e => readers.setId(e.target.value)}
                        placeholder={"Id"}
                        disabled
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: readers.Name === '' ? 'red' : 'black' }}>Name</Form.Label>
                    <Form.Control
                        value={readers.Name}
                        onChange={e => readers.setName(e.target.value)}
                        placeholder={"Enter name"}
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: readers.Surname === '' ? 'red' : 'black' }}>Surname</Form.Label>
                    <Form.Control
                        value={readers.Surname}
                        onChange={e => readers.setSurname(e.target.value)}
                        placeholder={"Enter surname"}
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: readers.Patronymic === '' ? 'red' : 'black' }}>Patronymic</Form.Label>
                    <Form.Control
                        value={readers.Patronymic}
                        onChange={e => readers.setPatronymic(e.target.value)}
                        placeholder={"Enter patronymic"}
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: readers.PlaceOfResidence === '' ? 'red' : 'black' }}>Place of residence</Form.Label>
                    <Form.Control
                        value={readers.PlaceOfResidence}
                        onChange={e => readers.setPlaceOfResidence(e.target.value)}
                        placeholder={"Enter place of residence"}
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: readers.PhoneNumber === '' || !isCorrPhone || readers.PhoneNumber.length !== 11 ? 'red' : 'black' }}>Phone number</Form.Label>
                    <Form.Control
                        value={readers.PhoneNumber}
                        maxlength={ 15 }
                        minlength={ 0 }
                        onChange={e => {
                            if (e.target.value !== '-' && e.target.value !== '') {
                                e.target.value = e.target.value.replace('-', '');
                                readers.setPhoneNumber(e.target.value);
                            }
                            setCorrPhone(true);
                        }}
                        placeholder={"Enter phone number"}
                    />
                </Form>
            </Modal.Body>
            {user.Role !== 'User' ?
                <Modal.Footer>
                    {
                        !status ? <Button variant="outline-success" onClick={() => {
                            if (!readers.Id || !readers.Name || !readers.Surname || !readers.Patronymic || !readers.PlaceOfResidence || !readers.PhoneNumber) {
                                return;
                            }
                            const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
                            if (readers.PhoneNumber.match(/\d/g).length >= 11 && readers.PhoneNumber.match(/\d/g).length <= 15) {
                                setCorrPhone(false);
                                return;
                            }
                            readers.setOper('u');
                            crudBook();
                        }}>Update</Button> : null}
                    <Button variant={status ? "outline-success" : "outline-danger"} onClick={() => {
                        if (!readers.Name || !readers.Surname || !readers.Patronymic || !readers.PlaceOfResidence || !readers.PhoneNumber) {
                            return;
                        }
                        if (readers.PhoneNumber.match(/\d/g).length <= 11 && readers.PhoneNumber.match(/\d/g).length >= 15) {
                            setCorrPhone(false);
                            return;
                        }
                        readers.setOper(status ? 'c' : 'd');
                        crudBook();
                    }}>{status ? "Add" : "Delete"}</Button>
                    <Button variant="outline-danger" onClick={onHide}>Close</Button>
                </Modal.Footer> : null
            }
        </Modal>
    );
});

export default CreateReader;