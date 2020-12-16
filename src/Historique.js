import React, { useState, useContext } from 'react';
import { HashRouter, Switch, Route, useRouteMatch } from 'react-router-dom';
import { Tab, ListGroup, Jumbotron } from 'react-bootstrap';
import { AES, enc } from 'crypto-js';
import styled from 'styled-components';

import { DataContext, encData } from './Data.js';
import PasswordContext from './PasswordContext';

const Content = styled.div`
    flex: 1 0 0;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    height: 100%;
`;

const ListDiv = styled.div`
    height: 100%;
    overflow-y: scroll;
`;

const SummaryDiv = styled.div`
    flex: 1 0 0;
`;

const Text = styled.p`
    margin: 0;
    padding: 0;
`;

const Yellow = styled.span`
    color: yellow;
`;

const GreyText = styled.p`
    margin: 0;
    padding: 0;
    color: grey;
`;

const FullJumbotron = styled.div`
    height: 100%;
    div {
        height: 100%;
    }
`;

function Liste() {
    const data = useContext(DataContext);
    let day = null;

    const updateDay = (e) => {
        if (day && e.startTime.getDate() === day.getDate()) return;
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        day = e.startTime;
        return (
            <ListGroup.Item variant="light" key={day}>
                {day.toLocaleDateString('fr-FR', options)}
            </ListGroup.Item>
        );
    }

    const ways = data.map((e, i) => {
        return (
            <React.Fragment key={i}>
                {updateDay(e)}
                <ListGroup.Item action href={`#/historique/${i}/`}>
                    <Text>
                        {e.src.city} &rarr; {e.dst.city}
                        {e.recurring
                            ? <Yellow>&#x2605;</Yellow>
                            : null}
                    </Text>
                    <GreyText>{e.alias}</GreyText>
                </ListGroup.Item>
            </React.Fragment>
        );
    });

    return (
        <Tab.Container id="list-group-tabs-example"
            defaultActiveKey={`#/historique/0/`}>
            <ListGroup>
                {ways}
            </ListGroup>
        </Tab.Container>
    );
}

function genAddress(address) {
    return `${address.number} ${address.street}, ${address.city}`;
}

function genDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return `${date.getHours().toString().padStart(2, '0')}:`
        + `${date.getMinutes().toString().padStart(2, '0')}, `
        + `${date.toLocaleDateString('fr-FR', options)}`;

}

function Summary() {
    const match = useRouteMatch();
    const data = useContext(DataContext);
    let id = parseInt(match.params.trajet);
    if (!Number.isInteger(id) || id < 0 || id >= data.length)
        id = 0;
    const trajet = data[id];
    return (
        <FullJumbotron>
            <Jumbotron>
                <h1>
                    {trajet.alias}
                    {trajet.recurring
                        ? <Yellow>&#x2605;</Yellow>
                        : null}
                </h1>
                <p>
                    Départ: {genAddress(trajet.src)}
                    <br/>
                    Déstination: {genAddress(trajet.dst)}
                </p>
                <p>
                    Départ: {genDate(trajet.startTime)}
                    <br/>
                    Arrivée: {genDate(trajet.endTime)}
                    <br/>
                    Durée du trajet: {trajet.time} minutes
                </p>
            </Jumbotron>
        </FullJumbotron>
    );
}

function Historique() {
    const pass = useContext(PasswordContext);
    const [data, ] = useState(
        JSON.parse((AES.decrypt(encData, pass) || '[]').toString(enc.Utf8)).map((e) => {
        e.startTime = new Date(e.startTime);
        e.endTime = new Date(e.endTime);
        return e;
    }));


    return (
        <Content>
            <DataContext.Provider value={data}>
            <ListDiv>
                <Liste />
            </ListDiv>
            <SummaryDiv>
                <HashRouter>
                    <Switch>
                        <Route path="/historique/:trajet">
                            <Summary />
                        </Route>
                        <Route>
                            <p>Route inconnue</p>
                        </Route>
                    </Switch>
                </HashRouter>
            </SummaryDiv>
            </DataContext.Provider>
        </Content>
    );
}

export default Historique;
