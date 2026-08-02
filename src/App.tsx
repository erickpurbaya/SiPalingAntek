// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style.css'
import Home from "./pages/Home";
import BasicKana from "./pages/Basic";
import KanjiQuizN5 from './pages/Kanji-N5';
import { n5Kanji_base, n5Kanji, n5Kanji_2, n5Kanji_3 } from './syllabary-kanji';
import { n5Kotoba_lv1 } from './syllabary/kanji-n5';

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
            element={<BasicKana type='hiragana' variation={['basic', 'dakuten']} />} 
          />
          <Route 
            path='/quiz/hiragana-handakuten' 
            element={<BasicKana type='hiragana' variation={['basic', 'handakuten']} />} 
          />

          {/* KATAKANA ROUTE */}
          <Route 
            path='/quiz/katakana' 
            element={<BasicKana type='katakana' />} 
          />
          <Route 
            path='/quiz/katakana-dakuten' 
            element={<BasicKana type='katakana' variation={['basic', 'dakuten']} />} 
          />
          <Route 
            path='/quiz/katakana-handakuten' 
            element={<BasicKana type='katakana' variation={['basic', 'handakuten']} />} 
          />

          <Route 
            path='/quiz/kanji/n5' 
            element={<KanjiQuizN5 library={n5Kanji} />} 
          />
          <Route 
            path='/quiz/kanji/n5-2' 
            element={<KanjiQuizN5 library={n5Kanji_2} />} 
          />
          <Route 
            path='/quiz/kanji/n5-3' 
            element={<KanjiQuizN5 library={n5Kanji_3} />} 
          />
          <Route 
            path='/quiz/kanji/n5-base' 
            element={<KanjiQuizN5 library={n5Kanji_base} />} 
          />
          <Route 
            path='/quiz/kanji/n5-levels' 
            element={<KanjiQuizN5 library={n5Kotoba_lv1} />} 
          />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
