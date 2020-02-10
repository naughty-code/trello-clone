import React from 'react';
import { Droppable } from "react-beautiful-dnd";

import TrelloCard from "./TrelloCard";
// import CardCollection from "./CardCollection";

import styled from "styled-components";
import { connect } from 'react-redux';

const SideMenuContainer = styled.div`
  width: 250px;
  height: 100vh;
  overflow: auto;
`;

function SideMenuC({ list }) {
  return (
    <Droppable droppableId={list.id}>

      { (provided) => (

        <SideMenuContainer { ...provided.droppableProps } ref={ provided.innerRef }>

          { list.cards.map((card, index) => (
            <TrelloCard key={ card.id } { ...card } index={ index } />
          )) }

          { provided.placeholder }

        </SideMenuContainer>
      )}

    </Droppable>
  );
}

const mapStateToProps = (state) => ({list: state.lists[0]})

const SideMenu = connect(mapStateToProps)(SideMenuC);

export default SideMenu;