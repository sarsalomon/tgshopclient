import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Container, Button, Form, Row, Col, Table } from 'react-bootstrap';
import { fetchOrders, deleteOrder } from '../../http/orderApi';
import { GET_ORDER_ROUTER, HISTORY_ROUTER } from '../../utils/consts';
import { NavLink, useHistory } from "react-router-dom"
import Paginations from '../../components/Paginations';
import { fetchCategories, fetchUsers, } from '../../http/productApi';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Orders = observer(() => {
    const [allItems, setAllItems] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryId,setCategory] = useState('')
    const [status,setStatus] = useState('')
    const [user,setUser] = useState('')
    const [users,setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(8)
    const history = useHistory()

    useEffect(() => {
        const interval = setInterval(() => {
            fetchOrders(categoryId,user,status).then(data=> setAllItems(data))
            fetchCategories().then(data => setCategories(data))
            fetchUsers(categoryId).then(data => setUsers(data))
        }, 1000);
        return () => clearInterval(interval);
    }, [categoryId,status,user]);


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

    const submit = (id) => {
        confirmAlert({
          title: 'O`chirishni tasdiqlang',
          message: 'Ishonchingiz komilmi?',
          buttons: [
            {
              label: 'Ha',
              onClick: () => deleteOrder(id)
            },
            {
              label: 'Yo`q'
            }
          ],
          closeOnEscape: true,
          closeOnClickOutside: true,
        });
    };
    return (
        <div>
            <Container>              
                 <Row>
                 <Col sm={12} md={1}>
                    <NavLink to={HISTORY_ROUTER}><Button variant='success'>Tarix</Button></NavLink>
                 </Col>
                 <Col sm={12} md={3}>
                        <Form.Select
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
                    <Col sm={12} md={3}>
                        <Form.Select
                            onChange={(e) => {const seletcedUser = e.target.value
                                setUser(seletcedUser);
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
                    <Col sm={12} md={3}>
                        <Form.Select
                            onChange={(e) => {const seletcedStatus = e.target.value
                                setStatus(seletcedStatus);
                            }}
                        >  
                         <option value={''}>Holati</option>
                         <option value={'1'}>Qabul qilindi</option>
                         <option value={'2'}>Jarayonda</option>
                         <option value={'3'}>Usta Yuborildi</option>
                        </Form.Select>
                    </Col>
                    <Col sm={12} md={2}>
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
                            <th>Nomi</th>
                            <th>Toifa</th>
                            <th>Kim</th>
                            <th>Mijoz raqami</th>
                            <th>Narxi</th>
                            <th>Holati</th>
                            <th>Harakat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        currentItem.map((order, index)  =>
                            <tr
                                key={order._id}
                            >
                                <td>{cpi + index + 1}</td>
                                <td>{order.categoryName}</td>
                                <td>{order.productName}</td>
                                <td>{order.userName}</td>
                                <td>{order.userPhone}</td>
                                <td>{order.qty * order.newprice}</td>
                                <td>{order.status}</td>
                                <td>
                                <Button variant="primary" onClick={() => history.push(GET_ORDER_ROUTER + '/'+order._id)}>Ko'rish</Button>
                                <Button variant="danger" className="ms-2" onClick={() => submit(order._id)}>O`chirish</Button>
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