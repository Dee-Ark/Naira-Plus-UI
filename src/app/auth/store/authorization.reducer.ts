import { INITIAL_STATE } from "@ngrx/store";

import { AuthorizationAction, LOAD_AUTHORIZATION } from "./authorization.action";
export interface IState {
  authorization: any
}

const initialState: IState = {
  authorization: []
}

export function authorizationReducer(state = initialState, action:AuthorizationAction){
  switch(action.type){
    case LOAD_AUTHORIZATION:
      return {
        ...state,
        authorization: action.payload
      }
  }
}