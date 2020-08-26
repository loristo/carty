import React from 'react';
import styled from 'styled-components';

import Data from './Data.js';

const Content = styled.div`
    display: flex;
    flex: 1 0 0;
    flex-direction: row;
`;

const ListDiv = styled.div`
    height: 100%;
    overflow-y: scroll;
`;

const SummaryDiv = styled.div`
`;

function Historique() {
    return (
        <Content>
            <ListDiv>
                La liste
            </ListDiv>
            <SummaryDiv>
            </SummaryDiv>
        </Content>
    );
}

export default Historique;
