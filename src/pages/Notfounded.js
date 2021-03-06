import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap'
import { DASHBOARD_ROUTER } from '../utils/consts';
import {NavLink} from 'react-router-dom'
const Notfounded = () => {
    return (
        <Container>
            <Row>
                    <Col md='4'>
                    </Col>
                    <Col md='4'>
                    <h1 className="text-center my-5">Siz qidirgan sahifa mavjud emas</h1>
                    <NavLink to={DASHBOARD_ROUTER}>
                        <div className="d-grid gap-2 my-5">
                            <Button variant="primary" size="lg">Bosh sahifaga o`tish</Button>
                        </div>
                    </NavLink>
                    </Col>
                    <Col md='4'>
                    </Col>
            </Row>
        </Container>
    );
};

export default Notfounded;