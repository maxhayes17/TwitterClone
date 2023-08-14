import { createBrowserRouter, Navigate, Routes, Route, RouterProvider } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";


import Login from "./pages/login";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Explore from "./pages/explore";
import Follows from "./pages/follows";

import Navbar from "./components/Navbar";

import ProfileForm from "./components/ProfileForm";
import PostForm from "./components/PostForm";


import logo from './logo.svg';
import './App.css';
import ViewPost from "./pages/post";

function App() {
  // Create boolean variable to determine whether user is authorized
  const auth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);

  // Create array of route objects for website
  const router = createBrowserRouter([
    {
      path: "/",
      element: auth ? <Home /> : <Login />
    },
    {
      path: "/explore",
      element: <Explore />
    },
    {
      path: "/explore/:tag",
      element: <Explore tag={true}/>
    },
    {
      path: "/home",
      element: auth ? <Home /> : <Navigate to="/"/>
    },
    {
      path: "/profile/:id",
      element: auth ? <Profile/> : <Navigate to="/"/>
    },
    {
      path: "/profile/:id/edit",
      element: auth ? <ProfileForm/> : <Navigate to="/"/>
    },
    {
      path: "/profile/:id/followers",
      element: auth ? <Follows isFollowers={true}/> : <Navigate to="/"/>
    },
    {
      path: "/profile/:id/following",
      element: auth ? <Follows /> : <Navigate to="/"/>
    },
    {
      path: "/post/compose",
      element: auth ? <PostForm user={user}/> : <Navigate to="/"/>
    },
    {
      path: "/post/:id",
      element: auth ? <ViewPost/> : <Navigate to="/"/>
    },
    {
      path: "/post/:id/reply",
      element: auth ? <ViewPost reply={true}/> : <Navigate to="/"/>
    },
    // {
    //   path: "/logout"
    // }

  ]);

  return (
      <div>
        <RouterProvider router={router}/>
      </div>
  );
}

export default App;
