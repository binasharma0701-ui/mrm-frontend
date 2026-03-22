import './Footer.css'
import { FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About MRM</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><a href="#mission">Our Mission</a></li>
            <li><a href="#craftsmen">Our Craftsmen</a></li>
            <li><a href="#sustainability">Sustainability</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/collections">Collections</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Care</h3>
          <ul>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#shipping">Shipping Info</a></li>
            <li><a href="#returns">Returns</a></li>
            <li><a href="#support">Support</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li><a href="tel:+916367929608">Phone : +91 6367929608</a></li>
            <li><a href="tel:+917742907042">Mobile : +91 7742907042</a></li>
            <li><a href="tel:+919460385222">Mobile : +91 9460385222</a></li>
            <li><a href="mailto:info@mrmidols.com">Email : info@mrmidols.com</a></li>
            <li>
              <a
                href="https://maps.app.goo.gl/EgqGhKaDTmwDVfbP6"
                target="_blank"
                rel="noopener noreferrer"
                className="Location : MRM MOORTI ART JAIPUR"
              >
                <FaMapMarkerAlt className="location-icon" />
                Address : MRM MOORTI ART JAIPUR
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://www.facebook.com/share/1G7eYpEdVX/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/mrm_art_jaipur?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a href="#twitter" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://youtube.com/@MRMMOORTIART" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} MRM Handicrafts. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#refund">Refund Policy</a>
        </div>
      </div>
    </footer>
  )
}
