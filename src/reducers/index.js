import { combineReducers } from "redux";
import listsReducer from "./ListsReducer";
//import fixedListReducer from "./FixedListReducer";
//import { CONSTANTS } from "../actions";

//const mainReducer = (state, action) => {
//    switch action.type:
//        case CONSTANTS.
//};

export default combineReducers({
    lists: listsReducer
//    fixedList: fixedListReducer
});
