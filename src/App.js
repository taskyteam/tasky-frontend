import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header exact path="/" />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/create-task" component={CreateTask} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
