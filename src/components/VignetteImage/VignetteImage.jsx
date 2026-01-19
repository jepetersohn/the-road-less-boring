import React from 'react';
import './VignetteImage.css'

const VignetteImage = ({ vignette }) => {
  return (
    <div className="vignette">
      <img 
        src={vignette.imageUrl} 
        alt={vignette.description} 
      />
    </div>
  );
};

export default VignetteImage;