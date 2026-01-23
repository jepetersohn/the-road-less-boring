import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Gallery from './components/Gallery/Gallery'
import Vignette from './components/Vignette/Vignette'
import { vignettes } from "./data";
import './App.css'
import OriginVignette from './components/OriginVignette/OriginVignette'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter basename="/projects/theroadlessboring">
        <Routes>
          <Route path="/" element={ <OriginVignette vignette={vignettes[0]} /> }/>
          <Route path="/Gallery" element={ <Gallery /> }/>
          <Route path="/:vignetteId" element={ <Vignette /> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
