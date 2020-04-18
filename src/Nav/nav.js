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
const NavigationBar = ({ imgs, user, getFriends, setBGImage }) => {
  console.log(user);
  return (
    <Styles>
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Link
                  onClick={() => {
                    getFriends();
                  }}
                  to={{
                    pathname: "/profile",
                    imgs,
                  }}
                >
                  Profile
                </Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Link to="/home">Main</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Link to="/upload">Upload</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                {user.id !== null ? <Link to="/">Logout</Link> : null}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                {user.id !== null ? <Link to="/search">Search</Link> : null}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
}

export default NavigationBar;
