<<<<<<< HEAD
import React, { forwardRef } from 'react';
import {useState} from 'react';
import { Droppable, Draggable } from "react-beautiful-dnd";
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
=======
import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { FixedSizeList as List } from 'react-window';

import InputBase from '@material-ui/core/InputBase';
>>>>>>> 08d539b6a47aaa56ea9f3c19b85c6a132e869f77

import InputBase from '@material-ui/core/InputBase';

import DraggableCard, { TrelloCard } from "./TrelloCard";
// import CardCollection from "./CardCollection";

import styled from "styled-components";
import { connect } from 'react-redux';

const SideMenuContainer = styled.div`
  width: 250px;
  height: calc(100vh);
  overflow: auto;
`;

const useStyles = makeStyles({
  input: {
    paddingLeft: 10,
    backgroundColor: '#fafafa',
    border: '1px solid #e0e0e0'
  }
});

// open 
// disableCloseOnSelect
// options={ options }
// onChange={ onAutoCompleteChange }
// className={ classes.propertyDetailSideBox }
// classes={{ listBox: classes.listBox }}

const InnerSideMenu = ({ lists }) => {

  //if ( !list || !list.cards )
  //  return 'No Cards in this list';
  const [ kw, setKW ] = useState('');

  const classes = useStyles();

  /*const DraggableCard = (cardProps) => {
    const { index, id, style } = cardProps;
    return (
        <Draggable index={index} draggableId={id} key={id}>
            {(provided) => (
                <TrelloCard {...cardProps} provided={provided} style={{ margin: 0, ...style }}/>
            )}
        </Draggable>
    ); 
   };*/

  const Row = ({ data, index, style }) => {

    //const item = data.find(card => card.index === index);
    //console.log(data);
    const item = data[index];
    console.log(item);
    return (
      <DraggableCard 
        index={index}
        key={item.id} 
        {...item}
        style={style}
      />
    )
  };


  const renderClone = (draggableProvided, snapshot, rubric) => {
    console.log(`rubric: ${rubric.source.index}`);
    const card = lists[0].cards[rubric.source.index];
    return (
      <TrelloCard
        draggableProvided={draggableProvided}
        isDragging={snapshot.isDragging}
        index={rubric.source.index}
        {...card}
      />
    );
  };
  const filteredCards = lists[0].cards.map((c, index) => ({...c, index})).filter(c => c.text.toLowerCase().includes(kw.toLowerCase()));
  console.log(filteredCards);
  return (
    <SideMenuContainer>
      <React.Fragment>
      <InputBase 
        className={ classes.input } 
        fullWidth 
        onChange={
          (e) => {setKW(e.target.value);}
        }
      />
      <Droppable 
        droppableId={ String(lists[0].id) } 
        mode="virtual"
        renderClone={ renderClone }
      >
        { (droppableProvided, snapshot) => (
            <List
            itemCount={filteredCards.length}
            itemSize={50}
            height={850}
            width={300}
            outerRef={ droppableProvided.innerRef }
            itemData={filteredCards}
            isDraggingOver={snapshot.isDraggingOver}
            itemKey={(index, data) => (data[index].id)}
            >
            { Row }
            </List>
        )}
      </Droppable>
      </React.Fragment>
    </SideMenuContainer>
  );
}

const mapStateToProps = (state) => ({lists: state.lists})

const SideMenu = connect(mapStateToProps)(InnerSideMenu);

export default SideMenu;