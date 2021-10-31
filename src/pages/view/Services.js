import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Container, Button, Form, Row, Col, Table, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { deleteService, fetchCategoryName, fetchServices } from '../../http/serviceApi';
import { ADD_SERVICE_ROUTE } from '../../utils/consts';
import Paginations from '../../components/Paginations';

const Services = observer(() => {
    const [allItems, setAllItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    useEffect(() => {
        const interval = setInterval(() => {
            fetchServices().then(data=> setAllItems(data))
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
  
    const deleteP = (id) => {
        deleteService(id)
    }
    const fnC = (id) => {
        console.log(id)
        fetchCategoryName(id)
    }
    return (
        <div>
            <Container>
            <Row>
                    <Col>
                    <NavLink to={ADD_SERVICE_ROUTE}><Button variant='success'>Add Service</Button></NavLink>
                    </Col>
                    <Col>
                        <Form.Select
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
                            <th>Price</th>
                            <th>img</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItem.map(service =>
                            <tr
                                key={service._id}
                            >
                                <td>1</td>
                                <td>{service.titleRu}<br/>
                                {service.titleUz}</td>
                                <td>{fnC(service._id)}<br/>
                                {service.subcategoryId}</td>
                                <td>{service.descriptionUz.length > 60 ?
                                    `${service.descriptionUz.substring(0, 60)}...` : service.descriptionUz
                                }<br/>
                                {service.descriptionRu.length > 60 ?
                                    `${service.descriptionRu.substring(0, 60)}...` : service.descriptionRu
                                }</td>
                                <td>{service.price}</td>
                                <td> <Image width={150} height={80} src={process.env.REACT_APP_API_URL + service.img} alt={service.img}/></td>
                                <td>
                                    <Button variant="primary">view</Button>
                                    <Button variant="danger" className="ms-2" onClick={() => deleteP(service._id)}>delete</Button>
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

export default Services;