
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
          <Route exact path="/home" component={Home} />
          <Route exact path="/create-task" component={CreateTask} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
