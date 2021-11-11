import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { deleteCategory, fetchCategories } from '../../http/categoryApi';
import { ADD_CATEGORY_ROUTE, GET_CATEGORY_ROUTER } from '../../utils/consts';
import { useHistory } from "react-router-dom"
import Paginations from '../../components/Paginations';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Categories = observer(() => {
    const [allItems, setAllItems] = useState([])
    const [categories, setCategories] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const history = useHistory()

    useEffect(() => {
        const interval = setInterval(() => {
            fetchCategories().then(data => setAllItems(data))
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const currentItem = allItems.slice(firstItemIndex, lastItemIndex)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    let paginates = null
    if(allItems.length>5){
      paginates =  <Paginations
      itemsPerPage={itemsPerPage}
      totalItems={allItems.length}
      paginate={paginate}
      currentPage={currentPage}
  />
    }
    const submit = (id) => {
        confirmAlert({
          title: 'O`chirishni tasdiqlang',
          message: 'Ishonchingiz komilmi, bu categoriga tegishli hamma sub categoriyalar ham o`chadi',
          buttons: [
            {
              label: 'Ha',
              onClick: () => deleteCategory(id)
            },
            {
              label: 'Yo`q'
            }
          ],
          closeOnEscape: true,
          closeOnClickOutside: true,
        });
    };
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
                    <Col sm={12} md={3}>
                    <NavLink to={ADD_CATEGORY_ROUTE}><Button variant='success'>Toifa qo`shish</Button></NavLink>
                    </Col>
                    <Col sm={12} md={3}>
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
                            <th width="1%">№</th>
                            <th width="40%" className='text-break'>Title Uz</th>
                            <th width="40%">Title Ru</th>
                            <th width="20%">Harakat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItem.map((categorie,index) =>
                            <tr
                                key={categorie.id}
                            >

                                <td>{cpi + index + 1}</td>
                                <td>{categorie.titleRu}</td>
                                <td>{categorie.titleUz}</td>
                                <td>
                                <div>
                                    <Button variant="primary" onClick={() => history.push(GET_CATEGORY_ROUTER + '/' + categorie._id)}>Yangilash</Button>
                                    <Button variant="danger" className="ms-2" onClick={() => submit(categorie._id)}>O`chirish</Button>
                                </div>
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

export default Categories;