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
import CreatePost from './CreatePost.jsx'
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import ResetPassword from './ResetPassword.jsx';
import Profile from './Profile.jsx'

import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute.jsx';
import AuthRoute from './AuthRoute.jsx'
import EditorContextProvider from './EditorContext.jsx';

function App() {
  
  return (
    <AuthProvider>
      <main>
        <Header/>
        <article className="content">
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/research" element={<Research/>}></Route>
            <Route path="/blog" element={<Blog/>}>
              <Route index element={<BlogIndex/>}></Route>
              <Route path=":id" element={<BlogPost/>}></Route>
              <Route path="create" element={
                  <EditorContextProvider>
                    <CreatePost/>
                  </EditorContextProvider>
                }></Route>
            </Route>
            <Route path="/about" element={<>About</>}></Route>
            <Route path="/resume" element={<Resume/>}></Route>
            <Route path="/users/*" element={<UserRoutes/>}/>
          </Routes>
        </article>
        <Footer/>
      </main>
    </AuthProvider>
  )
}

const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="login"/>}></Route>
        <Route path="login" element={
          <AuthRoute>
            <Login/>
          </AuthRoute>
        }></Route>
        <Route path="signup" element={
          <AuthRoute>
            <SignUp/>
          </AuthRoute>
        }></Route>
        <Route path="reset-password" element={
          <AuthRoute>
            <ResetPassword/>
          </AuthRoute>
        }></Route>
        <Route path="profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }></Route>
    </Routes>
  )
}

export default App;
