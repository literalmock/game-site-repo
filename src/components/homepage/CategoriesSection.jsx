import { Skiper53 } from '../ui/skiper-ui/skiper53'
import './CategoriesSection.css'

const CategoriesSection = ({ categoryGenreCards, onDiscoverGenre }) => (
  <section className="landing-categories" aria-label="Categories and genres">
    <div className="landing-categories-shell">
      <p className="landing-categories-kicker label-xs">Discover By Style</p>
      <h2 className="landing-categories-title heading-lg heading-hover-accent">Categories And Genres</h2>
      <p className="landing-categories-subtitle text-body heading-paragraph-gap">
        Hover each row to preview a lane, or tap to expand and explore your next session mood.
      </p>

      <Skiper53
        items={categoryGenreCards}
        className="landing-categories-skiper"
        onItemClick={(item) => onDiscoverGenre(item.title ?? item.code)}
      />
    </div>
  </section>
)

export default CategoriesSection
