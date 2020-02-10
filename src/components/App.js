import React from 'react';
import { connect } from "react-redux";

import { DragDropContext,  Droppable } from 'react-beautiful-dnd';
import styled from "styled-components";

import TrelloList from "./TrelloList";

import SideMenu from './SideMenu.js';

import { sort } from '../actions';

import './App.css';

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;
const ColContainer = styled.div`
  display: flex;
`;

const GroupsContainer = styled.div`
  display: flex;
  align-items: baseline;
  flex-grow: 1;
  margin: 20px;
`

const Col = styled.div`
  height: 100%;
`;

class App extends React.Component{

  onDragEnd = (result) => {
    // TODO: reordering logic (DO IT NOW!)
    const { destination, source, draggableId, type } = result;
    if( !destination ){
      return;
    }
    this.props.dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type //draggablle type?
    ));

  }

  render() {
    const { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>

        <ColContainer>

          <Col>
            <SideMenu records={ lists.find(l => l.fixed) }/>
          </Col>

          <GroupsContainer>
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
              { (provided) => (

                <ListsContainer {...provided.droppableProps} ref={provided.innerRef} >

                  { lists.filter(l => !l.fixed).map((list, index) => 
                    <TrelloList
                      listID={list.id}
                      key={list.id} 
                      title={list.title} 
                      cards={list.cards}
                      index={index}
                      >
                    </TrelloList>
                  )}

                  {provided.placeholder}

                </ListsContainer>
              )}

            </Droppable>

          </GroupsContainer>

        </ColContainer>

      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);
