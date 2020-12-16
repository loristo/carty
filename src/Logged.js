import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import TopBar from './TopBar.js';
import Carte from './Carte.js';
import APropos from './APropos.js';
import Historique from './Historique.js';

const Content = styled.div`
    overflow: hidden;
    display: flex;
    flex: 1 0 0;
`;

function Logged({ disconnect }) {
    return (
        <>
            <TopBar disconnect={disconnect}/>
            <Content>
                <HashRouter>
                    <Switch>
                        <Route path="/historique">
                            <Historique/>
                        </Route>
                        <Route path="/apropos">
                            <APropos/>
                        </Route>
                        <Route>
                            <Carte/>
                        </Route>
                    </Switch>
                </HashRouter>
            </Content>
        </>
    );
}

export default Logged;
