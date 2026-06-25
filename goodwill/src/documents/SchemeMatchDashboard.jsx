
import React, { useState, useEffect } from "react";

const SchemeMatchDashboard = () => {
  // --- STATE MANAGEMENT (UNTOUCHED) ---
  const [currentUser, setCurrentUser] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImpactScheme, setSelectedImpactScheme] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    age: "",
    income: "",
    occupation: "",
  });

  // --- THE AUTO-SYNC ENGINE (UNTOUCHED) ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://sche-sefs.onrender.com/api/v1/user/me", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          setCurrentUser(data.user);
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // --- LOGIC (UNTOUCHED) ---
  const runAIFilter = async () => {
    setLoading(true);
    setSchemes([]);
    try {
      const response = await fetch(
        "https://sche-sefs.onrender.com/api/v1/schemes/analyze",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userProfile: currentUser }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setSchemes(data.matchedSchemes);
      } else {
        alert("AI Engine failed: " + data.message);
      }
    } catch (error) {
      console.error("AI Engine Error:", error);
      alert("Failed to connect to backend AI route.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    setEditForm({
      age: currentUser.age || "",
      income: currentUser.income || "",
      occupation: currentUser.occupation || "",
    });
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch("https://sche-sefs.onrender.com/api/v1/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentUser.email,
          age: editForm.age,
          income: editForm.income,
          occupation: editForm.occupation,
        }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setCurrentUser(data.user);
        setIsEditing(false);
      } else {
        alert("Update failed: " + data.message);
      }
    } catch (error) {
      console.error("Failed to save profile:", error);
      setCurrentUser((prev) => ({ ...prev, ...editForm }));
      setIsEditing(false);
    }
  };

  const handleApply = (schemeTitle) => {
    alert(
      `⚡ Application process initiated for:\n${schemeTitle}\n\nRedirecting to the official portal...`
    );
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("https://sche-sefs.onrender.com/api/v1/user/logout", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/login";
    }
  };

  if (!currentUser) {
    return (
      <div
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          height: "100vh", fontFamily: "system-ui, sans-serif",
          background: "linear-gradient(135deg, #9b4b45 0%, #442a78 30%, #2951a5 65%, #92c9da 100%)",
          color: "white"
        }}
      >
        <h2>⏳ Securely loading your profile...</h2>
        <p style={{ color: "rgba(255,255,255,0.7)" }}>Please wait while we connect to the database.</p>
      </div>
    );
  }

  // --- UI RENDERING (GLASSMORPHISM UPGRADE) ---
  return (
    <div
      style={{
        minHeight: "100vh",
        // The deep mesh gradient background mimicking the image
        background: "linear-gradient(135deg, #a7473b 0%, #4e3288 25%, #2a58b5 60%, #90c7d7 100%)",
        backgroundAttachment: "fixed",
        padding: "40px 20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "white",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", flexWrap: "wrap", gap: "20px" }}>
          <h1 style={{ fontSize: "2.2rem", margin: 0, fontWeight: "800", letterSpacing: "-0.5px", textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
            SchemeMatch Dashboard
          </h1>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "50px", // Pill shape
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"; }}
          >
            🚪 Logout
          </button>
        </div>

        {/* PROFILE WORKBENCH SECTION (Frosted Glass) */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "40px",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)", 
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: "1.4rem", fontWeight: "700", textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}>Your Welfare Profile</h2>

          {isEditing ? (
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-end" }}>
              <div style={{ display: "flex", flexDirection: "column", flex: "1", minWidth: "200px" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: "600", marginBottom: "8px", color: "rgba(255,255,255,0.8)" }}>Age</label>
                <input
                  type="number" value={editForm.age} onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                  style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.2)", color: "white", fontSize: "1rem", outline: "none", transition: "all 0.2s" }}
                  onFocus={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.8)"}
                  onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.3)"}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", flex: "1", minWidth: "200px" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: "600", marginBottom: "8px", color: "rgba(255,255,255,0.8)" }}>Annual Income (₹)</label>
                <input
                  type="number" value={editForm.income} onChange={(e) => setEditForm({ ...editForm, income: e.target.value })}
                  style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.2)", color: "white", fontSize: "1rem", outline: "none", transition: "all 0.2s" }}
                  onFocus={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.8)"}
                  onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.3)"}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", flex: "1", minWidth: "200px" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: "600", marginBottom: "8px", color: "rgba(255,255,255,0.8)" }}>Occupation</label>
                <select
                  value={editForm.occupation} onChange={(e) => setEditForm({ ...editForm, occupation: e.target.value })}
                  style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.2)", color: "white", fontSize: "1rem", outline: "none", cursor: "pointer" }}
                >
                  <option style={{ color: "black" }} value="General">General</option>
                  <option style={{ color: "black" }} value="Farmer">Agriculture & Farming</option>
                  <option style={{ color: "black" }} value="Student">Student</option>
                  <option style={{ color: "black" }} value="Healthcare">Healthcare</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  onClick={handleSaveProfile}
                  style={{ padding: "12px 24px", background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.5)", borderRadius: "8px", cursor: "pointer", fontWeight: "600", backdropFilter: "blur(5px)" }}
                >
                  💾 Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{ padding: "12px 24px", background: "transparent", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", background: "rgba(0,0,0,0.15)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Age</span>
                  <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>{currentUser.age || "N/A"}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Annual Income</span>
                  <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>₹{currentUser.income || "0"}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Occupation</span>
                  <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>{currentUser.occupation || "N/A"}</span>
                </div>
              </div>
              <button
                onClick={handleEditProfile}
                style={{
                  padding: "10px 20px", background: "rgba(255, 255, 255, 0.15)", color: "white", border: "1px solid rgba(255, 255, 255, 0.3)", borderRadius: "50px", cursor: "pointer", fontWeight: "600", transition: "all 0.2s"
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"; }}
              >
                ✏️ Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* AI FILTER ENGINE SECTION (The Magical Pill Button) */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <button
            onClick={runAIFilter}
            disabled={loading}
            style={{
              padding: "16px 40px",
              fontSize: "1.1rem",
              fontWeight: "600",
              background: loading ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.15)",
              color: loading ? "rgba(255, 255, 255, 0.5)" : "white",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              borderRadius: "50px", // Exact pill shape from your image
              cursor: loading ? "not-allowed" : "pointer",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
              transition: "all 0.3s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px"
            }}
            onMouseOver={(e) => { if(!loading) { e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
            onMouseOut={(e) => { if(!loading) { e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"; e.currentTarget.style.transform = "translateY(0)"; } }}
          >
            {loading ? "⚙️ Processing Matrix..." : "✨ Generate AI Scheme Matches"}
          </button>
        </div>

        {/* MATCHED SCHEMES GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "50px" }}>
          {schemes.length === 0 && !loading && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 20px", background: "rgba(255, 255, 255, 0.05)", borderRadius: "16px", border: "1px dashed rgba(255,255,255,0.2)", backdropFilter: "blur(10px)" }}>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", margin: 0 }}>
                Click the magical button above to find government schemes you qualify for.
              </p>
            </div>
          )}

          {schemes.map((scheme, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "16px",
                padding: "25px",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                height: "85%",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"; e.currentTarget.style.transform = "translateY(-5px)"; border: "1px solid rgba(255, 255, 255, 0.3)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"; e.currentTarget.style.transform = "translateY(0)"; border: "1px solid rgba(255, 255, 255, 0.15)" }}
            >
              <h3 style={{ margin: "0 0 15px 0", fontSize: "1.3rem", fontWeight: "800", lineHeight: "1.3", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>
                {scheme.title}
              </h3>

              <div style={{ marginBottom: "20px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <span style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", padding: "6px 12px", borderRadius: "6px", fontSize: "0.85rem", fontWeight: "600" }}>
                  🎯 {scheme.targetCategory || scheme.targetAudience || "General"}
                </span>
                {scheme.incomeLimit && (
                  <span style={{ background: "rgba(255, 153, 0, 0.2)", border: "1px solid rgba(255, 153, 0, 0.4)", padding: "6px 12px", borderRadius: "6px", fontSize: "0.85rem", fontWeight: "600" }}>
                    💰 Limit: ₹{scheme.incomeLimit}
                  </span>
                )}
              </div>

              {/* THE IMPACT SCORE METER (Glass Variant) */}
              {scheme.impactScore && (
                <div 
                  onClick={() => setSelectedImpactScheme(scheme)}
                  style={{ 
                    marginBottom: "20px", 
                    background: "rgba(0,0,0,0.15)", 
                    padding: "15px", 
                    borderRadius: "10px", 
                    border: "1px solid rgba(255,255,255,0.05)", 
                    cursor: "pointer", 
                    transition: "all 0.2s ease" 
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.3)"; e.currentTarget.style.border = "1px solid rgba(255,255,255,0.2)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.15)"; e.currentTarget.style.border = "1px solid rgba(255,255,255,0.05)"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", fontWeight: "700", marginBottom: "10px", color: "rgba(255,255,255,0.9)" }}>
                    <span>Match Impact</span>
                    <span style={{ color: scheme.impactScore >= 80 ? "#34d399" : "#fbbf24" }}>{scheme.impactScore}/100</span>
                  </div>
                  
                  <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${scheme.impactScore}%`, height: "100%", background: scheme.impactScore >= 80 ? "#34d399" : "#fbbf24", transition: "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: "0 0 10px rgba(52, 211, 153, 0.5)" }}></div>
                  </div>
                  
                  <div style={{ fontSize: "0.75rem", textAlign: "center", color: "rgba(255,255,255,0.5)", marginTop: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    🔍 View Analytics
                  </div>
                </div>
              )}

              {/* THE GREEN AI BADGE (Glass Variant) */}
              {scheme.aiReason && (
                <div style={{ background: "rgba(52, 211, 153, 0.1)", borderLeft: "4px solid #34d399", padding: "12px 15px", borderRadius: "0 8px 8px 0", marginBottom: "25px", backdropFilter: "blur(4px)" }}>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "#a7f3d0", lineHeight: "1.5" }}>
                    <strong>✨ AI Insight:</strong> {scheme.aiReason}
                  </p>
                </div>
              )}

              {/* THE NEW APPLY BUTTON (Glass Variant) */}
              <button
                onClick={() => handleApply(scheme.title)}
                style={{
                  marginTop: "auto", 
                  width: "100%",
                  padding: "14px",
                  background: "rgba(255, 255, 255, 0.2)", 
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.4)",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "1.05rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(4px)"
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)"; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"; }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Apply Now →
              </button>
            </div>
          ))}

          {/* 🚨 THE IMPACT SCORE BREAKDOWN MODAL 🚨 */}
          {selectedImpactScheme && (
            <div
              style={{
                position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
                background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)",
                display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
              }}
            >
              <div
                style={{
                  background: "rgba(20, 20, 30, 0.7)", padding: "40px", borderRadius: "20px",
                  width: "90%", maxWidth: "500px", color: "white", border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)", backdropFilter: "blur(20px)"
                }}
              >
                {/* Header & Close Button */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "25px" }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: "1rem", color: "#34d399", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "800" }}>
                      Engine Analysis
                    </h2>
                    <h3 style={{ margin: "8px 0 0 0", color: "white", fontSize: "1.5rem", lineHeight: "1.3", fontWeight: "700" }}>
                      {selectedImpactScheme.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedImpactScheme(null)}
                    style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "1.8rem", cursor: "pointer", padding: "0", lineHeight: "1" }}
                    onMouseOver={(e) => e.currentTarget.style.color = "white"}
                    onMouseOut={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
                  >
                    ✕
                  </button>
                </div>

                {/* Big Score Display */}
                <div style={{ textAlign: "center", margin: "35px 0" }}>
                  <div style={{ fontSize: "5rem", fontWeight: "900", lineHeight: "1", color: selectedImpactScheme.impactScore >= 80 ? "#34d399" : "#fbbf24", textShadow: "0 0 20px rgba(52, 211, 153, 0.3)" }}>
                    {selectedImpactScheme.impactScore}
                    <span style={{ fontSize: "1.8rem", color: "rgba(255,255,255,0.3)" }}>/100</span>
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.5)", marginTop: "12px", fontSize: "0.95rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Total Match Confidence
                  </div>
                </div>

                {/* The Math Breakdown */}
                <div style={{ background: "rgba(0,0,0,0.3)", padding: "25px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "18px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px" }}>
                    <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: "500" }}>✅ Base Eligibility</span>
                    <span style={{ fontWeight: "700", color: "#34d399" }}>20 pts</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px" }}>
                    <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: "500" }}>🎯 Career Match</span>
                    <span style={{ fontWeight: "700", color: "#34d399" }}>Up to 40 pts</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: "500" }}>⚖️ Financial Need Gap</span>
                    <span style={{ fontWeight: "700", color: "#34d399" }}>Up to 40 pts</span>
                  </div>
                </div>

                {/* Explainer Text */}
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginTop: "30px", lineHeight: "1.7", textAlign: "center" }}>
                  The SchemeMatch algorithm dynamically calculates this score by analyzing the mathematical gap between your current income and the scheme's limit, while matching your occupation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemeMatchDashboard;