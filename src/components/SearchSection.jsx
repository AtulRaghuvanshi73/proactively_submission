import { Search, MapPin, CreditCard } from "lucide-react"
import "../styles/SearchSection.css"

const SearchSection = () => {
  return (
    <section className="search-section">
      <div className="search-container">
        <div className="search-input-group">
          <Search className="search-icon" />
          <input type="text" placeholder="Condition, procedure, specialty..." className="search-input" />
        </div>

        <div className="search-input-group">
          <MapPin className="search-icon" />
          <input type="text" placeholder="City, state, or zipcode" className="search-input" />
        </div>

        <div className="search-input-group">
          <CreditCard className="search-icon" />
          <input type="text" placeholder="Insurance carrier" className="search-input" />
        </div>

        <button className="search-button">
          <Search className="button-icon" />
          Find now
        </button>
      </div>
    </section>
  )
}

export default SearchSection
