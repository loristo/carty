import React, { useRef } from 'react';
import styled from 'styled-components';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';


const RedText = styled.div`
    color: red;
    opacity: ${props => props.show ? 0 : 1};
`;

const LoginDiv = styled.div`
    align-self: center;
    margin: auto;
`;

function Login({ setPass, tried }) {
    const passRef = useRef(null);

    return (
        <>
            <Redirect to={``}/>
            <LoginDiv>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Adresse mail</Form.Label>
                        <Form.Control defaultValue="edouard.neigedent@haxxx.bad"
                            type="email" placeholder="Entre votre mel" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control ref={passRef} type="password" placeholder="Mot de passe" />
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={() => setPass(Base64.stringify(sha256(passRef.current.value)))}>
                    Connexion
                </Button>
                <RedText show={tried}>
                    Mauvais mot de passe
                </RedText>
            </LoginDiv>
        </>
    );
}

export default Login;
