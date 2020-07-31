import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login.js';
import Logged from './Logged.js';

function App() {
    return (
        <Switch>
            <Route path='/logged'>
                <Logged />
            </Route>
            <Route>
                <Login />
            </Route>
        </Switch>
    );
}

export default App;
