import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Dropdown, FloatingLabel, InputGroup, DropdownButton, FormControl } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchUsers, getUser, updateUser } from '../../http/userAPI';
import { useParams } from 'react-router';

const UpdateUser = observer(() => {
    const [user, setUser] = useState({info: []})
    const [fish,setFish] = useState('')
    const [phone,setPhone] = useState('')
    const [categoryId,setCategory] = useState('')
    const [subcategoryId,setSubCategory] = useState('')
    const {id} = useParams()
    useEffect(() => {
        // fetchUsers(id).then(data => setUser(data))
        getUser(id).then(data => {
            setFish(data.fish)
            setPhone(data.phone)
        })
    }, [])


    const updateU = () => {
        updateUser(id,fish).then(data => {})
        toast.info(`order.memberId`, {
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
        <h2>Update User</h2>
        <Form>
            {/* <Row className="mb-4">
                <Col>
                    <Form.Select aria-label="Default select example" 
                        onChange={(e) => {const seletcedCategory = e.target.value
                            setCategory(seletcedCategory);
                        }}
                    >  
                     <option value={''}>Category</option>
                        {product.categories.map(category =>
                            <option 
                                value={category._id}
                            >
                                {category.titleRu}
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
                        {product.categories.map(category =>
                            <option 
                                value={category._id}
                            >
                                {category.titleRu}
                            </option>
                        )}
                    </Form.Select>
                </Col>
            </Row>    */}
            <Row>
                <Col>
                    <FloatingLabel
                                controlId="floatingInput"
                                label="Category RU"
                                className="mb-3"
                    >
                        <Form.Control placeholder="name@example.com" value={fish} onChange={e => setFish(e.target.value)}/>
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Fish"
                        className="mb-3"
                    >
                        <Form.Control type="text" value={phone} onChange={e=>setPhone(e.target.value)} />
                    </FloatingLabel>
                </Col>
            </Row>   
            <Row>
                {/* <Col>
                    <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Img</Form.Label>
                            <Form.Control type="file"  onChange={selectFile}/>
                    </Form.Group> 
                </Col> */}
                {/* <Col>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number"                    
                        value={price}
                        onChange={e=>setPrice(e.target.value)}/>
                    </Form.Group>
                </Col>     */}
            </Row>   
            <Row>
                <Col className="float-right">
                    <Button variant="success" onClick={updateU} className="mt-3 float-right d-flex">
                            UPdate
                    </Button>  
                </Col>
            </Row>
        </Form>
        <ToastContainer />
    </Container>
    );
});

export default UpdateUser;