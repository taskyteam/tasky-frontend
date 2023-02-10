import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import Home from "./components/Home";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Faq from "./components/Faq";
import Contact from './components/Contact';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {[false].map((expand) => (
        <Navbar key={expand} expand={expand}>
          <h1>Logo</h1>
            <Navbar.Toggle/>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav>
                  <Nav.Link 
                  to="/Home"
                  onClick={() => {
                    window.location.href = "/Home"; }}>
                        Home</Nav.Link>
                  <Nav.Link 
                  to="/Faq"
                  onClick={() => {
                    window.location.href = "/Faq"; }}>
                        FAQ</Nav.Link>
                  <Nav.Link 
                  to="/Contact"
                  onClick={() => {
                    window.location.href = "/Contact"; }}>
                        Contact</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Navbar>
      ))}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route  path="/create-task" component={CreateTask} />
          <Route  path="/tasks" component={Tasks} />
          <Route  path="/home" component={Home} />
          <Route exact path ="/login" component={Login} />
          <Route  path="/welcome" component={Welcome} />
          <Route  path="/faq" component={Faq} />
          <Route  path="/contact" component={Contact} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
