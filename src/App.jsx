"use client"

import { useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import SearchSection from "./components/SearchSection"
import ImageColumns from "./components/ImageColumns"
import HowItWorks from "./components/HowItWorks"
import "./App.css"

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="app">
      <Navbar mobileMenuOpen={mobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
      <main className={mobileMenuOpen ? "blur" : ""}>
        <Hero />
        <SearchSection />
        <ImageColumns />
        <HowItWorks />
      </main>
    </div>
  )
}

export default App
