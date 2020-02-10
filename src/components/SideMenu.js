import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { FixedSizeList as List } from 'react-window';

import InputBase from '@material-ui/core/InputBase';

import TrelloCard from "./TrelloCard";
// import CardCollection from "./CardCollection";

import styled from "styled-components";
import { connect } from 'react-redux';

const SideMenuContainer = styled.div`
  width: 250px;
  height: 100vh;
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

export default function({ list, ...other }) {

  if ( !list || !list.cards )
    return 'No Cards in this list';

  const classes = useStyles();

  const getOptionLabel = (option) => {
    return option.text || '';
  };

  const {
    getRootProps,
    // getInputLabelProps,
    getInputProps,
    // getListboxProps,
    getOptionProps,
    groupedOptions,

  } = useAutocomplete({ 
    open: true,
    // disableCloseOnSelect: true,
    options: list.cards,
    getOptionLabel, 
    // getOptionSelected, 
    componentName: 'Autocomplete',
    ...other
  });

  const Row = ({ data, index, style }) => {

    const item = data[index];

    return (
      <TrelloCard 
        { ...getOptionProps({ item, index }) } 
        key={ item.id } 
        { ...item } 
        index={ index } 
        cardStyle={ style }
      />
    )
  };

  const renderOptions = (provided, snapshot, groupedOptions) => {

    //{ ...provided.droppableProps }

    const itemCount = snapshot.isUsingPlaceholder 
      ? groupedOptions.length + 1 
      : groupedOptions.length;

    if ( !groupedOptions || groupedOptions.length <= 0 )
      return null;

    return (
      <List
        height={800}
        itemCount={ itemCount }
        itemSize={70}
        width={300}
        outerRef={ provided.innerRef }
        itemData={ groupedOptions }
      >
        { Row }
      </List>
    );
  }

  const renderClone = (provided, snapshot, rubric) => {
    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        Item id: {rubric.draggableId}
      </div>
    );
  }

  return (
    <SideMenuContainer>

      <div { ...getRootProps() }>
        <InputBase { ...getInputProps() } className={ classes.input } fullWidth />
      </div>

      <Droppable 
        droppableId={ list.id } 
        mode="virtual"
        renderClone={ renderClone }
      >

        { (provided, snapshot) => renderOptions(provided, snapshot, groupedOptions) }

      </Droppable>

    </SideMenuContainer>
  );
}

const mapStateToProps = (state) => ({list: state.lists[0]})

const SideMenu = connect(mapStateToProps)(SideMenuC);

export default SideMenu;