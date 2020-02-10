import { combineReducers } from "redux";
import listsReducer from "./ListsReducer";
import fixedListReducer from "./FixedListReducer";

export default combineReducers({
    lists: listsReducer,
    fixedList: fixedListReducer
});