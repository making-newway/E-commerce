import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBySlug } from '../Redux/ActionCreator';
import { Card, CardBody, CardDeck, CardFooter, CardGroup, CardHeader, CardImg, Col, Row } from "reactstrap";
import { publicURl } from '../axios';

function Product(props) {

    const { slug } = props.match.params;

    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBySlug(slug))
    }, []);

    

    return (
        <div>
            <div className="container">{props.match.params.slug}</div>
            <CardGroup>
                <Row>
                    {product.products.map(prod => { return (
                            <Col md="4" sm="6" xs="12">
                                <Card className="my-4">
                                    <CardImg top src={publicURl(prod.productPictures[0].img)} alt={prod.name} />
                                    <CardBody style={{width:'100%'}}>{prod.name}</CardBody>
                                    <div className="productPrice">{prod.price}</div>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </CardGroup>
        </div>
    )
}

export default Product
