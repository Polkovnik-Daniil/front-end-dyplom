import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form, Row, Col } from "react-bootstrap";
import { createBook, updateBook, deleteBook, fetchBooks } from "../../http/bookAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";


const CreateBook = observer(({ show, onHide }) => {
    const { books, user } = useContext(Context);
    const [genre, setGenre] = useState(!books.New ? books.Data[books.Index].genres : []); //books.Data.length !== 0 
    const addGenre = () => {
        setGenre([...genre, { name: '', id: new Date().getTime() % 10000 + 15 }]);
    }
    const removeGenre = (id) => {
        setGenre(genre.filter(i => i.id !== id))
    }
    const changeGenre = (key, value, id) => {
        setGenre(genre.map(i => i.id === id ? { ...i, [key]: value } : i))
    }
    const [author, setAuthor] = useState(!books.New ? books.Data[books.Index].authors : []); //books.Data.length !== 0 
    const addAuthor = () => {
        setAuthor([...author, { name: '', id: new Date().getTime() % 10000 + 15 }]);
    }
    const removeAuthor = (id) => {
        setAuthor(author.filter(i => i.id !== id))
    }
    const changeAuthor = (key, value, id) => {
        setAuthor(author.map(i => i.id === id ? { ...i, [key]: value } : i))
    }

    var count = author.length > genre.length ? author.length : genre.length;

    var status = books.Id === '';
    const crudBook = async () => {
        var oper = books.Oper;
        switch (oper) {
            case 'u':
                await updateBook(Number(books.Id), books.Title, books.Realise, Number(books.Quantity), Number(books.Count), genre, author);
                break;
            case 'c':
                await createBook(books.Title, books.Realise, Number(books.Quantity), Number(books.Count), genre, author);
                break;
            case 'd':
                await deleteBook(Number(books.Id));
                break;
            default:
                alert("Execption!");
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
                        min={ 0 }
                        value={books.Quantity}
                        onChange={e => {
                            if (e.target.value !== '-' && e.target.value !== '') {
                                e.target.value = e.target.value.replace('-', '');
                                books.setQuantity(e.target.value);
                            }
                        }}
                        placeholder={"Quantity"}
                    />
                    <Form.Label className="mx-1 mt-2">Count</Form.Label>
                    <Form.Control
                        type="number"
                        min={ 0 }
                        value={ books.Count }
                        onChange={e => {
                            if (e.target.value !== '-' && e.target.value !== '') {
                                e.target.value = e.target.value.replace('-', '');
                                books.setCount(e.target.value);
                            }
                        }}
                        placeholder={"Count"}
                    />
                    <Form.Label className="mx-1 mt-2">Realise</Form.Label>
                    <Form.Control
                        type="date"
                        value={books.Realise ? books.Realise : books.setRealise(new Date().toISOString().split('T')[0])}
                        onChange={e => books.setRealise(e.target.value)}
                    />

                    <hr />
                    <Form.Label className="mx-1 mt-2 fs-3">Genres</Form.Label>
                    {
                        genre.map(i =>
                            <Row className="mt-4" key={i.id}>
                                <Col md={6}>
                                    <Form.Control
                                        value={i.name}
                                        placeholder=""
                                        onChange={(e) => changeGenre('name', e.target.value, i.id)}
                                    />
                                </Col>
                                {
                                    user.Role !== 'User' ?
                                        <Col md={6}>
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
                                        </Col> : null
                                }
                            </Row>
                        )
                    }
                    {
                        user.Role !== 'User' && genre.length === 0 ? <br /> : null
                    }
                    {
                        user.Role !== 'User' ?
                            <>
                                <Button variant="outline-success mt-4" onClick={addGenre}>Add genre</Button>
                            </> : null
                    }
                    <hr />
                    <Form.Label className="mx-1 mt-2 fs-3">Authors</Form.Label>
                    {
                        author.map(i =>
                            <Row className="mt-4" key={i.id}>
                                <Col md={6}>
                                    <Form.Control
                                        value={i.name}
                                        placeholder=""
                                        onChange={(e) => changeAuthor('name', e.target.value, i.id)}
                                    />
                                </Col>
                                {
                                    user.Role !== 'User' ?
                                        <Col md={6}>
                                            <Button
                                                key={i.id}
                                                onClick={() => {
                                                    console.log(i.id);
                                                    removeAuthor(i.id)
                                                }}
                                                variant={"outline-danger"}
                                            >
                                                Delete
                                            </Button>
                                        </Col> : null
                                }
                            </Row>
                        )
                    }
                    {
                        user.Role !== 'User' && author.length === 0 ? <br/> : null
                    }
                    {
                        user.Role !== 'User' ?
                            <>
                                <Button variant="outline-success mt-4" onClick={addAuthor}>Add author</Button>
                            </> : null
                    }
                </Form>
            </Modal.Body>
            {
                user.Role !== 'User' ?
                    <Modal.Footer>
                        {
                            !status ? <Button variant="outline-success" onClick={() => {
                                books.setOper('u');
                                crudBook();
                            }}>Update</Button> : null
                        }
                        <Button variant={ status ? "outline-success" : "outline-danger" } onClick={() => {
                            books.setOper(status ? 'c' : 'd');
                            crudBook();
                        }}>{status ? "Add" : "Delete"}</Button>
                        <Button variant="outline-danger" onClick={ onHide }>Close</Button>
                    </Modal.Footer> : null
            }
        </Modal>
    );
});

export default CreateBook;