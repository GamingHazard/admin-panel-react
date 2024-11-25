import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Dashboard from "./pages/AdminPanel";
import { UserProvider } from "../src/context/UserProvider"; // Make sure the path is correct
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/*" element={<AdminPanel />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
