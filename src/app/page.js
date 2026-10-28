
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import {
  FiArrowUpRight,
  FiArrowRight,
  FiArrowDown,
  FiCode,
  FiZap,
  FiPenTool,
  FiCpu,
  FiLayers,
  FiImage,
  FiMessageCircle,
  FiTerminal,
  FiServer,
  FiMenu,
  FiX,
  FiPlay,
  FiChevronLeft,
  FiChevronRight,
  FiMail,
  FiMapPin,
  FiCheckCircle,
  FiExternalLink,
} from "react-icons/fi";

import { FaWhatsapp } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";

import {
  SiLaravel,
  SiMysql,
  SiMariadb,
  SiN8N,
  SiMake,
  SiZapier,
  SiAirtable,
  SiFigma,
  SiNotion,
  SiAsana,
  SiGithub,
  SiNetlify,
  SiGoogle,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiPostman,
} from "react-icons/si";

/* ========================================
   EMAILJS CONFIGURATION
======================================== */

const EMAILJS_SERVICE_ID = "service_2ro5caj";
const EMAILJS_TEMPLATE_ID = "template_5j41cef";
const EMAILJS_PUBLIC_KEY = "X6Ft2fsg5tmwWQ_hD";

/* ========================================
   FEATURED PROJECTS
======================================== */

const projects = [
  {
    category: "Web Development",
    number: "01",
    title: "Marci Metzger Real Estate Redesign",
    image: "/images/marci-real-estate.png",
    alt: "Marci Metzger real estate homepage redesign",
    description:
      "A responsive real estate experience designed for effortless browsing, clear navigation, and easier client inquiries.",
    tags: ["HTML", "CSS", "JavaScript", "Netlify"],
    caseStudy: {
      problem:
        "The original real estate homepage needed a more modern, professional, and user-friendly presentation while keeping its important property, service, and contact information.",
      whatIBuilt:
        "I redesigned and developed the homepage as a responsive single-page real estate website with improved navigation, property search, service sections, an interactive photo gallery, clean content layouts, and a working contact form.",
      role: [
        "Website Redesign",
        "Front-End Development",
        "Responsive Design",
        "UI Improvement",
        "Form Integration",
        "Deployment",
      ],
      result:
        "A cleaner and more polished real estate experience that works across desktop and mobile, with clearer navigation, improved content presentation, and functional contact options.",
    },
    actions: [
      {
        label: "View Live Site",
        href: "https://peppy-piroshki-6f013e.netlify.app",
      },
    ],
  },

  {
    category: "AI Automation",
    number: "02",
    title: "ASMR Video Creator",
    image: "/images/asmr-video-creator.png",
    alt: "ASMR Video Creator n8n automation workflow",
    description:
      "An end-to-end AI video workflow that automates generation, output validation, processing, and publishing.",
    tags: ["n8n", "Gemini", "APIs", "YouTube", "Facebook"],
    caseStudy: {
      problem:
        "Creating AI-generated videos manually requires multiple repetitive steps, including prompt creation, video generation, status checking, file processing, and publishing.",
      whatIBuilt:
        "I created an n8n automation workflow that generates prompts, sends requests for AI video generation, monitors the generation status, validates the returned output, processes the video file, and prepares or publishes the finished content to social platforms.",
      role: [
        "Workflow Architecture",
        "API Integration",
        "Automation Logic",
        "Status Monitoring",
        "Error Handling",
        "Content Publishing",
      ],
      result:
        "An end-to-end automated workflow that reduces the manual steps required to create and publish AI-generated ASMR content.",
    },
    actions: [
      {
        label: "View Workflow",
        href: "/images/asmr-video-creator.png",
      },
      {
        label: "Watch Output",
        href: "https://www.facebook.com/share/r/1Bzkvvq8TE/",
      },
    ],
  },

  {
    category: "UI/UX Design",
    number: "03",
    title: "LMS Mobile App Design",
    image: "/images/lms-mobile-app.png",
    alt: "LMS mobile app interface design",
    description:
      "A student-first learning experience built around intuitive courses, assignments, submissions, and grades.",
    tags: ["Figma", "Wireframing", "Prototyping"],
    actions: [
      {
        label: "View Full Design",
        href: "/images/lms-mobile-app.png",
      },
    ],
  },
];

/* ========================================
   AI VIDEO PORTFOLIO
======================================== */

const videos = [
  {
    title: "FOCALLURE Beauty Commercial",
    category: "Beauty / AI UGC",
    description:
      "A creator-led beauty ad concept highlighting product presentation through AI-generated video.",
    src: "/videos/ai-beauty-focallure.mp4",
    duration: "00:10",
    number: "01",
  },
  {
    title: "Know Your Worth, Beautiful",
    category: "AI Podcast / Digital Presenter",
    description:
      "A motivational short featuring a consistent digital podcast host and expressive delivery.",
    src: "/videos/ai-podcast-know-your-worth.mp4",
    duration: "00:29",
    number: "02",
  },
  {
    title: "Vikings in North America",
    category: "AI Documentary / Storytelling",
    description:
      "A history-inspired cinematic sequence about Norse voyages to North America.",
    src: "/videos/ai-documentary-vikings.mp4",
    duration: "01:08",
    number: "03",
  },
];

/* ========================================
   SERVICES AND SKILLS
======================================== */

const capabilities = [
  {
    num: "01",
    icon: FiCode,
    title: "Web Development",
    copy:
      "Responsive websites and applications with clean interfaces, purposeful interactions, and maintainable code.",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Next.js",
      "Laravel",
      "PHP",
      "MySQL / MariaDB",
    ],
  },
  {
    num: "02",
    icon: FiZap,
    title: "AI Automation",
    copy:
      "Workflows connecting data, APIs, lead management, follow-ups, and content operations.",
    tags: [
      "n8n",
      "Make",
      "Zapier",
      "Airtable",
      "GoHighLevel",
      "REST APIs",
      "Webhooks",
    ],
  },
  {
    num: "03",
    icon: FiPenTool,
    title: "UI/UX Design",
    copy:
      "Thoughtful digital experiences shaped through user flows, wireframes, and prototypes.",
    tags: [
      "Figma",
      "Canva",
      "Wireframing",
      "Prototyping",
      "User Flows",
      "Responsive Design",
    ],
  },
  {
    num: "04",
    icon: FiCpu,
    title: "AI-Assisted Development",
    copy:
      "AI tools for coding, debugging, research, troubleshooting, and faster development iteration.",
    tags: ["ChatGPT", "Claude", "Cursor"],
  },
  {
    num: "05",
    icon: FiPlay,
    title: "AI Video Production",
    copy:
      "Short-form AI UGC concepts, digital presenters, and cinematic creative storytelling.",
    tags: [
      "AI UGC",
      "Video Concepts",
      "Google Flow",
      "CapCut",
      "Storytelling",
    ],
  },
];

/* ========================================
   TOOLS & PLATFORMS
======================================== */

const toolsRowOne = [
  { name: "VS Code", icon: VscCode },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Laravel", icon: SiLaravel },
  { name: "MySQL", icon: SiMysql },
  { name: "MariaDB", icon: SiMariadb },
  { name: "XAMPP", icon: FiServer },
  { name: "Postman", icon: SiPostman },
  { name: "Netlify", icon: SiNetlify },
  { name: "n8n", icon: SiN8N },
];

const toolsRowTwo = [
  { name: "Make", icon: SiMake },
  { name: "Zapier", icon: SiZapier },
  { name: "Airtable", icon: SiAirtable },
  { name: "GoHighLevel", icon: FiLayers },
  { name: "Google Workspace", icon: SiGoogle },
  { name: "Figma", icon: SiFigma },
  { name: "Canva", icon: FiImage },
  { name: "Notion", icon: SiNotion },
  { name: "Asana", icon: SiAsana },
  { name: "ChatGPT", icon: FiMessageCircle },
  { name: "Claude", icon: FiCpu },
  { name: "Cursor", icon: FiTerminal },
];

function ToolRail({ items, reverse = false }) {
  return (
    <div
      className="tool-rail"
      aria-label="Technologies and tools"
    >
      <div className={`tool-track ${reverse ? "reverse" : ""}`}>
        {[false, true].map((duplicate) => (
          <div
            className="tool-set"
            key={String(duplicate)}
            aria-hidden={duplicate}
          >
            {items.map(({ name, icon: Icon }) => (
              <span className="tool-pill" key={name}>
                <Icon aria-hidden="true" />
                {name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <p className="eyebrow">
      <span className="eyebrow-dot" />
      {children}
    </p>
  );
}

/* ========================================
   MAIN HOME PAGE
======================================== */

export default function Home() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");

  const formRef = useRef(null);

  const hasModal =
    activeProject !== null || activeVideo !== null;

  const selectedProject =
    activeProject !== null ? projects[activeProject] : null;

  const selectedVideo =
    activeVideo !== null ? videos[activeVideo] : null;

  /* MODAL KEYBOARD AND SCROLL LOCK */

  useEffect(() => {
    if (!hasModal) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveProject(null);
        setActiveVideo(null);
      }

      if (
        event.key === "ArrowLeft" &&
        activeProject !== null
      ) {
        setActiveProject(
          (n) => (n - 1 + projects.length) % projects.length
        );
      }

      if (
        event.key === "ArrowRight" &&
        activeProject !== null
      ) {
        setActiveProject(
          (n) => (n + 1) % projects.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasModal, activeProject]);

  /* FORM NOTIFICATION */

  useEffect(() => {
    if (formStatus !== "success") return;

    const timer = setTimeout(() => {
      setFormStatus("idle");
    }, 5000);

    return () => clearTimeout(timer);
  }, [formStatus]);

  /* EMAILJS FORM */

  const submitContact = async (event) => {
    event.preventDefault();

    if (
      formStatus === "sending" ||
      !formRef.current
    ) {
      return;
    }

    setFormStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );

      formRef.current.reset();
      setFormStatus("success");
    } catch (error) {
      console.error("EmailJS error:", error);
      setFormStatus("error");
    }
  };

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#projects" },
    { label: "AI Videos", href: "#videos" },
    { label: "Expertise", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <main id="home">
      {/* =====================================
          NAVIGATION
      ====================================== */}

      <header className="site-header">
        <div className="shell nav-shell">
          <a
            className="wordmark"
            href="#home"
            onClick={() => setMenuOpen(false)}
            aria-label="Myke Oneil Verterra home"
          >
            MOV
            <span className="wordmark-star">✳</span>
            <span className="wordmark-caption">
              MYKE ONEIL VERTERRA
            </span>
          </a>

          <nav
            className={`site-nav ${menuOpen ? "open" : ""}`}
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a className="nav-cta" href="#contact">
            Let&apos;s talk
            <FiArrowUpRight aria-hidden="true" />
          </a>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={
              menuOpen
                ? "Close navigation"
                : "Open navigation"
            }
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      {/* =====================================
          HERO
      ====================================== */}

      <section
        className="hero shell"
        aria-labelledby="hero-title"
      >
        <div className="hero-main">
          <div className="hero-copy">
            <Label>
              WEB · AUTOMATION · AI CREATIVE
            </Label>

            <h1 id="hero-title">
              Digital ideas,
              <br />
              <span className="type-serif">made</span> real
              <span className="hero-period">.</span>
            </h1>

            <p className="hero-lead">
              I design and build thoughtful web
              experiences, intelligent automations,
              and creative AI-powered content.
            </p>

            <div className="hero-actions">
              <a
                className="button button-dark"
                href="#projects"
              >
                Explore my work
                <FiArrowUpRight />
              </a>

              <a
                className="button button-outline"
                href="#contact"
              >
                Start a project
                <FiArrowRight />
              </a>
            </div>

            <div className="hero-signature">
              <span className="availability-dot" />
              AVAILABLE FOR FREELANCE & FULL-TIME
            </div>
          </div>

          <div className="hero-picture">
            <Image
              src="/images/hero-workspace.png"
              alt="A modern desk and website development workspace"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
            />

            <div className="hero-picture-label">
              <span>
                DEVELOPMENT × DESIGN
              </span>
              <FiArrowUpRight />
            </div>

            <div className="hero-float">
              BUILD.
              <br />
              AUTOMATE.
              <br />
              <em>CREATE.</em>
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <p>
            INDEPENDENT DEVELOPER & AI CREATIVE
            <span>BASED IN THE PHILIPPINES</span>
          </p>

          <a href="#about">
            SCROLL TO EXPLORE
            <FiArrowDown />
          </a>
        </div>
      </section>

      {/* =====================================
          ABOUT
      ====================================== */}

      <section className="section shell about" id="about">
        <div className="section-intro">
          <Label>01 / ABOUT ME</Label>
          <span>THE PERSON BEHIND THE WORK</span>
        </div>

        <div className="about-layout">
          <div className="portrait-frame">
            <Image
              src="/images/myke-profile.jpeg"
              alt="Myke Oneil Verterra profile portrait"
              fill
              sizes="(max-width: 760px) 100vw, 35vw"
            />

            <div className="portrait-stamp">
              CURIOUS BY NATURE
              <span>✳</span>
              BUILDER BY PRACTICE
            </div>
          </div>

          <div className="about-copy">
            <h2>
              More than code.
              <br />
              <span className="type-serif">
                A creative
              </span>{" "}
              way
              <br />
              to solve problems.
            </h2>

            <p>
              I&apos;m Myke Oneil Verterra,
              focused on Web and Mobile
              Development, AI automation, and
              UI/UX design. I enjoy creating
              practical solutions that make work
              easier, processes faster, and
              digital experiences more meaningful.
            </p>

            <p>
              Now, I also explore AI UGC production
              and cinematic storytelling—bringing
              together technical thinking and
              creative execution.
            </p>

            <div className="about-points">
              <div>
                <span>01</span>
                <strong>
                  Web & mobile development
                </strong>
              </div>

              <div>
                <span>02</span>
                <strong>
                  AI workflows & automation
                </strong>
              </div>

              <div>
                <span>03</span>
                <strong>
                  Design & AI-powered content
                </strong>
              </div>
            </div>

            <div className="about-facts">
              <div>
                <strong>BSIT</strong>
                <span>
                  Web & Mobile Development
                </span>
              </div>

              <div>
                <strong>PH</strong>
                <span>
                  Based in Manila
                </span>
              </div>

              <div>
                <strong>OPEN</strong>
                <span>
                  Freelance / Full-time
                </span>
              </div>
            </div>

            <div className="about-links">
              <a
                className="button button-dark"
                href="/files/Myke-Oneil-Verterra-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
                <FiArrowDown />
              </a>

              <a className="text-link" href="#contact">
                Get in touch
                <FiArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          SELECTED WORK
      ====================================== */}

      <section
        className="section shell work"
        id="projects"
      >
        <div className="section-intro">
          <Label>02 / SELECTED WORK</Label>
          <span>
            WEB · AUTOMATION · UI/UX
          </span>
        </div>

        <div className="section-heading work-heading">
          <h2>
            Ideas built
            <br />
            <span className="type-serif">
              with purpose.
            </span>
          </h2>

          <p>
            Selected projects that balance
            clear thinking, practical
            functionality, and considered design.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article
              className={`case-card case-card-${index + 1}`}
              key={project.title}
            >
              <button
                type="button"
                className="case-image"
                onClick={() => setActiveProject(index)}
                aria-label={`View ${project.title} case study`}
              >
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 55vw"
                />

                <span className="case-image-action">
                  <FiArrowUpRight />
                </span>
              </button>

              <div className="case-details">
                <div className="case-kicker">
                  <span>
                    {project.number} / {project.category}
                  </span>
                  <span>VIEW CASE STUDY</span>
                </div>

                <button
                  type="button"
                  className="case-title-button"
                  onClick={() => setActiveProject(index)}
                >
                  <h3>{project.title}</h3>
                  <FiArrowUpRight />
                </button>

                <p>{project.description}</p>

                <div className="case-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================
          AI VIDEO STUDIO
      ====================================== */}

      <section className="section shell films" id="videos">
        <div className="section-intro">
          <Label>03 / AI VIDEO STUDIO</Label>
          <span>
            CONCEPT · GENERATE · EDIT
          </span>
        </div>

        <div className="section-heading film-heading">
          <h2>
            Not just content.
            <br />
            <span className="type-serif">
              Visual stories.
            </span>
          </h2>

          <p>
            Experiments in AI-generated brand
            content, digital presenters, and
            cinematic storytelling. Click any
            film to watch.
          </p>
        </div>

        <div className="film-grid">
          {videos.map((video, index) => (
            <article
              className={`film-card film-card-${index + 1}`}
              key={video.src}
            >
              <button
                className="film-preview"
                type="button"
                onClick={() => setActiveVideo(index)}
                aria-label={`Watch ${video.title}`}
              >
                <video
                  src={video.src}
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  tabIndex={-1}
                />

                <span className="film-number">
                  FILM {video.number}
                </span>

                <span className="film-play">
                  <FiPlay fill="currentColor" />
                </span>

                <span className="film-runtime">
                  {video.duration}
                </span>
              </button>

              <div className="film-info">
                <p>{video.category}</p>

                <button
                  onClick={() => setActiveVideo(index)}
                  type="button"
                >
                  <h3>{video.title}</h3>
                  <FiArrowUpRight />
                </button>

                <span>{video.description}</span>
              </div>
            </article>
          ))}
        </div>

        <p className="film-disclaimer">
          INDEPENDENT CREATIVE CONCEPTS ·
          AI-GENERATED VISUALS
        </p>
      </section>

      {/* =====================================
          EXPERTISE
      ====================================== */}

      <section
        className="section shell expertise"
        id="skills"
      >
        <div className="section-intro">
          <Label>04 / EXPERTISE</Label>
          <span>
            WHAT I BRING TO THE TABLE
          </span>
        </div>

        <div className="section-heading expertise-heading">
          <h2>
            Different skills.
            <br />
            <span className="type-serif">
              One clear vision.
            </span>
          </h2>

          <p>
            From development to automation
            and visual storytelling, I work
            across disciplines to turn ideas
            into usable experiences.
          </p>
        </div>

        <div className="expertise-grid">
          {capabilities.map(
            ({ num, icon: Icon, title, copy, tags }) => (
              <article
                className="expertise-tile"
                key={title}
              >
                <div className="expertise-top">
                  <span>{num} / 05</span>
                  <Icon aria-hidden="true" />
                </div>

                <h3>{title}</h3>
                <p>{copy}</p>

                <div className="expertise-tags">
                  {tags.map((tag) => (
                    <span key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            )
          )}
        </div>

        <div className="platforms">
          <div className="platforms-header">
            <span>TOOLS & PLATFORMS</span>
            <p>
              The technology I use to bring
              ideas to life.
            </p>
          </div>

          <ToolRail items={toolsRowOne} />
          <ToolRail items={toolsRowTwo} reverse />
        </div>
      </section>

      {/* =====================================
          CONTACT
      ====================================== */}

      <section
        className="section shell contact"
        id="contact"
      >
        <div className="section-intro">
          <Label>05 / LET&apos;S CONNECT</Label>
          <span>
            HAVE SOMETHING IN MIND?
          </span>
        </div>

        <div className="contact-layout">
          <div className="contact-copy">
            <h2>
              Have an idea?
              <br />
              <span className="type-serif">
                Let&apos;s make
              </span>
              <br />
              it happen.
            </h2>

            <p>
              Need a website, automation workflow,
              user-friendly interface, or creative
              AI video? Tell me what you&apos;re
              building.
            </p>

            <div className="contact-methods">
              <a href="mailto:mykeverterra@gmail.com">
                <FiMail />

                <span>
                  <small>EMAIL</small>
                  <strong>
                    mykeverterra@gmail.com
                  </strong>
                </span>

                <FiArrowUpRight />
              </a>

              <a
                href="https://wa.me/639615807893"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />

                <span>
                  <small>WHATSAPP</small>
                  <strong>
                    0961 580 7893
                  </strong>
                </span>

                <FiArrowUpRight />
              </a>

              <div>
                <FiMapPin />

                <span>
                  <small>LOCATION</small>
                  <strong>
                    Manila, Philippines
                  </strong>
                </span>
              </div>
            </div>

            <div className="contact-social">
              <a
                href="https://www.linkedin.com/in/myke-oneil-verterra-238a5a1b8/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <FiArrowUpRight />
              </a>

              <a
                href="https://github.com/mykeoneilverterra-code"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
                <FiArrowUpRight />
              </a>
            </div>
          </div>

          {/* EMAILJS FORM */}

          <form
            className="contact-form-new"
            ref={formRef}
            onSubmit={submitContact}
          >
            <div className="form-title">
              <span>PROJECT INQUIRY</span>
              <FiArrowUpRight />
            </div>

            <div className="form-duo">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="How should I call you?"
                  required
                  disabled={formStatus === "sending"}
                />
              </label>

              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  disabled={formStatus === "sending"}
                />
              </label>
            </div>

            <label>
              Subject
              <input
                name="subject"
                placeholder="What would you like to work on?"
                required
                disabled={formStatus === "sending"}
              />
            </label>

            <label>
              Your message
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me about your idea, goals, and timeline..."
                required
                disabled={formStatus === "sending"}
              />
            </label>

            <button
              className="button button-dark submit-button"
              type="submit"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending"
                ? "Sending..."
                : "Send inquiry"}
              <FiArrowUpRight />
            </button>

            {formStatus === "success" && (
              <p
                className="form-feedback success"
                role="status"
              >
                <FiCheckCircle />
                Message sent successfully!
                I&apos;ll get back to you soon.
              </p>
            )}

            {formStatus === "error" && (
              <p
                className="form-feedback error"
                role="alert"
              >
                Couldn&apos;t send your message.
                Please try again or contact me
                directly by email.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="site-footer shell">
        <div className="footer-primary">
          <a href="#home" className="footer-brand">
            MOV<span>✳</span>
          </a>

          <h2>
            Let&apos;s build something
            <br />
            <em>worth remembering.</em>
          </h2>

          <a
            href="mailto:mykeverterra@gmail.com"
            className="footer-email"
          >
            GET IN TOUCH
            <FiArrowUpRight />
          </a>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 Myke Oneil Verterra.
            All rights reserved.
          </p>

          <span>
            WEB / AUTOMATION / DESIGN / AI VIDEO
          </span>

          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>

      {/* =====================================
          PROJECT CASE STUDY MODAL
      ====================================== */}

      {selectedProject && (
        <div
          className="overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setActiveProject(null);
            }
          }}
        >
          <div
            className="project-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
          >
            <button
              className="dialog-close"
              type="button"
              onClick={() => setActiveProject(null)}
              aria-label="Close project"
            >
              <FiX />
            </button>

            <button
              className="dialog-arrow dialog-prev"
              type="button"
              onClick={() =>
                setActiveProject(
                  (n) =>
                    (n - 1 + projects.length) %
                    projects.length
                )
              }
              aria-label="Previous project"
            >
              <FiChevronLeft />
            </button>

            <button
              className="dialog-arrow dialog-next"
              type="button"
              onClick={() =>
                setActiveProject(
                  (n) => (n + 1) % projects.length
                )
              }
              aria-label="Next project"
            >
              <FiChevronRight />
            </button>

            <div className="dialog-media">
              <Image
                src={selectedProject.image}
                alt={selectedProject.alt}
                fill
                sizes="(max-width: 850px) 100vw, 60vw"
              />
            </div>

            <div className="dialog-body">
              <Label>{selectedProject.category}</Label>

              <h2 id="project-dialog-title">
                {selectedProject.title}
              </h2>

              {selectedProject.caseStudy ? (
                <div className="case-study">
                  <div>
                    <h3>THE PROBLEM</h3>
                    <p>
                      {selectedProject.caseStudy.problem}
                    </p>
                  </div>

                  <div>
                    <h3>WHAT I BUILT</h3>
                    <p>
                      {selectedProject.caseStudy.whatIBuilt}
                    </p>
                  </div>

                  <div>
                    <h3>MY ROLE</h3>

                    <div className="dialog-tags">
                      {selectedProject.caseStudy.role.map(
                        (role) => (
                          <span key={role}>{role}</span>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h3>RESULT</h3>
                    <p>
                      {selectedProject.caseStudy.result}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="dialog-description">
                  {selectedProject.description}
                </p>
              )}

              <h3 className="dialog-subtitle">
                TOOLS USED
              </h3>

              <div className="dialog-tags">
                {selectedProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="dialog-actions">
                {selectedProject.actions.map(
                  (action) => (
                    <a
                      key={action.label}
                      href={action.href}
                      className="button button-dark"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {action.label}
                      <FiExternalLink />
                    </a>
                  )
                )}
              </div>

              <p className="dialog-count">
                {selectedProject.number} / 0
                {projects.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================
          CINEMATIC VIDEO MODAL
      ====================================== */}

      {selectedVideo && (
        <div
          className="overlay video-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setActiveVideo(null);
            }
          }}
        >
          <div
            className="video-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-dialog-title"
          >
            <button
              className="dialog-close"
              type="button"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
            >
              <FiX />
            </button>

            <div className="video-dialog-player">
              <video
                key={selectedVideo.src}
                src={selectedVideo.src}
                controls
                autoPlay
                playsInline
                preload="auto"
              />
            </div>

            <div className="video-dialog-copy">
              <span>
                {selectedVideo.category} ·
                {" "}{selectedVideo.duration}
              </span>

              <h2 id="video-dialog-title">
                {selectedVideo.title}
              </h2>

              <p>
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
