import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import PrivateRoute from "./Components/PrivateRoute";
import { getData, isUserLog } from "./Redux/ActionCreator";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Components/Product";
import Order from "./Components/Order";
import Category from "./Components/Category";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) dispatch(isUserLog());
    dispatch(getData());
  }, []);

  return (
    <div className="App">
      <Header />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/product" component={Product} />
        <PrivateRoute path="/order" component={Order} />
        <PrivateRoute path="/category" component={Category} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
      </Switch>
    </div>
  );
}

export default App;
