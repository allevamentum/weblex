import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

const NAV_LINKS = ["Home", "Features", "Pricing", "About"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.3s ease",
        background: scrolled ? "rgba(2, 2, 8, 0.6)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            textDecoration: "none",
            color: "white",
            fontWeight: 700,
            fontSize: "20px",
            letterSpacing: "-0.3px",
          }}
        >
          Weblex
          <span
            style={{
              display: "inline-block",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "hsl(73, 98%, 57%)",
              boxShadow: "0 0 10px hsl(73, 98%, 57%), 0 0 24px hsl(73, 98%, 57% / 0.5)",
              marginLeft: "-1px",
              marginBottom: "2px",
              flexShrink: 0,
            }}
          />
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "36px",
            listStyle: "none",
          }}
          className="nav-desktop-links"
        >
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                style={{
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 450,
                  letterSpacing: "0.1px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Get Started CTA */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "9px 18px",
            borderRadius: "8px",
            border: "none",
            background: "hsl(73, 98%, 57%)",
            color: "hsl(240, 67%, 1%)",
            fontSize: "13.5px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "opacity 0.2s, transform 0.15s",
            letterSpacing: "-0.1px",
          }}
          className="nav-cta-btn"
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.opacity = "0.88";
            (e.target as HTMLElement).style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "scale(1)";
          }}
        >
          Get Started
          <ArrowUpRight size={14} />
        </button>

        {/* Hamburger */}
        <button
          className={`ham-btn${menuOpen ? " ham-open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            gap: "6px",
            padding: "4px",
          }}
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: menuOpen ? "300px" : "0",
          transition: "max-height 0.35s ease",
          background: "rgba(2, 2, 8, 0.95)",
          backdropFilter: "blur(20px)",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            padding: "12px 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: 450,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {link}
              </a>
            </li>
          ))}
          <li style={{ marginTop: "12px" }}>
            <button
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background: "hsl(73, 98%, 57%)",
                color: "hsl(240, 67%, 1%)",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Get Started
            </button>
          </li>
        </ul>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-cta-btn { display: none !important; }
          .ham-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
