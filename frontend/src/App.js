import { createBrowserRouter, Navigate, Routes, Route, RouterProvider } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import Login from "./pages/login";
import Feed from "./pages/feed";
import logo from './logo.svg';
import './App.css';

function App() {

  // Create array of route objects for website
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/feed",
      element: <Feed />
    },
  ]);

  return (
      <div>
        <RouterProvider router={router}/>
      </div>
  );
}

export default App;
