import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { sha256 } from 'js-sha256';
import { Redirect } from 'react-router-dom';

import hashedPass from './HashedPass.js';

function Login() {
    const [pass, setPass] = useState('');
    const [redirect, setRedirect] = useState(false);
    const passRef = useRef(null);

    useEffect(() => {
        if (sha256(pass) === hashedPass)
            setRedirect(true);
    }, [pass, redirect]);

    return (
        <div>
            { redirect ? <Redirect to={`/logged?pass=${ pass }`} /> : null }
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Adresse mel</Form.Label>
                    <Form.Control defaultValue="edouard.neigedent@haxxx.bad"
                        type="email" placeholder="Entre votre mel" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control ref={passRef} type="password" placeholder="Mot de passe" />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={() => setPass(sha256(passRef.current.value))}>
                Connexion
            </Button>

            { pass !== '' ? <div>Mauvais mot de passe</div> : null }
        </div>
    );
}

export default Login;
