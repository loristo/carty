import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import styled from 'styled-components';

import hashedPass from './HashedPass.js';
import Login from './Login.js';
import Logged from './Logged.js';

const FlexScreen = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

function App() {
    const [logged, setLogged] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const search = location.search;
        const params = new URLSearchParams(search);
        if (Base64.stringify(sha256(Base64.parse(params.get('pass') || '') || '')) === hashedPass)
            setLogged(true);
        else
            setLogged(false);
    }, [logged, location]);

    return (
        <FlexScreen>
            { logged
                ? <Logged />
                : <Login />
            }
        </FlexScreen>
    );
}

export default App;
