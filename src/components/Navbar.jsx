"use client"

import { useState } from "react"
import "../styles/Navbar.css"
// No need to import logo as we're using the public folder path

const Navbar = ({ mobileMenuOpen, toggleMobileMenu }) => {
  const [activeDropdown, setActiveDropdown] = useState(null)

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo from public folder */}
        <div className="navbar-logo">
          <img src="/logo.svg" alt="ProVital" />
          <h1>ProVital</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="navbar-desktop">
          <ul className="navbar-links">
            <li>
              <a href="#list-practice">List your practice</a>
            </li>
            <li>
              <a href="#for-employers">For Employers</a>
            </li>
            <li>
              <a href="#courses">Courses</a>
            </li>
            <li>
              <a href="#books">Books</a>
            </li>
            <li>
              <a href="#speakers">Speakers</a>
            </li>
            <li>
              <a href="#doctors">Doctors</a>
            </li>
          </ul>
          <div className="navbar-auth">
            <a href="#login" className="login-link">
              Login
            </a>
            <span>/</span>
            <a href="#signup" className="signup-link">
              Sign up
            </a>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <span className={`hamburger ${mobileMenuOpen ? "open" : ""}`}></span>
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-header">
            <div className="navbar-logo">
              <img src="/logo.svg" alt="ProVital" />
              <h1>ProVital</h1>
            </div>
            <button className="close-menu" onClick={toggleMobileMenu}>
              ×
            </button>
          </div>

          <div className="mobile-menu-content">
            <div className="mobile-menu-section">
              <h3>Doctor</h3>
              <div className="auth-links">
                <a href="#login">Login</a>
                <a href="#signup">Sign up</a>
              </div>
            </div>

            <div className="mobile-menu-section">
              <h3>Patients</h3>
              <div className="auth-links">
                <a href="#login">Login</a>
                <a href="#signup">Sign up</a>
              </div>
            </div>

            <div className="mobile-menu-item" onClick={() => handleDropdownToggle("doctors")}>
              <span>Doctors</span>
              <span className="arrow">›</span>
            </div>

            <div className="mobile-menu-item" onClick={() => handleDropdownToggle("practice")}>
              <span>List your practice</span>
              <span className="arrow">›</span>
            </div>

            <div className="mobile-menu-item" onClick={() => handleDropdownToggle("employers")}>
              <span>For Employers</span>
              <span className="arrow">›</span>
            </div>

            <div className="mobile-menu-item" onClick={() => handleDropdownToggle("courses")}>
              <span>Courses</span>
              <span className="arrow">›</span>
            </div>

            <div className="mobile-menu-item" onClick={() => handleDropdownToggle("books")}>
              <span>Books</span>
              <span className="arrow">›</span>
            </div>

            <div className="mobile-menu-item" onClick={() => handleDropdownToggle("speakers")}>
              <span>Speakers</span>
              <span className="arrow">›</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
