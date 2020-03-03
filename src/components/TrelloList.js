import React from "react";
import DraggableCard, { TrelloCard } from "./TrelloCard";
import { Typography } from '@material-ui/core';
import TrelloActionButton from "./TrelloActionButton";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const ListContainer = styled.div`
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    height: "100%";
    background-color: ${props => props.isDragging ? '#aaa' : '#ccc'};
    color:  ${props => props.isDragging ? 'white' : 'black'};
    display: flex;
    flex-direction: column;
    margin-left: 8px;
`;

const ListCardsContainer = styled.div``;

/*
const DraggableCard = (cardProps) => {
    const { index, id } = cardProps;
    return (
        <Draggable index={index} draggableId={id}>
            {(draggableProvided, draggableSnapshot) => (
                <TrelloCard {...cardProps} provided={draggableProvided} isDragging={draggableSnapshot.isDragging}/>
            )}
        </Draggable>
    ); 
};*/

const TrelloList = ({ title, cards, listID, index }) => {
    return(
        <Draggable draggableId={String(listID)} index={index}>
            {(draggableProvided, draggableSnapshot) => (
                <ListContainer 
                {...draggableProvided.draggableProps}   
                ref={draggableProvided.innerRef}
                {...draggableProvided.dragHandleProps} 
                isDragging={draggableSnapshot.isDragging}
                >
                    <Typography variant="h6">{title}</Typography>
                    <Droppable droppableId={String(listID)}>     
                            {(droppableProvided, droppableSnapshot) => (    
                                <ListCardsContainer {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>            
                                    {cards.map((card, index) => (   
                                        <DraggableCard 
                                                key={card.id} 
                                                text={card.text} 
                                                id={card.id} 
                                                index={index}
                                        />))}
                                    {droppableProvided.placeholder}
                                    <TrelloActionButton listID={ listID }/>
                                </ListCardsContainer>
                                )}
                    </Droppable>
                </ListContainer>
            )}
        </Draggable>
    );
}

export default TrelloList;