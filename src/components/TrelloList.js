import React from "react";
import TrelloCard from "./TrelloCard";
import { Typography } from '@material-ui/core';
import TrelloActionButton from "./TrelloActionButton";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const ListContainer = styled.div`
    background-color: #ccc;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    margin-right: 8px;
    height: "100%"
`;

const TrelloList = ({ title, cards, listID, index }) => {
    return(
        <Draggable draggableId={String(listID)} index={index}>
            {(provided) => (
                <ListContainer 
                {...provided.draggableProps}   
                ref={provided.innerRef}
                {...provided.dragHandleProps} 
                >
                    <Droppable droppableId={String(listID)}>
                            {provided => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>            
                                    <Typography variant="h6">{title}</Typography>
                                    {cards.map((card, index) => (
                                        <TrelloCard 
                                                key={card.id} 
                                                text={card.text} 
                                                id={card.id} 
                                                index={index}
                                        />))}
                                    {provided.placeholder}
                                    <TrelloActionButton listID={ listID }/>
                                </div>
                                )}
                    </Droppable>
                </ListContainer>
            )}
        </Draggable>
    );
}

export default TrelloList;