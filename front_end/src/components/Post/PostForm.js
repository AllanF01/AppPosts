import React, { useState, useEffect } from "react";
import api from "../../API/api";

const PostForm = ({ refreshPosts, editingPost, setEditingPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await api.put(`/posts/${editingPost._id}`, { title, content });
      } else {
        await api.post("/posts", { title, content });
      }
      refreshPosts();
      setTitle("");
      setContent("");
      setEditingPost(null);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <div className="mb-4">
      <div className="card shadow-sm p-3" style={{ maxWidth: "400px", margin: "auto" }}>
        <h5 className="text-center">{editingPost ? "Edit Post" : "Create Post"}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <textarea
              className="form-control form-control-sm"
              placeholder="Content"
              rows="3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-sm w-100">
            {editingPost ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
