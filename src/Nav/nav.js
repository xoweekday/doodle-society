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
<<<<<<< HEAD
  <Styles>
    <Navbar
    expand = "lg" >
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
                setBGImage('');
                getFriends();
              }} 
                to={{
                pathname:"/profile",
                imgs,
                }}>Profile</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/home" onClick={() => setBGImage('')}>Main</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/upload" onClick={() => setBGImage('')}>Upload</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              { user.id !== null ? <Link to="/">Logout</Link> : null}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              { user.id !== null ? <Link to="/search" onClick={() => setBGImage('')}>Search</Link> : null}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
  )
=======
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
                  onClick={getFriends}
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
>>>>>>> 90cf436b1c4e70059786591e546b7371ef83285c
}

export default NavigationBar;
