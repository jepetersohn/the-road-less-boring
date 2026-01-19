import React from "react"
import { vignettes } from "../../data";
import VignetteImage from "../VignetteImage/VignetteImage"; 
import './Gallery.css'

export default function Gallery(){
    return (
        <div className="gallery">
            {vignettes.map(( vignette ) => (
                <VignetteImage key={vignette.id} vignette={vignette} />
            ))}
        </div>
    )
}