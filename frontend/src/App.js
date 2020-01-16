import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar/nav.js";
import { Route, Switch } from "react-router-dom";
import Home from "./components/pages/home.js";
import Edit from "./components/pages/edit.js";
import Add from "./components/pages/add.js";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/edit/:id" component={Edit} />
          <Route exact path="/add" component={Add} />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
