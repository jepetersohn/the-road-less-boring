import { useNavigate } from "react-router-dom";
import "./BackLink.css";

function BackLink({ to = "/", text = "← Back" }) {
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") navigate(to);
  };

  return (
    <p
      className="back-link"
      onClick={() => navigate(to)}
      tabIndex={0}
      onKeyPress={handleKeyPress}
    >
      {text}
    </p>
  );
}

export default BackLink;
