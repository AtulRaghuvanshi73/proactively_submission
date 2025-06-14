"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import PillarCard from "./PillarCard"
import "../styles/HowItWorks.css"

const HowItWorks = () => {
  const [activePillar, setActivePillar] = useState("nutrition")

  const pillars = [
    {
      id: "nutrition",
      title: "Nutrition",
      description:
        "Evidence supports the use of a whole food, plant-predominant diet to prevent, treat and reverse chronic disease.",
      image: "/card_image1.svg",
      minutes: 12,
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
            <button className="nav-button prev" onClick={handlePrevious}>
              <ChevronLeft />
            </button>
            <button className="nav-button next" onClick={handleNext}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <div className="pillars-tabs">
        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            className={`pillar-tab ${activePillar === pillar.id ? "active" : ""}`}
            onClick={() => setActivePillar(pillar.id)}
          >
            {pillar.title}
          </button>
        ))}
      </div>

      <div className="pillar-cards">
        {pillars.map((pillar) => (
          <div key={pillar.id} className={`pillar-card-container ${activePillar === pillar.id ? "active" : ""}`}>
            <PillarCard
              title={pillar.title}
              description={pillar.description}
              image={pillar.image}
              minutes={pillar.minutes}
              hours={pillar.hours}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
