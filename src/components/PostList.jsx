import Post from "./Post";
import WelcomeMsg from "./WelcomeMsg";
import LoadingSpinner from "./LoadingSpinner";
import { useState, useEffect, useContext } from "react";
import { PostListContext } from "../store/post-list-store";

const PostList = () => {
  const { postList, createInitialPosts } = useContext(PostListContext);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    //useEffect: Fetch data when the component mounts (means where react component is created and mounted to DOM)
    //Problem: While navigating submenu(create) to create post, then come back to  this component via home menu to display all posts, useEffect re-triggers the effect function and replaces the current list (including added posts) with the fetched initial data.
    let controller;
    const fetchPosts = async () => {
      //AbortController: to clean up side effects( abort fetch requests) when a component unmounts
      controller = new AbortController();
      const signal = controller.signal; //Get signal to pass to fetch

      setIsFetching(true); //Only show spinner when actual fetch starts

      try {
        // Set true before fetching
        const response = await fetch("https://dummyjson.com/posts", { signal });
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        createInitialPosts(data.posts);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted, likely due to component unmount");
        } else {
          setError(err.message);
        }
      } finally {
        setTimeout(() => {
          setIsFetching(false);
        }, 700); // While data is fetched from the API server, setIsFetching(false) is being called too quickly, but to render the initial posts in the Bootstrap UI takes a little time to appear. So if no delay is applied, React skips LoadSpinner rendering, and the Welcome component will show its message as the isFetching state is getting false immediately. Now React has time to render the spinner, and it appears as expected.
      }
    };

    //if the component is re-mounted (like when switching between menus) and the check (postList.length === 0) is true, then fetch the initial posts from dummy api server.
    if (postList.length === 0) {
      fetchPosts();
    }

    return () => {
      if (controller) controller.abort(); //Cleanup: abort the fetch if still running.
    };
  }, [postList.length, createInitialPosts]); // the effect function re-runs anytime when postList.length changes and fetch posts once when the postList is empty. and createInitialPosts which is basically dispatch of initial posts. e.g
  // dispatch({ type: "initial-posts", payload: data.posts })

  return (
    <>
      {console.log("Rendering - isFetching:", isFetching)}
      {isFetching && <LoadingSpinner />}
      {error && <h2 className="text-center">Error : {error}</h2>}
      {!isFetching && postList.length === 0 && <WelcomeMsg />}
      {!isFetching &&
        !error &&
        postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
};

export default PostList;
