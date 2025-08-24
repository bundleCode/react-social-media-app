import { useContext } from "react";
import Post from "./Post";
import { PostListContext } from "../store/post-list-store";
import WelcomeMsg from "./WelcomeMsg";

const PostList = () => {
  const { postList, createInitialPosts } = useContext(PostListContext);

  const handleInitialsPosts = () => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => createInitialPosts(data.posts));
  };

  return (
    <>
      {postList.length === 0 && (
        <WelcomeMsg initialPosts={handleInitialsPosts} />
      )}
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;
