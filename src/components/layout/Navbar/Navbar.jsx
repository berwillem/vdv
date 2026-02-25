// src/components/Navbar.jsx
import { useState } from "react";
import {
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { NavLink, Link } from "react-router-dom";
import LOGO from "../../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Change this later with real auth
  const isLoggedIn = false;

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/a-propos" },
    { name: "Nos voyages", path: "/nos-voyages" },
    { name: "Voyage personnalisé", path: "/voyage-personnalise" },
    { name: "Entreprise", path: "/entreprise" }, // ← NEW
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="logo-container">
            <img src={LOGO} className="navbar-logo" alt="Village des Voyage" />
          </Link>

          {/* Desktop Links */}
          <div className="navbar-links-desktop">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "navbar-link active" : "navbar-link"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right side - Desktop */}
          <div className="navbar-right-desktop">
            {/* Language Selector */}
            <div className="navbar-lang">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="navbar-lang-btn"
              >
                <HiOutlineGlobeAlt size={20} />
              </button>
              {isLangOpen && (
                <div className="navbar-lang-dropdown">
                  <button className="lang-item active">FR</button>
                  <button className="lang-item">EN</button>
                  <button className="lang-item">AR</button>
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <NavLink to="/profile" className="navbar-auth-btn">
                Profil
              </NavLink>
            ) : (
              <NavLink to="/signin" className="navbar-auth-btn">
                Se connecter
              </NavLink>
            )}
          </div>

          {/* Mobile Burger */}
          <button onClick={toggleDrawer} className="navbar-burger">
            <HiOutlineMenuAlt3 size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="drawer-backdrop" onClick={closeDrawer}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeDrawer} className="drawer-close">
              <HiOutlineX size={28} />
            </button>

            <nav className="drawer-links">
              <span className="divider"></span>

              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? "drawer-link active" : "drawer-link"
                  }
                  onClick={closeDrawer}
                >
                  {link.name}
                </NavLink>
              ))}

              {/* Language in drawer */}
              <div className="drawer-lang">
                <p className="drawer-lang-title">
                  <HiOutlineGlobeAlt size={20} /> Langue
                </p>
                <div className="drawer-lang-options">
                  <button className="lang-btn active">Français</button>
                  <button className="lang-btn">English</button>
                  <button className="lang-btn">العربية</button>
                </div>
              </div>

              {/* Auth button in drawer */}
              <div className="drawer-auth">
                {isLoggedIn ? (
                  <NavLink
                    to="/profile"
                    className="drawer-profile-btn"
                    onClick={closeDrawer}
                  >
                    Profil
                  </NavLink>
                ) : (
                  <NavLink
                    to="/signin"
                    className="drawer-signin-btn"
                    onClick={closeDrawer}
                  >
                    Se connecter
                  </NavLink>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
