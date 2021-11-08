import { observer } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import { fetchCategories, getSubCategory, updateSubCategory } from '../../http/categoryApi';
import { Container, Form, FloatingLabel, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateSubCategory = observer(() => {
    const [category, setCategory] = useState({info: []})
    const [categories,setCategories] = useState([])
    const [titleUz, setTitleUz] = useState('')
    const [titleRu, setTitleRu] = useState('')
    const [categoryId,setCategoryId] = useState('')

    const {id} = useParams()

    useEffect(() => {
        getSubCategory(id).then(data => {
            setTitleUz(data.titleUz)
            setTitleRu(data.titleRu)
            setCategoryId(data.categoryId)
        })
        getSubCategory(id).then(data => setCategory(data))
        fetchCategories().then(data => setCategories(data))
    }, [id])


    const updateSC = () => {
        updateSubCategory(id,titleUz,titleRu,categoryId).then(data => {
            setTitleUz(titleUz)
            setTitleRu(titleRu)
            setCategoryId(categoryId)
        })
        toast.info(`${categoryId}: ${titleUz} - ${titleRu} ga yangilandi`, {
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
                    <Row className="my-4">
                        <Col>
                            <Form.Select aria-label="Default select example" 
                                onChange={(e) => {const seletcedCategory = e.target.value
                                    setCategoryId(seletcedCategory);
                                }}
                                >  
                                <option value={''}>Category</option>
                                    {categories.map(category =>
                                        <option 
                                            value={category._id}
                                        >
                                            {category.titleUz} - {category.titleRu}
                                        </option>
                                )}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Category RU"
                                className="mb-3"
                            >
                                <Form.Control value={titleUz} onChange={e => setTitleUz(e.target.value)}/>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Category RU"
                                className="mb-3"
                            >
                                <Form.Control value={titleRu} onChange={e => setTitleRu(e.target.value)}/>
                            </FloatingLabel>
                        </Col>
                    </Row>   
                    <Button variant="success" onClick={updateSC}>
                        Yangilash
                    </Button>     
                </Form>
                <ToastContainer />
            </Container>
    );
});

export default UpdateSubCategory;