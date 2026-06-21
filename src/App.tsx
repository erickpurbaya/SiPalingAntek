// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style.css'
import Home from "./pages/Home";
import BasicKana from "./pages/Basic";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />

          {/* HIRAGANA ROUTE */}
          <Route 
            path='/quiz/hiragana' 
            element={<BasicKana type='hiragana' />} 
          />
          <Route 
            path='/quiz/hiragana-dakuten' 
            element={<BasicKana type='hiragana' variation={['dakuten']} />} 
          />
          <Route 
            path='/quiz/hiragana-handakuten' 
            element={<BasicKana type='hiragana' variation={['handakuten']} />} 
          />

          {/* KATAKANA ROUTE */}
          <Route 
            path='/quiz/katakana' 
            element={<BasicKana type='katakana' />} 
          />
          <Route 
            path='/quiz/katakana-dakuten' 
            element={<BasicKana type='katakana' variation={['dakuten']} />} 
          />
          <Route 
            path='/quiz/katakana-handakuten' 
            element={<BasicKana type='katakana' variation={['handakuten']} />} 
          />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
