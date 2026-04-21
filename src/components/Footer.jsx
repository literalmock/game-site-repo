import React from 'react'
import { BrandX, Instagram, Send, YouTube } from './ui/Icons'
import './Footer.css'

const FOOTER_LINKS = {
  discover: ['Featured', 'New Releases', 'Top Rated', 'Genres'],
  account: ['Profile', 'Wishlist', 'Library', 'Support'],
}

const Footer = () => {
  return (
    <footer className="footer-shell">
      <div className="footer-panel">
        <div className="footer-top">
          <div className="footer-brand-wrap">
            <a href="/" className="footer-brand" aria-label="Gameverse home">
              <img src="/logo_bigtext.webp" alt="Gameverse" className="footer-brand-image" />
            </a>
            <p className="footer-tagline">
              Explore worlds, chase scores, and play with friends across the Gameverse.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-links-col footer-links-col--discover">
              <p className="footer-heading">Discover</p>
              <ul className="footer-link-list">
                {FOOTER_LINKS.discover.map((item) => (
                  <li key={item}><a href="#" className="footer-link">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="footer-links-col">
              <p className="footer-heading">Account</p>
              <ul className="footer-link-list">
                {FOOTER_LINKS.account.map((item) => (
                  <li key={item}><a href="#" className="footer-link">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-newsletter">
            <p className="footer-heading">Get Updates</p>
            <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="footer-input"
                aria-label="Email"
              />
              <button type="submit" className="footer-submit" aria-label="Subscribe">
                <Send size={15} />
              </button>
            </form>
            
            <div className="footer-socials" aria-label="Social links">
              <a href="#" className="footer-social-link" aria-label="X">
                <BrandX size={14} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <Instagram size={14} />
              </a>
              <a href="#" className="footer-social-link" aria-label="YouTube">
                <YouTube size={14} />
              </a>
            </div>
           
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">Copyright {new Date().getFullYear()} Gameverse. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">Privacy</a>
            <a href="#" className="footer-legal-link">Terms</a>
          </div>
        </div>

       
      </div>
       <div className='footer-logo-effect'>
                Gameverse
        </div>
    </footer>
  )
}

export default Footer
