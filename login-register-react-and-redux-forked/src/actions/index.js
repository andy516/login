import * as actionTypes from "./types";

export function setUser(user) {
  return {
    type: actionTypes.SET_USER,
    payload: user
  };
}

export function addUser(userData) {
  return {
    type: actionTypes.ADD_USER,
    payload: userData
  };
}