import React from "react"
import { vignettes } from "../../data";
import './SupplementalImage.css'

export default function SupplementalImage({
  image,
  isActive,
  onClick,
  alt
}) {
  return (
    <button
      type="button"
      className={`supImg ${isActive ? "active" : ""}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <img src={image} alt={alt} />
    </button>
  );
}
