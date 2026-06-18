import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Hero.css';

const Hero = () => {
  return (
    <div className="sm-hero-container">
      
      {/* Navigation - Glass Top Bar */}
      <nav className="sm-nav">
        <div className="sm-logo-group">
          
          <span className="sm-logo-text">SchemeMatch</span>
        </div>
        
        <div className="sm-nav-actions">
          <Link to="/login" className="sm-link-login">
            Login
          </Link>
          <Link to="/register" className="sm-btn-reg">
            Register
          </Link>
        </div>
      </nav>
      

      {/* Main Split Layout */}
      <main className="sm-main">
        
        {/* Left Side: Content Anchor */}
        <section className="sm-hero-content">
          <h1 className="sm-hero-title">
            ₹1.7L Cr <span className="sm-text-dim">Unclaimed.</span><br />
            <span className="sm-text-gradient">Find what's yours.</span>
          </h1>
          
          <p className="sm-hero-desc">
            India has over 2,500 government schemes. Most citizens qualify for thousands in benefits but never know it. 
            <strong> SchemeMatch uses Gemini AI to score and match you to the welfare you deserve.</strong>
          </p>
          
          <div className="sm-hero-buttons">
            <Link to="/register" className="sm-btn-primary">
              Build Your Profile →
            </Link>
            
            <Link to="/about" className="sm-link-how">
              <div className="sm-play-icon">▶</div>
              How It Works
            </Link>
          </div>
        </section>

        {/* Right Side: Visual Hook */}
        <section className="sm-visual-section">
          
          {/* Background Image Overlay */}
          <div className="sm-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80" 
              alt="Digital India" 
            />
            <div className="sm-image-overlay"></div>
          </div>

          {/* Floating Impact Score Card */}
          <div className="sm-impact-card">
            <div className="sm-card-header">
              <div className="sm-card-dot"></div>
              <span className="sm-card-id">ID: 2026-SM</span>
            </div>
            
            <h3 className="sm-card-title">Personal Impact Score</h3>
            
            <div className="sm-card-score">
              84<span className="sm-card-score-max">/100</span>
            </div>
            
            <div className="sm-card-progress-track">
              <div className="sm-card-progress-fill"></div>
            </div>
            
            <p className="sm-card-match">Match: <span>OBC / Maharashtra</span></p>
          </div>
          
        </section>
      </main>
    </div>
  );
};

export default Hero;