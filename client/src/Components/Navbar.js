import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../Redux/ActionCreator";

function Navbar() {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory())
    }, []);

    const renderCategory = (categories) => {
        let catList = [];
        for(let cate of categories) {
            catList.push(
                <li key={cate.name}>
                    {cate.parentId ? <a href={cate.slug}>{cate.name}</a> : <span>{cate.name}</span>}
                    {cate.children.length > 0 ? (
                        <ul> {renderCategory(cate.children)} </ul>
                    ) : (null)}
                </li>
            )
        }

        return catList;
    }

    return (
        <div>
            <nav className="navbar navbar-inverse">
                <ul>
                    {category.categories.length > 0 ? renderCategory(category.categories) : null}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
