import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Container, Table, Form, Row, Col } from 'react-bootstrap';
import Paginations from '../../components/Paginations';
import { fetchMembers } from '../../http/memberApi';

const Members = observer(() => {
    const [allItems, setAllItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    useEffect(() => {
        const interval = setInterval(() => {
            fetchMembers().then(data => setAllItems(data))
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
      let cpi
      if(currentPage === 1){
          cpi = currentPage - 1
      }else if(currentPage >1){
          cpi = itemsPerPage * (currentPage - 1)
      }
    return (
        <div>
            <Container>                
                <Row className="mb-4">
                    <Col>
                    </Col>
                    <Col>
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
                            <th>Telefon</th>
                            <th>Username</th>
                            <th>Ismi</th>
                            <th>Manzil</th>
                            <th>ChatID</th>
                            <th>Tili</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItem.map((member, index) =>
                            <tr>
                                <td>{cpi + index + 1}</td>
                                <td>{member.phone}</td>
                                <td>{member.username}</td>
                                <td>{member.name}</td>
                                <td>{member.location_latitude}<br/>
                                {member.location_longitude}</td>
                                <td>{member.chatId}</td>
                                <td>{member.lang}</td>
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