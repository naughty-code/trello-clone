import React from "react";
import TrelloCard from "./TrelloCard";
import { Droppable } from "react-beautiful-dnd";
import  styled  from "styled-components";
import { connect } from "react-redux";

const CardCollectionContainer = styled.div`
`;

const CardCollection = ({fixedList}) => !fixedList.cards ? 'No Cards in Main List' : (
    <Droppable type="fixed" droppableId={fixedList.id}>
        {(provided) => (
            <CardCollectionContainer {...provided.droppableProps} ref={provided.innerRef}>
                    {fixedList.cards.map((card, index) => <TrelloCard key={card.id} {...card} index={index}/>)}
                    {provided.placeholder}
            </CardCollectionContainer>
        )}
    </Droppable>
);

const mapStateToProps = (state) => ({fixedList: state.fixedList});

export default connect(mapStateToProps)(CardCollection);