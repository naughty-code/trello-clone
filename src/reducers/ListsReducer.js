import { CONSTANTS } from "../actions"

let listID = 2;
let cardID = 5;

const initialState  = [
    {
        title: "Last Episode",
        id: `list-${0}`,
        fixed:true,
        cards: [
            {
                id: `card-${0}`,
                text: "we created a static list and a static card"
            },
            {
                id: `card-${1}`,
                text: "we use a mix between material ui and react  components"
            }
        ]
    },
    {
        title: "This Episode",
        id: `list-${1}`,
        cards: [
            {
                id: `card-${2}`,
                text: "we will create our first reducer"
            },
            {
                id: `card-${3}`,
                text: "and render many cards on our list with static data"
            },
            {
                id: `card-${4}`,
                text: "we will also make some little changes  i forgot  in the last episode"
            }
        ]
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