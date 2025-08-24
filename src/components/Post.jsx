import { useContext } from "react";
import { PostListContext } from "../store/post-list-store";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostListContext);
  return (
    <div className="card mb-4" style={{ maxWidth: "450px" }}>
      <div className="card-body">
        <span
          className={`position-absolute top-0 start-100 translate-middle badge px-2 rounded-pill bg-danger`}
          style={{ cursor: "pointer" }}
          onClick={() => deletePost(post.id)}
        >
          X<span className="visually-hidden">Delete Post</span>
        </span>
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span className="badge text-bg-primary mx-2" key={tag}>
            {tag}
          </span>
        ))}
        <div className="alert alert-info mt-4" role="alert">
          This Post has been reacted by
          <span className="text-dark px-1 fw-bolder">{post.reactions}</span>
          people
        </div>
      </div>
    </div>
  );
};

export default Post;
