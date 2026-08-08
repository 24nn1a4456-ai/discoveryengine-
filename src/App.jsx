import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";

import Home from "./pages/Home/Home";
import Discover from "./pages/Discover/Discover";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import About from "./pages/About/About";
import AIAssistant from "./pages/AIAssistant/AIAssistant";
import Login from "./pages/Login/Login"; // Imported Login Page

function App() {
  const location = useLocation();

  // Hide Navbar when user is on the Login page
  const hideNavbar = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-[#08111f] text-white">

      {/* Render Navbar only if not on the login page */}
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Product Discovery */}
        <Route
          path="/discover"
          element={<Discover />}
        />

        {/* Categories */}
        <Route
          path="/categories"
          element={<CategoriesPage />}
        />

        {/* AI Assistant */}
        <Route
          path="/ai-assistant"
          element={<AIAssistant />}
        />

        {/* About */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Unknown URL → Home */}
        <Route
          path="*"
          element={<Home />}
        />

      </Routes>
    </div>
  );
}

export default App;