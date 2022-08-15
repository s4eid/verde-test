import { postTypes } from "../types/post";

const inisialState = {
  post: [],
};

export const posts = (state = inisialState, action) => {
  switch (action.type) {
    case postTypes.FIRST:
      return { ...state, post: action.payload };
    case postTypes.UPDATE:
      const newChange = JSON.parse(action.payload.id);
      var foundIndex = state.post.findIndex((x) => x.id == action.payload.id);
      const newPost = (state.post[foundIndex] = {
        title: action.payload.title,
        body: action.payload.body,
        id: newChange,
        userId: action.payload.userId,
      });
      return { ...state, newPost: newPost };
    case postTypes.DELETE:
      const recentId = JSON.parse(action.payload);
      return {
        ...state,
        post: state.post.filter((q) => q.id !== recentId),
      };
    case postTypes.ADD:
      state.post.push(action.payload);
      return {
        ...state,
        // post: state.post.push(action.payload),
      };
    default:
      return state;
  }
};
