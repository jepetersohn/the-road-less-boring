import React from 'react';
import './VignetteImage.css'

const VignetteImage = ({ vignette }) => {
  return (
    <>
    <div className={`vignette ${vignette.type}`}>
      <a href={vignette.url}>
        <img 
          src={vignette.imageUrl} 
          alt={vignette.alt} 
        />
      </a>
      <div className="vignette-caption">{vignette.title}</div>
    </div>
    </>
  );
};

export default VignetteImage;