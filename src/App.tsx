// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style.css'
import Home from "./pages/Home";
import HiraganaQuiz from "./pages/Hiragana";
import KatakanaQuiz from "./pages/Katakana";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route 
            path='/quiz/hiragana' 
            element={<HiraganaQuiz />} 
          />
          <Route 
            path='/quiz/katakana' 
            element={<KatakanaQuiz />} 
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
