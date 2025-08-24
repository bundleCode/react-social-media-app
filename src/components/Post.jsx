import { useContext } from "react";
import { PostListContext } from "../store/post-list-store";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { FaEye } from "react-icons/fa";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostListContext);
  return (
    <div className="card mb-4" style={{ maxWidth: "500px" }}>
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
          <span className="badge rounded-pill text-bg-primary mx-1" key={tag}>
            {tag}
          </span>
        ))}
        <div className="d-flex  align-items-center small pt-3 py-2 gap-1">
          <div className="d-flex gap-1 align-items-center">
            This Post has <FaEye size={16} /> {post.views} views
          </div>
          <div>
            <span className="me-1">and reacted users</span>
            <BiLike color={"#0d6efd"} size={17} />
            <span className="text-primary me-1">{post.reactions.likes}</span>
            <BiDislike color={"red"} size={17} />
            <span className="text-danger ms-1">{post.reactions.dislikes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
