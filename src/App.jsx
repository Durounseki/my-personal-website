import './App.css';
import Home from './Home.jsx';
import Research from './Research.jsx';
import Blog from './Blog.jsx';
import BlogIndex from './BlogIndex.jsx';
import Header from './Header.jsx';
import { Routes, Route } from "react-router-dom";
import Resume from './Resume.jsx';
import Footer from './Footer.jsx';
import BlogPost from './BlogPost.jsx';
import Login from './Login.jsx';

function App() {
  
  return (
    <main>
      <Header/>
      <article className="content">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/research" element={<Research/>}></Route>
          <Route path="/blog" element={<Blog/>}>
            <Route index element={<BlogIndex/>}></Route>
            <Route path=":id" element={<BlogPost/>}></Route>
          </Route>
          <Route path="/about" element={<>About</>}></Route>
          <Route path="/resume" element={<Resume/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </article>
      <Footer/>
    </main>
  )
}

export default App;
