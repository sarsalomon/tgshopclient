import { observer } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import { getOrder, updateOrder } from '../../http/orderApi';
import { Container, Row, Col, Button, Form, FloatingLabel } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategory, getProduct } from '../../http/productApi';
import { getUser, getMember } from '../../http/orderApi';

const UpdateOrder = observer(() => {
    const [order, setOrder] = useState({info: []})
    const [category, setCategory] = useState({info: []})
    const [product, setProduct] = useState({info: []})
    const [user, setUser] = useState({info: []})
    const [member, setMember] = useState({info: []})

    const [status,setStatus] = useState('')
    const {id} = useParams()
    useEffect(() => {
        const interval = setInterval(() => {
            getOrder(id).then(data => {
                setOrder(data)
            })
        }, 1000);
        return () => clearInterval(interval);
    }, [])
    

    useEffect(() => {
        // const interval = setInterval(() => {
            if(order.categoryId !== undefined && order.productId !== undefined && order.userId !== undefined && order.memberId !== undefined){
                getCategory(order.categoryId).then(data => {
                        setCategory(data)
                })
                getProduct(order.productId).then(data => {
                    setProduct(data)
                })
                getUser(order.userId).then(data => {
                    setUser(data)
                })
                getMember(order.memberId).then(data => {
                    setMember(data)
                })
            }
        // }, 1000);
        // return () => clearInterval(interval);
    }, [order.categoryId, order.productId, order.userId, order.memberId])

    let ptitel = `${product.titleUz} - ${product.titleRu}`
    let ctitel = `${category.titleUz} - ${category.titleRu}`

    let statusoption
    if(order.status == 1){
        statusoption = [<option value={order.status}>Qabul qilindi</option>,<option value='2'>Jarayonda</option>,<option value='3'>Usta Yuborildi</option>,<option value='4'>Tugadi</option>]
    }else if(order.status == 2){
        statusoption =[<option value={order.status}>Jarayonda</option>,<option value='1'>Qabul qilindi</option>,<option value='3'>Usta Yuborildi</option>,<option value='4'>Tugadi</option>]
    }else if(order.status == 3){
        statusoption =[<option value={order.status}>Usta Yuborildi</option>,<option value='1'>Qabul qilindi</option>,<option value='2'>Jarayonda</option>,<option value='4'>Tugadi</option>]
    }else if(order.status == 4){
        statusoption =[<option value={order.status}>Tugadi</option>,<option value='1'>Qabul qilindi</option>,<option value='2'>Jarayonda</option>,<option value='3'>Usta Yuborildi</option>]
    }

    let statustext
    if(order.status === 1){
        statustext = 'Qabul qilindi'
    }else if(order.status === 2){
        statustext = 'Jarayonda'
    }else if(order.status === 3){
        statustext = 'Usta Yuborildi'
    }else if(order.status === 4){
        statustext = 'Tugadi'
    }
    
    if(status === ''){
       setStatus('1')
    }
    const updateC = () => {
        if(order.status  !== ''){
            updateOrder(id, product._id, member.chatId, status).then(data => {})
            toast.info(`${id} ni holati yangilandi ${statustext} ga`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            if(updateOrder){
                if(status == 4){
                    console.log('ew')
                    // window.location.href = process.env.REACT_APP_API_URL + 'order';
                    window.location.href = 'http://localhost:3000/order';
                }
            }
        }else{

        }
    }
    let urlyandex = `https://yandex.uz/maps/?ll=${member.location_longitude}%2C${member.location_latitude}&mode=whatshere&whatshere%5Bpoint%5D=${member.location_longitude}%2C${member.location_latitude}&whatshere%5Bzoom%5D=14&z=19`
    return (
        <Container>
            <h2>Buyurtmani yangilash</h2>
            <Form>
                <Row className="mb-4">
                    <Col>
                    </Col>
                </Row>   
                <Row>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Toifa"
                            className="mb-3">
                            <Form.Control type="text" value={ctitel} disabled/>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Mahsulot"
                            className="mb-3">
                            <Form.Control type="text" value={ptitel} disabled/>
                        </FloatingLabel>
                    </Col>
                </Row>  
                <Row>  
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Usta ismi"
                            className="mb-3">
                            <Form.Control type="text" value={user.fish} disabled/>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Usta nomeri"
                            className="mb-3">
                            <Form.Control type="text" value={user.phone} disabled/>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>  
                    <Col>
                        <h6>{member.location_longitude}</h6><h6>{member.location_latitude}</h6>
                        <a href={urlyandex} target="_blank">Yandex Kartada ochish</a>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Mijoz raqami"
                            className="mb-3">
                            <Form.Control type="text" value={member.phone} disabled/>
                        </FloatingLabel>
                    </Col>
                </Row>   
                <Row>
                    <Col>
                         Narhi
                         <br/>
                         <span>{order.qty}</span> * <span>{order.newprice}</span> = <big><b>{order.qty * order.newprice}</b></big>
                    </Col>  
                    <Col>
                    <Form.Select
                            onChange={(e) => {const updateOrder = e.target.value
                                setStatus(updateOrder);
                            }}
                        >

                            {statusoption}

                        </Form.Select>
                    </Col>
                </Row>   
                <Row>
                    <Col className="float-right">
                        <Button variant="success" onClick={updateC} className="mt-3  float-right d-flex">
                            Yangilash
                        </Button>  
                    </Col>
                </Row>
            </Form>
            <ToastContainer />
        </Container>
    );
});

export default UpdateOrder;