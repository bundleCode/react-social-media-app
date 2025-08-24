import { createContext, useReducer } from "react";

export const PostListContext = createContext({
  postList: [],
  createPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currentPostList, action) => {
  let NewPostList = currentPostList;
  if (action.type === "delete-post") {
    NewPostList = currentPostList.filter(
      (post) => post.id !== action.payload.id
    );
  } else if (action.type === "add-new-post") {
    NewPostList = [
      {
        id: action.payload.postId,
        title: action.payload.postTitle,
        body: action.payload.postBody,
        reactions: action.payload.postReactions,
        userId: action.payload.userId,
        tags: action.payload.postTags,
      },
      ...currentPostList,
    ];
  }
  return NewPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POSTLIST
  );

  const createPost = (userId, postTitle, postBody, postReactions, postTags) => {
    const postId = Date.now();
    dispatchPostList({
      type: "add-new-post",
      payload: {
        postId,
        postTitle,
        postBody,
        postReactions,
        userId,
        postTags,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "delete-post",
      payload: {
        id: postId,
      },
    });
  };

  return (
    <PostListContext.Provider
      value={{
        postList,
        createPost,
        deletePost,
      }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;

const DEFAULT_POSTLIST = [
  {
    id: 1,
    title: "Go to Puri Temple",
    body: "Puri is an ancient city in Odisha, known as one of the four Dhamas (holy pilgrimage sites) for Hindus, primarily because it is home to the great Jagannath Temple",
    reactions: 2,
    userId: "user-11",
    tags: ["vacation", "Enjoy", "Puri tourist place"],
  },
  {
    id: 2,
    title: "Completed My B. Tech!",
    body: "I completed my B.tech course and graduated with no back log and around 8 CGPA.",
    reactions: 10,
    userId: "user-9",
    tags: ["Graduating", "Unbelieveable", "Exam"],
  },
];
