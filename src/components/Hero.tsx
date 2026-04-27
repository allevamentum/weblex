import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260221_085953_8463b46e-ba85-4bb7-912a-1feaf346e970.mp4";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [revealed, setRevealed] = useState(false);

  // Fade logic via requestAnimationFrame
  useEffect(() => {
    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!video || !overlay) return;

    // Fade-out duration (seconds before end) and fade-in duration
    const FADE_OUT_START = 1.5; // start fade out 1.5s before end
    const FADE_OUT_END = 0.3;   // fully black 0.3s before end
    const FADE_IN_DURATION = 1.0; // fade in over first 1s

    let restartTime: number | null = null;

    function tick() {
      if (!video || !overlay) return;
      const dur = video.duration;
      const cur = video.currentTime;

      if (!isNaN(dur) && dur > 0) {
        const timeLeft = dur - cur;

        if (timeLeft <= FADE_OUT_START) {
          // Fade out: map [FADE_OUT_START → FADE_OUT_END] to opacity [0 → 1]
          const progress = Math.min(
            1,
            (FADE_OUT_START - timeLeft) / (FADE_OUT_START - FADE_OUT_END)
          );
          overlay.style.opacity = String(progress);
        } else if (restartTime !== null) {
          // Fade in after restart
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
      // When video loops (currentTime jumps back near 0)
      if (video.currentTime < 0.5) {
        restartTime = performance.now() / 1000;
        overlay.style.opacity = "1";
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("timeupdate", handleSeeked);

    // Reveal content after a short delay
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
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {/* Background Video */}
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
        }}
      />

      {/* Fade overlay (black) — controlled by RAF */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "hsl(240, 67%, 1%)",
          zIndex: 1,
          opacity: 0,
          pointerEvents: "none",
          transition: "none",
        }}
      />

      {/* Dark gradient at bottom for text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, transparent 30%, rgba(2,2,10,0.55) 60%, rgba(2,2,10,0.92) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Hero Content — bottom aligned */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          maxWidth: "603px",
          padding: "0 24px 72px",
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px 6px 10px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(8px)",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "2px 8px",
              borderRadius: "9999px",
              background: "hsl(73, 98%, 57%)",
              color: "hsl(240, 67%, 1%)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.6px",
              textTransform: "uppercase",
            }}
          >
            New
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "13px",
              fontWeight: 450,
              letterSpacing: "-0.1px",
            }}
          >
            Introducing Smart Website Builder
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 62px)",
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            color: "white",
            marginBottom: "20px",
          }}
        >
          Turn your big idea into a{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, hsl(73, 98%, 57%) 0%, hsl(90, 90%, 65%) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            stunning website
          </span>
        </h1>

        {/* Paragraph */}
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.62)",
            marginBottom: "36px",
            maxWidth: "480px",
            margin: "0 auto 36px",
          }}
        >
          Build beautiful, high-performance websites without writing a single
          line of code. Empowering founders, teams, and creators to launch
          faster and grow smarter.
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
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "13px 26px",
              borderRadius: "10px",
              border: "none",
              background: "hsl(73, 98%, 57%)",
              color: "hsl(240, 67%, 1%)",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "-0.2px",
              transition: "opacity 0.2s, transform 0.15s, box-shadow 0.2s",
              boxShadow: "0 0 30px hsl(73, 98%, 57% / 0.25)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.opacity = "0.9";
              el.style.transform = "scale(1.03) translateY(-1px)";
              el.style.boxShadow = "0 0 40px hsl(73, 98%, 57% / 0.45)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.opacity = "1";
              el.style.transform = "scale(1) translateY(0)";
              el.style.boxShadow = "0 0 30px hsl(73, 98%, 57% / 0.25)";
            }}
          >
            Get Started Now
            <ArrowUpRight size={16} />
          </button>

          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "13px 26px",
              borderRadius: "10px",
              border: "1.5px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(8px)",
              color: "white",
              fontSize: "15px",
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "-0.2px",
              transition: "background 0.2s, border-color 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(255,255,255,0.12)";
              el.style.borderColor = "rgba(255,255,255,0.4)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(255,255,255,0.07)";
              el.style.borderColor = "rgba(255,255,255,0.25)";
              el.style.transform = "translateY(0)";
            }}
          >
            See Pricing
          </button>
        </div>
      </div>
    </section>
  );
}
