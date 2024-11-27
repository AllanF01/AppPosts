import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PostList from "./components/Post/PostList";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/Auth/privateRoute";
import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas Protegidas */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <PostList />
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

