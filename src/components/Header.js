import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';


class Header extends React.Component{
    render(){
        return(
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
      </div>
          

        )
    }
}

export default Header;