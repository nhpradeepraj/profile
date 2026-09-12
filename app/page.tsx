"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  {
    number: "01",
    label: "INTRO",
    eyebrow: "APPLICATION SUPPORT • PLATFORM OPERATIONS",
    title: "Hanuman Pradeepraj",
    subtitle: "Application Support & Platform Operations Engineer",
    text: (
      <>
        ✦ Solving complex technical challenges • Customer-focused operations
        <br />
        ✦ Cloud • Observability • Performance • AI
      </>
    ),
  },

  {
    number: "02",
    label: "WHO I AM",
    eyebrow: "WHO I AM",
    title: "Keeping technology reliable",
    subtitle: "Support • Operations • Problem Solving",
    text: (
      <>
        ✦ Solving complex technical challenges
        <br />
        ✦ Keeping enterprise applications reliable
        <br />
        ✦ Supporting customers across production environments
      </>
    ),
  },

  {
    number: "03",
    label: "CAREER JOURNEY",
    eyebrow: "2008 → 2026",
    title: "A journey across technology",
    subtitle: "Development → Application Engineering → Operations → AI",
    text: (
      <>
        ✦ Software Development
        <br />
        ✦ Application Engineering
        <br />
        ✦ eDiscovery & Cloud Operations
        <br />
        ✦ AI-Augmented Platform Operations
        <br />
        ✦ Generative AI & Agentic AI
      </>
    ),
  },

  {
    number: "04",
    label: "ACHIEVEMENTS",
    eyebrow: "TOP CAREER ACHIEVEMENTS",
    title: "Turning problems into improvements",
    subtitle: "Performance • Reliability • Customer Experience",
    text: (
      <>
        ✦ Performance Optimization
        <br />
        ✦ API & Transaction Processing
        <br />
        ✦ Memory & SQL Optimization
        <br />
        ✦ Cloud Efficiency & Alert Reduction
        <br />
        ✦ Monitoring & Operational Visibility
      </>
    ),
  },

  {
    number: "05",
    label: "EXPERIENCE",
    eyebrow: "EXPERIENCE",
    title: "Enterprise platforms. Production responsibility.",
    subtitle: "ServiceNow • OpenText • Pramati Technologies • Virtusa",
    text: (
      <>
        ✦ Application Operations & Production Support
        <br />
        ✦ Cloud Operations & Platform Reliability
        <br />
        ✦ Incident • Problem • Change Management
        <br />
        ✦ RCA • Monitoring • Performance Engineering
      </>
    ),
  },

  {
    number: "06",
    label: "TECHNOLOGY",
    eyebrow: "TECHNOLOGY",
    title: "The tools behind the work",
    subtitle: "Cloud • Code • Observability • IT Operations",
    text: (
      <>
        ✦ AWS • Python • SQL • REST APIs
        <br />
        ✦ ServiceNow • Splunk • SolarWinds
        <br />
        ✦ PagerDuty • Icinga
        <br />
        ✦ SRE • ITIL • Observability
      </>
    ),
  },

  {
    number: "07",
    label: "AI",
    eyebrow: "AI JOURNEY",
    title: "Growing toward intelligent operations",
    subtitle: "AI-Assisted Monitoring • Predictive Intelligence • Generative AI • Agentic AI",
    text: (
      <>
        ✦ AI-Assisted Operations
        <br />
        ✦ Predictive Intelligence
        <br />
        ✦ Generative AI
        <br />
        ✦ Agentic AI
        <br />
        ✦ Intelligent Automation
      </>
    ),
  },

  {
    number: "08",
    label: "EDUCATION",
    eyebrow: "EDUCATION",
    title: "Always learning",
    subtitle: "Data Science • Generative AI • Agentic AI • Project Management • Information Technology",
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
  title: "Let's build something reliable.",
  subtitle: "Hanuman Pradeepraj",
  text: (
    <>
      ✦ Application Support & Platform Operations Engineer
      <br />
      ✦ Hyderabad • India
      <br />
      ✦ +91 97000 78889
      <br />
      ✦ jobatpradeep@gmail.com
      <br />
      ✦ LinkedIn • linkedin.com/in/nhpradeepraj
    </>
  ),
},
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const [sound, setSound] = useState(false);
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
    if (!started) return;
    // The 16-second intro is controlled by the video's onEnded event.
    // This prevents the portfolio from cutting the video short.
    if (active === 0 && introVideoReady) return;
    const timer = window.setTimeout(() => { if (active < chapters.length - 1) goTo(active + 1); }, 6500);
    return () => window.clearTimeout(timer);
  }, [active, started, introVideoReady]);

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
        <div className="brand brand-logo"><img src="/portfolio-logo.png" alt="The Portfolio" /><span className="brand-fallback">Hanuman Pradeepraj</span></div>
        <button className="sound-button" onClick={toggleSound} aria-label="Toggle sound"><span className={`sound-dot ${sound ? "on" : ""}`} />{sound ? "SOUND ON" : "SOUND OFF"}</button>
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

          {active === 0 && <div className="intro-actions"><button className="primary-button" onClick={startExperience}><span>ENTER EXPERIENCE</span><b>→</b></button><span className="hint">Scroll / swipe / arrow keys</span></div>}
          {active === 1 && <div className="v11-who-flow">
            <div className="who-statement">
              <span className="who-index">01</span>
              <p>My work sits where <strong>applications, platforms and customers</strong> meet.</p>
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
  {[["2008","Development"],["2015","Application Engineering"],["2016","eDiscovery & Cloud Ops"],["2024","AI-Augmented Operations"],["2026","GenAI & Agentic AI"]].map(([year,label], i) =>
    <div className={`timeline-node ${i === 4 ? "current" : ""}`} key={year}>
      <span>{year}</span><i/><strong>{label}</strong>
    </div>
  )}
</div>}
          {active === 3 && <div className="v12-achievement-rail">
  {[
    ["01","PERFORMANCE","Optimization & response improvement"],
    ["02","APPLICATION FLOW","API & transaction processing"],
    ["03","RESOURCE CONTROL","Memory, SQL & storage tuning"],
    ["04","OPERATIONAL VISIBILITY","Monitoring, alerts & reliability"]
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
  {["AI-ASSISTED OPS","PREDICTIVE INTELLIGENCE","GENERATIVE AI","AGENTIC AI"].map((x,i) =>
    <div className="ai-node" key={x}><span>{String(i+1).padStart(2,"0")}</span><strong>{x}</strong>{i < 3 && <b>→</b>}</div>
  )}
</div>}
{active === 7 && <div className="v15-education-flow">
  {[
    ["01","ILLINOIS INSTITUTE OF TECHNOLOGY","PGP • Generative AI & Agentic AI"],
    ["02","ISB","Project Management Certificate"],
    ["03","JNTU","B.Tech • Information Technology"]
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
      <footer className="footer"><span>APPLICATION SUPPORT • PLATFORM OPERATIONS</span><span>HYDERABAD • INDIA</span></footer>
    </main>
  );
}
