import {observer} from 'mobx-react-lite'
import React, { useState, useContext} from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import {Card, Container, Form, Button, Row} from 'react-bootstrap'
import {DASHBOARD_ROUTER, LOGIN_ROUTER, REGISTRATION_ROUTER} from '../utils/consts'
import { signIn, registration } from "../http/userAPI";
import { Context } from '..';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history  = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTER
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    let reg = true
    if (reg===true) {
        if(isLogin){
            reg = <div>
                Not Account? <NavLink to={REGISTRATION_ROUTER}>Reg</NavLink>
            </div>
        }else{
            reg = <div>
                Yes Account? <NavLink to={LOGIN_ROUTER}>Login</NavLink>
            </div>
        }
    }
    const click = async ()=>{
        try{
            let data;
            if(isLogin){
                data = await signIn(login, password)
            }else{
                data = await registration(login, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(DASHBOARD_ROUTER)
        }catch(e){
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight-54}}
        >
            <Card style={{width:600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Login' : "Reg"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control 
                        className="mt-2"
                        placeholder="Enter login"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control 
                        className="mt-4"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        // type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                       {
                           reg
                       }
                    </Row>
                    <Button
                        onClick={click}
                        variant={'success'}
                        className="mt-4"
                    >
                        {isLogin ? 'login' : 'Reg'}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;