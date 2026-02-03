import { useState } from 'react';
import "./CommentForm.css";

function CommentForm( { vignetteID, setRefreshComments }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }
  function handleCommentChange(e) {
    setComment(e.target.value);
  }

   const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch("https://www.joanwiththecode.com/api/theroadlessboring/addComment.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vignette_id: vignetteID,
        username: name,
        comment: comment
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setName("");
      setComment("");

      setRefreshComments(prev => !prev);
    } else {
      console.error("Failed to add comment:", data.error);
    }
  } catch (err) {
    console.error("Network error:", err);
  }
};

  return (
  <form className="comment-form" onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="name">Your Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Enter your name"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="comment">Your Memory</label>
      <textarea
        id="comment"
        value={comment}
        onChange={handleCommentChange}
        placeholder="Write your memory here..."
        required
        rows={4}
      />
    </div>

    <button type="submit" className="submit-btn">Submit</button>
  </form>
);
}

export default CommentForm;