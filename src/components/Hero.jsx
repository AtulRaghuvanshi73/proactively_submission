import "../styles/Hero.css"
import ImageColumns from "./ImageColumns" // Import the ImageColumns component

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* On desktop we'll have these in order: carousel then content */}
        <div className="hero-carousel">
          <ImageColumns inHero={true} />
        </div>
        <div className="hero-content">
          <h1>
            Book an appointment with <br />
            <span className="highlight">lifestyle medicine</span> experts
          </h1>
          <p>Optimize your lifestyle and reverse chronic diseases.</p>
        </div>
      </div>
      <div className="gradient-bar"></div>
    </section>
  )
}

export default Hero
