import { useContext, useRef } from "react";
import { PostListContext } from "../store/post-list-store";

const CreatePost = () => {
  const { createPost } = useContext(PostListContext);

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const userReactionsElement = useRef();
  const postTagsElement = useRef();

  const addNewPost = (event) => {
    event.preventDefault(); // prevents form from submitting to server

    let userId = userIdElement.current.value;
    let postTitle = postTitleElement.current.value;
    let postBody = postBodyElement.current.value;
    let postReactions = userReactionsElement.current.value;
    let postTags = postTagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    userReactionsElement.current.value = "";
    postTagsElement.current.value;

    createPost(userId, postTitle, postBody, postReactions, postTags);
  };

  return (
    <>
      <div className="h3 mb-5">What's your post about?</div>
      <form onSubmit={addNewPost} style={{ maxWidth: "600px" }}>
        <div className="mb-3">
          <label htmlFor="user-id" className="form-label">
            User Id
          </label>
          <input
            type="text"
            className="form-control"
            id="user-id"
            ref={userIdElement}
            defaultValue=""
            placeholder="Enter Post User-id number..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="post-title" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            className="form-control"
            id="post-title"
            ref={postTitleElement}
            defaultValue=""
            placeholder="Enter a headline for your post article.."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="post-body" className="form-label">
            Post Content
          </label>
          <textarea
            className="form-control"
            rows="4"
            id="post-body"
            ref={postBodyElement}
            defaultValue=""
            placeholder="Enter the deatils of your post article"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="post-reactions" className="form-label">
            Post Reactions
          </label>
          <input
            type="text"
            className="form-control"
            id="post-reactions"
            ref={userReactionsElement}
            defaultValue=""
            placeholder="Enter the no. of post reactions."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="post-tags" className="form-label">
            Post Tags
          </label>
          <input
            type="text"
            className="form-control"
            id="post-tags"
            ref={postTagsElement}
            defaultValue=""
            placeholder="Enter tags separated by spaces"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Post Data
        </button>
      </form>
    </>
  );
};

export default CreatePost;
