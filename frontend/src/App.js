import { createBrowserRouter, Navigate, Routes, Route, RouterProvider } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";


import Login from "./pages/login";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Explore from "./pages/explore";

import Navbar from "./components/Navbar";

import ProfileForm from "./components/ProfileForm";
import PostForm from "./components/PostForm";


import logo from './logo.svg';
import './App.css';

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
      path: "/home",
      element: auth ? <Home /> : <Navigate to="/"/>
    },
    {
      path: "/profile/:id",
      element: auth ? <Profile /> : <Navigate to="/"/>
    },
    {
      path: "/profile/:id/edit",
      element: auth ? <Profile edit={true}/>: <Navigate to="/"/>
    },
    {
      path: "/post/compose",
      element: auth ? <PostForm user={user}/> : <Navigate to="/"/>
    }

  ]);

  return (
      <div>
        <RouterProvider router={router}/>
      </div>
  );
}

export default App;
