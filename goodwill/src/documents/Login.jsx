import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("hhttps://sche-sefs.onrender.com/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // CRITICAL: This allows cookies to be saved
      });

      const data = await response.json();

      if (data.success) {
        console.log("JWT secured. Routing to Dashboard.");
        // The browser now holds the cookie. Send them to the dashboard.
        navigate("/dashboard");
      } else {
        // Show the error from the backend (e.g., "Invalid Password")
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Network Error during login:", err);
      setError("Network error. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>

    
    <div
      style={{
        // The exact same deep mesh gradient from your dashboard
        background: "linear-gradient(135deg, #a7473b 0%, #4e3288 25%, #2a58b5 60%, #90c7d7 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection:"column",
        gap:"50px" ,
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "20px", // Prevents the box from hitting the edges on small mobile screens
      }}
    >

       <button
          onClick={() => navigate("/")}
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.7)",
            cursor: "pointer",
            fontWeight: "600",
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "white")}
          onMouseOut={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
          }
        >
          ← Back to Home
        </button>

       
      <div
        style={{
          // The Frosted Glass Engine
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          padding: "40px",
          borderRadius: "20px", // Softer, modern corners
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ margin: "0 0 30px 0", textAlign: "center", fontSize: "2rem", fontWeight: "800", textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
          SchemeMatch
        </h2>

        {error && (
          <div
            style={{
              // Glassmorphism Error State
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#fca5a5",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "center",
              backdropFilter: "blur(4px)",
              fontWeight: "600",
              fontSize: "0.9rem"
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label
              style={{ display: "block", marginBottom: "8px", color: "rgba(255,255,255,0.8)", fontWeight: "600", fontSize: "0.9rem" }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ananya23@gmail.com"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(0,0,0,0.2)", // Deep inset feel
                color: "white",
                boxSizing: "border-box",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.2s"
              }}
              onFocus={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.8)"}
              onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.3)"}
            />
          </div>

          <div>
            <label
              style={{ display: "block", marginBottom: "8px", color: "rgba(255,255,255,0.8)", fontWeight: "600", fontSize: "0.9rem" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(0,0,0,0.2)",
                color: "white",
                boxSizing: "border-box",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.2s"
              }}
              onFocus={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.8)"}
              onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.3)"}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: isLoading ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)",
              color: isLoading ? "rgba(255, 255, 255, 0.5)" : "white",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              padding: "14px",
              borderRadius: "50px", // Sleek pill-shape to match the AI button
              cursor: isLoading ? "not-allowed" : "pointer",
              fontWeight: "700",
              fontSize: "1.05rem",
              marginTop: "10px",
              backdropFilter: "blur(4px)",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
            }}
            onMouseOver={(e) => { if(!isLoading) e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)" }}
            onMouseOut={(e) => { if(!isLoading) e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)" }}
            onMouseDown={(e) => { if(!isLoading) e.currentTarget.style.transform = "scale(0.98)" }}
            onMouseUp={(e) => { if(!isLoading) e.currentTarget.style.transform = "scale(1)" }}
          >
            {isLoading ? "Authenticating..." : "Log In →"}
          </button>
        </form>
      </div>
    </div></>
  );
};

export default Login;
