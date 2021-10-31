import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Row, Col } from 'react-bootstrap';
import Paginations from '../../components/Paginations';
import { fetchMembers } from '../../http/memberApi';

const Members = observer(() => {
    const [allItems, setAllItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    useEffect(() => {
        const interval = setInterval(() => {
            setLoading(true)
            fetchMembers().then(data => setAllItems(data))
            setLoading(false)
        }, 1000);
        return () => clearInterval(interval);
      }, []);

 
      const lastItemIndex = currentPage * itemsPerPage
      const firstItemIndex = lastItemIndex - itemsPerPage
      const currentItem = allItems.slice(firstItemIndex, lastItemIndex)
  
      const paginate = pageNumber => setCurrentPage(pageNumber)

      let paginates = null
      let tables = null
      if(allItems.length>1){
        tables = 1
      }else{
        tables = <h2>Not member</h2>
      }
      if(allItems.length>5){
        paginates =  <Paginations
        itemsPerPage={itemsPerPage}
        totalItems={allItems.length}
        paginate={paginate}
        currentPage={currentPage}
        />
      }

    return (
        <div>
            <Container>                
                <Row className="mb-4">
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
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th width="1%">№</th>
                            <th>Phone</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Region</th>
                            <th>Location</th>
                            <th>ChatID</th>
                            <th>Lang</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItem.map(member =>
                            <tr>
                                <td>2</td>
                                <td>{member.phone}</td>
                                <td>{member.username}</td>
                                <td>{member.name}</td>
                                <td>{member.address}</td>
                                <td>{member.region}</td>
                                <td>{member.location_latitude}<br/>
                                {member.location_longitude}</td>
                                <td>{member.chatId}</td>
                                <td>{member.lang}</td>
                                {/* <td>
                                    Button variant="primary">view</Button>
                                    <Button variant="danger" className="ms-2">delete</Button>
                                </td> */}
                            </tr>
                        )}

                    </tbody>
                </Table>
                {paginates}
            </Container>
        </div>
    );
});

export default Members;