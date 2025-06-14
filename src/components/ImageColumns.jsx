"use client"

import { useEffect, useRef, useState } from "react"
import "../styles/ImageColumns.css"

const ImageColumns = ({ inHero = false }) => {
  const column1Ref = useRef(null)
  const column2Ref = useRef(null)
  const mobileSliderRef = useRef(null)
  const [isMounted, setIsMounted] = useState(false)

  // Images for the columns - using carousel images from public folder
  const images = {
    column1: [
      "/carousal_image1.svg", 
      "/carousal_image2.svg", 
      "/carousal_image3.svg", 
      "/carousal_image4.svg"
    ],
    column2: [
      "/carousal_image5.svg", 
      "/carousal_image6.svg", 
      "/carousal_image7.svg", 
      "/carousal_image8.svg"
    ],
    mobile: [
      "/carousal_image1.svg",
      "/carousal_image2.svg",
      "/carousal_image3.svg",
      "/carousal_image4.svg",
      "/carousal_image5.svg",
      "/carousal_image6.svg",
      "/carousal_image7.svg",
      "/carousal_image8.svg",
    ],
  }

  // Set mounted state after component loads
  useEffect(() => {
    setIsMounted(true)
    
    // Cleanup animations on unmount
    return () => {
      setIsMounted(false)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    
    // Store animation intervals to clear them later
    const intervalIds = []
    
    // Desktop animations
    const animateDesktopColumns = () => {
      if (window.innerWidth >= 768) {
        // Column 1: Top to bottom animation
        if (column1Ref.current) {
          const column1Images = column1Ref.current.querySelectorAll(".column-image")
          let topPosition = 0

          const interval1 = setInterval(() => {
            topPosition -= 1
            
            // Safety check before accessing scrollHeight
            if (!column1Ref.current) return
            
            // Reset when the last image is fully visible
            if (Math.abs(topPosition) >= column1Ref.current.scrollHeight / 2) {
              topPosition = 0
            }

            column1Images.forEach((img) => {
              img.style.transform = `translateY(${topPosition}px)`
            })
          }, 30)
          
          intervalIds.push(interval1)
        }

        // Column 2: Bottom to top animation
        if (column2Ref.current) {
          const column2Images = column2Ref.current.querySelectorAll(".column-image")
          let topPosition = 0

          const interval2 = setInterval(() => {
            topPosition += 1
            
            // Safety check before accessing scrollHeight
            if (!column2Ref.current) return
            
            // Reset when the first image is fully visible
            if (Math.abs(topPosition) >= column2Ref.current.scrollHeight / 2) {
              topPosition = 0
            }

            column2Images.forEach((img) => {
              img.style.transform = `translateY(${topPosition}px)`
            })
          }, 30)
          
          intervalIds.push(interval2)
        }
      }
    }

    // Mobile animation: Right to left
    const animateMobileSlider = () => {
      if (window.innerWidth < 768 && mobileSliderRef.current) {
        const slider = mobileSliderRef.current
        const sliderWidth = slider.scrollWidth
        let containerWidth = 0
        
        // Safely get container width
        if (slider.parentElement) {
          containerWidth = slider.parentElement.clientWidth
        }
        
        let position = 0

        const interval3 = setInterval(() => {
          position -= 1

          // Safety check
          if (!slider) return
          
          // Reset when all images have scrolled through
          if (Math.abs(position) >= sliderWidth - containerWidth) {
            position = 0
          }

          slider.style.transform = `translateX(${position}px)`
        }, 25) // Slowing down slightly for smoother animation
        
        intervalIds.push(interval3)
      }
    }

    // Initialize animations
    animateDesktopColumns()
    animateMobileSlider()

    // Handle resize
    const handleResize = () => {
      // Clear all animation intervals and restart
      intervalIds.forEach(id => clearInterval(id))
      
      // Reset positions and reinitialize animations
      if (column1Ref.current) {
        column1Ref.current.querySelectorAll(".column-image").forEach((img) => {
          img.style.transform = "translateY(0)"
        })
      }

      if (column2Ref.current) {
        column2Ref.current.querySelectorAll(".column-image").forEach((img) => {
          img.style.transform = "translateY(0)"
        })
      }

      if (mobileSliderRef.current) {
        mobileSliderRef.current.style.transform = "translateX(0)"
      }

      // Small timeout to ensure DOM is ready
      setTimeout(() => {
        animateDesktopColumns()
        animateMobileSlider()
      }, 100)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      // Clean up all intervals on unmount
      intervalIds.forEach(id => clearInterval(id))
      window.removeEventListener("resize", handleResize)
    }
  }, [isMounted])

  return (
    <section className={`image-columns ${inHero ? 'in-hero' : ''}`}>
      {/* Desktop view: Two columns */}
      <div className="desktop-columns">
        <div className="column" ref={column1Ref}>
          {images.column1.map((src, index) => (
            <div key={`col1-${index}`} className="column-image-container">
              <img src={src || "/placeholder.svg"} alt={`Lifestyle image ${index + 1}`} className="column-image" />
            </div>
          ))}
          {/* Duplicate images for seamless loop */}
          {images.column1.map((src, index) => (
            <div key={`col1-dup-${index}`} className="column-image-container">
              <img src={src || "/placeholder.svg"} alt={`Lifestyle image ${index + 1}`} className="column-image" />
            </div>
          ))}
        </div>

        <div className="column" ref={column2Ref}>
          {images.column2.map((src, index) => (
            <div key={`col2-${index}`} className="column-image-container">
              <img src={src || "/placeholder.svg"} alt={`Lifestyle image ${index + 4}`} className="column-image" />
            </div>
          ))}
          {/* Duplicate images for seamless loop */}
          {images.column2.map((src, index) => (
            <div key={`col2-dup-${index}`} className="column-image-container">
              <img src={src || "/placeholder.svg"} alt={`Lifestyle image ${index + 4}`} className="column-image" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view: Horizontal slider */}
      <div className="mobile-slider-container">
        <div className="mobile-slider" ref={mobileSliderRef}>
          {images.mobile.map((src, index) => (
            <div key={`mobile-${index}`} className="mobile-image-container">
              <img src={src || "/placeholder.svg"} alt={`Lifestyle image ${index + 1}`} className="mobile-image" />
            </div>
          ))}
          {/* Duplicate images for seamless loop */}
          {images.mobile.map((src, index) => (
            <div key={`mobile-dup-${index}`} className="mobile-image-container">
              <img src={src || "/placeholder.svg"} alt={`Lifestyle image ${index + 1}`} className="mobile-image" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImageColumns
