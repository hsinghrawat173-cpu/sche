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
      // THE HANDSHAKE: Sending credentials to get the cookie
      // const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   credentials: "include", // <--- THIS IS THE MAGIC WIRE. Do not remove this!
      //   body: JSON.stringify({ email, password }),
      // });

      const response = await fetch("http://localhost:4000/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // CRITICAL: This allows cookies to be saved
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
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#1e1e1e",
          padding: "40px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "400px",
          border: "1px solid #333",
        }}
      >
        <h2 style={{ margin: "0 0 20px 0", textAlign: "center" }}>
          SchemeMatch Login
        </h2>

        {error && (
          <div
            style={{
              backgroundColor: "#ff444422",
              border: "1px solid #ff4444",
              color: "#ff4444",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <div>
            <label
              style={{ display: "block", marginBottom: "5px", color: "#aaa" }}
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
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#333",
                color: "white",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{ display: "block", marginBottom: "5px", color: "#aaa" }}
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
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#333",
                color: "white",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "5px",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            {isLoading ? "Authenticating..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
