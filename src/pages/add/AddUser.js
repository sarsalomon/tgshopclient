import { observer } from 'mobx-react-lite';
import React, {  useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, FloatingLabel } from 'react-bootstrap';
import { fetchCategories } from '../../http/productApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addUser } from '../../http/userAPI';


const AddUser = observer(() => {
    const [categories, setCategories] = useState([])
    const [fish,setFish] = useState('')
    const [phone,setPhone] = useState('')
    const [categoryId,setCategory] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [role,setRole] = useState('')

    useEffect(() => {
            fetchCategories().then(data => setCategories(data))
    }, [])

    const click = async ()=>{
        try{
            let data;
            data = await addUser(login, password, categoryId, fish, phone, role)
            toast.success(`${fish} qo'shildi ${role} sifatida`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }catch(e){
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
            <h2>Hodim qo`shish</h2>
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
                </Row>   
                <Row>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Login"
                            className="mb-3"
                        >
                            <Form.Control type="text" value={login} onChange={e=>setLogin(e.target.value)} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Parol"
                            className="mb-3"
                        >
                            <Form.Control type="text" value={password} onChange={e=>setPassword(e.target.value)} />
                        </FloatingLabel>
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
                            label="Fish"
                            className="mb-3"
                        >
                            <Form.Control type="text" value={fish} onChange={e=>setFish(e.target.value)} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Phone"
                            className="mb-3"
                        >
                            <Form.Control type="text" value={phone} onChange={e=>setPhone(e.target.value)} />
                        </FloatingLabel>
                    </Col>
                </Row>  
                <Row>
                    <Col className="float-right">
                        <Button variant="success" onClick={click} className="mt-3 float-right d-flex">
                            Qo`shish
                        </Button>  
                    </Col>
                </Row>
            </Form>
            <ToastContainer />
        </Container>
    );
});

export default AddUser;