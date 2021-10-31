import React from 'react';
import { Button, Image, Table } from 'react-bootstrap';
import { deleteProduct } from '../http/productApi';

const Tables = ({items, loading}) => {

    if(loading){
        return <h2>Loading... </h2>
    }

    const deleteP = (id) => {
        deleteProduct(id)
    }

    return (
        <div>
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
                    {
                        items.map((item, i) => (
                            <tr
                            key={item._id}
                            >
                                <td>{item._id}</td>
                                <td>{item.titleRu}<br/>
                                    {item.titleUz}</td>
                                <td>{item.categoryId}<br/>
                                {item.subcategoryId}</td>
                                <td>{item.descriptionUz.length > 60 ? `${item.descriptionUz.substring(0, 60)}...` : item.descriptionUz}<br/>
                                    {item.descriptionRu.length > 60 ?`${item.descriptionRu.substring(0, 60)}...` : item.descriptionRu}</td>
                                <td>{item.price}</td>
                                {/* <td> <Image width={150} height={80} src={process.env.REACT_APP_API_URL + item.img} alt={item.img}/> </td> */}
                                <td> 1 </td>
                                <td>
                                    <Button variant="primary">view</Button>
                                    <Button variant="danger" className="ms-2" onClick={() => deleteP(item._id)}>delete</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default Tables;