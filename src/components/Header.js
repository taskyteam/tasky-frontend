import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../images/logo.png';



class Header extends React.Component{
    render(){
        return(
            <div className="main-nav">
                 {[false].map((expand) => (
        <Navbar key={expand} expand={expand}>
          <img className="logoHeader" src={logo} alt="logo" />
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
                  className="header-nav"
                  onClick={() => {
                    window.location.href = "/Home"; }}>
                        Home</Nav.Link>
                  <Nav.Link 
                  to="/Faq"
                  className="header-nav"
                  onClick={() => {
                    window.location.href = "/Faq"; }}>
                        FAQ</Nav.Link>
                  <Nav.Link 
                  to="/Contact"
                  className="header-nav"
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