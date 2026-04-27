import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260221_085953_8463b46e-ba85-4bb7-912a-1feaf346e970.mp4";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [revealed, setRevealed] = useState(false);

  // Seamless video loop fade
  useEffect(() => {
    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!video || !overlay) return;

    const FADE_OUT_START = 1.5;
    const FADE_OUT_END = 0.3;
    const FADE_IN_DURATION = 1.0;
    let restartTime: number | null = null;

    function tick() {
      if (!video || !overlay) return;
      const dur = video.duration;
      const cur = video.currentTime;

      if (!isNaN(dur) && dur > 0) {
        const timeLeft = dur - cur;
        if (timeLeft <= FADE_OUT_START) {
          const progress = Math.min(
            1,
            (FADE_OUT_START - timeLeft) / (FADE_OUT_START - FADE_OUT_END)
          );
          overlay.style.opacity = String(progress);
        } else if (restartTime !== null) {
          const elapsed = performance.now() / 1000 - restartTime;
          if (elapsed < FADE_IN_DURATION) {
            overlay.style.opacity = String(1 - elapsed / FADE_IN_DURATION);
          } else {
            overlay.style.opacity = "0";
            restartTime = null;
          }
        } else {
          overlay.style.opacity = "0";
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    const handlePlay = () => {
      rafRef.current = requestAnimationFrame(tick);
    };
    const handleSeeked = () => {
      if (video.currentTime < 0.5) {
        restartTime = performance.now() / 1000;
        overlay.style.opacity = "1";
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("timeupdate", handleSeeked);

    const revealTimer = setTimeout(() => setRevealed(true), 300);

    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("timeupdate", handleSeeked);
      clearTimeout(revealTimer);
    };
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "640px",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
          filter: "saturate(0.85) brightness(0.85)",
        }}
      />

      {/* Fade-to-black overlay (RAF-controlled) */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#111118",
          zIndex: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* Allevamentum gradient tint — subtle blue/purple wash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(79,125,247,0.18) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(139,108,247,0.20) 0%, transparent 55%)",
          mixBlendMode: "screen",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Bottom gradient for legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(17,17,24,0.35) 0%, transparent 25%, transparent 50%, rgba(17,17,24,0.7) 78%, rgba(17,17,24,0.96) 100%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* Hero content — bottom-aligned */}
      <div
        style={{
          position: "relative",
          zIndex: 4,
          textAlign: "center",
          maxWidth: "780px",
          padding: "0 24px 80px",
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(28px)",
          transition:
            "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "7px 16px 7px 12px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(10px)",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #4F7DF7 0%, #8B6CF7 100%)",
              boxShadow:
                "0 0 10px rgba(79,125,247,0.7), 0 0 20px rgba(139,108,247,0.4)",
            }}
          />
          <span
            style={{
              color: "rgba(240, 237, 232, 0.82)",
              fontSize: "12.5px",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Premium Software Engineering
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "clamp(36px, 6.4vw, 68px)",
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            color: "#F0EDE8",
            marginBottom: "24px",
          }}
        >
          We build software that powers the{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #4F7DF7 0%, #8B6CF7 60%, #F472B6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            future of industry.
          </span>
        </h1>

        {/* Paragraph */}
        <p
          style={{
            fontSize: "16.5px",
            lineHeight: 1.65,
            color: "rgba(240, 237, 232, 0.62)",
            margin: "0 auto 40px",
            maxWidth: "560px",
            letterSpacing: "0.005em",
          }}
        >
          Enterprise applications, AI platforms, cloud infrastructure, and
          digital products — engineered to the highest standard. We don&apos;t
          just write code. We architect systems that scale to millions.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "9999px",
              border: "none",
              background:
                "linear-gradient(135deg, #4F7DF7 0%, #8B6CF7 100%)",
              color: "#F0EDE8",
              fontSize: "14.5px",
              fontWeight: 600,
              letterSpacing: "0.01em",
              cursor: "pointer",
              textDecoration: "none",
              transition:
                "transform 0.18s ease, box-shadow 0.25s ease, filter 0.2s ease",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.06) inset, 0 10px 40px rgba(79,125,247,0.35)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-1px) scale(1.02)";
              el.style.boxShadow =
                "0 0 0 1px rgba(255,255,255,0.1) inset, 0 16px 50px rgba(139,108,247,0.5)";
              el.style.filter = "brightness(1.05)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(0) scale(1)";
              el.style.boxShadow =
                "0 0 0 1px rgba(255,255,255,0.06) inset, 0 10px 40px rgba(79,125,247,0.35)";
              el.style.filter = "brightness(1)";
            }}
          >
            Start a Project
            <ArrowUpRight size={16} />
          </a>

          <a
            href="#services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(8px)",
              color: "#F0EDE8",
              fontSize: "14.5px",
              fontWeight: 500,
              letterSpacing: "0.01em",
              cursor: "pointer",
              textDecoration: "none",
              transition:
                "background 0.2s, border-color 0.2s, transform 0.18s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.08)";
              el.style.borderColor = "rgba(255,255,255,0.32)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.04)";
              el.style.borderColor = "rgba(255,255,255,0.18)";
              el.style.transform = "translateY(0)";
            }}
          >
            Our Work
          </a>
        </div>

        {/* Trust line */}
        <p
          style={{
            marginTop: "44px",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(240, 237, 232, 0.34)",
          }}
        >
          50+ Products Shipped &nbsp;·&nbsp; 2M+ End Users &nbsp;·&nbsp; 99.9% Uptime
        </p>
      </div>
    </section>
  );
}
