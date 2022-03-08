import {Action } from "@ngrx/store";

export const LOAD_AUTHORIZATION = '[AUTHORIZATION] LOAD USER AUTHORIZATION DATA'

export class LoadAuthoziration implements Action {
  readonly type = LOAD_AUTHORIZATION;

  constructor(public payload:any){

  }
}

export type AuthorizationAction = | LoadAuthoziration;