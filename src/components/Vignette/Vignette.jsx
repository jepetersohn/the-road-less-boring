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
        <div className ="vignette-header">
            <h1>{vignette.title}</h1>
            <img className="vignette-img" src={vignette.imageUrl} alt={vignette.title} />
        </div> 
        {vignette.description.map(( description ) => (
            <p key={vignette.id}> {description}</p>

            ))}
      
      <p>{vignette.town}, {vignette.state}, {vignette.country}</p>
      <p>{vignette.tags}</p>
    </div>
  );
}