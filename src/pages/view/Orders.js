import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Container, Button, Form, Row, Col, Table } from 'react-bootstrap';
import { fetchOrders } from '../../http/orderApi';
import { GET_ORDER_ROUTER } from '../../utils/consts';
import { useHistory } from "react-router-dom"
import Paginations from '../../components/Paginations';
import { fetchCategories, fetchSubCategories } from '../../http/productApi';

const Orders = observer(() => {
    const [allItems, setAllItems] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryId,setCategory] = useState('')
    const [status,setStatus] = useState('')
    const [productorservice,setProductOrService] = useState('')
    const [subcategoryId,setSubCategory] = useState('')
    const [subcategories,setSubCategories] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(8)
    const history = useHistory()

    useEffect(() => {
        const interval = setInterval(() => {
            fetchOrders(categoryId,status,subcategoryId,productorservice).then(data=> setAllItems(data))
            fetchCategories().then(data => setCategories(data))
            fetchSubCategories(categoryId).then(data => setSubCategories(data))
        }, 1000);
        return () => clearInterval(interval);
    }, [categoryId,status,subcategoryId,productorservice]);


      const lastItemIndex = currentPage * itemsPerPage
      const firstItemIndex = lastItemIndex - itemsPerPage
      const currentItem = allItems.slice(firstItemIndex, lastItemIndex)

      const paginate = pageNumber => setCurrentPage(pageNumber)
  
      let paginates = null
      if(allItems.length>8){
        paginates =  <Paginations
        itemsPerPage={itemsPerPage}
        totalItems={allItems.length}
        paginate={paginate}
        currentPage={currentPage}
    />
      }

      let cpi
      if(currentPage === 1){
          cpi = currentPage - 1
      }else if(currentPage >1){
          cpi = itemsPerPage * (currentPage - 1)
      }

    return (
        <div>
            <Container>              
                 <Row>
                 <Col>
                        <Form.Select
                            onChange={(e) => {const seletcedCategory = e.target.value
                                setCategory(seletcedCategory);
                            }}
                        >  
                         <option value={''}>Hammasi</option>
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
                            onChange={(e) => {const seletcedSubCategory = e.target.value
                                setSubCategory(seletcedSubCategory);
                            }}
                        >
                         <option value={''}>Hammasi</option>
                            {subcategories.map(category =>
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
                                onChange={(e) => {const seletcedProductOrService = e.target.value
                                    setProductOrService(seletcedProductOrService);
                                }}
                            >  
                            <option value={''}>Hammasi</option>
                            <option value={'1'}>Service</option>
                            <option value={'2'}>Product</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select
                            onChange={(e) => {const seletcedStatus = e.target.value
                                setStatus(seletcedStatus);
                            }}
                        >  
                         <option value={''}>Holati</option>
                         <option value={'1'}>Qabul qilindi</option>
                         <option value={'2'}>обработка</option>
                         <option value={'3'}>Usta Yuborildi</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select aria-label="Default select example" 
                                onChange={(e) => {const seletcedCategory = e.target.value
                                    setItemsPerPage(seletcedCategory);
                                    setCurrentPage(1)
                                }}
                            >  
                            <option value={5}>5</option>
                                {[10, 20, 30, 40, 50, 100, 200].map(category =>
                                    <option 
                                        value={category}
                                    >
                                        {category}
                                    </option>
                                )}
                        </Form.Select>
                    </Col>
                </Row>
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th width="1%">#</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Desc</th>
                            <th>qty</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItem.map((order, index)  =>
                            <tr
                                key={order._id}
                            >
                                <td>{cpi + index + 1}</td>
                                <td>{order.memberId}</td>
                                <td>{order.serviceId}</td>
                                <td>{order._id}</td>
                                <td>{order.qty}</td>
                                <td>{order.newprice}</td>
                                <td>{order.qty * order.newprice}</td>
                                <td>{order.status}</td>
                                <td>
                                <Button variant="primary" onClick={() => history.push(GET_ORDER_ROUTER + '/'+order._id)}>view</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                {paginates}

            </Container>
        </div>
    );
});

export default Orders;