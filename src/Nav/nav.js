import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { GoogleLogout } from 'react-google-login';

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
const NavigationBar = ({ imgs, user, setUser, getFriends }) => {
  console.log(user);
  return (
    <Styles>
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link>
                <Link to="/home">Home</Link>
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
                <Link to="/upload">Upload</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                {user.id !== null ? <Link to="/search">Search</Link> : null}
              </Nav.Link>
            </Nav.Item>
            {user.id &&
            <Nav.Item>
            <GoogleLogout
                    clientId="847322546124-r3jf05c1p89vlk3g6jbrbsv0632mh4go.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <Nav.Link>
                        <Link to="/" onClick={renderProps.onClick}>Logout</Link>
                      </Nav.Link>
                    )}
                    onLogoutSuccess={() => setUser({id: null})}
                  />
            </Nav.Item>
            }   
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
}

export default NavigationBar;
