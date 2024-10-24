import './App.css'
import Details from './Details.jsx'
import Header from './Header.jsx'
import { Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Details/>}></Route>
        <Route path="/research" element={<>Research</>}></Route>
        <Route path="/blog" element={<>Blog</>}></Route>
        <Route path="/about" element={<>About</>}></Route>
      </Routes>
    </>
  )
}

export default App
