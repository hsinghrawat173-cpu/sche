import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// --- IMPORTING THE UI SUITE ---
import Hero from "./documents/Hero.jsx";
import SchemeMatchAbout from "./documents/SchemeMatchAbout.jsx";

// Auth
import Login from "./documents/Login.jsx";
import Register from "./documents/Resgister.jsx";

// Protected Dashboard & Features
import SchemeMatchDashboard from "./documents/SchemeMatchDashboard.jsx";
import SchemeMatchProfile from "./documents/SchemeMatchProfile.jsx";
import SchemeMatchDetail from "./documents/SchemeMatchDetail.jsx";
import SchemeMatchNotifications from "./documents/SchemeMatchNotifications.jsx";

// Admin Zone
import AddScheme from "./documents/AddScheme.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 🟢 PUBLIC ROUTES (The Front Door) */}
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<SchemeMatchAbout />} />
        
        {/* 🔵 AUTHENTICATION ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* 🟣 PROTECTED USER ROUTES (The VIP Area) */}
        {/* Logic: These components should contain their own cookie/auth checks */}
        <Route path="/dashboard" element={<SchemeMatchDashboard />} />
        <Route path="/profile" element={<SchemeMatchProfile />} />
        <Route path="/detail" element={<SchemeMatchDetail />} />
        <Route path="/notifications" element={<SchemeMatchNotifications />} />
        
        {/* 🔴 ADMIN ROUTES */}
        <Route path="/admin/add-scheme" element={<AddScheme />} />

        {/* 🛡️ THE BOUNCER (Fallback Routes) */}
        {/* Logic: If they type a URL that doesn't exist above, kick them to the Home page */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
