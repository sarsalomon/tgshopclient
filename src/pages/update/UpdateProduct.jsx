import { observer } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import { Container, Row, Col, Button, Form, Dropdown, FloatingLabel, InputGroup, DropdownButton, FormControl } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProduct, updateProduct, fetchCategories, fetchSubCategories, fetchUsers } from '../../http/productApi';

const UpdateProduct = observer(() => {
    const [сategories, setCategories] = useState([])
    const [titleUz,setTitleUz] = useState('')
    const [titleRu,setTitleRu] = useState('')
    const [price,setPrice] = useState('')
    const [file,setFile] = useState('')
    const [categoryId,setCategory] = useState('')
    const [subcategoryId,setSubCategory] = useState('')
    const [descriptionUz,setDescriptionUz] = useState('')
    const [descriptionRu,setDescriptionRu] = useState('')
    const [subcategories,setSubCategories] = useState([])
    const [userId,setUserId] = useState('')
    const [users,setUsers] = useState([])
    const [сurrency,setСurrency] = useState('')
    const [item,setItem] = useState('')
    const [productorservice,setProductOrService] = useState('')

    const {id} = useParams()
    useEffect(() => {
            getProduct(id).then(data => {
                setTitleUz(data.titleUz)
                setTitleRu(data.titleRu)
                setPrice(data.price)
                setCategory(data.categoryId)
                setSubCategory(data.subcategoryId)
                setСurrency(data.сurrency)
                setItem(data.item)
                setProductOrService(data.productorservice)
                setDescriptionUz(data.descriptionUz)
                setDescriptionRu(data.descriptionRu)
            })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            fetchCategories().then(data => setCategories(data))
            fetchSubCategories(categoryId).then(data => setSubCategories(data))
            fetchUsers(categoryId,subcategoryId).then(data => setUsers(data))
        }, 1000);
        return () => clearInterval(interval);
    }, [categoryId,subcategoryId,сurrency,item,productorservice])

    const selectFile = e => { 
        setFile(e.target.files[0])
    }


    const updateP = () => {
        updateProduct(id, titleUz, titleRu, price, categoryId, subcategoryId, descriptionUz, descriptionRu, userId, сurrency, productorservice, item).then(data => {})
        toast.info(`${id}`, {
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
        <h2>Update Product</h2>
        <Form>
            <Row className="mb-4">
            <Col>
                        <Form.Select
                            onChange={(e) => {const seletcedCategory = e.target.value
                                setCategory(seletcedCategory);
                            }}
                        >  
                         <option value={''}>Category</option>
                            {сategories.map(category =>
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
                        <Form.Select aria-label="Default select example" 
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
                        <Form.Select aria-label="Default select example" 
                                onChange={(e) => {const seletcedProductOrService = e.target.value
                                    setProductOrService(seletcedProductOrService);
                                }}
                            >
                                {(() => {
                                    
                                    if (productorservice == 1) {
                                        console.log(productorservice)
                                        return (
                                            [<option value={productorservice}>Xizmat</option>,<option value='2'>Mahsulot</option>]
                                        )
                                    } else if (productorservice == 2) {
                                        console.log(productorservice)
                                        return (
                                            [<option value={productorservice}>Mahsulot</option>,<option value='1'>Xizmat</option>]
                                        )
                                    } 
                                })()}
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
                        <Form.Control type="text" value={titleUz}  onChange={e=>setTitleUz(e.target.value)}/>
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="title RU"
                        className="mb-3"
                       >
                        <Form.Control type="text"  value={titleRu} onChange={e=>setTitleRu(e.target.value)}/>
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
                                {(() => {
                                    if (сurrency == 1) {
                                        return (
                                            [<option value={сurrency}>Som</option>,<option value='2'>$</option>]
                                    )
                                    } else if (сurrency == 2) {
                                        return (
                                            [<option value={сurrency}>$</option>,<option value='1'>Som</option>,]
                                        )
                                    } else {
                                        return (
                                            <div>catch all</div>
                                        )
                                    }
                                })()}
                            </Form.Select>
                            <Form.Select
                                onChange={(e) => {const seletcedItem = e.target.value
                                    setItem(seletcedItem);
                                }}
                            >
                                {(() => {
                                    if (item == 1) {
                                        return (
                                            [<option value={item}>dona</option>,<option value='2'>kg</option>]
                                    )
                                    } else if (item == 2) {
                                        return (
                                            [<option value={item}>kg</option>,<option value='1'>dona</option>]
                                        )
                                    } else {
                                        return (
                                            <div>catch all</div>
                                        )
                                    }
                                })()}
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
                    <Button variant="success" onClick={updateP} className="mt-3 float-right d-flex" type="reset">
                        Yangilash
                    </Button>  
                </Col>
            </Row>
        </Form>
        <ToastContainer />
    </Container>
    );
});

export default UpdateProduct;