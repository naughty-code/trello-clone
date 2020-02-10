import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { makeStyles } from '@material-ui/core/styles';

import InputBase from '@material-ui/core/InputBase';

import TrelloCard from "./TrelloCard";
// import CardCollection from "./CardCollection";

import styled from "styled-components";

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
    getListboxProps,
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

  const renderOptions = (groupedOptions) => {

    if ( !groupedOptions || groupedOptions.length <= 0 )
      return null;

    return (
      <>
        { groupedOptions.map((card, index) => (
          <TrelloCard { ...getOptionProps({ card, index }) } key={ card.id } { ...card } index={ index } />
        )) }
      </>
    );
  }

  return (
    <SideMenuContainer>

      <div { ...getRootProps() }>
        <InputBase { ...getInputProps() } className={ classes.input } fullWidth />
      </div>

      <Droppable droppableId={ list.id }>

        { (provided) => (
            <div { ...provided.droppableProps } ref={ provided.innerRef }>
              { renderOptions(groupedOptions) }
              { provided.placeholder }
            </div>
          )
        }

      </Droppable>

    </SideMenuContainer>
  );
}
