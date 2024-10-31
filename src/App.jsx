import './App.css';
import Home from './Home.jsx';
import Research from './Research.jsx';
import Blog from './Blog.jsx';
import BlogIndex from './BlogIndex.jsx';
import Header from './Header.jsx';
import { Routes, Route, Navigate } from "react-router-dom";
import Resume from './Resume.jsx';
import Footer from './Footer.jsx';
import BlogPost from './BlogPost.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import ResetPassword from './ResetPassword.jsx';
import Profile from './Profile.jsx'

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
          <Route path="/users" element={<Navigate to="/users/login"/>}></Route>
          <Route path="/users/login" element={<Login/>}></Route>
          <Route path="/users/signup" element={<SignUp/>}></Route>
          <Route path="/users/reset-password" element={<ResetPassword/>}></Route>
          <Route path="/users/profile" element={<Profile/>}></Route>
        </Routes>
      </article>
      <Footer/>
    </main>
  )
}

export default App;
