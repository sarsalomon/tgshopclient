import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Container, Button, Form, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Paginations from '../../components/Paginations';
import { useHistory } from "react-router-dom"
import { ADD_USER_ROUTER, GET_USER_ROUTER } from '../../utils/consts';
import { deleteUser, fetchCategories, fetchUsers } from '../../http/userAPI';


const Users = observer(() => {
    const [allUsers, setAllUsers] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryId,setCategory] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(9)
    const history = useHistory()
    
    useEffect(() => {
        // const interval = setInterval(() => {
            fetchUsers(categoryId).then(data=> setAllUsers(data))
            fetchCategories().then(data => setCategories(data))
        // }, 1000);
        // return () => clearInterval(interval);
      }, [categoryId]);
 
    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const currentItem = allUsers.slice(firstItemIndex, lastItemIndex)

    const paginate = pageNumber => setCurrentPage(pageNumber)
    let paginates = null
    if(allUsers.length>5){
      paginates =  <Paginations
      itemsPerPage={itemsPerPage}
      totalItems={allUsers.length}
      paginate={paginate}
      currentPage={currentPage}
  />
    }

    const deleteU = (id) => {
        deleteUser(id)
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <NavLink to={ADD_USER_ROUTER}><Button variant='success'>Hodim qo`shish</Button></NavLink>
                    </Col>
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
                            <th>Ismi</th>
                            <th>Telefon</th>
                            <th>Toifa</th>
                            <th>Harakat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {    
                            currentItem.map((user, index) => 
                     
                                <tr
                                key={user._id}
                                >
                                    <td>{index+1}</td>
                                    <td>{user.fish}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => history.push(GET_USER_ROUTER + '/'+user._id)}>Yangilash</Button>
                                        <Button variant="danger" className="ms-2" onClick={() => deleteU(user._id)}>O`chirish</Button>
                                    </td>
                                </tr>
                           )
                        }
                    </tbody>
                </Table>

                {paginates}
                
            </Container>
        </div>
    );
});

export default Users;