import {
  createContext,
  useCallback,
  useReducer,
  useState,
  useEffect,
} from "react";

export const PostListContext = createContext({
  postList: [],
  isFetching: false,
  isError: false,
  createPost: () => {},
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
  const [isError, setIsError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const createPost = (newPost) => {
    dispatchPostList({
      type: "add-new-post",
      payload: newPost,
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
    [dispatchPostList] //dependency dispatchPostList
  );

  //Fetching initial popsts and dispatch the initial posts.
  useEffect(() => {
    //useEffect: Fetch data when the component mounts (means where react component is created and mounted to DOM)
    let controller;
    const fetchPosts = async () => {
      //AbortController: to clean up side effects( abort fetch requests) when a component unmounts
      controller = new AbortController();
      const signal = controller.signal; //Get signal to pass to fetch

      setIsFetching(true); //Only show spinner when actual fetch starts

      try {
        const response = await fetch("https://dummyjson.com/posts", { signal });
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        dispatchPostList({
          type: "initial-posts",
          payload: data.posts,
        });
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted, likely due to component unmount");
        } else {
          setIsError(err.message);
        }
      } finally {
        setTimeout(() => {
          setIsFetching(false);
        }, 200);
      }
    };
    fetchPosts(); //effect function calling.

    return () => {
      if (controller) controller.abort(); //Cleanup: abort the fetch if still running.
    };
  }, []); // The effect function fetchPosts runs only once after the initial render

  return (
    <PostListContext.Provider
      value={{
        postList,
        createPost,
        isFetching,
        isError,
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
