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
      <span
        className="landing-faq-icon"
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease-in-out' }}
      >
        <ChevronDown size={18} />
      </span>
    </button>

    <div
      className="landing-faq-answer-wrap overflow-hidden"
      style={{
        maxHeight: isOpen ? '500px' : '0px',
        opacity: isOpen ? 1 : 0,
        transition: 'max-height 0.26s ease-in-out, opacity 0.2s ease-out',
      }}
    >
      <p
        className="landing-faq-answer"
        style={{
          transform: isOpen ? 'translateY(0px)' : 'translateY(6px)',
          opacity: isOpen ? 1 : 0,
          transition: 'transform 0.16s ease-out, opacity 0.16s ease-out',
        }}
      >
        {item.answer}
      </p>
    </div>
  </article>
)

export default FaqAccordionItem
