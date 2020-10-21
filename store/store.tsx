import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer, State } from "./reducer";

const initialState = {};
const middleware = [thunk];
export const makeStore: MakeStore<State> = (context: Context) =>
  createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

export const wrapper = createWrapper<State>(makeStore, { debug: true });
