import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Input, Form } from 'reactstrap';
import { addCategory, getAllCategory, updateCategory } from '../Redux/ActionCreator';
import Theme from './Theme'
import CheckboxTree from "react-checkbox-tree";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

function Category() {

    const category = useSelector(state => state.category);
    const [show, setShow] = useState(false);
    const [updateShow, setUpdateShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [parentId, setParentId] = useState('');
    const [categoryIamge, setCategoryIamge] = useState('');
    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])
    const [checkedArray, setCheckedArray] = useState([])
    const [expandedArray, setExpandedArray] = useState([])

    const dispatch = useDispatch();

    const renderCategory = (categories) => {
        let catList = [];
        for(let cate of categories) {
            catList.push(
                {
                    label: cate.name,
                    value: cate._id,
                    children: cate.children.length > 0 && renderCategory(cate.children)
                }
            )
        }

        return catList;
    }

    const createList = (categories, option= []) => {
        for(let cate of categories) {
            option.push({ value: cate._id, name: cate.name, parentId: cate.parentId });
            if(cate.children.length > 0) {
                createList(cate.children, option);
            }
        }

        return option;
    }

    const toggleShow = () => setShow(!show);
    const toggleUpdate = () => {
        setUpdateShow(!updateShow);

        const categories = createList(category.categories);
        const checkArray = [];
        const expandArray = [];

        checked.length > 0 && checked.forEach((categoryId, index) => {
            const cate = categories.find((categor, _index) => categoryId == categor.value);
            cate && checkArray.push(cate);
        });

        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const cate = categories.find((categor, _index) => categoryId == categor.value);
            cate && expandArray.push(cate);
        })

        setCheckedArray(checkArray);
        setExpandedArray(expandArray);
        console.log({checked, expanded, checkedArray, expandedArray, categories});
    }

    const handleSubmit = () => {
        const form = new FormData();

        form.append('name', categoryName);
        form.append('parentId', parentId);
        form.append('categoryImages', categoryIamge);

        dispatch(addCategory(form));
        toggleShow();
    }

    const handleInput = (key, val, index, type) => {
        if(type == "checked") {
            const checkedUpdate = checkedArray.map((value, _index) => _index == index ? { ...value, [key] : val} : value);
            setCheckedArray(checkedUpdate);

        } else if (type == "expanded") {
            const expandedUpdate = expandedArray.map((value, _index) => _index == index ? { ...value, [key] : val} : value);
            setExpandedArray(expandedUpdate);

        }
    }

    const updateSubmit = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });

        checkedArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });

        console.log(form);

        // dispatch(updateCategory(form))
        //     .then(res => {
        //         if(res) {
        //             dispatch(getAllCategory());
        //         }
        //     })
        // 
        // toggleUpdate();
    }

    const renderUpdateCategory = () => {
        return (
            <Modal isOpen={updateShow} size="lg">
                <ModalHeader toggle={toggleUpdate}>Update Category</ModalHeader>
                <ModalBody>
                    <Form onSubmit={updateSubmit}>
                        <Row>
                            <Col>
                                <h5>Expanded</h5>
                                {
                                    expandedArray.length > 0 && expandedArray.map((item, index) => 
                                        <Row className="my-2" key={index}>

                                            <Col>
                                                <Input value={item.name} placeholder="Category Name" onChange={(e) => handleInput('name', e.target.value, index, 'expanded')}/>
                                            </Col>

                                            <Col>
                                                <select className="form-control" value={item.parentId} onChange={(e) => handleInput('parentId', e.target.value, index, 'expanded')}>
                                                    <option>Select Category</option>
                                                    {
                                                        createList(category.categories).map(option => 
                                                            <option key={option.value} value={option.value} > {option.name} </option>
                                                        )
                                                    }
                                                </select>
                                            </Col>

                                            <Col>
                                                <select className="form-control">
                                                    <option value="">Select Type</option>
                                                    <option value="store">Store</option>
                                                    <option value="product">Product</option>
                                                    <option value="page">Page</option>
                                                </select>
                                            </Col>

                                        </Row>
                                    )
                                }
                                <h5>Checked</h5>
                                {
                                    checkedArray.length > 0 && checkedArray.map((item, index) => 
                                        <Row className="my-2" key={index}>

                                            <Col>
                                                <Input value={item.name} placeholder="Category Name" onChange={(e) => handleInput('name', e.target.value, index, 'checked')}/>
                                            </Col>

                                            <Col>
                                                <select className="form-control" value={item.parentId} onChange={(e) => handleInput('parentId', e.target.value, index, 'checked')}>
                                                    <option>Select Category</option>
                                                    {
                                                        createList(category.categories).map(option => 
                                                            <option key={option.value} value={option.value} > {option.name} </option>
                                                        )
                                                    }
                                                </select>
                                            </Col>

                                            <Col>
                                                <select className="form-control">
                                                    <option value="">Select Type</option>
                                                    <option value="store">Store</option>
                                                    <option value="product">Product</option>
                                                    <option value="page">Page</option>
                                                </select>
                                            </Col>

                                        </Row>
                                    )
                                }
                            </Col>
                        </Row>
                        
                        <Button type="submit">Save Changes</Button>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }


    return (
        <div>
            <Theme sidebar>
                <Row>
                    <Col md={12}>
                        <div style={{ display:'flex', justifyContent:'space-between' }}>
                            <h4>Category</h4>
                            <Button onClick={toggleShow}>Add</Button>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <CheckboxTree
                            nodes={renderCategory(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={check => setChecked(check)}
                            onExpand={expand => setExpanded(expand)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>

                <Button>Delete</Button>
                <Button onClick={toggleUpdate}>Edit</Button>

            </Theme>

            <Modal isOpen={show}>
                <ModalHeader toggle={toggleShow}>Add New Category</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <Input value={categoryName} placeholder="Category Name" onChange={(e) => setCategoryName(e.target.value)}/>

                        <select className="form-control my-2" value={parentId} onChange={(e) => setParentId(e.target.value)}>
                            <option>Select Category</option>
                            {
                                createList(category.categories).map(option => 
                                    <option key={option.value} value={option.value} > {option.name} </option>
                                )
                            }
                        </select>

                        <Input type="file" name="categoryImage" onChange={(e) => setCategoryIamge(e.target.files[0])} />

                        
                        <Button type="submit">Submit</Button>
                    </Form>
                </ModalBody>
            </Modal>
            {renderUpdateCategory()}
            
        </div>
    )
}

export default Category
