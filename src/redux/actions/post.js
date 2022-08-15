import { postTypes } from "../types/post";
export const firstPost = (posts) => async (dispatch) => {
  try {
    dispatch({ type: postTypes.FIRST, payload: posts });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch({ type: postTypes.DELETE, payload: postId });
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = (post) => async (dispatch) => {
  try {
    dispatch({ type: postTypes.UPDATE, payload: post });
  } catch (error) {
    console.log(error);
  }
};
export const addPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: postTypes.ADD, payload: post });
  } catch (error) {
    console.log(error);
  }
};
