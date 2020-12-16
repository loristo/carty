import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const NavDiv = styled.div`
    width: 100%;
`;

function TopBar({ disconnect }) {
    return (
        <NavDiv>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href={`#/`}>Carty</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href={`#/carte/`}>Carte</Nav.Link>
                    <Nav.Link href={`#/historique/0/`}>Historique</Nav.Link>
                    <Nav.Link href={`#/apropos/`}>À propos</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link onClick={disconnect}>Déconnexion</Nav.Link>
                </Nav>
            </Navbar>
        </NavDiv>
    );
}

export default TopBar;
