import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";
import {NavLink} from 'react-router-dom'
import { MEMBER_ROUTER, ORDER_ROUTER, PRODUCT_ROUTER, USER_ROUTER } from '../utils/consts';

const data = [
    {
      name: "1",
      pv: 2400,
      amt: 2400
    },
    {
      name: "2",
      pv: 1398,
      amt: 2210
    },
    {
      name: "3",
      pv: 10800,
      amt: 2290
    },
    {
      name: "4",
      pv: 3908,
      amt: 2000
    },
    {
      name: "5",
      pv: 4800,
      amt: 2181
    },
    {
      name: "6",
      pv: 3800,
      amt: 2500
    },
    {
      name: "7",
      pv: 4300,
      amt: 2100
    },
    {
      name: "8",
      pv: 4300,
      amt: 2100
    },
    {
      name: "9",
      pv: 4300,
      amt: 2100
    },
    {
      name: "10",
      pv: 4300,
      amt: 2100
    },
    {
      name: "11",
      pv: 4300,
      amt: 2100
    },
    {
      name: "12",
      pv: 4300,
      amt: 2100
    },
    {
      name: "13",
      pv: 4300,
      amt: 2100
    },
    {
      name: "14",
      pv: 4300,
      amt: 2100
    },
    {
      name: "15",
      pv: 4300,
      amt: 2100
    },
    {
      name: "16",
      pv: 4300,
      amt: 2100
    },
    {
      name: "17",
      pv: 4300,
      amt: 2100
    },
    {
      name: "18",
      pv: 4300,
      amt: 2100
    },
    {
      name: "19",
      pv: 4300,
      amt: 2100
    },
    {
      name: "20",
      pv: 4300,
      amt: 2100
    },
    {
      name: "21",
      pv: 4300,
      amt: 2100
    },
    {
      name: "22",
      pv: 4300,
      amt: 2100
    },
    {
      name: "23",
      pv: 4300,
      amt: 2100
    },
    {
      name: "24",
      pv: 4300,
      amt: 2100
    },
    {
      name: "25",
      pv: 4300,
      amt: 2100
    },
    {
      name: "26",
      pv: 4300,
      amt: 2100
    },
    {
      name: "27",
      pv: 4300,
      amt: 2100
    },
    {
      name: "28",
      pv: 4300,
      amt: 2100
    },
    {
      name: "29",
      pv: 4300,
      amt: 2100
    },
    {
      name: "30",
      pv: 4300,
      amt: 2100
    },
    {
      name: "31",
      pv: 4300,
      amt: 2100
    }
  ];

const Dashboard = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Card bg={'danger'} className="text-white">
                            <Card.Body>
                                <Card.Title className="text-center">Buyurtmalar</Card.Title>
                                <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                                <NavLink to={ORDER_ROUTER}><Button variant="success">Ko`rish</Button></NavLink>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card bg={'warning'} className="text-white">
                            <Card.Body>
                                <Card.Title className="text-center">Foydalanuvchilar</Card.Title>
                                <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                                <NavLink to={MEMBER_ROUTER}><Button variant="success">Ko`rish</Button></NavLink>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card bg={'primary'} className="text-white">
                            <Card.Body>
                                <Card.Title className="text-center">Mahsulotlar</Card.Title>
                                <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                                <NavLink to={PRODUCT_ROUTER}><Button variant="success">Ko`rish</Button></NavLink>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card bg={'light'}>
                            <Card.Body>
                                <Card.Title className="text-center">Hodimlar</Card.Title>
                                <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                                <NavLink to={USER_ROUTER}><Button variant="success">Ko`rish</Button></NavLink>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <h2 className="text-center gray-text">daw</h2>
                        <ResponsiveContainer width="100%" height={400}>
                        <LineChart width={500} height={300} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="pv"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                        </ResponsiveContainer>
					</Col>
				</Row>
            </Container>
        </div>
    );
};

export default Dashboard;