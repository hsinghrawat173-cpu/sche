import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    state: "",
    category: "",
    occupation: "",
    income: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Logic: Sending full payload to the Express backend
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"}/api/v1/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include", // CRITICAL: Sets the cookie automatically
        },
      );

      const data = await response.json();

      if (data.success) {
        console.log("Registration Success!");
        // If you are using cookies, you might not even need localStorage anymore!
        localStorage.setItem("schemeMatch_token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Registration failed. Check details.");
      }
    } catch (err) {
      console.error("Registration connection error:", err);
      setError("Network Error: Cannot reach the backend server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        // The exact same deep mesh gradient
        background:
          "linear-gradient(135deg, #a7473b 0%, #4e3288 25%, #2a58b5 60%, #90c7d7 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "40px 20px",
      }}
    >
      {/* Top Navigation */}
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "5px 12px",
              borderRadius: "8px",
              fontWeight: "900",
              backdropFilter: "blur(4px)",
            }}
          >
            S
          </div>
          <span
            style={{
              fontWeight: "700",
              fontSize: "1.2rem",
              letterSpacing: "0.5px",
            }}
          >
            SchemeMatch
          </span>
        </div>
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
      </div>

      <div
        style={{
          // The Frosted Glass Engine
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          padding: "40px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "700px", // Wider to fit the grid
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{
              margin: "0 0 10px 0",
              fontSize: "2.2rem",
              fontWeight: "800",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            Build Your Profile
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.95rem",
              lineHeight: "1.5",
              margin: 0,
            }}
          >
            This data stays securely encrypted and is only used by our AI engine
            to calculate your Personal Impact Score.
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#fca5a5",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "center",
              backdropFilter: "blur(4px)",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "30px" }}
        >
          {/* SECTION 1: Account Details */}
          <div>
            <h2
              style={{
                fontSize: "1.1rem",
                color: "rgba(255,255,255,0.9)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "10px",
                marginBottom: "20px",
              }}
            >
              1. Account Details
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
              }}
            >
              <div style={{ gridColumn: "1 / -1" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                  }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  required
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Kumar"
                  disabled={isLoading}
                  style={inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleChange}
                  placeholder="name@example.com"
                  disabled={isLoading}
                  style={inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  required
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={isLoading}
                  style={inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Welfare Profile */}
          <div>
            <h2
              style={{
                fontSize: "1.1rem",
                color: "rgba(255,255,255,0.9)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "10px",
                marginBottom: "20px",
              }}
            >
              2. Welfare Profile
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                  }}
                >
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  min="18"
                  max="100"
                  value={formData.age}
                  required
                  onChange={handleChange}
                  placeholder="e.g. 28"
                  disabled={isLoading}
                  style={inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                  }}
                >
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  required
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                >
                  <option value="" disabled style={{ color: "black" }}>
                    Select Gender
                  </option>
                  <option value="Male" style={{ color: "black" }}>
                    Male
                  </option>
                  <option value="Female" style={{ color: "black" }}>
                    Female
                  </option>
                  <option value="Other" style={{ color: "black" }}>
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                  }}
                >
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  required
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                >
                  <option value="" disabled style={{ color: "black" }}>
                    Select State
                  </option>
                  <option
                    value="Andaman and Nicobar Islands"
                    style={{ color: "black" }}
                  >
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Andhra Pradesh" style={{ color: "black" }}>
                    Andhra Pradesh
                  </option>
                  <option value="Arunachal Pradesh" style={{ color: "black" }}>
                    Arunachal Pradesh
                  </option>
                  <option value="Assam" style={{ color: "black" }}>
                    Assam
                  </option>
                  <option value="Bihar" style={{ color: "black" }}>
                    Bihar
                  </option>
                  <option value="Chandigarh" style={{ color: "black" }}>
                    Chandigarh
                  </option>
                  <option value="Chhattisgarh" style={{ color: "black" }}>
                    Chhattisgarh
                  </option>
                  <option
                    value="Dadra and Nagar Haveli and Daman and Diu"
                    style={{ color: "black" }}
                  >
                    Dadra and Nagar Haveli and Daman and Diu
                  </option>
                  <option value="Delhi" style={{ color: "black" }}>
                    Delhi
                  </option>
                  <option value="Goa" style={{ color: "black" }}>
                    Goa
                  </option>
                  <option value="Gujarat" style={{ color: "black" }}>
                    Gujarat
                  </option>
                  <option value="Haryana" style={{ color: "black" }}>
                    Haryana
                  </option>
                  <option value="Himachal Pradesh" style={{ color: "black" }}>
                    Himachal Pradesh
                  </option>
                  <option value="Jammu and Kashmir" style={{ color: "black" }}>
                    Jammu and Kashmir
                  </option>
                  <option value="Jharkhand" style={{ color: "black" }}>
                    Jharkhand
                  </option>
                  <option value="Karnataka" style={{ color: "black" }}>
                    Karnataka
                  </option>
                  <option value="Kerala" style={{ color: "black" }}>
                    Kerala
                  </option>
                  <option value="Ladakh" style={{ color: "black" }}>
                    Ladakh
                  </option>
                  <option value="Lakshadweep" style={{ color: "black" }}>
                    Lakshadweep
                  </option>
                  <option value="Madhya Pradesh" style={{ color: "black" }}>
                    Madhya Pradesh
                  </option>
                  <option value="Maharashtra" style={{ color: "black" }}>
                    Maharashtra
                  </option>
                  <option value="Manipur" style={{ color: "black" }}>
                    Manipur
                  </option>
                  <option value="Meghalaya" style={{ color: "black" }}>
                    Meghalaya
                  </option>
                  <option value="Mizoram" style={{ color: "black" }}>
                    Mizoram
                  </option>
                  <option value="Nagaland" style={{ color: "black" }}>
                    Nagaland
                  </option>
                  <option value="Odisha" style={{ color: "black" }}>
                    Odisha
                  </option>
                  <option value="Puducherry" style={{ color: "black" }}>
                    Puducherry
                  </option>
                  <option value="Punjab" style={{ color: "black" }}>
                    Punjab
                  </option>
                  <option value="Rajasthan" style={{ color: "black" }}>
                    Rajasthan
                  </option>
                  <option value="Sikkim" style={{ color: "black" }}>
                    Sikkim
                  </option>
                  <option value="Tamil Nadu" style={{ color: "black" }}>
                    Tamil Nadu
                  </option>
                  <option value="Telangana" style={{ color: "black" }}>
                    Telangana
                  </option>
                  <option value="Tripura" style={{ color: "black" }}>
                    Tripura
                  </option>
                  <option value="Uttar Pradesh" style={{ color: "black" }}>
                    Uttar Pradesh
                  </option>
                  <option value="Uttarakhand" style={{ color: "black" }}>
                    Uttarakhand
                  </option>
                  <option value="West Bengal" style={{ color: "black" }}>
                    West Bengal
                  </option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                  }}
                >
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  required
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                >
                  <option value="" disabled style={{ color: "black" }}>
                    Select Category
                  </option>
                  <option value="General" style={{ color: "black" }}>
                    General
                  </option>
                  <option value="OBC" style={{ color: "black" }}>
                    OBC
                  </option>
                  <option value="SC" style={{ color: "black" }}>
                    SC/ST
                  </option>
                  <option value="EWS" style={{ color: "black" }}>
                    EWS
                  </option>
                  

                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                  }}
                >
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  required
                  onChange={handleChange}
                  placeholder="e.g. Farmer, Student"
                  disabled={isLoading}
                  style={inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                  }}
                >
                  Annual Income (₹)
                </label>
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  required
                  onChange={handleChange}
                  placeholder="e.g. 150000"
                  disabled={isLoading}
                  style={inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: isLoading
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0.2)",
              color: isLoading ? "rgba(255, 255, 255, 0.5)" : "white",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              padding: "16px",
              borderRadius: "50px", // The magical pill button
              cursor: isLoading ? "not-allowed" : "pointer",
              fontWeight: "700",
              fontSize: "1.1rem",
              marginTop: "10px",
              backdropFilter: "blur(4px)",
              transition: "all 0.2s ease",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            }}
            onMouseOver={(e) => {
              if (!isLoading)
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
            }}
            onMouseOut={(e) => {
              if (!isLoading)
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
            }}
            onMouseDown={(e) => {
              if (!isLoading) e.currentTarget.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              if (!isLoading) e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {isLoading ? "Analyzing Data..." : "Analyze Matches →"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.9rem",
              margin: 0,
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "white",
                fontWeight: "700",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Extracted styles to keep JSX clean
const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.3)",
  background: "rgba(0,0,0,0.2)",
  color: "white",
  boxSizing: "border-box",
  fontSize: "1rem",
  outline: "none",
  transition: "all 0.2s",
};
const focusStyle = (e) =>
  (e.target.style.border = "1px solid rgba(255,255,255,0.8)");
const blurStyle = (e) =>
  (e.target.style.border = "1px solid rgba(255,255,255,0.3)");

export default Register;
