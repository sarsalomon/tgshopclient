import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Container, Button, Form, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Paginations from '../../components/Paginations';
import { deleteProduct, fetchProducts, fetchCategories, fetchSubCategories } from '../../http/productApi';
import { useHistory } from "react-router-dom"
import { ADD_PRODUCT_ROUTER, GET_PRODUCT_ROUTER } from '../../utils/consts';

const Products = observer(() => {
    const [allItems, setAllItems] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryId,setCategory] = useState('')
    const [productorservice,setProductOrService] = useState('')
    const [subcategoryId,setSubCategory] = useState('')
    const [subcategories,setSubCategories] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(8)
    const history = useHistory()

    useEffect(() => {
        // const interval = setInterval(() => {
            fetchProducts(categoryId,subcategoryId,productorservice).then(data=> setAllItems(data))
            fetchCategories().then(data => setCategories(data))
            fetchSubCategories(categoryId).then(data => setSubCategories(data))
        // }, 5000);
        // return () => clearInterval(interval);
    }, [categoryId,subcategoryId,productorservice]);

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

    const deleteP = (id) => {
        deleteProduct(id)
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <NavLink to={ADD_PRODUCT_ROUTER}><Button variant='success'>Mahsulot qo`shish</Button></NavLink>
                    </Col>
                    <Col>
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
                            <th>Ma'lumot</th>
                            <th>Narxi</th>
                            <th>Rasmi</th>
                            <th width="20%">Harakat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {    
                            currentItem.map((product, index) => 
        
                                <tr
                                key={product._id}
                                >
                                    <td>{cpi + index + 1}</td>
                                    <td>{product.titleRu}<br/>
                                        {product.titleUz}</td>
                                    <td>{product.subcategoryId}<br/>
                                    {product.subcategoryId}</td>
                                    <td>{product.descriptionUz.length > 60 ? `${product.descriptionUz.substring(0, 60)}...` : product.descriptionUz}<br/>
                                        {product.descriptionRu.length > 60 ?`${product.descriptionRu.substring(0, 60)}...` : product.descriptionRu}</td>
                                    <td>{product.price}</td>
                                    {/* <td> <Image width={150} height={80} src={process.env.REACT_APP_API_URL + item.img} alt={item.img}/> </td> */}
                                    <td> 1 </td>
                                    <td>
                                        <Button variant="primary" onClick={() => history.push(GET_PRODUCT_ROUTER + '/'+product._id)}>Yangilash</Button>
                                        <Button variant="danger" className="ms-2" onClick={() => deleteP(product._id)}>O`chirish</Button>
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

export default Products;