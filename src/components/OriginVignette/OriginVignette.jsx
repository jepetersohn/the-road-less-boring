import React from 'react';
import './OriginVignette.css'

import { useParams, useNavigate } from "react-router-dom";
import { vignettes } from "../../data";

export default function OriginVignette( { vignette }) {
    const navigate = useNavigate();
  return (
    <>
    <div className="AboutText">
      <h1>The Road Less Boring</h1>
      <h2>A Photographic Journey Through Places and the Lives That Touched Them</h2>
    </div>
    <hr/>
    {vignette.description.map(( description ) => (
            <p key={vignette.id}> {description}</p>
        ))}
    <div className="vignette-container">
        <div className ="vignette-header origin-container vignette origin" onClick={() => navigate("/gallery")}>
            <img className="vignette-img" src={vignette.imageUrl} alt={vignette.title} />
            <div className='vignette-caption'>Start the journey</div>
        </div> 
    </div>
    </>
  );
}