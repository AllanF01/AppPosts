import React, { useState } from "react";
import api from "../../API/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import CommentList from "../Comments/CommentList";
import CommentForm from "../Comments/CommentForm";

const PostDetail = ({ post, refreshPosts }) => {
  const [likes, setLikes] = useState(post.likes);

  const handleLike = async () => {
    try {
      await api.put(`/posts/${post._id}/like`);
      setLikes(likes + 1);
      refreshPosts();
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0">
          <strong>Likes:</strong> {likes}
        </p>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleLike}
        >
          <FontAwesomeIcon icon={faHeart} className="me-1" /> Like
        </button>
      </div>
      <CommentList postId={post._id} />
      <CommentForm postId={post._id} refreshPosts={refreshPosts} />
    </div>
  );
};

export default PostDetail;
