import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Dropdown, FloatingLabel, InputGroup, DropdownButton, FormControl } from 'react-bootstrap';
import { Context } from '../..';
import { createService, fetchCategories } from '../../http/serviceApi';

const AddService = observer(() => {
    const {service} = useContext(Context)
    const [titleUz,setTitleUz] = useState('')
    const [titleRu,setTitleRu] = useState('')
    const [price,setPrice] = useState('')
    const [file,setFile] = useState('')
    const [categoryId,setCategory] = useState('')
    const [subcategoryId,setSubCategory] = useState('')
    const [descriptionUz,setDescriptionUz] = useState('')
    const [descriptionRu,setDescriptionRu] = useState('')

    useEffect(() => {
        fetchCategories().then(data => service.setCategories(data))
    }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addService = async () => {
        try { 
            let data;
            const formData = new FormData()
            formData.append('titleUz', titleUz)
            formData.append('titleRu', titleRu)
            formData.append('price', `${price}`)
            formData.append('img', file)
            formData.append('categoryId', categoryId)
            formData.append('subcategoryId', subcategoryId)
            formData.append('descriptionUz', descriptionUz)
            formData.append('descriptionRu', descriptionRu)
            data = await createService(formData)
        }catch(e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container>
            <h2>Add Service</h2>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Select aria-label="Default select example" 
                            onChange={(e) => {const seletcedCategory = e.target.value
                                setCategory(seletcedCategory);
                            }}
                        >  
                         <option value={''}>Category</option>
                            {service.categories.map(category =>
                                <option 
                                    value={category._id}
                                >
                                    {category._id}
                                </option>
                            )}
                        </Form.Select>
                    </Col>
                    <Col>
                    <Form.Select aria-label="Default select example" 
                            onChange={(e) => {const seletcedSubCategory = e.target.value
                                setSubCategory(seletcedSubCategory);
                            }}
                        >
                         <option value={''}>Sub</option>
                            {service.categories.map(category =>
                                <option 
                                    value={category._id}
                                >
                                    {category.titleRu}
                                </option>
                            )}
                        </Form.Select>
                    </Col>
                </Row>   
                <Row>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="title UZ"
                            className="mb-3"
                            value={titleUz}
                            onChange={e=>setTitleUz(e.target.value)}>
                            <Form.Control type="text" placeholder="name@example.com" />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="title RU"
                            className="mb-3"
                            value={titleRu}
                            onChange={e=>setTitleRu(e.target.value)}>
                            <Form.Control type="text" placeholder="name@example.com" />
                        </FloatingLabel>
                    </Col>
                </Row>   
                <Row>
                    <Col>
                        <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Img</Form.Label>
                                <Form.Control type="file"  onChange={selectFile}/>
                        </Form.Group> 
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number"                    
                            value={price}
                            onChange={e=>setPrice(e.target.value)}/>
                        </Form.Group>
                    </Col>    
                    <Col>
                    <Form.Label>Price</Form.Label>
                        <InputGroup className="mb-3">
                            
                            <FormControl aria-label="Text input with dropdown button" />
                            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </DropdownButton>
                        </InputGroup>
                    </Col>
                </Row>   
                <Form.Label>Uz</Form.Label>
                <FloatingLabel controlId="floatingTextarea2" label="Comments">
                    <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    value={descriptionUz}
                    onChange={e=>setDescriptionUz(e.target.value)}
                    />
                </FloatingLabel>
                <Form.Label>Ru</Form.Label>
                <FloatingLabel controlId="floatingTextarea2" label="Comments">
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
                        <Button variant="success" onClick={addService} className="mt-3  float-right d-flex">
                                Add
                        </Button>  
                    </Col>
                </Row>
            </Form>
        </Container>
    );
});

export default AddService;