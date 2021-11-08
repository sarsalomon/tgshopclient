import React, { useState } from 'react';
import { Container, Form, FloatingLabel, Row, Col, Button } from 'react-bootstrap';
import { createCategory } from '../../http/categoryApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const [titleUz, setTitleUz] = useState('')
    const [titleRu, setTitleRu] = useState('')
    const addC = () => {
        createCategory(titleUz,titleRu).then(data => {
            setTitleUz('')
            setTitleRu('')
        })
        toast.success(`${titleUz} - ${titleRu}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return (
        <Container>
           <h2>Category</h2>
            <Form>
                <Row>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Category UZ"
                            value={titleUz}
                            onChange={e => setTitleUz(e.target.value)}
                            className="mb-3">
                            <Form.Control  type="text" placeholder="name@example.com" />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Category RU"
                            value={titleRu}
                            onChange={e => setTitleRu(e.target.value)}
                            className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" />
                        </FloatingLabel>
                    </Col>
                </Row>   
                <Button variant="success" onClick={addC} type="reset">
                        Qo`shish
                </Button>     
            </Form>
            <ToastContainer />
        </Container>
    );
};

export default AddCategory;