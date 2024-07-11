import React from "react"
import CartWidget from "../CartWidget/CartWidget"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from "react-router-dom";
import logo from '../../logo.png'
import '../../index.css';


const NavBar=()=>{
    return (
      
      <>
        {[ 'xxl' ].map((expand) => (
             
          <Navbar key={expand}   sticky="top" bg="light" expand={expand} className="  mb-3">
            <Container fluid>
              <a className="navbar-brand text-opacity-20 text-primary bg-opacity-100"  href={"/"}>
                          <span className=" fw-bolder">Equipo 1 - ECommerce</span>
                          <img src={logo} alt="Logo"  width="80" height="80" className=" shadow-none  opacity-100 mx-3"/>
              </a>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Equipo 1 E-Commerce
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavLink className="inactive"  to={"/"}>Home</NavLink>
                  <NavDropdown
                    title="Tienda"
                    className="drop" 
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavLink className="inactive"  to={"/category/notebook"}>Notebooks</NavLink>
                    <NavLink className="inactive" to={"/category/celular"}>Celulares</NavLink>
                    <NavLink className="inactive"  to={"/category/tablet"}>Tablets</NavLink>
                  </NavDropdown>
                  <NavLink className="inactive"  to={"/Clientes"}>Clientes</NavLink>
                  <NavLink className="inactive"  to={"/suppliers"}>Proveedores</NavLink>
                  <NavLink className="inactive"  to={"/products"}>Productos</NavLink>
                  <NavDropdown
                    title="Reportes"
                    className="drop" 
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavLink className="inactive"  to={"/sales-report"}>Ventas</NavLink>
                    <NavLink className="inactive" to={"/purchase-report"}>Compras</NavLink>
                  </NavDropdown>
                  <NavLink className="inactive"  to={"/contact"}>Contacto</NavLink>
                </Nav>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Proximamente..."
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </Offcanvas.Body><CartWidget className=' rounded-5' key={expand} bg="light" expand={expand} />
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      
        
        ))}
      
    </>
    
  );
}

export default NavBar