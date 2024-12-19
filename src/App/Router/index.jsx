import {createBrowserRouter} from 'react-router-dom'
import Home from '../../Home/index.jsx';
import Research from '../../Research/index.jsx';
import Blog from '../../Blog/index.jsx';
import BlogIndex from '../../Blog/Components/BlogIndex/index.jsx';
import { Navigate } from "react-router-dom";
import Resume from '../../Resume/index.jsx';
import CreatePost from '../../Blog/Components/CreatePost/index.jsx'
import Login from '../../Auth/Login/index.jsx';
import SignUp from '../../Auth/Login/Components/SignUp/index.jsx';
import ResetPassword from '../../Auth/Login/Components/ResetPassword/index.jsx';
import Profile from '../../Auth/Profile/index.jsx';
import About from '../../About/index.jsx';

import ProtectedRoute from '../../Auth/ProtectedRoute/index.jsx';
import AuthRoute from '../../Auth/AuthRoute/index.jsx'
import {EditorContextProvider} from '../../Blog/EditorContext/index.jsx';
import ResetRequestForm from '../../Auth/Login/Components/ResetPassword/Components/ResetRequestForm';
import ResetForm from '../../Auth/Login/Components/ResetPassword/Components/ResetForm';
import ErrorPage from '../../ErrorPage';

import App from '../index.jsx';


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
