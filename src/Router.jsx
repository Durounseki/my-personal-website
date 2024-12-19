import {createBrowserRouter} from 'react-router-dom'
import Home from './Home/Home.jsx';
import Research from './Research/Research.jsx';
import Blog from './Blog.jsx';
import BlogIndex from './BlogIndex.jsx';
import { Navigate } from "react-router-dom";
import Resume from './Resume.jsx';
import CreatePost from './CreatePost.jsx'
import Login from './Auth/Login/Login.jsx';
import SignUp from './Auth/Login/SignUp.jsx';
import ResetPassword from './Auth/Login/ResetPassword.jsx';
import Profile from './Auth/Profile/Profile.jsx';
import About from './About/About.jsx';

import ProtectedRoute from './Auth/AuthRoute/ProtectedRoute.jsx';
import AuthRoute from './Auth/AuthRoute/AuthRoute.jsx'
import EditorContextProvider from './EditorContextProvider.jsx';
import ResetRequestForm from './Auth/Login/ResetRequestForm.jsx';
import ResetForm from './Auth/Login/ResetForm.jsx';
import ErrorPage from './ErrorPage.jsx';

import App from './App.jsx';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/research",
                element: <Research />
            },
            {
                path: "/blog",
                element: <Blog/>,
                children: [
                    {
                        index: true,
                        element: <BlogIndex/>
                    },
                    {
                        path: ":id",
                        element: (
                            <EditorContextProvider>
                                <CreatePost/>
                            </EditorContextProvider>
                        )
                    },
                    {
                        path: "create",
                        element: (
                            <EditorContextProvider>
                                <CreatePost/>
                            </EditorContextProvider>
                        )
                    },
                ]
            },
            {
                path: "/about", 
                element: <About />
            },
            {
                path: "/resume",
                element: <Resume url={"/api/resume"}/>
            },
            {
                path: "/rirekisho",
                element: <Resume url={"/api/rirekisho"}/>
            },
            {
                path: "/keirekisho",
                element: <Resume url={"/api/keirekisho"}/>
            },
            {
                path: "/users",
                children: [
                    {
                        index: true,
                        element: <Navigate to="login"/>
                    },
                    {
                        path: "login",
                        element: (
                            <AuthRoute>
                                <Login />
                            </AuthRoute>
                        )
                    },
                    {
                        path: "signup",
                        element: (
                            <AuthRoute>
                                <SignUp />
                            </AuthRoute>
                        )
                    },
                    {
                        path: "reset-password",
                        element: (
                            <AuthRoute>
                                <ResetPassword />
                            </AuthRoute>
                        ),
                        children: [
                            {
                                index: true,
                                element: <ResetRequestForm />
                            },
                            {
                                path: ":tokenId",
                                element: <ResetForm />
                            }
                        ]
                    },
                    {
                        path: "profile",
                        element: (
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        )
                    }
                ]
            },
        ]
    },

]);

export default router;
