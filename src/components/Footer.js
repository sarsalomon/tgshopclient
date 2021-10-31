import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="mt-5" style={{position: 'absolute',width:'100%'}}>
            <Container fluid className="bg-light pt-3 pb-2">
                <Row>
                    <Col>
                    Create by <a href="#">Las</a>
                    </Col>
                    <Col className="text-capitalize">
                    © all rights reserved
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;