import React from "react";
import TrelloCard from "./TrelloCard";
import { Droppable } from "react-beautiful-dnd";
import  styled  from "styled-components";

const CardCollectionContainer = styled.div`
`;

const CardCollection = ({list}) => {

  return (!list.cards) 
    ? 'No Cards in Main List' 
    : (
      <Droppable droppableId={list.id}>
      { (provided) => (

        <CardCollectionContainer {...provided.droppableProps} ref={provided.innerRef}>

          { list.cards.map((card, index) => (
            <TrelloCard key={card.id} {...card} index={index} />
          )) }

          { provided.placeholder }

        </CardCollectionContainer>
      )}
      </Droppable>
    );
};


export default CardCollection;
