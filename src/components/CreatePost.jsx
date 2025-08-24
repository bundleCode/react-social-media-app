import { useContext, useRef } from "react";
import { PostListContext } from "../store/post-list-store";

const CreatePost = () => {
  const { createPost } = useContext(PostListContext);

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const userReactionsLikeElement = useRef();
  const userReactionsDislikeElement = useRef();
  const postTagsElement = useRef();
  const postViewsElement = useRef();

  const addNewPost = (event) => {
    event.preventDefault(); // prevents form from submitting to server

    let userId = userIdElement.current.value;
    let postTitle = postTitleElement.current.value;
    let postBody = postBodyElement.current.value;
    let postLikeReactions = userReactionsLikeElement.current.value;
    let postDislikeReactions = userReactionsDislikeElement.current.value;
    let postViews = postViewsElement.current.value;
    let postTags = postTagsElement.current.value.split(" ");
    let reactions = {
      likes: postLikeReactions,
      dislikes: postDislikeReactions,
    };

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    userReactionsLikeElement.current.value = "";
    userReactionsDislikeElement.current.value = "";
    postViewsElement.current.value = "";
    postTagsElement.current.value;

    createPost(postTitle, postBody, postTags, reactions, postViews, userId);
  };

  return (
    <>
      <div className="h3 mb-5">What's your post about?</div>
      <form onSubmit={addNewPost} style={{ maxWidth: "700px" }}>
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
          <label htmlFor="post-reactions-like" className="form-label">
            Post Reactions
          </label>
          <div className="d-flex align-items-center flex-column flex-md-row gap-2">
            <input
              type="text"
              className="form-control"
              id="post-reactions-like"
              ref={userReactionsLikeElement}
              defaultValue=""
              placeholder="Enter Like Reactions..."
            />
            <input
              type="text"
              className="form-control"
              id="post-reactions-dislike"
              ref={userReactionsDislikeElement}
              defaultValue=""
              placeholder="Enter Dislike Reactions..."
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row gap-2">
          <div className="mb-3 w-100 w-md-50">
            <label htmlFor="user-id" className="form-label">
              User Id
            </label>
            <input
              type="text"
              className="form-control"
              id="user-id"
              ref={userIdElement}
              defaultValue=""
              placeholder="Enter User-id..."
            />
          </div>
          <div className="mb-3 w-100 w-md-50">
            <label htmlFor="post-views" className="form-label">
              Post Views
            </label>
            <input
              type="text"
              className="form-control"
              id="post-views"
              ref={postViewsElement}
              defaultValue=""
              placeholder="Enter Views..."
            />
          </div>
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
          Save Post
        </button>
      </form>
    </>
  );
};

export default CreatePost;
