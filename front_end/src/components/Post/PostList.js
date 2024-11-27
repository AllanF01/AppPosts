import React, { useEffect, useState } from "react";
import api from "../../API/api";
import PostDetail from "./PostDetail";
import PostForm from "./PostForm";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Blog Posts</h2>
      <PostForm
        refreshPosts={fetchPosts}
        editingPost={editingPost}
        setEditingPost={setEditingPost}
      />
      <div className="row">
        {posts.map((post) => (
          <div key={post._id} className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>
              </div>
              <div className="card-footer">
                <PostDetail post={post} refreshPosts={fetchPosts} />
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => setEditingPost(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deletePost(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
