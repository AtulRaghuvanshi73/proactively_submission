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
      "/carousal_image3.svg", 
      "/carousal_image5.svg", 
      "/carousal_image7.svg"
    ],
    column2: [
      "/carousal_image2.svg", 
      "/carousal_image4.svg", 
      "/carousal_image6.svg", 
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
          // Calculate initial scrollHeight to avoid accessing it repeatedly
          let column1ScrollHeight = 0;
          try {
            column1ScrollHeight = column1Ref.current.scrollHeight;
          } catch (e) {
            console.warn("Failed to get column1 scrollHeight", e);
          }
          
          let topPosition = 0;

          const interval1 = setInterval(() => {
            // Check if ref still exists
            if (!column1Ref.current) {
              clearInterval(interval1);
              return;
            }
            
            topPosition -= 0.5; // Slower speed for smoother animation
            
            // Calculate or refresh scrollHeight if needed
            if (column1ScrollHeight <= 0) {
              try {
                column1ScrollHeight = column1Ref.current.scrollHeight;
                // If still not valid, skip this frame
                if (column1ScrollHeight <= 0) return;
              } catch (e) {
                return;
              }
            }
            
            // Reset when the last image is fully visible
            if (Math.abs(topPosition) >= column1ScrollHeight / 2) {
              topPosition = 0;
            }

            try {
              column1Ref.current.style.transform = `translateY(${topPosition}px)`;
            } catch (e) {
              // Handle any styling errors
            }
          }, 20);
          
          intervalIds.push(interval1);
        }

        // Column 2: Bottom to top animation
        if (column2Ref.current) {
          // Calculate initial scrollHeight to avoid accessing it repeatedly
          let column2ScrollHeight = 0;
          try {
            column2ScrollHeight = column2Ref.current.scrollHeight;
          } catch (e) {
            console.warn("Failed to get column2 scrollHeight", e);
          }
          
          let topPosition = 0;

          const interval2 = setInterval(() => {
            // Check if ref still exists
            if (!column2Ref.current) {
              clearInterval(interval2);
              return;
            }
            
            topPosition += 0.5; // Slower speed for smoother animation
            
            // Calculate or refresh scrollHeight if needed
            if (column2ScrollHeight <= 0) {
              try {
                column2ScrollHeight = column2Ref.current.scrollHeight;
                // If still not valid, skip this frame
                if (column2ScrollHeight <= 0) return;
              } catch (e) {
                return;
              }
            }
            
            // Reset when the first image is fully visible
            if (Math.abs(topPosition) >= column2ScrollHeight / 2) {
              topPosition = 0;
            }

            try {
              column2Ref.current.style.transform = `translateY(${topPosition}px)`;
            } catch (e) {
              // Handle any styling errors
            }
          }, 20);
          
          intervalIds.push(interval2);
        }
      }
    }

    // Mobile animation: Right to left
    const animateMobileSlider = () => {
      if (window.innerWidth < 768 && mobileSliderRef.current) {
        const slider = mobileSliderRef.current;
        let sliderWidth = 0;
        let containerWidth = 0;
        
        try {
          sliderWidth = slider.scrollWidth;
          
          // Safely get container width
          if (slider.parentElement) {
            containerWidth = slider.parentElement.clientWidth;
          }
        } catch (e) {
          console.warn("Failed to get slider dimensions", e);
          return; // Don't set up animation if we can't get dimensions
        }
        
        // Only proceed if we have valid measurements
        if (sliderWidth <= 0 || containerWidth <= 0) return;
        
        let position = 0;

        const interval3 = setInterval(() => {
          // Check if ref still exists
          if (!mobileSliderRef.current) {
            clearInterval(interval3);
            return;
          }
          
          position -= 0.5; // Slower speed for smoother animation
          
          try {
            // Refresh measurements occasionally to handle resizing
            if (position % 100 === 0) {
              sliderWidth = mobileSliderRef.current.scrollWidth;
              if (mobileSliderRef.current.parentElement) {
                containerWidth = mobileSliderRef.current.parentElement.clientWidth;
              }
            }
            
            // Reset when all images have scrolled through
            if (Math.abs(position) >= sliderWidth - containerWidth) {
              position = 0;
            }

            mobileSliderRef.current.style.transform = `translateX(${position}px)`;
          } catch (e) {
            // Handle any errors from reading dimensions or setting style
            clearInterval(interval3);
          }
        }, 20);
        
        intervalIds.push(interval3);
      }
    }

    // Initialize animations with a small delay to ensure DOM is ready
    setTimeout(() => {
      animateDesktopColumns()
      animateMobileSlider()
    }, 100)

    // Debounce function to prevent excessive resize calls
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
      };
    };

    // Handle resize
    const handleResize = debounce(() => {
      // Clear all animation intervals
      intervalIds.forEach(id => clearInterval(id));
      intervalIds.length = 0; // Clear the array
      
      // Reset positions safely
      try {
        if (column1Ref.current) {
          column1Ref.current.style.transform = "translateY(0)";
        }
      } catch (e) {}
      
      try {
        if (column2Ref.current) {
          column2Ref.current.style.transform = "translateY(0)";
        }
      } catch (e) {}
      
      try {
        if (mobileSliderRef.current) {
          mobileSliderRef.current.style.transform = "translateX(0)";
        }
      } catch (e) {}

      // Small timeout to ensure DOM is ready before restarting animations
      const restartTimer = setTimeout(() => {
        if (document.body.contains(column1Ref.current) || 
            document.body.contains(column2Ref.current) || 
            document.body.contains(mobileSliderRef.current)) {
          animateDesktopColumns();
          animateMobileSlider();
        }
      }, 200);
      
      // Add this timeout to the intervals array so it gets cleared on cleanup
      intervalIds.push(restartTimer);
    }, 250); // Debounce resize event for better performance

    window.addEventListener("resize", handleResize);

    // Start animations after a small delay
    const initialTimer = setTimeout(() => {
      animateDesktopColumns();
      animateMobileSlider();
    }, 200);
    
    intervalIds.push(initialTimer);

    return () => {
      // Clean up all intervals and timers on unmount
      intervalIds.forEach(id => {
        clearInterval(id);
        clearTimeout(id);
      });
      
      window.removeEventListener("resize", handleResize);
    }
  }, [isMounted])

  return (
    <section className={`image-columns ${inHero ? 'in-hero' : ''}`}>
      {/* Desktop view: Two columns */}
      <div className="desktop-columns">
        <div className="column-wrapper">
          <div className="column" ref={column1Ref}>
            {images.column1.map((src, index) => (
              <div key={`col1-${index}`} className="column-image-wrapper">
                <img src={src || "/placeholder.svg"} alt={`Lifestyle image ${index + 1}`} className="column-image" />
              </div>
            ))}
            {/* Duplicate images for seamless loop */}
            {images.column1.map((src, index) => (
              <div key={`col1-dup-${index}`} className="column-image-wrapper">
                <img src={src || "/placeholder.svg"} alt={`Lifestyle image ${index + 1}`} className="column-image" />
              </div>
            ))}
          </div>
        </div>

        <div className="column-wrapper">
          <div className="column" ref={column2Ref}>
            {images.column2.map((src, index) => (
              <div key={`col2-${index}`} className="column-image-wrapper">
                <img src={src || "/placeholder.svg"} alt={`Lifestyle image ${index + 4}`} className="column-image" />
              </div>
            ))}
            {/* Duplicate images for seamless loop */}
            {images.column2.map((src, index) => (
              <div key={`col2-dup-${index}`} className="column-image-wrapper">
                <img src={src || "/placeholder.svg"} alt={`Lifestyle image ${index + 4}`} className="column-image" />
              </div>
            ))}
          </div>
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
