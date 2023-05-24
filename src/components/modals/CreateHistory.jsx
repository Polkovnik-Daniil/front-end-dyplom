import React, { useContext, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createHistory, updateHistory, deleteHistory, fetchHistory } from "../../http/historyAPI";
import { fetchReaderItem } from "../../http/readerAPI";
import { fetchBookItem } from "../../http/bookAPI";

import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import Books from '../../pages/Books';


const CreateHistory = observer(({ show, onHide }) => {
    const { history } = useContext(Context);
    var status = history.New;
    const crudBook = async () => {
        var oper = history.Oper;
        switch (oper) {
            case 'u':
                updateHistory(Number(history.ReaderId), Number(history.BookId), history.DateTimeStart, history.DateTimeEnd);
                break;
            case 'c':
                createHistory(Number(history.ReaderId), Number(history.BookId), history.DateTimeStart, history.DateTimeEnd);
                break;
            case 'd':
                deleteHistory(Number(history.ReaderId), Number(history.BookId), history.DateTimeStart, history.DateTimeEnd);
                break;
            default:
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
                        type="number"
                        min={0}
                        value={history.BookId}
                        onChange={async (e) => {
                            if (e.target.value !== '-' && e.target.value !== '') {
                                e.target.value = e.target.value.replace('-', '');
                                history.setBookId(e.target.value);
                            }
                            var data = await fetchBookItem(history.BookId).catch((error) => {
                                if (error.response.status === 400) {
                                    history.setBookTitle('');
                                    return;
                                };
                            });
                            history.setBookTitle(data.title);
                        }}
                        placeholder={"Enter book Id"}
                        disabled={!status}
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: history.BookTitle === '' ? 'red' : 'black' }}>Book Title</Form.Label>
                    <Form.Control
                        value={history.BookTitle}
                        onChange={e => history.setBookTitle(e.target.value)}
                        placeholder={"Title"}
                        disabled
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: history.ReaderId === '' ? 'red' : 'black' }}>Reader Id</Form.Label>
                    <Form.Control
                        type="number"
                        min={ 0 }
                        value={history.ReaderId}
                        onChange={async (e) => {
                            if (e.target.value !== '-' && e.target.value !== '') {
                                e.target.value = e.target.value.replace('-', '');
                                history.setReaderId(e.target.value);
                            }
                            var data = await fetchReaderItem(history.ReaderId).catch((error) => {
                                if (error.response.status === 400) {
                                    history.setReaderId(e.target.value);
                                    history.setReaderName('');
                                    history.setReaderSurname('');
                                    history.setReaderPatronymic('');
                                    history.setDateTimeStart(history.setDateTimeStart(new Date().toISOString().split('T')[0]));
                                    history.setDateTimeEnd(new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]);
                                    return;
                                }
                            });
                            history.setReaderName(data.name);
                            history.setReaderSurname(data.surname);
                            history.setReaderPatronymic(data.patronymic);
                            history.setDateTimeStart(data.dateTimeStart);
                            history.setDateTimeEnd(data.dateTimeEnd);
                        }}
                        placeholder={"Enter reader Id"}
                        disabled={!status}

                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: history.ReaderName === '' ? 'red' : 'black' }}>Reader name</Form.Label>
                    <Form.Control
                        value={ history.ReaderName }
                        onChange={e => history.setReaderName(e.target.value)}
                        placeholder={"Enter reader name"}
                        disabled
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: history.ReaderSurname === '' ? 'red' : 'black' }}>Reader surname</Form.Label>
                    <Form.Control
                        value={ history.ReaderSurname }
                        onChange={e => history.setReaderSurname(e.target.value)}
                        placeholder={"Enter reader surname"}
                        disabled
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: history.ReaderPatronymic === '' ? 'red' : 'black' }}>Reader patronymic</Form.Label>
                    <Form.Control
                        value={ history.ReaderPatronymic }
                        onChange={e => history.setReaderPatronymic(e.target.value)}
                        placeholder={"Enter reader patronymic"}
                        disabled
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: history.DateTimeStart === '' ? 'red' : 'black' }}>Issue date of the book</Form.Label>
                    <Form.Control
                        type="date"
                        value={ history.DateTimeStart ? history.DateTimeStart : history.setDateTimeStart(new Date().toISOString().split('T')[0]) }
                        onChange={e => { history.setDateTimeStart(e.target.value) }}
                    />
                    <Form.Label className="mx-1 mt-2" style={{ color: history.DateTimeEnd === '' ? 'red' : 'black' }}>Due date of the book</Form.Label>
                    <Form.Control
                        type="date"
                        value={history.DateTimeEnd ? history.DateTimeEnd : history.setDateTimeEnd(new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0])}
                        onChange={e => history.setDateTimeEnd(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {!status ? <Button variant="outline-success" onClick={() => {
                    if (history.BookTitle === '' || history.ReaderName === '') {
                        return;
                    }
                    
                    if (new Date(history.DateTimeStart) > new Date(history.DateTimeEnd)) {
                        alert("The date of acceptance of the book cannot be set earlier than the date of delivery of the book!");
                    }
                    history.setOper('u');
                    crudBook();
                }}>Update</Button> : null}
                <Button variant={status ? "outline-success" : "outline-danger"} onClick={() => {
                    if (history.BookTitle === '' || history.ReaderName === '') {
                        return;
                    }
                    if (new Date(history.DateTimeStart) > new Date(history.DateTimeEnd)) {
                        alert("The date of acceptance of the book cannot be set earlier than the date of delivery of the book!");
                        return;
                    }
                    history.setOper(status ? 'c' : 'd');
                    crudBook();
                }}>{status ? "Add" : "Delete"}</Button>
                <Button variant="outline-danger" onClick={ onHide }>Close</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateHistory;