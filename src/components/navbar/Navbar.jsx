import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Simulated authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // High-resolution image assets formatted as icons
  const icons = {
    brand: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=64&q=80",
    home: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=64&q=80",
    discover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=64&q=80",
    categories: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=64&q=80",
    ai: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=64&q=80",
    about: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=64&q=80",
  };

  // Navigation Items with associated image icons
  const navItems = [
    { name: "Home", path: "/", icon: icons.home },
    { name: "Discover", path: "/discover", icon: icons.discover },
    { name: "Categories", path: "/categories", icon: icons.categories },
    { name: "AI Assistant", path: "/ai-assistant", icon: icons.ai },
    { name: "About", path: "/about", icon: icons.about },
  ];

  // Handle Logout -> Redirection to /login
  const handleAuthAction = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-white/10 bg-[#08111f]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* ================= BRAND LOGO WITH IMAGE ICON ================= */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <img
            src={icons.brand}
            alt="Choose Wisely Icon"
            className="h-7 w-7 rounded-md object-cover ring-1 ring-cyan-400/30"
          />
          <span className="text-lg font-bold tracking-tight text-white">
            Choose <span className="text-cyan-400">Wisely</span>
          </span>
        </Link>


        {/* ================= NAVIGATION TABS WITH IMAGE ICONS ================= */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-400/10 text-cyan-400 font-semibold"
                    : "text-gray-300 hover:bg-white/5 hover:text-cyan-400"
                }`}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className={`h-4 w-4 rounded-sm object-cover transition-opacity duration-200 ${
                    isActive ? "opacity-100 ring-1 ring-cyan-400" : "opacity-70 group-hover:opacity-100"
                  }`}
                />
                <span>{item.name}</span>

                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-cyan-400" />
                )}
              </Link>
            );
          })}
        </div>


        {/* ================= LOGOUT / LOGIN BUTTON ================= */}
        <button
          onClick={handleAuthAction}
          className={`shrink-0 rounded-lg px-6 py-2.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
            isLoggedIn
              ? "bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25 shadow-lg shadow-rose-500/5"
              : "bg-cyan-400 text-[#08111f] hover:bg-cyan-300 shadow-lg shadow-cyan-400/10"
          }`}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;