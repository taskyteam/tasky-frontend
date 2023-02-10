import { Component } from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

class FAQ extends Component {
  render() {
    return (
      <div>
        
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
    
        <h2>FAQ</h2>
        <p>
          Velkommen til Tasky! Appen som kan være med å gjøre hverdagsoppgaver
          til en gøy aktivitet for alle parter!
        </p>
        <Link
          to="/home"
          onClick={() => {
            window.location.href = "/home";
          }}
        >
          <button type="submit">Back</button>
        </Link>
      </div>
    );
  }
}

export default FAQ;
