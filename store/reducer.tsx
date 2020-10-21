import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import * as types from "./types";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface State {
  posts: Post[];
  isInit: string;
}

export const initialState = {
  posts: [],
  isInit: "init",
};

export const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      if (action.payload.isInit === "init") delete action.payload.isInit;
      return { ...state, ...action.payload };
    case types.GET_POSTS:
      return { ...state, posts: action.payload };
    case "APP":
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};
