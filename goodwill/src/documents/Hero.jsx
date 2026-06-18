import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css'; // Optional: You can move inline styles to this CSS file for cleaner code

const Hero = () => {
  return (
    <div
      style={{
        // The global mesh gradient background
        background: "linear-gradient(135deg, #a7473b 0%, #4e3288 25%, #2a58b5 60%, #90c7d7 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "white",
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflowX: "hidden"
      }}
    >
      {/* Navigation - Glass Top Bar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 5%",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ background: "rgba(255,255,255,0.2)", padding: "6px 14px", borderRadius: "10px", fontWeight: "900", fontSize: "1.2rem", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.3)" }}>S</div>
          <span style={{ fontWeight: "800", fontSize: "1.4rem", letterSpacing: "0.5px", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>SchemeMatch</span>
        </div>
        
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Link 
            to="/login" 
            style={{ color: "rgba(255,255,255,0.8)", fontWeight: "600", textDecoration: "none", transition: "color 0.2s" }}
            onMouseOver={(e) => e.target.style.color = "white"}
            onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.8)"}
          >
            Login
          </Link>
          <Link 
            to="/register" 
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              padding: "10px 24px",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: "700",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(4px)",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)"}
            onMouseOut={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"}
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Main Split Layout */}
      <main 
        style={{ 
          flex: 1, 
          display: "flex", 
          flexWrap: "wrap", 
          alignItems: "center", 
          justifyContent: "space-between", 
          padding: "40px 5%", 
          gap: "40px" 
        }}
      >
        
        {/* Left Side: Content Anchor */}
        <section style={{ flex: "1 1 400px", maxWidth: "600px" }}>
          
          
          <h1 style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: "900", lineHeight: "1.1", margin: "0 0 25px 0", textShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
            ₹1.7L Cr <span style={{ color: "rgba(255,255,255,0.5)" }}>Unclaimed.</span><br />
            <span style={{ background: "linear-gradient(to right, #fff, #90c7d7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Find what's yours.</span>
          </h1>
          
          <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "rgba(255,255,255,0.8)", marginBottom: "40px" }}>
            India has over 2,500 government schemes. Most citizens qualify for thousands in benefits but never know it. 
            <strong style={{ color: "white" }}> SchemeMatch uses Gemini AI to score and match you to the welfare you deserve.</strong>
          </p>
          
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <Link 
              to="/register" 
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                padding: "16px 32px",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "800",
                fontSize: "1.1rem",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(8px)",
                transition: "all 0.2s ease",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Build Your Profile →
            </Link>
            
            <Link 
              to="/about" 
              style={{ display: "flex", alignItems: "center", gap: "10px", color: "white", textDecoration: "none", fontWeight: "600", transition: "opacity 0.2s" }}
              onMouseOver={(e) => e.currentTarget.style.opacity = "0.7"}
              onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
                ▶
              </div>
              How It Works
            </Link>
          </div>
        </section>

        {/* Right Side: Visual Hook */}
        <section style={{ flex: "1 1 400px", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "500px" }}>
          
          {/* Background Image Overlay with Glass Border */}
          <div style={{ width: "100%", maxWidth: "500px", height: "400px", borderRadius: "24px", overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
            <img 
              src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80" 
              alt="Digital India" 
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }}
            />
            {/* Inner gradient overlay to blend image into the mesh */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(to top, rgba(78, 50, 136, 0.8), transparent)" }}></div>
          </div>

          {/* Floating Impact Score Card (Glassmorphism) */}
          <div 
            style={{
              position: "absolute",
              bottom: "25%",
              left: "27%", // Pushes it slightly off the image for depth
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              padding: "25px",
              borderRadius: "16px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
              width: "280px",
              animation: "float 6s ease-in-out infinite"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#34d399", boxShadow: "0 0 10px #34d399" }}></div>
              <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "rgba(255,255,255,0.6)", letterSpacing: "1px" }}>ID: 2026-SM</span>
            </div>
            
            <h3 style={{ margin: "0 0 10px 0", fontSize: "1.1rem", fontWeight: "700", color: "white" }}>Personal Impact Score</h3>
            
            <div style={{ fontSize: "3.5rem", fontWeight: "900", lineHeight: "1", color: "#34d399", marginBottom: "15px", textShadow: "0 0 20px rgba(52, 211, 153, 0.4)" }}>
              84<span style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.4)" }}>/100</span>
            </div>
            
            <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden", marginBottom: "15px" }}>
              <div style={{ width: "84%", height: "100%", background: "#34d399", boxShadow: "0 0 10px rgba(52, 211, 153, 0.8)" }}></div>
            </div>
            
            <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>Match: <span style={{ color: "white", fontWeight: "700" }}>OBC / Maharashtra</span></p>
          </div>
        </section>
      </main>

 
      {/* CSS Animation embedded globally for the floating card */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default Hero;