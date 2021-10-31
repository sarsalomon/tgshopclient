import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, FloatingLabel, InputGroup, FormControl } from 'react-bootstrap';
import { Context } from '../..';
import { createProduct, fetchCategories, fetchSubCategories, fetchUsers } from '../../http/productApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = observer(() => {
    const {product} = useContext(Context)
    const [titleUz,setTitleUz] = useState('')
    const [titleRu,setTitleRu] = useState('')
    const [price,setPrice] = useState('')
    const [file,setFile] = useState('')
    const [categoryId,setCategory] = useState('')
    const [subcategoryId,setSubCategory] = useState('')
    const [userId,setUserId] = useState('')
    const [subcategories,setSubCategories] = useState([])
    const [users,setUsers] = useState([])
    const [сurrency,setСurrency] = useState('')
    const [item,setItem] = useState('')
    const [productorservice,setProductOrService] = useState('')
    const [descriptionUz,setDescriptionUz] = useState('')
    const [descriptionRu,setDescriptionRu] = useState('')
  
    useEffect(() => {
        fetchCategories().then(data => product.setCategories(data))
        fetchSubCategories(categoryId).then(data => setSubCategories(data))
        fetchUsers(categoryId,subcategoryId).then(data => setUsers(data))
    }, [categoryId,subcategoryId])

    console.log(userId)
    
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
            formData.append('сurrency', сurrency)
            formData.append('item', item)
            formData.append('productorservice', productorservice)
            formData.append('categoryId', categoryId)
            formData.append('subcategoryId', subcategoryId)
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
            <h2>Add Product</h2>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Select
                            onChange={(e) => {const seletcedCategory = e.target.value
                                setCategory(seletcedCategory);
                            }}
                        >  
                         <option value={''}>Category</option>
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
                            onChange={(e) => {const seletcedSubCategory = e.target.value
                                setSubCategory(seletcedSubCategory);
                            }}
                        >
                         <option value={''}>Sub</option>
                            {subcategories.map(category =>
                                <option 
                                    value={category._id}
                                >
                                   {category.titleUz} - {category.titleRu}
                                </option>
                            )}
                        </Form.Select>
                    </Col>
                </Row>   
                <Row className="mb-4">
                    <Col>
                        <Form.Select
                            onChange={(e) => {const seletcedUser = e.target.value
                                setUserId(seletcedUser);
                            }}
                        >
                         <option value={''}>User</option>
                            {users.map(user =>
                                <option 
                                    value={user._id}
                                >
                                   {user.fish}
                                </option>
                            )}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select
                                onChange={(e) => {const seletcedProductOrService = e.target.value
                                    setProductOrService(seletcedProductOrService);
                                }}
                            >  
                            <option value={''}>Nima bu</option>
                            <option value={'1'}>Xizmat</option>
                            <option value={'2'}>Mahsulot</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="title UZ"
                            className="mb-3"
                        >
                            <Form.Control type="text" value={titleUz} onChange={e=>setTitleUz(e.target.value)} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="title RU"
                            className="mb-3"
                        >
                            <Form.Control type="text" value={titleRu} onChange={e=>setTitleRu(e.target.value)} />
                        </FloatingLabel>
                    </Col>
                </Row>   
                <Row>
                    <Col md={3}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Img</Form.Label>
                            <Form.Control type="file" onChange={selectFile}/>
                        </Form.Group> 
                    </Col>
                    <Col md={9}>
                    <Form.Label>Price</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl type="text" value={price} onChange={e=>setPrice(e.target.value)} />
                            <Form.Select 
                                onChange={(e) => {const seletcedСurrency = e.target.value
                                    setСurrency(seletcedСurrency);
                                }}
                            >
                                <option value={''}>Valyuta</option>
                                <option value={'1'}>Som</option>
                                <option value={'2'}>$</option>
                            </Form.Select>
                            <Form.Select
                                onChange={(e) => {const seletcedItem = e.target.value
                                    setItem(seletcedItem);
                                }}
                            >
                                <option value={''}>nechta</option>
                                <option value={'1'}>dona</option>
                                <option value={'2'}>kg</option>
                            </Form.Select>

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
                        <Button variant="success" onClick={addDevice} className="mt-3 float-right d-flex">
                            Qoshish
                        </Button>  
                    </Col>
                </Row>
            </Form>
            <ToastContainer />
        </Container>
    );
});

export default AddProduct;