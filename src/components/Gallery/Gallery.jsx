import React from "react"
import { vignettes } from "../../data";
import VignetteImage from "../VignetteImage/VignetteImage"; 
import './Gallery.css'

export default function Gallery(){
    return (
    <>
       <div className="gallery-wrapper">
        <h1>The Road Less Boring</h1>
            <div className="gallery">
                {vignettes.slice(0).map((vignette) => (
                    <VignetteImage key={vignette.id} vignette={vignette} />
                ))}
            </div>
        </div>
    </>
    )
}