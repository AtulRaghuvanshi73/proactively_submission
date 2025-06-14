"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import PillarCard from "./PillarCard"
import "../styles/HowItWorks.css"
import { useIsMobile } from "../../hooks/use-mobile"

const HowItWorks = () => {
  const [activePillar, setActivePillar] = useState("nutrition")
  const cardsContainerRef = useRef(null)
  const tabsContainerRef = useRef(null)
  const isMobile = useIsMobile()

  const pillars = [
    {
      id: "nutrition",
      title: "Nutrition",
      description:
        "Evidence supports the use of a whole food, plant-predominant diet to prevent, treat and reverse chronic disease.",
      image: "/card_image6.svg",
      minutes: 121,
      suffix: "/80", // Add suffix for displaying value like 121/80
    },
    {
      id: "physical-activity",
      title: "Physical activity",
      description:
        "Regular physical activity is key to managing weight, improving mental health, and reducing risk of chronic disease.",
      image: "/card_image5.svg",
      minutes: 32,
    },
    {
      id: "restorative-sleep",
      title: "Restorative sleep",
      description: "Consistent, quality sleep is essential for cognitive function and physical recovery.",
      image: "/card_image4.svg",
      hours: 8,
    },
    {
      id: "stress-management",
      title: "Stress management",
      description: "Managing stress effectively improves overall health and prevents chronic conditions.",
      image: "/card_image3.svg",
      minutes: 15,
    },
    {
      id: "social-connection",
      title: "Social connection",
      description: "Strong social connections contribute to better mental health and longevity.",
      image: "/card_image2.svg",
      minutes: 45,
    },
    {
      id: "substance-abuse",
      title: "Substance abuse",
      description: "Avoiding harmful substances is crucial for maintaining long-term health and wellbeing.",
      image: "/card_image1.svg",
      minutes: 20,
    },
  ]

  // Function to scroll to active pillar with enhanced support for both mobile and desktop
  const scrollToActivePillar = (pillarId) => {
    setTimeout(() => {
      const activeElement = document.getElementById(`pillar-${pillarId}`)
      const activeTabElement = document.getElementById(`tab-${pillarId}`)
      
      if (activeElement && cardsContainerRef.current) {
        // For cards container
        const container = cardsContainerRef.current;
        const cardRect = activeElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Different scrolling logic based on screen size
        if (window.innerWidth < 1024) {
          // For mobile/tablet: center the active card
          const scrollLeft = activeElement.offsetLeft - (containerRect.width / 2) + (cardRect.width / 2);
          
          container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        } else {
          // For desktop: handle last card specially to ensure it's fully visible
          const cardIndex = Array.from(container.children).indexOf(activeElement);
          const totalCards = container.children.length;
          
          // Check if this is one of the last two cards
          if (cardIndex >= totalCards - 2) {
            // For last two cards, scroll to show the end of the container
            const maxScrollLeft = container.scrollWidth - containerRect.width;
            container.scrollTo({
              left: maxScrollLeft,
              behavior: 'smooth'
            });
          } else {
            // For other cards: normal behavior - position active card with buffer from left
            const scrollLeft = activeElement.offsetLeft - 16;
            container.scrollTo({
              left: scrollLeft,
              behavior: 'smooth'
            });
          }
        }
      }
      
      // Also ensure active tab is visible
      if (activeTabElement && tabsContainerRef.current) {
        const tabsContainer = tabsContainerRef.current;
        const tabRect = activeTabElement.getBoundingClientRect();
        const tabsContainerRect = tabsContainer.getBoundingClientRect();
        
        // Special handling for last tabs to ensure they're fully visible
        const tabIndex = Array.from(tabsContainer.children).indexOf(activeTabElement);
        const totalTabs = tabsContainer.children.length;
        
        if (tabIndex >= totalTabs - 2) {
          // For last two tabs, ensure we scroll to the end
          const maxScrollLeft = tabsContainer.scrollWidth - tabsContainerRect.width;
          tabsContainer.scrollTo({
            left: maxScrollLeft,
            behavior: 'smooth'
          });
        } else {
          // Center other tabs
          const tabScrollLeft = activeTabElement.offsetLeft - (tabsContainerRect.width / 2) + (tabRect.width / 2);
          tabsContainer.scrollTo({
            left: tabScrollLeft,
            behavior: 'smooth'
          });
        }
      }
    }, 150) // Increased delay to ensure DOM is fully updated
  }

  // Ensure nutrition card is shown first on component mount with improved initialization
  useEffect(() => {
    // Add small delay to allow DOM to fully render
    const initialRenderTimeout = setTimeout(() => {
      // Reset to nutrition card
      setActivePillar("nutrition");
      
      // Force a scroll after a short delay to ensure proper positioning
      setTimeout(() => {
        const nutritionElement = document.getElementById('pillar-nutrition');
        if (nutritionElement && cardsContainerRef.current) {
          // For mobile: center the active card
          if (window.innerWidth < 1024) {
            const containerRect = cardsContainerRef.current.getBoundingClientRect();
            const cardRect = nutritionElement.getBoundingClientRect();
            const scrollLeft = nutritionElement.offsetLeft - (containerRect.width / 2) + (cardRect.width / 2);
            
            cardsContainerRef.current.scrollTo({
              left: scrollLeft,
              behavior: 'smooth'
            });
          } 
          // For desktop: position at start
          else {
            cardsContainerRef.current.scrollTo({
              left: 0,
              behavior: 'smooth'
            });
          }
          
          // Also ensure the tab is properly positioned
          const nutritionTab = document.getElementById('tab-nutrition');
          if (nutritionTab && tabsContainerRef.current) {
            tabsContainerRef.current.scrollTo({
              left: 0,
              behavior: 'smooth'
            });
          }
        }
      }, 150);
    }, 250);
    
    return () => clearTimeout(initialRenderTimeout);
  }, []);

  // When active pillar changes, scroll to it
  useEffect(() => {
    scrollToActivePillar(activePillar)
  }, [activePillar])

  // When component first mounts, ensure the active pillar is visible
  useEffect(() => {
    // Short delay to ensure DOM is ready
    const initialTimer = setTimeout(() => {
      // Set the active pillar to nutrition explicitly for initial render
      setActivePillar("nutrition");
      
      // Another small delay before scrolling to make sure everything's rendered
      setTimeout(() => {
        scrollToActivePillar("nutrition");
      }, 200);
    }, 100);
    
    return () => clearTimeout(initialTimer);
  }, []);

  // Track card container width changes
  useEffect(() => {
    if (!cardsContainerRef.current) return;

    const observer = new ResizeObserver(() => {
      if (activePillar) {
        scrollToActivePillar(activePillar);
      }
    });

    observer.observe(cardsContainerRef.current);
    return () => observer.disconnect();
  }, [activePillar]);

  // Handle window resize events for proper positioning
  useEffect(() => {
    // Debounce function to limit frequent calls
    const debounce = (func, delay) => {
      let timeoutId;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(context, args), delay);
      };
    };
    
    const handleResize = debounce(() => {
      if (activePillar) {
        scrollToActivePillar(activePillar);
      }
    }, 200);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activePillar]);

  // Add touch event listeners for better mobile scrolling
  useEffect(() => {
    if (!cardsContainerRef.current || !isMobile) return;
    
    let startX, startScrollLeft, isDragging = false;
    const container = cardsContainerRef.current;
    
    const handleTouchStart = (e) => {
      isDragging = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      startScrollLeft = container.scrollLeft;
    };
    
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Scroll speed multiplier
      container.scrollLeft = startScrollLeft - walk;
    };
    
    const handleTouchEnd = () => {
      isDragging = false;
      
      // Find the closest card to snap to
      if (container) {
        const containerCenter = container.getBoundingClientRect().width / 2;
        const cards = Array.from(container.querySelectorAll('.pillar-card-wrapper'));
        let closestCard = null;
        let minDistance = Infinity;
        
        cards.forEach(card => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const distanceToCenter = Math.abs(cardCenter - (container.getBoundingClientRect().left + containerCenter));
          
          if (distanceToCenter < minDistance) {
            minDistance = distanceToCenter;
            closestCard = card;
          }
        });
        
        if (closestCard && closestCard.id) {
          const pillarId = closestCard.id.replace('pillar-', '');
          if (pillarId && pillarId !== activePillar) {
            setActivePillar(pillarId);
          } else {
            // Ensure we still scroll to the active pillar
            scrollToActivePillar(activePillar);
          }
        }
      }
    };
    
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [cardsContainerRef, isMobile, activePillar]);

  // Add keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePillar]);
  
  const handlePillarSelect = (pillarId) => {
    setActivePillar(pillarId)
    
    // Ensure immediate scrolling for better user experience
    setTimeout(() => {
      scrollToActivePillar(pillarId)
    }, 50)
  }

  const handlePrevious = () => {
    const currentIndex = pillars.findIndex((pillar) => pillar.id === activePillar)
    const newIndex = currentIndex === 0 ? pillars.length - 1 : currentIndex - 1
    const newPillarId = pillars[newIndex].id
    setActivePillar(newPillarId)
    
    // Ensure immediate scrolling for better user experience
    setTimeout(() => {
      scrollToActivePillar(newPillarId)
    }, 50)
  }

  const handleNext = () => {
    const currentIndex = pillars.findIndex((pillar) => pillar.id === activePillar)
    const newIndex = currentIndex === pillars.length - 1 ? 0 : currentIndex + 1
    const newPillarId = pillars[newIndex].id
    setActivePillar(newPillarId)
    
    // Ensure immediate scrolling for better user experience
    setTimeout(() => {
      scrollToActivePillar(newPillarId)
    }, 50)
  }
  
  // Update the JSX for the tab buttons to include keyboard accessibility
  const renderPillarTabs = () => {
    return pillars.map((pillar, index) => (
      <button
        key={pillar.id}
        id={`tab-${pillar.id}`}
        className={`pillar-tab ${activePillar === pillar.id ? "active" : ""}`}
        onClick={() => handlePillarSelect(pillar.id)}
        aria-selected={activePillar === pillar.id}
        tabIndex={0}
        role="tab"
        aria-controls={`pillar-${pillar.id}`}
      >
        {pillar.title}
      </button>
    ));
  };

  return (
    <section className="how-it-works">
      <div className="how-it-works-inner">
        <div className="how-it-works-header">
          <h2>HOW IT WORKS</h2>
          <div className="lifestyle-medicine">
            <h3>
              <span className="lifestyle-text">Lifestyle as medicine:</span> The six pillars
            </h3>
            <div className="navigation-buttons">
              <button className="nav-button prev" onClick={handlePrevious} aria-label="Previous pillar">
                <ChevronLeft />
              </button>
              <button className="nav-button next" onClick={handleNext} aria-label="Next pillar">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        <div className="pillars-tabs-container">
          <div className="pillars-tabs" ref={tabsContainerRef}>
            {renderPillarTabs()}
          </div>
        </div>

        <div className="pillar-cards-container">
          <div 
            className="pillar-cards" 
            ref={cardsContainerRef}
            role="tabpanel"
            aria-live="polite"
          >
            {pillars.map((pillar) => (
              <div 
                key={pillar.id} 
                id={`pillar-${pillar.id}`} 
                className={`pillar-card-wrapper ${activePillar === pillar.id ? "active" : ""}`}
                tabIndex={activePillar === pillar.id ? 0 : -1}
                aria-hidden={activePillar !== pillar.id}
              >
                <PillarCard
                  title={pillar.title}
                  description={pillar.description}
                  image={pillar.image}
                  minutes={pillar.minutes}
                  hours={pillar.hours}
                  suffix={pillar.suffix}
                  isActive={activePillar === pillar.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
