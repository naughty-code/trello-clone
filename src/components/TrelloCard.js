import React from "react";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Draggable } from 'react-beautiful-dnd';
import styled from "styled-components";
import { withStyles } from "@material-ui/core";

const CardContainer = styled.div`
    padding: 1px;
    background-color: ${props => props.isDragging ? 'green' : 'white'};
    color:  ${props => props.isDragging ? 'white' : 'black'};
    width: 290px;
    border-radius: 3px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
`;

function getStyle({ draggableStyle, virtualStyle, isDragging }) {
  // If you don't want any spacing between your items
  // then you could just return this.
  // I do a little bit of magic to have some nice visual space
  // between the row items
  const combined = {
    ...virtualStyle,
    ...draggableStyle
  };

  // Being lazy: this is defined in our css file
  const grid = 8;

  // when dragging we want to use the draggable style for placement, otherwise use the virtual style
  const result = {
    ...combined,
    height: isDragging ? combined.height : combined.height - grid,
    left: isDragging ? combined.left : combined.left + grid,
    width: isDragging
      ? draggableStyle.width
      : `calc(${combined.width} - ${grid * 2}px)`,
    marginBottom: grid
  };

  return result;
}

export const TrelloCard = ({ id, text, index, style, draggableProvided, isDragging }) => {
  return (
    <CardContainer
      {...draggableProvided.draggableProps}
      {...draggableProvided.dragHandleProps}
      isDragging={isDragging}
      ref={draggableProvided.innerRef}
      index={index}
      key={id}
      style={getStyle({
        draggableStyle: draggableProvided.draggableProps.style,
        virtualStyle: style,
        isDragging
      })}
    >
          <Typography
            gutterBottom
          >
            {text}
          </Typography>
    </CardContainer>
  );
};

const DraggableCard = (cardProps) => {
  const { index, id } = cardProps;
  return (
    <Draggable index={index} draggableId={id}>
      {(draggableProvided, draggableSnapshot) => (
        <TrelloCard {...cardProps} draggableProvided={draggableProvided} isDragging={draggableSnapshot.isDragging} />
      )}
    </Draggable>
  );
}

  export default DraggableCard;