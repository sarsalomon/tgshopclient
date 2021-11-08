import React, { useContext } from 'react';
import {Navbar, Container, Nav, Button, Row, ListGroup} from 'react-bootstrap'
import { Context } from '..';
import { CATEGORY_ROUTER, DASHBOARD_ROUTER, LOGIN_ROUTER, MEMBER_ROUTER, ORDER_ROUTER, PRODUCT_ROUTER, SERVICE_ROUTER, SETTING_ROUTER, USER_ROUTER } from '../utils/consts';
import {observer} from 'mobx-react-lite'
import {NavLink} from 'react-router-dom'
import {useHistory} from 'react-router-dom'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    
    const logOut = () => {
        localStorage.clear();
        user.setUser({})
        user.setIsAuth(false)
        history.push(LOGIN_ROUTER)
    }

    return (
        <header className="mb-2">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><NavLink to={DASHBOARD_ROUTER} className='text-decoration-none text-black'>Imperia Services</NavLink></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {user.isAuth?
                        <Nav className="ms-auto" style={{color:'red'}}>
                                <Button
                                variant={"outline-danger"}
                                onClick={() => logOut()}
                                className="ml-2"
                            >
                                Chiqish
                            </Button>
                        </Nav>
                        :
                        <Nav className="ml-auto" style={{color: 'white'}}>
                            <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTER)}>Tizimga kirish</Button>
                        </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-2">
                <Row>
                <ListGroup horizontal>
                    <NavLink to={ORDER_ROUTER}><Button variant="primary">Buyurtmalar</Button></NavLink>
                    <NavLink to={CATEGORY_ROUTER}><Button variant="primary" className="ms-3">Toifa</Button></NavLink>
                    <NavLink to={PRODUCT_ROUTER}><Button variant="primary" className="ms-3">Mahsulot</Button></NavLink>
                    {/* <NavLink to={SERVICE_ROUTER}><Button variant="primary" className="ms-3">Service</Button></NavLink> */}
                    <NavLink to={MEMBER_ROUTER}><Button variant="primary" className="ms-3">Foydalanuvchilar</Button></NavLink>
                    <NavLink to={USER_ROUTER}><Button variant="primary" className="ms-3">Hodimlar</Button></NavLink>
                    <NavLink to={SETTING_ROUTER}><Button variant="primary" className="ms-3">Sozlamalar</Button></NavLink>
                </ListGroup>
                </Row>
            </Container>
            <hr></hr>
        </header>
    );
});

export default NavBar;