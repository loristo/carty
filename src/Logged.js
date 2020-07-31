import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import hashedPass from './HashedPass.js';

function Logged() {
    const [logged, setLogged] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const search = location.search;
        const params = new URLSearchParams(search);
        if (sha256(params.get('pass') || '') === hashedPass)
            setLogged(true);
        else
            setLogged(false);
    }, [logged, location]);

    return (! logged
        ?
            <Redirect to='/' />
        :
            <div>
                Congrats ! You are logged in.
            </div>
    );
}

export default Logged;
