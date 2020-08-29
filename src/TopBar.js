import React from 'react';
import { useLocation } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const NavDiv = styled.div`
    width: 100%;
`;

function TopBar() {
    const location = useLocation();
    const search = location.search;
    const params = new URLSearchParams(search);
    const pass = encodeURIComponent((params.get('pass')));

    return (
        <NavDiv>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href={`#/?pass=${pass}`}>Carty</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href={`#/carte/?pass=${pass}`}>Carte</Nav.Link>
                    <Nav.Link href={`#/historique/0/?pass=${pass}`}>Historique</Nav.Link>
                    <Nav.Link href={`#/apropos/?pass=${pass}`}>À propos</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/">Déconnexion</Nav.Link>
                </Nav>
            </Navbar>
        </NavDiv>
    );
}

export default TopBar;
