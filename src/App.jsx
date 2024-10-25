import './App.css';
import Home from './Home.jsx';
import Header from './Header.jsx';
import { Routes, Route } from "react-router-dom";
import Resume from './Resume.jsx';

function App() {
  
  return (
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/research" element={<>Research</>}></Route>
        <Route path="/blog" element={<>Blog</>}></Route>
        <Route path="/about" element={<>About</>}></Route>
        <Route path="/resume" element={<Resume/>}></Route>
      </Routes>
    </main>
  )
}

export default App
