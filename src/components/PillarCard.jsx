import "../styles/PillarCard.css"

const PillarCard = ({ title, description, image, minutes, hours, suffix = "", isActive = false }) => {
  return (
    <div className={`pillar-card ${isActive ? 'active' : ''}`}>
      <div className="pillar-image">
        <img src={image || "/placeholder.svg"} alt={title} />
        <div className="time-indicator">
          {hours ? (
            <div className="time-badge">
              <span className="time-value">{hours}</span>
              <span className="time-unit">hours</span>
            </div>
          ) : (
            <div className="time-badge">
              <span className="time-value">{minutes}</span>
              <span className="time-suffix">{suffix}</span>
              <span className="time-unit">minutes</span>
            </div>
          )}
        </div>
      </div>
      <div className="pillar-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default PillarCard
