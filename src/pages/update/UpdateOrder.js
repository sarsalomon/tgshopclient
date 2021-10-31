import { observer } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import { getOrder, updateOrder } from '../../http/orderApi';
import { Container, Row, Col, Button, Form, FloatingLabel } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategory, getProduct } from '../../http/productApi';
import { getSubCategory } from '../../http/categoryApi';


const UpdateOrder = observer(() => {
    const [order, setOrder] = useState({info: []})
    const [category, setCategory] = useState({info: []})
    const [product, setProduct] = useState({info: []})
    const [subcategory,setSubCategory] = useState('')
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
    
    // console.log(order.serviceId)
    useEffect(() => {
        const interval = setInterval(() => {
            if(order.categoryId !== undefined && order.productId !== undefined){
                getCategory(order.categoryId).then(data => {
                        setCategory(data)
                })
                getProduct(order.productId).then(data => {
                    setProduct(data)

                })
                getSubCategory(order.subcategoryId).then(data => {
                    setSubCategory(data)
                })
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [order.categoryId, order.productId])
    console.log(product)
    let ptitel = `${product.titleUz} - ${product.titleRu}`
    let ctitel = `${category.titleUz} - ${category.titleRu}`
    let sctitel = `${subcategory.titleUz} - ${subcategory.titleRu}`
    // console.log(order.status)
    let statusoption
    if(order.status === 1){
        statusoption = [<option value={order.status}>Qabul qilindi</option>,<option value='2'>обработка</option>,<option value='3'>Usta Yuborildi</option>,<option value='4'>Tugadi</option>]
    }else if(order.status === 2){
        statusoption =[<option value={order.status}>обработка</option>,<option value='1'>Qabul qilindi</option>,<option value='3'>Usta Yuborildi</option>,<option value='4'>Tugadi</option>]
    }else if(order.status === 3){
        statusoption =[<option value={order.status}>Usta Yuborildi</option>,<option value='1'>Qabul qilindi</option>,<option value='2'>обработка</option>,<option value='4'>Tugadi</option>]
    }else if(order.status === 4){
        statusoption =[<option value={order.status}>Tugadi</option>,<option value='1'>Qabul qilindi</option>,<option value='2'>обработка</option>,<option value='3'>Usta Yuborildi</option>]
    }

    let statustext
    if(order.status === 1){
        statustext = 'Qabul qilindi'
    }else if(order.status === 2){
        statustext = 'обработка'
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
            updateOrder(id, status, order.ratingstatus).then(data => {})
            toast.info(`${id} ni holati yangilandi ${statustext} ga`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        }else{
            console.log('kotini qis')
        }
    }


    return (
        <Container>
            <h2>Buyurtma yangilash</h2>
            <Form>
                <Row className="mb-4">
                    <Col>
                    </Col>
                </Row>   
                <Row>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Category"
                            className="mb-3">
                            <Form.Control type="text" value={ctitel} disabled/>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Sub Category"
                            className="mb-3">
                            <Form.Control type="text" value={sctitel} disabled/>
                        </FloatingLabel>
                    </Col>
                </Row>  
                <Row>  
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="title"
                            className="mb-3">
                            <Form.Control type="text" value={ptitel} disabled/>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="memberId"
                            className="mb-3">
                            <Form.Control type="text" value={order.memberId} disabled/>
                        </FloatingLabel>
                    </Col>
                </Row>   
                <Row>
                    <Col>
                         Narhi
                         <br/>
                         <span>{order.qty}</span> * <span>{order.newprice}</span> = {order.qty * order.newprice}
                    </Col>  
                    <Col>
                    <Form.Select aria-label="Default select example" 
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