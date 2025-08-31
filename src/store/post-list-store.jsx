import { createContext, useCallback, useReducer } from "react";

export const PostListContext = createContext({
  postList: [],
  createPost: () => {},
  createInitialPosts: () => {},
  deletePost: () => {},
});

const postListReducer = (currentPostList, action) => {
  let NewPostList = currentPostList;
  if (action.type === "delete-post") {
    NewPostList = currentPostList.filter(
      (post) => post.id !== action.payload.id
    );
  } else if (action.type === "initial-posts") {
    NewPostList = action.payload;
  } else if (action.type === "add-new-post") {
    NewPostList = [action.payload, ...currentPostList]; // here action.payload is a new post object.
  }
  return NewPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const createPost = (title, body, tags, reactions, views, userId) => {
    const id = Date.now();
    dispatchPostList({
      type: "add-new-post",
      payload: {
        id,
        title,
        body,
        tags,
        reactions,
        views,
        userId,
      },
    });
  };
  //useCallback is used to memoize/caches deletePost function and so it is only recreated when the dependency array dispatchPostList method is changed. This prevents unnecessary re-renders of the components.
  // Why is this important?
  // When you pass a function as a prop to a child component, React checks if the function has changed. If it has, React will re-render the child component. By memoizing the function with useCallback, you can prevent unnecessary re-renders and improve performance.

  const deletePost = useCallback(
    (postId) => {
      dispatchPostList({
        type: "delete-post",
        payload: {
          id: postId,
        },
      });
    },
    [dispatchPostList]
  );

  const createInitialPosts = (postList) => {
    dispatchPostList({
      type: "initial-posts",
      payload: postList,
    });
  };

  return (
    <PostListContext.Provider
      value={{
        postList,
        createPost,
        createInitialPosts,
        deletePost,
      }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;

// const DEFAULT_POSTLIST = [
//   {
//     id: 1,
//     title: "Go to Puri Temple",
//     body: "Puri is an ancient city in Odisha, known as one of the four Dhamas (holy pilgrimage sites) for Hindus, primarily because it is home to the great Jagannath Temple",
//     tags: ["vacation", "Enjoy", "Puri tourist place"],
//     reactions: {
//       likes: 19,
//       dislikes: 2,
//     },
//     views: 30,
//     userId: 121,
//   },
//   {
//     id: 2,
//     title: "His mother had always taught him",
//     body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
//     tags: ["history", "american", "crime"],
//     reactions: {
//       likes: 192,
//       dislikes: 25,
//     },
//     views: 305,
//     userId: 121,
//   },
// ];
