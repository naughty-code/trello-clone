import React from "react";
import TrelloCard from "./TrelloCard";
import { Droppable } from "react-beautiful-dnd";
import  styled  from "styled-components";

const CardCollectionContainer = styled.div`
`;

class CardList extends React.Component{
  shouldComponentUpdate(nextProps){
    if(nextProps.cards === this.props.cards){
      return false;
    }
    return true;
  }
  render(){
    const { cards } = this.props;
    return list.cards.map((card, index) => (
      <TrelloCard key={card.id} {...card} index={index} />
    ));
  }
}

const CardCollection = ({list}) => {

  return (
      <Droppable droppableId={list.id}>
      { (provided) => (

        <CardCollectionContainer {...provided.droppableProps} ref={provided.innerRef}>

          <CardList cards={list.cards}/>
          { provided.placeholder }

        </CardCollectionContainer>
      )}
      </Droppable>
    );
};


export default CardCollection;
