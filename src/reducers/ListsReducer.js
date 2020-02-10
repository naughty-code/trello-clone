import { CONSTANTS } from "../actions"

let listID = 2;
let cardID = 5;

const initialState  = [
  {
    title: "Side Menu",
    id: `list-${0}`,
    fixed:true,
    cards: [
      {'id': 'card-0', 'text': 'ACCOMPLISHED'},
      {'id': 'card-1', 'text': 'COMMITTED'},
      {'id': 'card-2', 'text': 'TRUSTWORTHY'},
      {'id': 'card-3', 'text': 'TEAMWORK'},
      {'id': 'card-4', 'text': 'TRANSCENDENT'},
      {'id': 'card-5', 'text': 'MEMORABLE'},
      {'id': 'card-6', 'text': 'LEADER'},
      {'id': 'card-7', 'text': 'ARROGANT'},
      {'id': 'card-8', 'text': 'COMBATIVE'},
      {'id': 'card-9', 'text': 'CONFUSED'},
      {'id': 'card-10', 'text': 'TRADITIONALISM'},
      {'id': 'card-11', 'text': 'WORTHLESS'},
      {'id': 'card-12', 'text': 'COMPLEX'},
      {'id': 'card-13', 'text': 'Unfinished.'},
      {'id': 'card-14', 'text': 'CUSTOM'},
      {'id': 'card-15', 'text': 'PAINSTAKING'},
      {'id': 'card-16', 'text': 'AFFLUENCE'},
      {'id': 'card-17', 'text': 'AGREEABLE'},
      {'id': 'card-18', 'text': 'ABUSIVE'},
      {'id': 'card-19', 'text': 'ACADEMIC'},
      {'id': 'card-20', 'text': 'ADVENTURE'},
      {'id': 'card-21', 'text': 'ACHIEVEMENT'},
      {'id': 'card-22', 'text': 'ABRASIVE'},
      {'id': 'card-23', 'text': 'ADEQUATE'},
      {'id': 'card-24', 'text': 'ALERT'},
      {'id': 'card-25', 'text': 'INFORMATIVE'},
      {'id': 'card-26', 'text': 'ADAPTABLE'},
      {'id': 'card-27', 'text': 'JEALOUS'},
      {'id': 'card-28', 'text': 'ABRUPT'},
      {'id': 'card-29', 'text': 'SPEED'},
      {'id': 'card-30', 'text': 'ALIVE'},
      {'id': 'card-31', 'text': 'ABLE'},
      {'id': 'card-32', 'text': 'ALOOF'},
    ]
  },
  {
    title: "“Who we are”",
    id: `list-${2}`,
    cards: [ ]
  },
  {
    title: "How we want our users to feel",
    id: `list-${3}`,
    cards: [ ]
  },
  {
    title: "“Who we’d like to be”",
    id: `list-${4}`,
    cards: [ ]
  },
  {
    title: "“Who we aren’t”",
    id: `list-${5}`,
    cards: [ ]
  },
]

const listsReducer = (state = initialState, action) => {
    switch (action.type){
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listID}`
            }
            listID += 1;
            return [...state, newList]
        case CONSTANTS.ADD_CARD:
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
            }
            cardID += 1;
            return state.map(list => {
                if(list.id === action.payload.listID){
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                }
                return list
            });
        case CONSTANTS.DRAG_HAPPENED:
            const newState = [...state];
            const { droppableIdStart,
                    droppableIdEnd,
                    droppableIndexStart,
                    droppableIndexEnd,
                    draggableId,
                    type
            } = action.payload;
            //dragging list around
            if(type === "list"){
                const list = newState.splice(droppableIndexStart+1, 1); // added +1 because since we are passing all elements without the fixed list when we use the droppable indexes brought by the component, those indexes are moved -1 from the real list
                newState.splice(droppableIndexEnd+1, 0, ...list);
                return newState;
            }
            //in the same list
            if(droppableIdStart === droppableIdEnd){
                const list = newState.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
            }
            //other list
            if(droppableIdStart !== droppableIdEnd){
                const listStart = newState.find(list => droppableIdStart === list.id);
                const listEnd = newState.find(list => droppableIdEnd === list.id);
                const card = listStart.cards.splice(droppableIndexStart, 1);
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }
            return newState;
        default:
            return state;
    }
};

export default listsReducer;
