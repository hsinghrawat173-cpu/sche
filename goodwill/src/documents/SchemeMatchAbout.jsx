import React from "react";
import { useNavigate } from "react-router-dom";

const SchemeMatchAbout = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        // The global mesh gradient background
        background:
          "linear-gradient(135deg, #a7473b 0%, #4e3288 25%, #2a58b5 60%, #90c7d7 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "white",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Navbar - Glass Top Bar */}
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
          zIndex: 100,
        }}
      >
        <div
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "6px 14px",
              borderRadius: "10px",
              fontWeight: "900",
              fontSize: "1.2rem",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            S
          </div>
          <span
            style={{
              fontWeight: "800",
              fontSize: "1.4rem",
              letterSpacing: "0.5px",
              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            SchemeMatch
          </span>
        </div>
      </nav>

      <main
        style={{
          flex: 1,
          padding: "60px 5%",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "60px",
        }}
      >
        {/* Header Section */}
        <section
          style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
              fontWeight: "900",
              lineHeight: "1.2",
              margin: "0 0 25px 0",
              textShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            Bridging the ₹1.7L Crore Gap
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.7",
              color: "rgba(255,255,255,0.8)",
              margin: 0,
            }}
          >
            India has over 2,500 government schemes, yet ₹1.7L Cr in welfare
            funds goes unclaimed yearly. Over 80 Crore citizens are eligible for
            benefits but remain uninformed. We built SchemeMatch to fix that.
          </p>
        </section>

        {/* The Analogy Section */}
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "stretch",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              flex: "1 1 300px",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: "800",
                color: "rgba(255,255,255,0.9)",
                margin: "0 0 15px 0",
              }}
            >
              The Problem
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              Finding a scheme today is like wandering through a massive,
              unmapped forest. You have to read through 30+ portals and heavy
              jargon just to see if you fit.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              color: "rgba(255,255,255,0.5)",
              fontWeight: "300",
            }}
          >
            →
          </div>

          <div
            style={{
              flex: "1 1 300px",
              background: "rgba(52, 211, 153, 0.1)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(52, 211, 153, 0.3)",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 8px 32px rgba(52, 211, 153, 0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: "800",
                color: "#34d399",
                margin: "0 0 15px 0",
              }}
            >
              The Solution
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              SchemeMatch is your predictive GPS. We use AI to calculate the
              exact financial value of a destination before you even take your
              first step.
            </p>
          </div>
        </section>

        {/* Step-by-Step Timeline (Grid Format) */}
        <section>
          <h2
            style={{
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "800",
              marginBottom: "40px",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            How It Works
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "25px",
            }}
          >
            {[
              {
                num: "1",
                title: "Build Your Profile",
                desc: "Take 2 minutes to tell us your basic details: age, income, state, category, and occupation. No sensitive documents required yet.",
              },
              {
                num: "2",
                title: "AI Reads the Rulebooks",
                desc: "Our Gemini API engine instantly reads your profile and compares it against the complex eligibility criteria of government schemes.",
              },
              {
                num: "3",
                title: "Get Your Impact Score",
                desc: "Every matched scheme gets a 0–100 Personal Impact Score. We rank your dashboard so you instantly see which schemes offer the highest benefit.",
              },
              {
                num: "4",
                title: "Apply & Get Alerted",
                desc: "Click through directly to the official MyScheme portal to apply. Our Cron Jobs will automatically notify you when a new scheme launches.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  padding: "25px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                    fontSize: "1.2rem",
                    border: "1px solid rgba(255,255,255,0.4)",
                  }}
                >
                  {step.num}
                </div>
                <h3
                  style={{ margin: 0, fontSize: "1.2rem", fontWeight: "700" }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: "1.6",
                    fontSize: "0.95rem",
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Under the Hood (Tech Stack) */}
        <section>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "800",
                margin: "0 0 10px 0",
                textShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            >
              Under the Hood
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "1.1rem",
                margin: 0,
              }}
            >
              A modern MERN stack supercharged by Google's Gemini LLM.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "25px",
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "20px",
                padding: "30px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              <span
                style={{
                  fontSize: "2.5rem",
                  display: "block",
                  marginBottom: "15px",
                }}
              >
                ⚛️
              </span>
              <h3
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                }}
              >
                Frontend Engine
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: "1.5",
                  fontSize: "0.95rem",
                }}
              >
                Built with React.js and standard CSS for high performance and
                zero-latency state management.
              </p>
            </div>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "20px",
                padding: "30px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              <span
                style={{
                  fontSize: "2.5rem",
                  display: "block",
                  marginBottom: "15px",
                }}
              >
                ⚙️
              </span>
              <h3
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                }}
              >
                Backend Architecture
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: "1.5",
                  fontSize: "0.95rem",
                }}
              >
                Node.js and Express.js handle secure routing, JWT
                authentication, and API rate limiting.
              </p>
            </div>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "20px",
                padding: "30px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              <span
                style={{
                  fontSize: "2.5rem",
                  display: "block",
                  marginBottom: "15px",
                }}
              >
                🍃
              </span>
              <h3
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                }}
              >
                Database Layer
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: "1.5",
                  fontSize: "0.95rem",
                }}
              >
                MongoDB and Mongoose ODM store the curated scheme seeds from
                MyScheme.gov.in and user profiles safely.
              </p>
            </div>
            <div
              style={{
                background: "rgba(52, 211, 153, 0.1)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(52, 211, 153, 0.4)",
                borderRadius: "20px",
                padding: "30px",
                boxShadow: "0 8px 32px rgba(52, 211, 153, 0.15)",
              }}
            >
              <span
                style={{
                  fontSize: "2.5rem",
                  display: "block",
                  marginBottom: "15px",
                }}
              >
                🧠
              </span>
              <h3
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  color: "#34d399",
                }}
              >
                AI Matching Logic
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: "1.5",
                  fontSize: "0.95rem",
                }}
              >
                Gemini API executes complex prompt engineering to return
                structured JSON evaluations and calculate the 0-100 Impact
                Score.
              </p>
            </div>
          </div>
        </section>

        {/* Vision / Roadmap */}
        <section style={{ padding: "0 0 40px 0" }}>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1.05rem",
              lineHeight: "1.6",
              marginBottom: "25px",
            }}
          >
            SchemeMatch is not just a project —it's a foundation
            for a national-scale welfare discovery platform.
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <span
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "8px",
                  borderRadius: "8px",
                }}
              >
                💬
              </span>{" "}
              Vernacular language support for rural accessibility.
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <span
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "8px",
                  borderRadius: "8px",
                }}
              >
                📱
              </span>{" "}
              WhatsApp bot integration for low-bandwidth users.
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <span
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "8px",
                  borderRadius: "8px",
                }}
              >
                🏢
              </span>{" "}
              District-level officer dashboards to track unclaimed fund
              hotspots.
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <span
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "8px",
                  borderRadius: "8px",
                }}
              >
                🔗
              </span>{" "}
              Direct application tracking APIs.
            </li>
          </ul>
        </section>

        {/* Call to Action */}
        <section style={{ textAlign: "center", padding: "40px 0" }}>
          <h2
            style={{
              fontSize: "2.2rem",
              fontWeight: "900",
              marginBottom: "30px",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            Ready to find what's yours?
          </h2>
          <button
            onClick={() => navigate("/register")}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              padding: "18px 40px",
              borderRadius: "50px", // The magical pill button
              cursor: "pointer",
              fontWeight: "800",
              fontSize: "1.15rem",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s ease",
              boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Create Your Free Profile →
          </button>
        </section>
      </main>
    </div>
  );
};

export default SchemeMatchAbout;
