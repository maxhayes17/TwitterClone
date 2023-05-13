import { createBrowserRouter, Navigate, Routes, Route, RouterProvider } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";


import Login from "./pages/login";
import Feed from "./pages/feed";
import Profile from "./pages/profile";

import Navbar from "./components/Navbar";


import logo from './logo.svg';
import './App.css';

function App() {
  // Create boolean variable to determine whether user is authorized
  const auth = Boolean(useSelector((state) => state.token));

  // Create array of route objects for website
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/feed",
      element: auth ? <Feed /> : <Navigate to="/"/>
    },
    {
      path: "/profile",
      element: auth ? <Profile /> : <Navigate to="/"/>
    }
  ]);

  return (
      <div>
        <Navbar />
        <RouterProvider router={router}/>
      </div>
  );
}

export default App;
