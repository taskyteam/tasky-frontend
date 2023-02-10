import { Component } from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

class Contact extends Component {
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
        
            <h2>Contact</h2>
            <p>
              If you want to contact us or have any cuestions
              please call on number:
              111 11 111 
              or email us on: 
              Tasky@tasky.com
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
export default Contact; 
