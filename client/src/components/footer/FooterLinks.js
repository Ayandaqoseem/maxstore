import React from "react";
import "./FooterLinks.scss";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logoImg from "../../image/logo/MaxLogo.png";

const FooterLinks = () => {
  return (
    <>
      <section className="contact-section">
        <div className="container-fluid contact">
          <div className="contact-icon">
            <h5 className="contact-icon-title">Join Us</h5>
            <FaFacebookF className="i" />
            <FaTwitter className="i" />
            <FaInstagram className="i" />
            <FaYoutube className="i" />
          </div>

          <h2>Let's Talk</h2>
          <a href="#home" className="-btn- -btn-dark-">
            Make an enquiry!
          </a>
        </div>
      </section>

      <section className="footer-section">
        <div className="container-fluid footer">
          <div className="footer-logo">
            <img src={logoImg} alt="logo" />
            <span>MaxStore</span>
          </div>

          <div className="footer-menu">
            <p className="link-heading">Features</p>
            <ul className="nav-ul footer-links">
              <li>
                <a href="#">Link Shortening</a>
              </li>
              <li>
                <a href="#">Branded Link</a>
              </li>
              <li>
                <a href="#">Analytics</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-menu">
            <p className="link-heading adjusted-link-heading">Resources</p>
            <ul className="nav-ul footer-links footer-links--">
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Developer</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Docs</a>
              </li>
            </ul>
          </div>

          <div className="footer-menu">
            <p className="link-heading adjusted-link-heading">Company</p>
            <ul className="nav-ul footer-links footer-links--">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Our Team</a>
              </li>
              <li>
                <a href="#">Career</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-menu">
            <p className="link-heading adjusted-link-heading">Partners</p>
            <ul className="nav-ul footer-links footer-links--">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Our Team</a>
              </li>
              <li>
                <a href="#">Career</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default FooterLinks;
