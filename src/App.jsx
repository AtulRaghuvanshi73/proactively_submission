"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import "./App.css"

// Dynamically import components with no SSR to prevent hydration mismatch
const Navbar = dynamic(() => import("./components/Navbar"), { ssr: false })
const Hero = dynamic(() => import("./components/Hero"), { ssr: false })
const SearchSection = dynamic(() => import("./components/SearchSection"), { ssr: false })
const HowItWorks = dynamic(() => import("./components/HowItWorks"), { ssr: false })

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Only render the UI after component has mounted on the client
  if (!mounted) return null

  return (
    <div className="app">
      <Navbar mobileMenuOpen={mobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
      <main className={mobileMenuOpen ? "blur" : ""}>
        <div className="hero-section-wrapper">
          <Hero />
          <SearchSection />
        </div>
        <HowItWorks />
      </main>
    </div>
  )
}

export default App
