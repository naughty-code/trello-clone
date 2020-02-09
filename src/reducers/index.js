import { combineReducers } from "redux";
import listsReducer from "./ListsReducer";

export default combineReducers({
    lists: listsReducer
});