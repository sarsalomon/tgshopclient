import { observer } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import { getCategory, updateCategory } from '../../http/categoryApi';
import { Container, Form, FloatingLabel, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCategory = observer(() => {
    const [category, setCategory] = useState({info: []})
    const [titleUz, setTitleUz] = useState('')
    const [titleRu, setTitleRu] = useState('')
    const {id} = useParams()

    useEffect(() => {
        getCategory(id).then(data => {
            setTitleUz(data.titleUz)
            setTitleRu(data.titleRu)
        })
        getCategory(id).then(data => setCategory(data))
    }, [])
    const updateC = () => {
        updateCategory(id,titleUz,titleRu).then(data => {
            setTitleUz(titleUz)
            setTitleRu(titleRu)
        })
        toast.info(`${titleUz} ga yangilandi`, {
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
                <h2>Update Category</h2>
                <Form>
                    <Row>
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Category RU"
                                className="mb-3"
                            >
                                <Form.Control placeholder="name@example.com" value={titleUz} onChange={e => setTitleUz(e.target.value)}/>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Category RU"
                                className="mb-3"
                            >
                                <Form.Control placeholder="name@example.com" value={titleRu} onChange={e => setTitleRu(e.target.value)}/>
                            </FloatingLabel>
                        </Col>
                    </Row>   
                    <Button variant="success" onClick={updateC}>
                        Yangilandi
                    </Button>     
                </Form>
                <ToastContainer />
            </Container>
    );
});

export default UpdateCategory;