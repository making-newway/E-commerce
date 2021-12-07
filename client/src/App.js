import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Header from "./Components/Header";
import Home from "./Components/Home";
import Product from "./Components/Product"
import Navbar from "./Components/Navbar";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:slug" component={Product} />
      </Switch>
    </div>
  );
}

export default App;
