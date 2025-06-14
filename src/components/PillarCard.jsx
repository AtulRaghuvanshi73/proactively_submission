import { Clock } from "lucide-react"
import "../styles/PillarCard.css"

const PillarCard = ({ title, description, image, minutes, hours }) => {
  return (
    <div className="pillar-card">
      <div className="pillar-image">
        <img src={image || "/placeholder.svg"} alt={title} />
        <div className="time-indicator">
          <Clock className="clock-icon" />
          <span>{hours ? `${hours} hours` : `${minutes} minutes`}</span>
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
