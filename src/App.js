import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import Home from "./components/Home";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Welcome from "./components/Welcome";
import Faq from "./components/Faq";
import Contact from './components/Contact';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header exact path="/" />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/create-task" component={CreateTask} />
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/faq" component={Faq} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
