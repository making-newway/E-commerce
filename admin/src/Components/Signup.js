import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { signup } from '../Redux/ActionCreator';
import Loading from './Loading';

function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const userSignUp = (e) => {
        e.preventDefault();

        const User = { username: name, email: email, password: password, mobile: mobile, address: address };

        dispatch(signup(User));
    }

    if(auth.authenticate) {
        return <Redirect to="/" />
    }

    if(user.loading) {
        return <Loading />
    }

    return (
        <div className="container my-5" style={{paddingTop: "80px"}}>
            <div className="row">
                <Col md={{size: 8, offset: 2}}>
                    <Form onSubmit={userSignUp}>
                        <FormGroup>
                            <Label for="username">Name</Label>
                            <Input type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="mobile">Mobile</Label>
                            <Input type="number" placeholder="Enter Your Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input type="textarea" placeholder="Enter Your Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                        </FormGroup>
                        
                        <Button color="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </div>
        </div>
    )
}

export default Signup
