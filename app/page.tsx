"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  {
    number: "01",
    label: "INTRO",
    eyebrow: "AI • ENTERPRISE TECHNOLOGY • GENAI",
    title: "Hanuman Pradeepraj",
    subtitle: "Senior Enterprise Technologist | AI & GenAI",
    text: (
      <>
        ✦ 17 years across enterprise technology, cloud, performance & reliability
        <br />
        ✦ Generative AI • Agentic AI • Data Science • Intelligent Solutions
      </>
    ),
  },

  {
    number: "02",
    label: "WHO I AM",
    eyebrow: "SENIOR ENTERPRISE TECHNOLOGIST",
    title: "Reliable. Intelligent.",
    subtitle: "Enterprise Technology • Cloud • Performance • Reliability • AI",
  },

  {
    number: "03",
    label: "CAREER JOURNEY",
    eyebrow: "2008 → 2026",
    title: "From software Development to AI",
    subtitle: "Development → Enterprise Applications → Cloud & Reliability → AI → GenAI",
  },

  {
    number: "04",
    label: "ACHIEVEMENTS",
    eyebrow: "MEASURABLE IMPACT",
    title: "Turning challenges into impact",
    subtitle: "Performance • Reliability • Efficiency • Customer Experience",
  },

  {
    number: "05",
    label: "EXPERIENCE",
    eyebrow: "EXPERIENCE",
    title: "Enterprise technology in production",
    subtitle: "ServiceNow • OpenText • Pramati  • Virtusa",
    text: (
      <>
        ✦ Enterprise Platforms • Cloud • Reliability
        <br />
        ✦ Performance Engineering • Observability • RCA
        <br />
        ✦ Production • Incident • Problem • Change Management
        <br />
        ✦ Customer Engineering • Cross-Functional Collaboration
      </>
    ),
  },

  {
    number: "06",
    label: "TECHNOLOGY",
    eyebrow: "TECHNOLOGY STACK",
    title: "Enterprise technology & AI",
    subtitle: "AI • Cloud • Code • Performance • Observability",
    text: (
      <>
        ✦ Python • Java • SQL • REST APIs • Data & AI
        <br />
        ✦ Generative AI • Agentic AI • LLM Integration
        <br />
        ✦ AWS • ServiceNow • Enterprise Platforms
        <br />
        ✦ Observability • Performance • SRE • ITIL
      </>
    ),
  },

  {
    number: "07",
    label: "AI",
    eyebrow: "AI JOURNEY",
    title: "Building toward intelligent solutions",
    subtitle: "AI-Assisted Analysis • Data Science • Generative AI • Agentic AI",
  },

  {
    number: "08",
    label: "EDUCATION",
    eyebrow: "CONTINUOUS LEARNING",
    title: "Always Learning",
    subtitle: "Generative AI • Agentic AI • Data Science • Project Management • IT",
    text: (
      <>
        ✦ Generative AI & Agentic AI
        <br />
        ✦ Data Science
        <br />
        ✦ Project Management
        <br />
        ✦ Information Technology
      </>
    ),
  },

{
  number: "09",
  label: "CONTACT",
  eyebrow: "LET'S CONNECT",
  title: "Let's build what's next",
  subtitle: "Interested in my profile or have an opportunity?",
  text: (
    <>
      ✦ Senior Enterprise Technologist • AI & GenAI
      <br />
      ✦ Enterprise Technology • Cloud • Performance • Reliability
      <br />
      ✦ Hyderabad • India
      <br />
      ✦ <a href="tel:+919700078889">+91 97000 78889</a>
      <br />
      ✦ <a href="mailto:jobatpradeep@gmail.com">jobatpradeep@gmail.com</a>
      <br />
      ✦{" "}
      <a
        href="https://www.linkedin.com/in/nhpradeepraj"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn • linkedin.com/in/nhpradeepraj
      </a>
    </>
  ),
},
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const [sound, setSound] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [introVideoReady, setIntroVideoReady] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const touchStart = useRef(0);

  const goTo = (index: number) => {
    if (transitioning || index === active) return;
    const nextIndex = Math.max(0, Math.min(chapters.length - 1, index));
    setTransitioning(true);
    window.setTimeout(() => { setActive(nextIndex); setTransitioning(false); }, 260);
  };

  const next = (direction: number) => {
    const target = active + direction;
    goTo(target >= chapters.length ? 0 : target < 0 ? chapters.length - 1 : target);
  };

  const startExperience = async () => {
    setStarted(true);
    setActive(0);

    // Intro video gets priority. Background music stays paused
    // until the intro video finishes.
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (introVideoRef.current) {
      try {
        introVideoRef.current.currentTime = 0;
        introVideoRef.current.muted = false;
        if (introVideoReady) await introVideoRef.current.play();
      } catch {}
    }

    setSound(true);
  };

  const toggleSound = async () => {
    // This button controls ONLY the portfolio background music.
    // The intro video's own audio is never muted/unmuted here.
    if (sound) {
      audioRef.current?.pause();
      setSound(false);
      return;
    }

    try {
      // Do not start background music while the intro video is playing.
      if (active === 0 && introVideoRef.current && !introVideoRef.current.ended) {
        setSound(true);
        return;
      }

      if (audioRef.current) {
        audioRef.current.volume = 0.16;
        await audioRef.current.play();
      }
      setSound(true);
    } catch {
      setSound(false);
    }
  };

  useEffect(() => {
    const onWheel = (event: WheelEvent) => { if (started && Math.abs(event.deltaY) >= 10) next(event.deltaY > 0 ? 1 : -1); };
    const onKey = (event: KeyboardEvent) => {
      if (!started) { if (event.key === "Enter" || event.key === " ") startExperience(); return; }
      if (["ArrowDown", "ArrowRight", "PageDown"].includes(event.key)) { event.preventDefault(); next(1); }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); next(-1); }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("wheel", onWheel); window.removeEventListener("keydown", onKey); };
  }, [active, started, transitioning]);

  // Intro video must remain paused on the landing screen. It starts only after
  // the visitor explicitly enters the portfolio experience.
  useEffect(() => {
    if (!started || active !== 0 || !introVideoReady) return;
    const video = introVideoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {});
    return () => { video.pause(); };
  }, [started, active, introVideoReady]);

  useEffect(() => {
    if (!started || !autoPlay) return;
    // The 16-second intro is controlled by the video's onEnded event.
    // This prevents the portfolio from cutting the video short.
    if (active === 0 && introVideoReady) return;
    const timer = window.setTimeout(() => { if (active < chapters.length - 1) goTo(active + 1); }, 6500);
    return () => window.clearTimeout(timer);
  }, [active, started, introVideoReady, autoPlay]);
  useEffect(() => () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }, []);

  return (
    <main className={`stage ${started ? "is-started" : "is-intro"} scene-${active} ${transitioning ? "is-transitioning" : ""}`}
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientY; }}
      onTouchEnd={(e) => { if (!started) return; const d = touchStart.current - e.changedTouches[0].clientY; if (Math.abs(d) > 45) next(d > 0 ? 1 : -1); }}>
      <div className="v9-ambient" aria-hidden="true">
        <div className="space-dots" aria-hidden="true">{Array.from({ length: 96 }, (_, i) => {
          const x = (i * 37 + 11) % 100;
          const y = (i * 61 + 17) % 100;
          const size = 1 + (i % 3) * 0.6;
          return <span key={i} style={{
            "--star-size": `${size}px`,
            "--star-delay": `${-(i % 13) * 0.37}s`,
            "--star-speed": `${2.8 + (i % 7) * 0.45}s`,
            "--float-delay": `${-(i % 17) * 0.6}s`,
            "--float-speed": `${13 + (i % 9) * 1.8}s`,
            left: `${x}%`,
            top: `${y}%`
          } as React.CSSProperties} />;
        })}</div>
        <span className="v9-scanline" />
        <span className="v9-corner v9-corner-a" />
        <span className="v9-corner v9-corner-b" />
        <span className="v9-corner v9-corner-c" />
        <span className="v9-corner v9-corner-d" />
      </div>
      <audio ref={audioRef} src="/audio/background.mp3" loop preload="auto" />
      <div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="grid" />

      <header className="topbar">
        <div className="brand brand-logo">
          <img src="/portfolio-logo.png" alt="The Portfolio" />
          <span className="brand-fallback">Hanuman Pradeepraj</span>
        </div>

        <div className="top-controls">

          <button
            className={`autoplay-toggle ${autoPlay ? "is-playing" : "is-paused"}`}
            onClick={() => setAutoPlay((value) => !value)}
            aria-label={
              autoPlay
                ? "Pause automatic navigation"
                : "Resume automatic navigation"
            }
          >
            {autoPlay ? "⏸ AUTO" : "▶ AUTO"}
          </button>

          <span className="control-divider">|</span>

          <button
            className="sound-button"
            onClick={toggleSound}
            aria-label="Toggle sound"
          >
            <span className={`sound-dot ${sound ? "on" : ""}`} />
            {sound ? "SOUND ON" : "SOUND OFF"}
          </button>

        </div>
      </header>

      <nav className="chapter-nav" aria-label="Portfolio chapters">
        {chapters.map((chapter,index)=>
          <button key={chapter.number} className={index===active?"active":""}
            onClick={()=>{if(!started){startExperience();} else goTo(index);}}
            aria-label={`Go to ${chapter.label}`}>
            <span>{chapter.label}</span><i/>
          </button>
        )}
      </nav>

      <section className="content">
        <div className={`copy ${transitioning ? "copy-out" : "copy-in"} scene-copy-${active}`}>
          <h1 className={`scene-title scene-title-${active}`}>{active === 0 ? <>Hanuman <span className="outline">Pradeepraj</span></> : chapters[active].title}</h1>
          <h2>{chapters[active].subtitle}</h2>
          <p className={`description description-${active}`}>{chapters[active].text}</p>

          {active === 0 && <div className="intro-actions"><button className="primary-button" onClick={startExperience}><span>CLICK TO EXPLORE</span><b>→</b></button><span className="hint">Scroll / Swipe </span></div>}
          {active === 1 && <div className="v11-who-flow">
            <div className="who-statement">
              <span className="who-index">01</span>
              <p>
              My work sits at the intersection of <strong>enterprise platforms, cloud,
              performance, reliability and emerging AI</strong>.
            </p>
            </div>
            <div className="who-track">
              {[
                ["01","SOLVE","Complex production challenges"],
                ["02","STABILIZE","Reliable application operations"],
                ["03","IMPROVE","Performance, visibility and experience"]
              ].map(([num,title,desc], i) => (
                <div className="who-step" key={num} style={{"--step-i": i} as React.CSSProperties}>
                  <div className="who-step-top"><span>{num}</span><i /></div>
                  <strong>{title}</strong>
                  <small>{desc}</small>
                </div>
              ))}
            </div>
            <div className="who-mindset"><span>OPERATING MINDSET</span><b>UNDERSTAND</b><i>→</i><b>TROUBLESHOOT</b><i>→</i><b>IMPROVE</b></div>
          </div>}
          {active === 2 && <div className="v10-timeline">
  {[["2008","Development"],["2015","Enterprise Application Engineering"],["2016","eDiscovery & Cloud Ops"],["2024","Performance & AI-Assisted Operations"],["2026","Generative AI & Agentic AI"]].map(([year,label], i) =>
    <div className={`timeline-node ${i === 4 ? "current" : ""}`} key={year}>
      <span>{year}</span><i/><strong>{label}</strong>
    </div>
  )}
</div>}
          {active === 3 && <div className="v12-achievement-rail">
  {[
  ["01", "PERFORMANCE", "450+ hours of transactions optimized"],
  ["02", "API PROCESSING", "300+ hours of processing reclaimed"],
  ["03", "RESOURCE EFFICIENCY", "30+ GB memory reclaimed • 3 TB storage reduced"],
  ["04", "RELIABILITY", "25% reduction in recurring cloud alerts"]
].map(([num,title,desc], i) => (
    <div className="achievement-row" key={num} style={{"--achievement-i": i} as React.CSSProperties}>
      <span>{num}</span>
      <i />
      <strong>{title}</strong>
      <small>{desc}</small>
      <b>↗</b>
    </div>
  ))}
</div>}
          {active === 6 && <div className="v10-ai-flow">
  {["AI-ASSISTED ANALYSIS","DATA SCIENCE","GENERATIVE AI","AGENTIC AI"].map((x,i) =>
    <div className="ai-node" key={x}><span>{String(i+1).padStart(2,"0")}</span><strong>{x}</strong>{i < 3 && <b>→</b>}</div>
  )}
</div>}
{active === 7 && <div className="v15-education-flow">
  {[
    ["01","ILLINOIS INSTITUTE OF TECHNOLOGY","PGP • Gene AI & Agentic AI - In Progress"],
    ["02","Indian School of Business","Project Management Certificate"],
    ["03","JNTU","B.Tech - Information Technology"]
  ].map(([num,inst,program], i) => (
    <div className="edu-node" key={num} style={{"--edu-i": i} as React.CSSProperties}>
      <div className="edu-node-head"><span>{num}</span><i /></div>
      <strong>{inst}</strong>
      <small>{program}</small>
    </div>
  ))}
</div>}
          {active > 0 && <div className="scene-progress"><span>EXPLORE</span><div className="progress-line"><div style={{ width: `${((active + 1) / chapters.length) * 100}%` }}/></div><span>{String(active + 1).padStart(2,"0")} / {String(chapters.length).padStart(2,"0")}</span></div>}
        </div>

        <div className="presenter-area">
          <div className="presenter-glow" />
          <div className="presenter-frame">
            <div className="frame-line frame-top" /><div className="frame-line frame-bottom" />
            <div className="presenter-label"><span className="pulse" />{active === 0 && introVideoReady ? "INTRO VIDEO" : speaking ? "INTRODUCING..." : "DIGITAL PRESENCE"}</div>
            <img src="/profile.png" alt="3D digital portfolio presenter" className={`presenter ${introVideoReady && active === 0 ? "presenter-hidden" : ""}`} />
            <video
              ref={introVideoRef}
              className={`presenter presenter-video ${active === 0 && introVideoReady ? "presenter-video-active" : ""}`}
              src="/intro.mp4"
              muted={!started}
              playsInline
              preload="metadata"
              onCanPlay={() => setIntroVideoReady(true)}
              onEnded={() => {
                if (active === 0) {
                  // Intro video finished — now start background music.
                  if (sound && audioRef.current) {
                    audioRef.current.volume = 0.16;
                    audioRef.current.play().catch(() => {});
                  }
                  goTo(1);
                }
              }}
              aria-label="Portfolio introduction video"
            />
            {active === 0 && !started && introVideoReady && (
              <button className="video-start-button" onClick={startExperience} aria-label="Start portfolio experience">
                <span className="video-start-icon">▶</span>
                <span className="video-start-text">START EXPERIENCE</span>
              </button>
            )}
          </div>
          <div className="vertical-caption"><span>AI</span><span>OPS</span><span>RELIABILITY</span></div>
          <div className="scene-card">
            <span>{chapters[active].number}</span><strong>{["WELCOME","RELIABILITY","JOURNEY","IMPACT","ENTERPRISE","STACK","AI","LEARNING","CONNECT"][active]}</strong><small>{["ENTER THE STORY","BUILT FOR PRODUCTION","2008 → 2026","PROBLEMS → IMPROVEMENTS","PLATFORMS & OPERATIONS","CLOUD • CODE • OBSERVABILITY","INTELLIGENT OPERATIONS","ALWAYS EVOLVING","LET'S CONNECT"][active]}</small>
          </div>
        </div>
      </section>

      
      {!started && <div className="intro-overlay"><div className="intro-scan"/><span>INITIALIZING EXPERIENCE</span></div>}
      <footer className="footer"><span>AI • ENTERPRISE TECHNOLOGY • CLOUD • RELIABILITY</span><span>HYDERABAD • INDIA</span></footer>
      <footer className="site-footer"> Website designed & created by Hanuman Pradeepraj (2026)</footer>
    </main>
  );
}


