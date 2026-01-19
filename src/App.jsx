import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Gallery from './components/Gallery/Gallery'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="AboutText">
      <h1>This is a work in progress: keep checking back</h1>
      <h2>Brainstorming "The Road Less Boring"</h2>
      <div className="card">
        {/*<button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>*/}
       <p>What will this project be?</p>
        <ul>
          <li>A visual scrapbook that quietly reveals the stories behind each place.</li>
          <li>Images are the gateway, each one captures a moment that happened somewhere.</li>
          <li>Geography is revealed gradually, inviting curiosity rather than instructing.</li>
          <li>This isn't about visiting places; it's about discovering the moments and histories that exist within them.</li>
        </ul>

        <p>What does it look like?</p>
        <ul>
          <li>A collage of memory fragments, stitched together visually.</li>
          <li>Pinterest-style browsing, where every scroll uncovers something new.</li>
          <li>Images serve as entry points into the stories they hold.</li>
          <li>Place is felt, not just mapped; emotions and history matter more than logistics.</li>
        </ul>

        <p>Conceptualizing the build</p>
        <ul>
          <li>The page is covered in photographs, each carrying its own narrative.</li>
          <li>Every image knows its origin and the human stories connected to it.</li>
          <li>Clicking an image opens a tiny window into the life of that place.</li>
            <ul>
              <li>Map context appears subtly, situating the story.</li>
              <li>Quirky characters, objects, or local flavors hint at what has happened there.</li>
              <li>Each vignette captures why the place or moment left an impression.</li>
            </ul>
        </ul>

        </div>
        <Gallery />
      </div>
    </>
  )
}

export default App
