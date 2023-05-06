import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form, Row, Col } from "react-bootstrap";
import { createBook, updateBook, deleteBook, fetchBooks } from "../../http/bookAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";


const CreateBook = observer(({ show, onHide }) => {
    const { books } = useContext(Context);
    const [genre, setGenre] = useState(!books.New ? books.Data[books.Index].genres : []); //books.Data.length !== 0 
    const addGenre = () => {
        setGenre([...genre, { name: '', id: parseInt(Date.now(), 8)}]);
    }
    const removeGenre = (id) => {
        setGenre(genre.filter(i => i.id !== id))
    }
    const changeGenre = (key, value, id) => {
        setGenre(genre.map(i => i.id === id ? { ...i, [key]: value } : i))
    }
    var status = books.Id === '';
    const crudBook = async () => {
        var oper = books.Oper;
        switch (oper) {
            case 'u':
                await updateBook(Number(books.Id), books.Title, books.Realise, Number(books.Quantity), Number(books.Count), genre);
                break;
            case 'c':
                await createBook(books.Title, books.Realise, Number(books.Quantity), Number(books.Count), genre);
                break;
            case 'd':
                await deleteBook(Number(books.Id));
                break;
        }
        onHide();
        books.setData(await fetchBooks(0));
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
                    {status ? "Add new book" : "Book"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label className="mx-1 mt-2">Id</Form.Label>
                    <Form.Control
                        value={books.Id}
                        onChange={e => books.setId(e.target.value)}
                        placeholder={"Id"}
                        disabled
                    />
                    <Form.Label className="mx-1 mt-2">Title</Form.Label>
                    <Form.Control
                        value={books.Title}
                        onChange={e => books.setTitle(e.target.value)}
                        placeholder={"Title"}
                    />
                    <Form.Label className="mx-1 mt-2">Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        value={books.Quantity}
                        onChange={e => books.setQuantity(e.target.value)}
                        placeholder={"Quantity"}
                    />
                    <Form.Label className="mx-1 mt-2">Count</Form.Label>
                    <Form.Control
                        type="number"
                        value={books.Count}
                        onChange={e => books.setCount(e.target.value)}
                        placeholder={"Count"}
                    />
                    <Form.Label className="mx-1 mt-2">Realise</Form.Label>
                    <Form.Control
                        type="date"
                        value={books.Realise}
                        onChange={e => books.setRealise(e.target.value)}
                    />
                    <Button variant="outline-success mt-2 " onClick={addGenre}>Add genre</Button>
                    <hr />
                    {
                        genre.map(i =>
                            <Row className="mt-4" key={i.id}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.name}
                                        placeholder=""
                                        onChange={(e) => changeGenre('name', e.target.value, i.id)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button
                                        key={i.id}
                                        onClick={() => {
                                            console.log(i.id);
                                            removeGenre(i.id)
                                        }}
                                        variant={"outline-danger"}
                                    >
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        )
                    }
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