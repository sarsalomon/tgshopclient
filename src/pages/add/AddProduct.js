import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl } from 'react-bootstrap';
import { Context } from '../..';
import { createProduct, fetchCategories, fetchUsers } from '../../http/productApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = observer(() => {
    const {product} = useContext(Context)
    const [titleUz,setTitleUz] = useState('')
    const [titleRu,setTitleRu] = useState('')
    const [price,setPrice] = useState('')
    const [file,setFile] = useState('')
    const [categoryId,setCategory] = useState('')
    const [userId,setUserId] = useState('')
    const [users,setUsers] = useState([])
    const [descriptionUz,setDescriptionUz] = useState('')
    const [descriptionRu,setDescriptionRu] = useState('')
  
    useEffect(() => {
        fetchCategories().then(data => product.setCategories(data))
        fetchUsers(categoryId).then(data => setUsers(data))
    }, [categoryId])


    
    const selectFile = e => { 
        setFile(e.target.files[0])
    }

    const addDevice = async () => {
        try { 
            let data;
            const formData = new FormData()
            formData.append('titleUz', titleUz)
            formData.append('titleRu', titleRu)
            formData.append('userId', userId)
            formData.append('price', price)
            formData.append('img', file)
            formData.append('categoryId', categoryId)
            formData.append('descriptionUz', descriptionUz)
            formData.append('descriptionRu', descriptionRu)
            data = await createProduct(formData)
            setTitleUz('')
            setTitleRu('')
            setPrice('')
            setDescriptionUz('')
            setDescriptionRu('')
            toast.success(`${titleUz} - ${titleRu} Qo'shildi`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }catch(e) {
            toast.error(e.response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <Container>
            <h2>Mahsulot qo`shish</h2>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Select
                            onChange={(e) => {const seletcedCategory = e.target.value
                                setCategory(seletcedCategory);
                            }}
                        >  
                         <option value={''}>Toifa</option>
                            {product.categories.map(category =>
                                <option 
                                    value={category._id}
                                >
                                    {category.titleUz} - {category.titleRu}
                                </option>
                            )}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select
                            onChange={(e) => {const seletcedUser = e.target.value
                                setUserId(seletcedUser);
                            }}
                        >
                         <option value={''}>Hodim</option>
                            {users.map(user =>
                                <option 
                                    value={user._id}
                                >
                                   {user.fish}
                                </option>
                            )}
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Mahsulot nomi Uzbek tilida"
                            className="mb-3"
                        >
                            <Form.Control type="text" value={titleUz} onChange={e=>setTitleUz(e.target.value)} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Mahsulot nomi Rus tilida"
                            className="mb-3"
                        >
                            <Form.Control type="text" value={titleRu} onChange={e=>setTitleRu(e.target.value)} />
                        </FloatingLabel>
                    </Col>
                </Row>   
                <Row>
                    <Col md={5}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Rasm</Form.Label>
                            <Form.Control type="file" onChange={selectFile}/>
                        </Form.Group> 
                    </Col>
                    <Col md={7}>
                    <Form.Label>Narhi</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl type="text" value={price} onChange={e=>setPrice(e.target.value)} />
                        </InputGroup>
                    </Col>
                </Row>   
                <Form.Label>Uz</Form.Label>
                <FloatingLabel controlId="floatingTextarea2" label="Mahsulot tarifi Uzbek tilida">
                    <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    value={descriptionUz}
                    onChange={e=>setDescriptionUz(e.target.value)}
                    />
                </FloatingLabel>
                <Form.Label>Ru</Form.Label>
                <FloatingLabel controlId="floatingTextarea2" label="Mahsulot tarifi Rus tilida">
                    <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    value={descriptionRu}
                    onChange={e=>setDescriptionRu(e.target.value)}
                    />
                </FloatingLabel>
                <Row>
                    <Col className="float-right">
                        <Button variant="success" onClick={addDevice} className="mt-3 float-right d-flex">
                            Qo`shish
                        </Button>  
                    </Col>
                </Row>
            </Form>
            <ToastContainer />
        </Container>
    );
});

export default AddProduct;