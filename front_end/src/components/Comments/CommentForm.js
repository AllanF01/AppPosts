import React, { useState } from "react";
import api from "../../API/api";

const CommentForm = ({ postId, refreshPosts }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/posts/${postId}/comments`, { content });
      setContent("");
      refreshPosts(); 
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="input-group">
        <textarea
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          rows="1"
          required
          style={{ resize: "none" }}
        ></textarea>
        <button
          type="submit"
          className="btn btn-success"
          style={{ whiteSpace: "nowrap" }}
        >
          Add Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
