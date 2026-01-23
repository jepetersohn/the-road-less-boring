import React from 'react';
import './Vignette.css'

import { useParams } from "react-router-dom";
import { vignettes } from "../../data";

export default function Vignette() {
  const { vignetteId } = useParams(); // grabs :vignetteId from the URL

  const vignette = vignettes.find(v => v.id === vignetteId);

  if (!vignette) return <p>Vignette not found</p>;

  return (
    <div className="vignette-container">
        <div class ="vignette-header">
            <h1>{vignette.title}</h1>
            <img className="vignette-img" src={vignette.imageUrl} alt={vignette.title} />
        </div> 
      <p>{vignette.description}</p>
      <p>{vignette.location}</p>
      <p>{vignette.tags}</p>
    </div>
  );
}