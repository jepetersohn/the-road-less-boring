import React from 'react';
import './VignetteImage.css'

const VignetteImage = ({ vignette }) => {
  return (
    <div className="vignette">
      <a href={vignette.url}>
        <img 
          src={vignette.imageUrl} 
          alt={vignette.description} 
        />
      </a>
      <div className="vignette-caption"></div>
    </div>
  );
};

export default VignetteImage;