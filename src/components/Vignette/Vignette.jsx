import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { vignettes } from "../../data";
import BackLink from "../BackLink/BackLink";
import VignetteMap from "../Map/VignetteMap";
import CommentForm from "../CommentForm/CommentForm";
import CommentList from "../CommentList/CommentList";
import "./Vignette.css";

export default function Vignette() {
  const { vignetteId } = useParams();
  const vignette = vignettes.find(v => v.id === vignetteId);
  const [refreshComments, setRefreshComments] = useState(false);

  const [isHovering, setIsHovering] = useState(false);
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (!vignette) return <p>Vignette not found</p>;

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBgPos({ x, y });
  }

  return (
    <div className="vignette-container">
      <BackLink to="/gallery" text="← Back to Gallery" />
      <h1 className="vignette-title">{vignette.title}</h1>

      <div
        className="zoom-replace-wrapper"
        onMouseEnter={() => !isMobile && setIsHovering(true)}
        onMouseLeave={() => !isMobile && setIsHovering(false)}
        onMouseMove={!isMobile ? handleMouseMove : undefined}
      >
        <img
          src={vignette.imageUrl}
          alt={vignette.title}
          className={`vignette-img ${isHovering ? "is-hidden" : ""}`}
        />

        <div
          className={`zoom-replace ${isHovering ? "is-visible" : ""}`}
          style={{
            backgroundImage: `url(${vignette.imageUrl})`,
            backgroundPosition: `${bgPos.x}% ${bgPos.y}%`
          }}
        />
      </div>
      
      <div className="vignette-text">
        {vignette.description.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
<VignetteMap vignette={ vignette } />
        <p className="vignette-meta">
          <i>{[vignette.town, vignette.state, vignette.country]
    .filter(Boolean)
    .join(", ")}</i>
        </p>

        <p className="vignette-tags">{vignette.tags}</p>
      </div>
      <hr style={{ 
      width: "100%" }} />
      <div id="comment-section">
         <h2>Comments</h2>   
         <CommentForm vignetteID={vignette.id} setRefreshComments={setRefreshComments}  />
         <CommentList vignetteID={vignette.id} refreshComments={refreshComments}  />
      </div>

    </div>
  );
}
