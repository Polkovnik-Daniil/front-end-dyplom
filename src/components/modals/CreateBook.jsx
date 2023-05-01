import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form, Row, Col } from "react-bootstrap";
import { createBook, updateBook, deleteBook, fetchBooks } from "../../http/bookAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";


const CreateBook = observer(({ show, onHide }) => {
    const { books } = useContext(Context);
    const [genre, setGenre] = useState(books.Data.length !== 0 ? books.Data[books.Index].genres : []);
    const addGenre = () => {
        setGenre([...genre, { name: '', number: Date.now() }]);
    }
    const removeGenre = (number) => {
        setGenre(genre.filter(i => i.number !== number))
    }
    const changeGenre = (key, value, number) => {
        setGenre(genre.map(i => i.number === number ? { ...i, [key]: value } : i))
    }
    var status = books.Id === '';
    const crudBook = async () => {
        var oper = books.Oper;
        switch (oper) {
            case 'u':
                updateBook(Number(books.Id), books.Title, books.Realise, Number(books.Quantity), genre);
                break;
            case 'c':
                createBook(books.Title, books.Realise, Number(books.Quantity), genre);
                break;
            case 'd':
                deleteBook(Number(books.Id));
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
                            <Row className="mt-4" key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.name}
                                        placeholder=""
                                        onChange={(e) => changeGenre('name', e.target.value, i.number)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button
                                        onClick={() => removeGenre(i.number)}
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