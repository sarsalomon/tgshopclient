import { observer } from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import { Container, Form, FloatingLabel, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSetting, updateSetting } from '../http/setting';

const Setting = observer(() => {
    const [percent, setPercent] = useState('')
    useEffect(() => {
        getSetting().then(data => {
            setPercent(data.percent)
        })
    }, [])
    const updateS = async () => {
        try { 
            let data;
            data = await updateSetting(percent).then(data => {
                setPercent(percent)
            })
            toast.success(`${percent} ga Yangilandi`, {
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
                <h2>Sozlamalar</h2>
                <Form>
                    <Row>
                        <Col>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Qo`shimcha foiz"
                                className="mb-3"
                            >
                                <Form.Control value={percent} onChange={e => setPercent(e.target.value)}/>
                            </FloatingLabel>
                        </Col>
                    </Row>   
                    <Button variant="success" onClick={updateS}>
                        Yangilandi
                    </Button>     
                </Form>
                <ToastContainer />
            </Container>
    );
});

export default Setting;