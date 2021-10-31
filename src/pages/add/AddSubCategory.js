import React, { useEffect, useState } from 'react';
import { Container, Form, FloatingLabel, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSubCategory } from '../../http/categoryApi';
import { fetchCategories } from '../../http/productApi';
const AddSubCategory = () => {
    const [categories,setCategories] = useState([])
    const [subcategoryUz, setSubcategoryUz] = useState('')
    const [subcategoryRu, setSubcategoryRu] = useState('')
    const [categoryId,setCategory] = useState('')
    useEffect(() => {
        fetchCategories().then(data => setCategories(data))
    }, [])
    console.log(categories)

    const addSC = async () => {
        try { 
            let data;
            const formData = new FormData()
            formData.append('categoryId', categoryId)
            formData.append('subcategoryUz', subcategoryUz)
            formData.append('subcategoryRu', subcategoryRu)
            data = await createSubCategory(formData)
            setSubcategoryUz('')
            setSubcategoryRu('')
            toast.success(`${subcategoryUz} - ${subcategoryRu} Qo'shildi`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }catch(e) {
            toast.error(e.response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <Container>
        <h2>Sub Category</h2>
         <Form>
            <Row className="my-4">
                <Col>
                    <Form.Select aria-label="Default select example" 
                        onChange={(e) => {const seletcedCategory = e.target.value
                            setCategory(seletcedCategory);
                        }}
                        >  
                        <option value={''}>Category</option>
                            {categories.map(category =>
                                <option 
                                    value={category._id}
                                >
                                    {category.titleUz} - {category.titleRu}
                                </option>
                        )}
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Category UZ"
                        value={subcategoryUz}
                        onChange={e => setSubcategoryUz(e.target.value)}
                        className="mb-3">
                        <Form.Control  type="text" placeholder="name@example.com" />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Category RU"
                        value={subcategoryRu}
                        onChange={e => setSubcategoryRu(e.target.value)}
                        className="mb-3">
                        <Form.Control type="text" placeholder="name@example.com" />
                    </FloatingLabel>
                </Col>
            </Row>   
            <Button variant="success" onClick={addSC} type="reset">
                    Add
            </Button>     
        </Form>
        <ToastContainer />
     </Container>
    );
};

export default AddSubCategory;