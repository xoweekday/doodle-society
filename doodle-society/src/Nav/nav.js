import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #008080;
  }
  a,
  .navbar-brand,
  .navbar-nav .nav-link {
    color: #000;
    &:hover {
      color: white;
    }
  }
`;
const NavigationBar = () => (
  <Styles>
    < Navbar collapseOnSelect="true" fixed = "top"
    color = "red"
    expand = "lg" >
      <Navbar.Brand href="/">Team Doodle</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link>
              <Link to="/">Signup</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/login">login</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/profile">profile</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/home">home</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);

export default NavigationBar;
