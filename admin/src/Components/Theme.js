import React from 'react';
import { Col, Jumbotron, Row } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

function Main({ props }) {
    if(props.sidebar) {
        return (
            <>
                <Col md={2} className="sidebar">
                    <ul>
                        <li className="link"> <NavLink exact to={"/"}>Home</NavLink> </li>
                        <li className="link"> <NavLink to={"/product"}>Product</NavLink> </li>
                        <li className="link"> <NavLink to={"/order"}>Order</NavLink> </li>
                        <li className="link"> <NavLink to={"/category"}>Category</NavLink> </li>
                    </ul>
                </Col>
                <Col md={10} style={{marginLeft: "auto", paddingTop: "80px"}}>
                    {props.children}
                </Col>
            </>
        )
    } else {
        return <Col md={10} style={{marginLeft: "auto", paddingTop: "80px"}}>
            {props.children}
        </Col>
    }
}

function Theme(props) {
    return (
        <div className="container-fluid">
            <Row>
                <Main props={props} />
            </Row>
        </div>
    )
}

export default Theme;
