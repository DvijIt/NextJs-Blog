import axios from "axios";
import * as types from "../types";

const apiUrl = "https://simple-blog-api.crew.red/posts";

export const fetchposts = () => async (dispatch) => {
  const res = await axios.get(apiUrl);
  dispatch({
    type: types.GET_POSTS,
    payload: res.data,
  });
};
