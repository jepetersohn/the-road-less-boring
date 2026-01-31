import React, { useState } from "react";
import "./OriginVignette.css";
import { useNavigate } from "react-router-dom";
import VignetteMap from "../Map/VignetteMap";

export default function OriginVignette({ vignette }) {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [imgOffset, setImgOffset] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = ((e.clientX - rect.left) / rect.width) * 100;
    const offsetY = ((e.clientY - rect.top) / rect.height) * 100;
    setImgOffset({ x: offsetX, y: offsetY });
  }

  return (
    <>
      <div className="AboutText">
        <h1>The Road Less Boring</h1>
        <h2>A Photographic Journey Through Places and the Lives That Touched Them</h2>
      </div>
      <hr />
   <div className="wip-text">
        This is a work in progress: keep checking back. Still to be added:
        <ul>
          <li>Interactive graffiti wall</li>
          <li><s>Full vignettes with descriptions and React-Leaflet</s></li>
          <li><s>Comment submission in each image's vignette</s></li>
        </ul>
      </div>
<div
  className="image-border-container"
  onMouseEnter={() => setIsHovering(true)}
  onMouseLeave={() => setIsHovering(false)}
  onMouseMove={handleMouseMove}
  onClick={() => navigate("/gallery")}
  role="button"
  tabIndex={0}
>
  <div className="image-inner-wrapper">
    <img
      src={vignette.imageUrl}
      alt={vignette.title}
      className={`vignette-img ${isHovering ? "is-zoomed" : ""}`}
      style={
        isHovering
          ? { transformOrigin: `${imgOffset.x}% ${imgOffset.y}%` }
          : {}
      }
    />
  </div>

  <div className="vignette-caption-on-border">Click to start the journey</div>
</div>


      <div className="origin-description">
        {vignette.description.map((desc, idx) => (
          <p key={`${vignette.id}-${idx}`}>{desc}</p>
        ))}
      </div>
      <VignetteMap vignette={ vignette } />
    </>
  );
}
