import React, { useEffect, useState } from "react";
import api from "../../API/api";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <h4>Comments</h4>
      {comments.map((comment) => (
        <p key={comment._id}>{comment.content}</p>
      ))}
    </div>
  );
};

export default CommentList;
