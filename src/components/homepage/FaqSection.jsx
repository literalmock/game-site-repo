import FaqAccordionItem from './FaqAccordionItem'
import FaqVisual from './FaqVisual'
import './FaqSection.css'

const FaqSection = ({ shouldReduceMotion, faqItems, openFaqIndex, setOpenFaqIndex }) => (
  <section className="landing-faq" aria-label="Frequently asked questions">
    <div className="landing-faq-shell">
      <div className="landing-faq-split">
        <FaqVisual reducedMotion={shouldReduceMotion} />

        <div className="landing-faq-content">
          <p className="landing-faq-kicker label-xs">FAQ</p>
          <h2 className="landing-faq-title heading-lg heading-hover-accent">Frequently Asked Questions</h2>
          <p className="landing-faq-subtitle text-body heading-paragraph-gap">Everything you need to know about GamerVerse</p>

          <div className="landing-faq-list">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index

              return (
                <FaqAccordionItem
                  key={item.question}
                  item={item}
                  isOpen={isOpen}
                  onToggle={() => setOpenFaqIndex(isOpen ? -1 : index)}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default FaqSection
