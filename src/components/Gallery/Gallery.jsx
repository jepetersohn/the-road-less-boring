import React from "react"
import { vignettes } from "../../data";
import VignetteImage from "../VignetteImage/VignetteImage"; 
import './Gallery.css'

export default function Gallery(){
    return (
    <>
    <div className="AboutText">
      <h1>The Road Less Boring</h1>
      <h2>A Photographic Journey Through Places and the Lives That Touched Them</h2>
    </div>
       <div className="gallery-wrapper">
            <div className="origin-container">
                <VignetteImage vignette={vignettes[0]} />
            </div>

            <div className="gallery">
                {vignettes.slice(1).map((vignette) => (
                    <VignetteImage key={vignette.id} vignette={vignette} />
                ))}
            </div>
        </div>
    </>
    )
}