import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import Home from "./components/Home";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import CreateHousehold from "./components/CreateHousehold";
import CreateAccount from "./components/CreateAccount";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route  path="/create-task" component={CreateTask} />
          <Route  path="/create-household" component={CreateHousehold} />
          <Route exact path ="/create-account" component={CreateAccount} />

          <Route  path="/tasks" component={Tasks} />
          <Route exact path ="/login" component={Login} />
          <Route  path="/welcome" component={Welcome} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
