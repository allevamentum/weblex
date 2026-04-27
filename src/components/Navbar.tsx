import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

const InstagramIcon = ({ size = 17 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = ({ size = 17 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Technology", href: "#tech" },
  { label: "Contact", href: "#contact" },
];

const TriangleMark = ({ size = 32 }: { size?: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
    <defs>
      <linearGradient id="navGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4F7DF7" />
        <stop offset="100%" stopColor="#8B6CF7" />
      </linearGradient>
    </defs>
    <polygon points="50,8 92,92 8,92" fill="none" stroke="url(#navGrad)" strokeWidth="3" />
    <polygon points="50,28 78,82 22,82" fill="none" stroke="url(#navGrad)" strokeWidth="3" />
    <polygon points="50,44 66,74 34,74" fill="url(#navGrad)" />
  </svg>
);

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
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
        background: scrolled ? "rgba(17, 17, 24, 0.65)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <nav
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 28px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {/* Brand */}
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "#F0EDE8",
            fontWeight: 600,
            fontSize: "15px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          <TriangleMark size={28} />
          ALLEVAMENTUM
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            listStyle: "none",
          }}
          className="nav-desktop-links"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                style={{
                  color: "rgba(240, 237, 232, 0.65)",
                  textDecoration: "none",
                  fontSize: "13.5px",
                  fontWeight: 450,
                  letterSpacing: "0.02em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#F0EDE8";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "rgba(240, 237, 232, 0.65)";
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster: socials + CTA */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "16px" }}
          className="nav-right-cluster"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a
              href="https://www.instagram.com/allevamentum/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                color: "rgba(240, 237, 232, 0.55)",
                display: "inline-flex",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F0EDE8")}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(240, 237, 232, 0.55)")
              }
            >
              <InstagramIcon size={17} />
            </a>
            <a
              href="https://www.facebook.com/allevamentum"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{
                color: "rgba(240, 237, 232, 0.55)",
                display: "inline-flex",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F0EDE8")}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(240, 237, 232, 0.55)")
              }
            >
              <FacebookIcon size={17} />
            </a>
          </div>

          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.04)",
              color: "#F0EDE8",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.02em",
              cursor: "pointer",
              transition: "background 0.2s, border-color 0.2s, transform 0.15s",
              textDecoration: "none",
            }}
            className="nav-cta-btn"
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(79, 125, 247, 0.15)";
              el.style.borderColor = "rgba(79, 125, 247, 0.4)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.04)";
              el.style.borderColor = "rgba(255,255,255,0.14)";
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #4F7DF7 0%, #8B6CF7 100%)",
                boxShadow: "0 0 8px rgba(79, 125, 247, 0.7)",
              }}
            />
            Get in Touch
          </a>
        </div>

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
          maxHeight: menuOpen ? "440px" : "0",
          transition: "max-height 0.4s ease",
          background: "rgba(12, 12, 18, 0.96)",
          backdropFilter: "blur(20px)",
          borderTop: menuOpen ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            padding: "12px 28px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 0",
                  color: "rgba(240, 237, 232, 0.85)",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: 450,
                  letterSpacing: "0.01em",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ marginTop: "16px" }}>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "13px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #4F7DF7 0%, #8B6CF7 100%)",
                color: "#F0EDE8",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.02em",
                textDecoration: "none",
              }}
            >
              Get in Touch
              <ArrowUpRight size={15} />
            </a>
          </li>
          <li
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <a
              href="https://www.instagram.com/allevamentum/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(240, 237, 232, 0.6)" }}
              aria-label="Instagram"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href="https://www.facebook.com/allevamentum"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(240, 237, 232, 0.6)" }}
              aria-label="Facebook"
            >
              <FacebookIcon size={20} />
            </a>
          </li>
        </ul>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop-links { display: none !important; }
          .nav-right-cluster { display: none !important; }
          .ham-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
