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
      image: "/card_image1.svg",
      minutes: 121,
      suffix: "/80", // Add suffix for displaying value like 121/80
    },
    {
      id: "physical-activity",
      title: "Physical activity",
      description:
        "Regular physical activity is key to managing weight, improving mental health, and reducing risk of chronic disease.",
      image: "/card_image2.svg",
      minutes: 32,
    },
    {
      id: "restorative-sleep",
      title: "Restorative sleep",
      description: "Consistent, quality sleep is essential for cognitive function and physical recovery.",
      image: "/card_image3.svg",
      hours: 8,
    },
    {
      id: "stress-management",
      title: "Stress management",
      description: "Managing stress effectively improves overall health and prevents chronic conditions.",
      image: "/card_image4.svg",
      minutes: 15,
    },
    {
      id: "social-connection",
      title: "Social connection",
      description: "Strong social connections contribute to better mental health and longevity.",
      image: "/card_image5.svg",
      minutes: 45,
    },
    {
      id: "substance-abuse",
      title: "Substance abuse",
      description: "Avoiding harmful substances is crucial for maintaining long-term health and wellbeing.",
      image: "/card_image6.svg",
      minutes: 20,
    },
  ]

  // Function to scroll to active pillar with enhanced mobile support
  const scrollToActivePillar = (pillarId) => {
    setTimeout(() => {
      const activeElement = document.getElementById(`pillar-${pillarId}`)
      const activeTabElement = document.getElementById(`tab-${pillarId}`)
      
      if (activeElement && cardsContainerRef.current) {
        // For cards container
        const container = cardsContainerRef.current;
        const cardRect = activeElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Calculate the scroll position so the card is centered
        const scrollLeft = activeElement.offsetLeft - (containerRect.width / 2) + (cardRect.width / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
      
      // Also ensure active tab is visible
      if (activeTabElement && tabsContainerRef.current) {
        const tabsContainer = tabsContainerRef.current;
        const tabRect = activeTabElement.getBoundingClientRect();
        const tabsContainerRect = tabsContainer.getBoundingClientRect();
        
        // Calculate the scroll position so the tab is centered
        const tabScrollLeft = activeTabElement.offsetLeft - (tabsContainerRect.width / 2) + (tabRect.width / 2);
        
        tabsContainer.scrollTo({
          left: tabScrollLeft,
          behavior: 'smooth'
        });
      }
    }, 100) // Increased delay to ensure DOM is fully updated
  }

  // When active pillar changes, scroll to it
  useEffect(() => {
    scrollToActivePillar(activePillar)
  }, [activePillar])

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

  const handlePillarSelect = (pillarId) => {
    setActivePillar(pillarId)
  }

  const handlePrevious = () => {
    const currentIndex = pillars.findIndex((pillar) => pillar.id === activePillar)
    const newIndex = currentIndex === 0 ? pillars.length - 1 : currentIndex - 1
    setActivePillar(pillars[newIndex].id)
  }

  const handleNext = () => {
    const currentIndex = pillars.findIndex((pillar) => pillar.id === activePillar)
    const newIndex = currentIndex === pillars.length - 1 ? 0 : currentIndex + 1
    setActivePillar(pillars[newIndex].id)
  }

  return (
    <section className="how-it-works">
      <div className="how-it-works-header">
        <h2>HOW IT WORKS</h2>
        <div className="lifestyle-medicine">
          <h3>
            Lifestyle as medicine: <span>The six pillars</span>
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

      <div className="pillars-tabs" ref={tabsContainerRef}>
        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            id={`tab-${pillar.id}`}
            className={`pillar-tab ${activePillar === pillar.id ? "active" : ""}`}
            onClick={() => handlePillarSelect(pillar.id)}
            aria-selected={activePillar === pillar.id}
          >
            {pillar.title}
          </button>
        ))}
      </div>

      <div className="pillar-cards-container">
        <div className="pillar-cards" ref={cardsContainerRef}>
          {pillars.map((pillar) => (
            <div 
              key={pillar.id} 
              id={`pillar-${pillar.id}`} 
              className={`pillar-card-wrapper ${activePillar === pillar.id ? "active" : ""}`}
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
    </section>
  )
}

export default HowItWorks
