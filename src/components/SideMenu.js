import React from 'react';
import { Droppable } from "react-beautiful-dnd";

import TrelloCard from "./TrelloCard";
// import CardCollection from "./CardCollection";

import styled from "styled-components";

const SideMenuContainer = styled.div`
  width: 250px;
  height: calc(100vh);
  overflow: auto;
`;

export default function({ records }) {

  if ( !records || !records.cards )
    return 'No Cards in this list'

  return (
    <Droppable droppableId={records.id}>

      { (provided) => (

        <SideMenuContainer { ...provided.droppableProps } ref={ provided.innerRef }>

          { records.cards.map((card, index) => (
            <TrelloCard key={ card.id } { ...card } index={ index } />
          )) }

          { provided.placeholder }

        </SideMenuContainer>
      )}

    </Droppable>
  );
}
