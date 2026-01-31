import { useEffect, useState } from "react";
import "./CommentList.css";

function CommentList({ vignetteID, refreshComments }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.joanwiththecode.com/api/theroadlessboring/getComments.php?vignette_id=${encodeURIComponent(
            vignetteID
          )}`
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const jsonData = await response.json();
        setComments(jsonData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    if (vignetteID) fetchComments();
  }, [vignetteID, refreshComments]); 

  if (loading) return <div className="comments-loading">Loading comments...</div>;
  if (error) return <div className="comments-error">Error: {error}</div>;

  if (comments.length === 0)
    return <div className="comments-empty">Be the first to comment!</div>;

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <div className="comment-header">
            <span className="comment-username">{comment.username}</span>
            <span className="comment-date">
              {new Date(comment.created_at).toLocaleString()}
            </span>
          </div>
          <p className="comment-text">{comment.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
