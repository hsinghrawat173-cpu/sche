import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Hero from "./documents/Hero.jsx";
import SchemeMatchAbout from "./documents/SchemeMatchAbout.jsx";
import SchemeMatchProfile from "./documents/SchemeMatchProfile.jsx";
import SchemeMatchDashboard from "./documents/SchemeMatchDashboard.jsx";
import SchemeMatchDetail from "./documents/SchemeMatchDetail.jsx";
import SchemeMatchNotifications from "./documents/SchemeMatchNotifications.jsx";
import AddScheme from "./documents/AddScheme.jsx";

import Login from "./documents/Login.jsx";
import Register from "./documents/Resgister.jsx";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/admin/add-scheme" element={<AddScheme />} />
          <Route path="/about" element={<SchemeMatchAbout />} />
          <Route path="/profile" element={<SchemeMatchProfile />} />
          <Route path="/dashboard" element={<SchemeMatchDashboard />} />
          <Route path="/detail" element={<SchemeMatchDetail />} />
          <Route path="/notifications" element={<SchemeMatchNotifications />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
