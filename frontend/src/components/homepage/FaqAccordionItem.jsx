import { ChevronDown } from '../ui/Icons'

const FaqAccordionItem = ({ item, isOpen, onToggle }) => (
  <article className={`landing-faq-item ${isOpen ? 'landing-faq-item--open' : ''}`}>
    <button
      type="button"
      className="landing-faq-trigger"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className="landing-faq-question">{item.question}</span>
      <span className={`landing-faq-icon ${isOpen ? 'landing-faq-icon--open' : ''}`}>
        <ChevronDown size={18} />
      </span>
    </button>

    <div className={`landing-faq-answer-wrap ${isOpen ? 'landing-faq-answer-wrap--open' : ''}`}>
      <div className="landing-faq-answer-inner">
        <p className="landing-faq-answer">{item.answer}</p>
      </div>
    </div>
  </article>
)

export default FaqAccordionItem
