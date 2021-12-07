import React, { useState } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { login } from "../Redux/ActionCreator";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const userLogin = (e) => {
        e.preventDefault();

        const user = { email, password };

        dispatch(login(user));
    }

    if(auth.authenticate) {
        return <Redirect to="/" />
    }


    return (
        <div className="container my-5" style={{paddingTop: "80px"}}>
            <div className="row">
                <Col md={{size: 8, offset: 2}}>
                    <Form onSubmit={userLogin}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" placeholder="Enter Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormGroup>

                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox"/>{' '}
                                Check me Out
                            </Label>
                        </FormGroup>

                        <Button color="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </div>
        </div>
    )
}

export default Signin
