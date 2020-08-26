import React from 'react';
import styled from 'styled-components';

const TextDiv = styled.div`
    margin: auto;
    margin-top: 100px;
    color: grey;
`;

function APropos() {
    return (
        <TextDiv>
            <center>
            Créé par le groupe 9 pour le FIC 2021.
            <br/>
            Ce site n'a pour but uniquement d'être utilisé comme exercice du FIC. Il n'a pas vocation à servire comme moyen d'accès à une carte.
            <br/>
            Essayer de trouver les informations dans le code source du site serait plus long que de réaliser le défi dans sa totalité, il est donc déconseillé d'essayer de le faire.
            </center>
        </TextDiv>
    );
}

export default APropos;
