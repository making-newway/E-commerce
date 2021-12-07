import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Table } from 'reactstrap';
import { addProduct } from '../Redux/ActionCreator';
import Theme from './Theme'

function Product() {

    const dispatch = useDispatch();

    const Category = useSelector(state => state.category);
    const product = useSelector(state => state.product);

    const [show, setShow] = useState(false);
    const [showProduct, setShowProduct] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();
    const [description, setDescrition] = useState('');
    const [category, setCategory] = useState('');
    const [productPictures, setProductPictures] = useState('');
    const [thisPro, setThisPro] = useState(null);

    const createList = (categories, option= []) => {
        for(let cate of categories) {
            option.push({ value: cate._id, name: cate.name });
            if(cate.children.length > 0) {
                createList(cate.children, option);
            }
        }

        return option;
    }

    const toggleShow = () => setShow(!show);
    const toggleProduct = () => setShowProduct(!showProduct);

    const handleSubmit = () => {
        const form = new FormData();

        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', category);

        for(let pic of productPictures) {
            form.append('productPictures', pic);
        }

        dispatch(addProduct(form));
    }

    const setShowDetails = (productDetail) => {
        setThisPro(productDetail);
        toggleProduct();
    }

    const renderDetails = () => {
        if(!thisPro) return null;
        console.log(thisPro);

        return (
            <Modal isOpen={showProduct}>
                <ModalHeader toggle={toggleProduct}>Product Details</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={6}>
                            <Label style={{fontWeight: "bold"}}>Name</Label>
                            <p>{thisPro.name}</p>
                        </Col>
                        <Col md={6}>
                            <Label style={{fontWeight: "bold"}}>Price</Label>
                            <p>{thisPro.price}</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Label style={{fontWeight: "bold"}}>Quantity</Label>
                            <p>{thisPro.quantity}</p>
                        </Col>
                        <Col md={6}>
                            <Label style={{fontWeight: "bold"}}>Category</Label>
                            <p>{thisPro.category.name}</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Label style={{fontWeight: "bold"}}>Description</Label>
                            <p>{thisPro.description}</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Label style={{fontWeight: "bold"}}>Product Images</Label>
                            {thisPro.productPictures.map(pic => 
                                <div className="container" style={{display: "flex", overflow: "hidden"}}>
                                    <img src={`http://localhost:5000/public/${pic.img}`} />
                                </div>    
                            )}
                        </Col>
                    </Row>

                </ModalBody>

            </Modal>
        )
    }

    const renderProduct = () => {
        return (
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {product.products.length > 0 ?
                        product.products.map(prod =>
                            <tr onClick={() => setShowDetails(prod)} key={prod._id}>
                                <td></td>
                                <td>{prod.name}</td>
                                <td>{prod.price}</td>
                                <td>{prod.quantity}</td>
                                <td>{prod.category.name}</td>
                            </tr>    
                        ) : null
                    }
                </tbody>
            </Table>
        )
    }

    return (
        <div>
            <Theme sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <h3>Product</h3>
                                <Button onClick={toggleShow} color="primary">Add</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {renderProduct()}
                        {renderDetails()}
                    </Row>
                </Container>

                <Modal isOpen={show}>
                    <ModalHeader toggle={toggleShow}>Add New Category</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="name">Name</Label>
                                <Input name="name" value={name} placeholder='Product Name' onChange={(e) => setName(e.target.value)} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input name="quantity" type="number" value={quantity} placeholder='Product Quantity' onChange={(e) => setQuantity(e.target.value)} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="price">Price</Label>
                                <Input name="price" type="number" value={price} placeholder='Product Price' onChange={(e) => setPrice(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="description">Description</Label>
                                <Input name="description" value={description} placeholder='Product Description' onChange={(e) => setDescrition(e.target.value)} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="category">Category</Label>
                                <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option>Select Category</option>
                                    {
                                        createList(Category.categories).map(option => 
                                            <option key={option.value} value={option.value}>{option.name}</option>
                                        )
                                    }
                                </select>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="productPictures">Pictures</Label>
                                <Input name="productPictures" type="file" placeholder='Product pictures' onChange={(e) => setProductPictures([...productPictures, e.target.files[0]])} />
                            </FormGroup>

                            <Button type="submit" className="my-2" color="primary">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </Theme>
        </div>
    )
}

export default Product
