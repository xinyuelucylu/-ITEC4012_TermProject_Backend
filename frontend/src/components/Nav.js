import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

function NavBar({ isAuthenticated, username, onLogout }) {
    console.log('Props in NavBar:', { isAuthenticated, username });
    return (
        <Navbar className="navbar fixed-top navbar-expand-lg navbar-light  justify-content-between" style={{ backgroundColor: '#e3f2fd'}}>
            <div className="container-fluid" style={{ paddingLeft: '150px', paddingRight: '150px' }}>
                <Navbar.Brand as={LinkContainer} to="/"><Navbar.Brand><img src="/assets/Logo.png" width="80" height="80"  alt="Logo"/>
                    English-French Vocab</Navbar.Brand></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Courses" id="collasible-nav-dropdown">
                            <LinkContainer to="/Animals">
                                <Nav.Link>Animals</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/Colors">
                                <Nav.Link>Colors</Nav.Link>
                            </LinkContainer>
                        </NavDropdown>
                    </Nav>
                    {isAuthenticated ? (
                        <NavDropdown title={`Welcome, ${username}`} id="collasible-nav-dropdown">
                            <LinkContainer to="/MyVocabList">
                                <Nav>
                                    <Button variant="outline-info" className="mb-2">My vocab list</Button>
                                </Nav>
                            </LinkContainer>
                            <Nav>
                                <Button variant="outline-danger" onClick={onLogout}>Logout</Button>
                            </Nav>
                        </NavDropdown>
                    ) : (
                        <Nav>
                            <LinkContainer to="/Register">
                                <Nav.Link>Register</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/Login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        </Nav>

                    )}
                </Navbar.Collapse>

            </div>
        </Navbar>

    );
};

export default NavBar;