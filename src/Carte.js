import React from 'react';
import styled from 'styled-components';

const TextDiv = styled.div`
    align-self: center;
    margin: auto;
    font-weight: bold;
    font-style: italic;
    color: grey;
`;

function Carte() {
    return (
        <TextDiv>
            La carte est momentanément indisponible
        </TextDiv>
    );
}

export default Carte;
