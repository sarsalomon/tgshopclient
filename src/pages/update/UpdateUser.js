import { observer } from 'mobx-react-lite';
import React, {  useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, FloatingLabel } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser, updateUser } from '../../http/userAPI';
import { fetchCategories } from '../../http/productApi';
import { useParams } from 'react-router';

const UpdateUser = observer(() => {
    const [user, setUser] = useState({info: []})
    const [fish,setFish] = useState('')
    const [phone,setPhone] = useState('')
    const [categoryId,setCategory] = useState('')
    const [categories,setCategories] = useState([])
    const [role,setRole] = useState('')

    const {id} = useParams()
    useEffect(() => {
        getUser(id).then(data => {
            setFish(data.fish)
            setPhone(data.phone)
        })
        fetchCategories().then(data => setCategories(data))
    }, [])

    const updateU = () => {
        updateUser(id,fish,role,categoryId).then(data => {})
        toast.success(`Ma'lumotlar yangilandi`, {
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
        <h2>Hodimni yangilash</h2>
        <Form>            
            <Row className="mb-4">
                <Col>
                    <Form.Select aria-label="Default select example" 
                        onChange={(e) => {const seletcedCategory = e.target.value
                                setCategory(seletcedCategory);
                        }}
                    >  
                        <option value={''}>Toifa</option>
                            {categories.map(category =>
                                <option 
                                    value={category._id}
                                >
                                    {category.titleUz} - {category.titleRu}
                                </option>
                            )}
                        </Form.Select>
                </Col>
                <Col>
                    <Form.Select aria-label="Default select example" 
                        onChange={(e) => {const seletcedRole = e.target.value
                                setRole(seletcedRole);
                        }}
                    >  
                        <option value={''}>Roli</option>
                         <option value={'ISHCHI'}>Ishchi</option>
                         <option value={'MANAGER'}>Manager</option>
                         <option value={'ADMIN'}>Admin</option>
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
                <Col className="float-right">
                    <Button variant="success" onClick={updateU} className="mt-3 float-right d-flex">
                        Yangilash
                    </Button>  
                </Col>
            </Row>
        </Form>
        <ToastContainer />
    </Container>
    );
});

export default UpdateUser;