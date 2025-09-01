import Post from "./Post";
import WelcomeMsg from "./WelcomeMsg";
import LoadingSpinner from "./LoadingSpinner";
import { useContext } from "react";
import { PostListContext } from "../store/post-list-store";

const PostList = () => {
  const { postList, isFetching, isError } = useContext(PostListContext);

  return (
    <>
      {isFetching && <LoadingSpinner />}
      {isError && <h2 className="text-center">Error : {isError}</h2>}
      {!isFetching && postList.length === 0 && <WelcomeMsg />}
      {!isFetching &&
        !isError &&
        postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
};

export default PostList;
