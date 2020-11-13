import * as actionTypes from "../actions/types";
import { combineReducers } from "redux";

const initialState = {
  user: false,
  storedUsers: [
    {
      username: "demo",
      email: "test123@test.com",
      password: "demo"
    },
    {
      username: "1",
      email: "test321@test.com",
      password: "1"
    }
  ]
};

function user_Reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };
    case actionTypes.ADD_USER:
      return { ...state, storedUsers: [...state.storedUsers, action.payload] };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user: user_Reducer
});

export default rootReducer;