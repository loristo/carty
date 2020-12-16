import React, { useState, useEffect } from 'react';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import styled from 'styled-components';

import hashedPass from './HashedPass.js';
import Login from './Login.js';
import Logged from './Logged.js';
import PasswordContext from './PasswordContext';

const FlexScreen = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

function App() {
    const [logged, setLogged] = useState(true);
    const [pass, setPass] = useState('');

    const disconnect = () => setPass('');

    useEffect(() => {
        if (Base64.stringify(sha256(Base64.parse(pass) || '')) === hashedPass)
            setLogged(true);
        else
            setLogged(false);
    }, [logged, pass]);

    return (
        <FlexScreen>
            { logged
                ?
                    <PasswordContext.Provider value={pass}>
                        <Logged disconnect={disconnect}/>
                    </PasswordContext.Provider>
                :
                    <Login setPass={setPass} tried={pass === ''}/>
            }
        </FlexScreen>
    );
}

export default App;
