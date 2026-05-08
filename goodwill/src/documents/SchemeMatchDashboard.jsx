import React, { useState, useEffect } from "react";

const SchemeMatchDashboard = () => {
  // --- STATE MANAGEMENT ---
  const [currentUser, setCurrentUser] = useState(null);

  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    age: "",
    income: "",
    occupation: "",
  });

  // --- THE AUTO-SYNC ENGINE ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/user/me", {
          method: "GET",
          credentials: "include", // This sends your cookie to the bouncer
        });

        const data = await response.json();

        if (data.success) {
          setCurrentUser(data.user); // Inject real DB data into the dashboard
        } else {
          // If the cookie is dead or missing, kick them out to login
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []); // The empty brackets [] mean "run this exactly ONCE when the page loads"

  // --- LOGIC: RUN AI FILTER ---
  const runAIFilter = async () => {
    setLoading(true);
    setSchemes([]); // Clear old cards

    try {
      console.log("🔒 Sending SAFE profile to AI Engine:", currentUser);
      const response = await fetch(
        "http://localhost:4000/api/v1/schemes/analyze",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userProfile: currentUser }),
        },
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

  // --- LOGIC: EDIT PROFILE ---
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
      const response = await fetch("http://localhost:4000/api/v1/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentUser.email, // Needed to find the user in DB
          age: editForm.age,
          income: editForm.income,
          occupation: editForm.occupation,
        }),
        credentials: "include", // CRITICAL for cookies/session
      });

      const data = await response.json();

      if (data.success) {
        // Update React with the fresh database info
        setCurrentUser(data.user);
        setIsEditing(false);
      } else {
        alert("Update failed: " + data.message);
      }
    } catch (error) {
      console.error("Failed to save profile:", error);

      // Fallback for testing UI if backend update route isn't fully built yet
      setCurrentUser((prev) => ({ ...prev, ...editForm }));
      setIsEditing(false);
    }
  };

  // --- LOGIC: SECURE LOGOUT ---
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/user/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/login"; // Kick back to login
      }
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/login"; // Kick anyway on error
    }
  };

  if (!currentUser) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h2>⏳ Securely loading your profile...</h2>
        <p style={{ color: "#6B7280" }}>
          Please wait while we connect to the database.
        </p>
      </div>
    );
  }

  // --- UI RENDERING ---
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "2rem", color: "#111827", margin: 0 }}>
          SchemeMatch Dashboard
        </h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#EF4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* PROFILE WORKBENCH SECTION */}
      <div
        style={{
          backgroundColor: "#F3F4F6",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ marginTop: 0, color: "#374151" }}>Your Welfare Profile</h2>

        {isEditing ? (
          // WORKBENCH MODE (Inputs)
          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: "1",
                minWidth: "150px",
              }}
            >
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  color: "#4B5563",
                }}
              >
                Age
              </label>
              <input
                type="number"
                value={editForm.age}
                onChange={(e) =>
                  setEditForm({ ...editForm, age: e.target.value })
                }
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #D1D5DB",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: "1",
                minWidth: "150px",
              }}
            >
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  color: "#4B5563",
                }}
              >
                Annual Income (₹)
              </label>
              <input
                type="number"
                value={editForm.income}
                onChange={(e) =>
                  setEditForm({ ...editForm, income: e.target.value })
                }
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #D1D5DB",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: "1",
                minWidth: "150px",
              }}
            >
              <label
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  color: "#4B5563",
                }}
              >
                Occupation
              </label>
              <input
                type="text"
                value={editForm.occupation}
                onChange={(e) =>
                  setEditForm({ ...editForm, occupation: e.target.value })
                }
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #D1D5DB",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleSaveProfile}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#10B981",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                💾 Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6B7280",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        ) : (
          // DISPLAY CASE MODE (Read-Only)
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
              <p style={{ margin: 0 }}>
                <strong>Age:</strong> {currentUser.age || "N/A"}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Income:</strong> ₹{currentUser.income || "0"}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Occupation:</strong> {currentUser.occupation || "N/A"}
              </p>
            </div>
            <button
              onClick={handleEditProfile}
              style={{
                padding: "8px 16px",
                backgroundColor: "#4F46E5",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ✏️ Edit Profile
            </button>
          </div>
        )}
      </div>

      <select
        value={editForm.occupation}
        onChange={(e) =>
          setEditForm({ ...editForm, occupation: e.target.value })
        }
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #D1D5DB",
        }}
      >
        <option value="General">General</option>
        <option value="Farmer">Agriculture & Farming</option>
        <option value="Student">Student</option>
        <option value="Healthcare">Healthcare</option>
      </select>

      {/* AI FILTER ENGINE SECTION */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button
          onClick={runAIFilter}
          disabled={loading}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            backgroundColor: loading ? "#9CA3AF" : "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          {loading ? "⚙️ AI Engine Processing..." : "🚀 Run AI Matchmaker"}
        </button>
      </div>

      {/* MATCHED SCHEMES GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {schemes.length === 0 && !loading && (
          <p
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "#6B7280",
            }}
          >
            Click the AI Matchmaker to find government schemes you qualify for.
          </p>
        )}

        {schemes.map((scheme, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px 0",
                color: "#111827",
                fontSize: "1.2rem",
              }}
            >
              {scheme.title}
            </h3>

            <div style={{ marginBottom: "15px" }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#F3F4F6",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  color: "#4B5563",
                  marginRight: "10px",
                }}
              >
                Target:{" "}
                {scheme.targetCategory || scheme.targetAudience || "General"}
              </span>
              {scheme.incomeLimit && (
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: "#FEF3C7",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    color: "#92400E",
                  }}
                >
                  Limit: ₹{scheme.incomeLimit}
                </span>
              )}
            </div>

            {/* THE GREEN AI BADGE */}
            {scheme.aiReason && (
              <div
                style={{
                  backgroundColor: "#ECFDF5",
                  borderLeft: "4px solid #10B981",
                  padding: "10px",
                  marginTop: "auto",
                  borderRadius: "0 4px 4px 0",
                }}
              >
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#065F46" }}>
                  <strong>✨ AI Insight:</strong> {scheme.aiReason}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchemeMatchDashboard;
