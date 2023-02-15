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
import Faq from "./components/Faq";
import Contact from './components/Contact';
import CreateOrJoin from "./components/CreateOrJoin";
import CreateGoal from "./components/CreateGoal";



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="main-margin">
          <div className="main">
            <Switch>
              <Route  path="/welcome" component={Welcome} />
              <Route exact path="/" component={Home} />
              <Route  path="/create-household" component={CreateHousehold} />
              <Route exact path ="/create-account" component={CreateAccount} />
              <Route path="/create-or-join" component={CreateOrJoin} />
              <Route exact path ="/login" component={Login} />
              <Route  path="/tasks" component={Tasks} />
              <Route  path="/create-task" component={CreateTask} />
              <Route  path="/faq" component={Faq} />
              <Route  path="/contact" component={Contact} />
              <Route path="/create-goal" component={CreateGoal} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
