import React from "react"
import { vignettes } from "../../data";
import VignetteImage from "../VignetteImage/VignetteImage"; 
import BackLink from "../BackLink/BackLink";
import VignetteMapAll from "../Map/VignetteMapAll";
import './Gallery.css'

export default function Gallery(){
    return (
    <>
       <div className="gallery-wrapper">
        <BackLink to="/" text="← Back Home" />
        <h1>The Road Less Boring</h1>
         <VignetteMapAll vignettes={vignettes} />
            <div className="gallery">
                {vignettes.slice(0).map((vignette) => (
                    <VignetteImage key={vignette.id} vignette={vignette} />
                ))}
            </div>
        </div>
    </>
    )
}