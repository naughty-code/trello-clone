import React from 'react';
import { connect } from "react-redux";

import { DragDropContext,  Droppable } from 'react-beautiful-dnd';
import styled from "styled-components";

import TrelloList from "./TrelloList";
import TrelloActionButton from './TrelloActionButton';

import SideMenu from './SideMenu.js';

import { sort } from '../actions';

import './App.css';

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const ColContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Col = styled.div`
  height: 100%;
`;

class InnerListsC extends React.Component{
  shouldComponentUpdate(newProps){
      if(newProps.lists === this.props.lists){
        return false;
      }
      return true;
  }
  render(){
    const { lists } = this.props;
      return lists.filter(l => !l.fixed).map((list, index) => 
      <TrelloList
        listID={list.id}
        key={list.id} 
        title={list.title} 
        cards={list.cards}
        index={index}
        >
      </TrelloList>
    );
  }
};

const mapStateToPropsC = (state) => ({lists: state.lists})

const InnerLists = connect(mapStateToPropsC)(InnerListsC);

class App extends React.Component{

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if( !destination ){
      return;
    }
    console.log(`src index: ${source.index} -- dest index: ${destination.index}`);
    console.log(`droppable id : ${source.droppableId}  -- dropableId: ${destination.droppableId}`);
    console.log(`${draggableId}`);
    console.log(`${type}`);
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
                <SideMenu/>
              </Col>
              <Col>
                <Droppable droppableId="all-lists" direction="horizontal" type="list">
                  {(provided, snapshot)=>(
                    <ListsContainer 
                      {...provided.droppableProps} 
                      ref={provided.innerRef}
                    >
                      { lists.map((list, index) => ({...list, index}))
                        .filter(l => l.index > 0)
                        .map((list => <TrelloList
                                            listID={list.id}
                                            key={list.id} 
                                            title={list.title} 
                                            cards={list.cards}
                                            index={list.index}
                                          ></TrelloList>
                        ))
                      }
                      {provided.placeholder}
                      <TrelloActionButton list/>
                    </ListsContainer>
                  )}
                </Droppable>
              </Col>
            </ColContainer>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);
