import React from 'react'
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} component={(props) => {
            const token = localStorage.getItem("Token");
            if(token) {
                return <Component {...props} />
            }
            else {
                return <Redirect to={'/signin'} />
            }
        }} />
    )
}

export default PrivateRoute;