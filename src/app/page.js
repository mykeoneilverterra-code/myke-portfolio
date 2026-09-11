"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import emailjs from "@emailjs/browser";

/* ========================================
   BRAND ICONS
======================================== */

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

import { VscCode } from "react-icons/vsc";
import { FaWhatsapp } from "react-icons/fa";

import {
  FiCode,
  FiPenTool,
  FiZap,
  FiCpu,
  FiLayers,
  FiTerminal,
  FiImage,
  FiMessageCircle,
  FiServer,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

/* ========================================
   EMAILJS CONFIGURATION
======================================== */

const EMAILJS_SERVICE_ID = "service_2ro5caj";
const EMAILJS_TEMPLATE_ID = "template_5j41cef";

/*
  IMPORTANT:
  Paste the SAME CURRENT PUBLIC KEY
  that is already working in your portfolio.
*/
const EMAILJS_PUBLIC_KEY = "X6Ft2fsg5tmwWQ_hD";

/* ========================================
   PROJECT DATA
======================================== */

const projects = [
  {
    category: "WEB DEVELOPMENT",

    title: "Marci Metzger Real Estate Redesign",

    cardTitle: (
      <>
        Marci Metzger
        <br />
        Real Estate Redesign
      </>
    ),

    image: "/images/marci-real-estate.png",

    alt: "Marci Metzger real estate website redesign",

    description:
      "A modern real estate website redesign with responsive layouts, interactive navigation, property search, image gallery, contact form, and mobile-friendly functionality.",

    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Netlify",
    ],

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
    category: "AI AUTOMATION",

    title: "ASMR Video Creator",

    cardTitle: (
      <>
        ASMR Video
        <br />
        Creator
      </>
    ),

    image: "/images/asmr-video-creator.png",

    alt: "ASMR Video Creator n8n automation workflow",

    description:
      "An automated video creation workflow that generates ASMR-style content from prompts, monitors the generation process, validates the output, converts the result into a video file, and publishes content to social platforms.",

    tags: [
      "n8n",
      "Gemini",
      "APIs",
      "YouTube",
      "Facebook",
    ],

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
    category: "UI/UX DESIGN",

    title: "LMS Mobile App Design",

    cardTitle: (
      <>
        LMS Mobile
        <br />
        App Design
      </>
    ),

    image: "/images/lms-mobile-app.png",

    alt: "LMS mobile application UI UX design",

    description:
      "A student learning management system designed with clear navigation for courses, lessons, assignments, submissions, and grade tracking.",

    tags: [
      "Figma",
      "Wireframing",
      "Prototyping",
    ],

    actions: [
      {
        label: "View Full Design",
        href: "/images/lms-mobile-app.png",
      },
    ],
  },
];

/* ========================================
   TOOLS DATA
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

/* ========================================
   TOOL GROUP
======================================== */

function ToolGroup({
  tools,
  duplicate = false,
}) {
  return (
    <div
      className="tools-group"
      aria-hidden={
        duplicate
          ? "true"
          : undefined
      }
    >
      {tools.map((tool) => {
        const Icon = tool.icon;

        return (
          <div
            className="tool-chip"
            key={`${
              duplicate
                ? "duplicate-"
                : ""
            }${tool.name}`}
          >
            <Icon className="tool-logo" />

            <span>
              {tool.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ========================================
   CASE STUDY SECTION
======================================== */

function CaseStudySection({
  title,
  children,
}) {
  return (
    <div
      style={{
        marginTop: "22px",
      }}
    >
      <p
        style={{
          margin: "0 0 8px",
          color: "#262626",
          fontSize: "9px",
          fontWeight: "750",
          letterSpacing: "1px",
        }}
      >
        {title}
      </p>

      {children}
    </div>
  );
}

/* ========================================
   MAIN PAGE
======================================== */

export default function Home() {
  /* ========================================
     PROJECT MODAL STATE
  ======================================== */

  const [
    activeProject,
    setActiveProject,
  ] = useState(null);

  /* ========================================
     CONTACT FORM STATE
  ======================================== */

  const formRef = useRef(null);

  const [
    formStatus,
    setFormStatus,
  ] = useState("idle");

  /* ========================================
     PROJECT MODAL FUNCTIONS
  ======================================== */

  const closeProject = () => {
    setActiveProject(null);
  };

  const showPreviousProject = () => {
    setActiveProject((current) => {
      if (current === null) {
        return 0;
      }

      return (
        current -
        1 +
        projects.length
      ) % projects.length;
    });
  };

  const showNextProject = () => {
    setActiveProject((current) => {
      if (current === null) {
        return 0;
      }

      return (
        current +
        1
      ) % projects.length;
    });
  };

  /* ========================================
     PROJECT MODAL KEYBOARD CONTROLS
  ======================================== */

  useEffect(() => {
    if (activeProject === null) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveProject(
          (current) =>
            (
              current -
              1 +
              projects.length
            ) % projects.length
        );
      }

      if (event.key === "ArrowRight") {
        setActiveProject(
          (current) =>
            (
              current +
              1
            ) % projects.length
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [activeProject]);

  /* ========================================
     EMAILJS CONTACT FORM
  ======================================== */

  const handleContactSubmit =
    async (event) => {
      event.preventDefault();

      if (formStatus === "sending") {
        return;
      }

      if (!formRef.current) {
        return;
      }

      setFormStatus("sending");

      try {
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current,
          {
            publicKey:
              EMAILJS_PUBLIC_KEY,
          }
        );

        formRef.current.reset();

        setFormStatus("success");
      } catch (error) {
        console.error(
          "EmailJS error:",
          error
        );

        setFormStatus("error");
      }
    };

  /* ========================================
     AUTO-HIDE SUCCESS MESSAGE
     Hides after 5 seconds
  ======================================== */

  useEffect(() => {
    if (formStatus !== "success") {
      return;
    }

    const timer = setTimeout(() => {
      setFormStatus("idle");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [formStatus]);

  /* ========================================
     SELECTED PROJECT
  ======================================== */

  const selectedProject =
    activeProject !== null
      ? projects[activeProject]
      : null;

  return (
    <main>
      {/* =====================================
          NAVBAR
      ====================================== */}

      <header className="site-header">
        <div className="main-container navbar">
          <a
            href="#home"
            className="brand"
          >
            MYKE ONEIL VERTERRA
          </a>

          <nav
            className="nav-links"
            aria-label="Main navigation"
          >
            <a href="#about">
              About
            </a>

            <a href="#projects">
              Projects
            </a>

            <a href="#skills">
              Skills
            </a>

            <a href="#contact">
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="nav-button"
          >
            Let&apos;s Talk

            <span>
              →
            </span>
          </a>
        </div>
      </header>

      {/* =====================================
          HERO
      ====================================== */}

      <section
        className="hero-section"
        id="home"
      >
        <div className="main-container hero-container">
          {/* HERO LEFT */}

          <div className="hero-content">
            <p className="hero-label">
              BUILD • AUTOMATE • DESIGN
            </p>

            <h1 className="hero-title">
              Turning ideas
              <br />
              into real solutions.
            </h1>

            <p className="hero-description">
              I build websites,
              automate workflows,
              and design user-friendly
              digital experiences that
              help businesses work
              smarter and grow faster.
            </p>

            <div className="hero-buttons">
              <a
                href="#projects"
                className="primary-button"
              >
                View My Work

                <span>
                  →
                </span>
              </a>

              <a
                href="#contact"
                className="secondary-button"
              >
                Get in Touch
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <strong>
                  10+
                </strong>

                <span>
                  Projects Completed
                </span>
              </div>

              <div className="stat-item">
                <strong>
                  3
                </strong>

                <span>
                  Core Specializations
                </span>
              </div>

              <div className="stat-item stat-wide">
                <strong>
                  Web · Automation · UI/UX
                </strong>

                <span>
                  Focused on Real Impact
                </span>
              </div>
            </div>
          </div>

          {/* HERO RIGHT */}

          <div className="hero-visual">
            <Image
              src="/images/hero-workspace.png"
              alt="Myke Verterra web development and automation workspace"
              fill
              priority
              className="hero-image"
              sizes="(max-width: 1050px) 100vw, 54vw"
            />

            <div className="expertise-card">
              <div className="expertise-item">
                <div className="expertise-icon">
                  <FiCode />
                </div>

                <span>
                  Web Development
                </span>
              </div>

              <div className="expertise-item">
                <div className="expertise-icon automation-symbol">
                  <FiZap />
                </div>

                <span>
                  AI Automation
                </span>
              </div>

              <div className="expertise-item">
                <div className="expertise-icon">
                  <FiPenTool />
                </div>

                <span>
                  UI/UX Design
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          ABOUT
      ====================================== */}

      <section
        className="about-section"
        id="about"
      >
        <div className="main-container about-container">
          {/* ABOUT LEFT */}

          <div className="about-profile">
            <div className="about-photo">
              <Image
                src="/images/myke-profile.jpeg"
                alt="Myke Oneil Verterra"
                fill
                className="about-profile-image"
                sizes="(max-width: 720px) 100vw, 31vw"
              />
            </div>

            <div className="personality-card">
              <div>
                <span></span>
                Focused
              </div>

              <div>
                <span></span>
                Creative
              </div>

              <div>
                <span></span>
                Reliable
              </div>

              <div>
                <span></span>
                Always Learning
              </div>
            </div>
          </div>

          {/* ABOUT RIGHT */}

          <div className="about-content">
            <p className="section-eyebrow">
              ABOUT ME
            </p>

            <h2 className="about-title">
              A problem-solver who
              <br />
              builds, automates,
              <br />
              and designs.
            </h2>

            <p className="about-description">
              I&apos;m Myke Oneil
              Verterra, focused on Web
              and Mobile Development,
              AI automation, and UI/UX
              design. I enjoy creating
              practical solutions that
              make work easier,
              processes faster, and
              digital experiences more
              meaningful.
            </p>

            <div className="about-buttons">
              <a
                href="/files/Myke-Oneil-Verterra-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button"
              >
                Download CV

                <span>
                  ↓
                </span>
              </a>

              <a
                href="#contact"
                className="secondary-button"
              >
                Get in Touch
              </a>
            </div>

            <div className="about-info-grid">
              <div className="about-info-card">
                <div className="info-icon">
                  ◇
                </div>

                <div>
                  <strong>
                    BSIT
                  </strong>

                  <span>
                    Web and Mobile Development
                  </span>
                </div>
              </div>

              <div className="about-info-card">
                <div className="info-icon">
                  ⌖
                </div>

                <div>
                  <strong>
                    Philippines
                  </strong>

                  <span>
                    Based in Manila
                  </span>
                </div>
              </div>

              <div className="about-info-card">
                <div className="info-icon">
                  ✦
                </div>

                <div>
                  <strong>
                    Open to Opportunities
                  </strong>

                  <span>
                    Freelance | Full-time
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          FEATURED PROJECTS
      ====================================== */}

      <section
        className="projects-section"
        id="projects"
      >
        <div className="main-container projects-container">
          <div className="projects-header">
            <div>
              <p className="section-eyebrow">
                FEATURED PROJECTS
              </p>

              <h2 className="projects-title">
                Selected work that
                <br />
                creates impact.
              </h2>
            </div>

            <div className="projects-header-side">
              <p>
                A collection of web
                development, automation,
                and UI/UX design projects
                built to solve real
                problems and deliver
                practical results.
              </p>

              <a
                href="#project-grid"
                className="projects-view-all"
              >
                View All Projects

                <span>
                  →
                </span>
              </a>
            </div>
          </div>

          {/* PROJECT GRID */}

          <div
            className="projects-grid"
            id="project-grid"
          >
            {projects.map(
              (
                project,
                index
              ) => (
                <article
                  className="project-card"
                  key={project.title}
                >
                  <button
                    type="button"
                    className="project-image-wrap project-preview-button"
                    onClick={() =>
                      setActiveProject(
                        index
                      )
                    }
                    aria-label={`Preview ${project.title}`}
                  >
                    <Image
                      src={
                        project.image
                      }
                      alt={
                        project.alt
                      }
                      fill
                      className="project-image"
                      sizes="(max-width: 720px) 100vw, (max-width: 1050px) 50vw, 33vw"
                    />

                    <div className="project-image-overlay">
                      <span>
                        VIEW PROJECT
                      </span>

                      <span className="project-overlay-arrow">
                        ↗
                      </span>
                    </div>
                  </button>

                  <div className="project-card-content">
                    <span className="project-category">
                      {
                        project.category
                      }
                    </span>

                    <h3>
                      {
                        project.cardTitle
                      }
                    </h3>

                    <p className="project-description">
                      {
                        project.description
                      }
                    </p>

                    <div className="project-tags">
                      {project.tags.map(
                        (tag) => (
                          <span key={tag}>
                            {tag}
                          </span>
                        )
                      )}
                    </div>

                    <div className="project-actions">
                      <button
                        type="button"
                        className="project-link project-preview-link"
                        onClick={() =>
                          setActiveProject(
                            index
                          )
                        }
                      >
                        View Project

                        <span>
                          →
                        </span>
                      </button>

                      {project.title ===
                        "ASMR Video Creator" && (
                        <a
                          href="https://www.facebook.com/share/r/1Bzkvvq8TE/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link project-link-output"
                        >
                          Watch Output

                          <span>
                            →
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              )
            )}
          </div>

          <div className="projects-footer">
            <span></span>

            <p>
              MORE PROJECTS COMING SOON
            </p>

            <span></span>
          </div>
        </div>
      </section>

      {/* =====================================
          SKILLS
      ====================================== */}

      <section
        className="skills-section"
        id="skills"
      >
        <div className="main-container skills-container">
          <div className="skills-header">
            <div>
              <p className="section-eyebrow">
                SKILLS &amp; TOOLS
              </p>

              <h2 className="skills-title">
                Tools I use to build,
                <br />
                automate, and design.
              </h2>
            </div>

            <div className="skills-header-copy">
              <p>
                A practical toolkit for
                web development,
                workflow automation,
                AI-assisted development,
                and user-friendly
                digital design.
              </p>
            </div>
          </div>

          {/* SKILL CARDS */}

          <div className="skills-grid">
            {/* WEB DEVELOPMENT */}

            <article className="skill-card">
              <div className="skill-icon web-icon">
                <FiCode />
              </div>

              <h3>
                Web Development
              </h3>

              <p>
                Responsive websites and
                web applications built
                with practical,
                maintainable, and
                user-friendly approaches.
              </p>

              <div className="skill-list">
                <span>
                  HTML
                </span>

                <span>
                  CSS
                </span>

                <span>
                  JavaScript
                </span>

                <span>
                  Laravel
                </span>

                <span>
                  PHP
                </span>

                <span>
                  MySQL / MariaDB
                </span>

                <span>
                  Responsive Design
                </span>
              </div>
            </article>

            {/* AI AUTOMATION */}

            <article className="skill-card">
              <div className="skill-icon automation-icon">
                <FiZap />
              </div>

              <h3>
                AI Automation
              </h3>

              <p>
                Workflow automation for
                lead management, CRM
                updates, follow-ups,
                data processing, and
                business operations.
              </p>

              <div className="skill-list">
                <span>
                  n8n
                </span>

                <span>
                  Make
                </span>

                <span>
                  Zapier
                </span>

                <span>
                  Airtable
                </span>

                <span>
                  GoHighLevel
                </span>

                <span>
                  REST APIs
                </span>

                <span>
                  Webhooks
                </span>

                <span>
                  Google Workspace
                </span>
              </div>
            </article>

            {/* UI UX */}

            <article className="skill-card">
              <div className="skill-icon design-icon">
                <FiPenTool />
              </div>

              <h3>
                UI/UX Design
              </h3>

              <p>
                Clean interfaces,
                wireframes, and
                prototypes focused on
                clear navigation,
                usability, and
                responsive experiences.
              </p>

              <div className="skill-list">
                <span>
                  Figma
                </span>

                <span>
                  Canva
                </span>

                <span>
                  Wireframing
                </span>

                <span>
                  Prototyping
                </span>

                <span>
                  User Flows
                </span>

                <span>
                  Responsive Design
                </span>
              </div>
            </article>

            {/* AI ASSISTED DEVELOPMENT */}

            <article className="skill-card">
              <div className="skill-icon ai-icon">
                <FiCpu />
              </div>

              <h3>
                AI-Assisted Development
              </h3>

              <p>
                AI tools integrated into
                my development workflow
                for coding, debugging,
                research,
                troubleshooting, and
                faster iteration.
              </p>

              <div className="skill-list">
                <span>
                  ChatGPT
                </span>

                <span>
                  Claude
                </span>

                <span>
                  Cursor
                </span>
              </div>
            </article>
          </div>

          {/* =====================================
              TOOLS & PLATFORMS
          ====================================== */}

          <div className="tools-area">
            <div className="tools-heading">
              <p>
                TOOLS &amp; PLATFORMS
              </p>

              <span>
                Technologies I use
                across development,
                automation, design,
                and operations.
              </span>
            </div>

            <div className="tools-marquee">
              {/* ROW 1 — RIGHT */}

              <div className="tools-marquee-row">
                <div className="tools-track tools-track-right">
                  <ToolGroup
                    tools={
                      toolsRowOne
                    }
                  />

                  <ToolGroup
                    tools={
                      toolsRowOne
                    }
                    duplicate
                  />
                </div>
              </div>

              {/* ROW 2 — LEFT */}

              <div className="tools-marquee-row">
                <div className="tools-track tools-track-left">
                  <ToolGroup
                    tools={
                      toolsRowTwo
                    }
                  />

                  <ToolGroup
                    tools={
                      toolsRowTwo
                    }
                    duplicate
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          CONTACT
      ====================================== */}

      <section
        className="contact-section"
        id="contact"
      >
        <div className="main-container contact-container">
          {/* CONTACT INFO */}

          <div className="contact-info">
            <p className="section-eyebrow">
              GET IN TOUCH
            </p>

            <h2 className="contact-title">
              Let&apos;s work
              <br />
              together.
            </h2>

            <p className="contact-description">
              Have a project in mind,
              a question, or just want
              to say hi? Feel free to
              send a message and
              I&apos;ll get back to
              you as soon as possible.
            </p>

            {/* CONTACT DETAILS */}

            <div className="contact-details">
              {/* EMAIL */}

              <a
                href="mailto:mykeverterra@gmail.com"
                className="contact-detail"
              >
                <div className="contact-detail-icon">
                  ✉
                </div>

                <div>
                  <span>
                    Email
                  </span>

                  <strong>
                    mykeverterra@gmail.com
                  </strong>
                </div>
              </a>

              {/* WHATSAPP */}

              <a
                href="https://wa.me/639615807893"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-detail"
              >
                <div className="contact-detail-icon">
                  <FaWhatsapp />
                </div>

                <div>
                  <span>
                    WhatsApp
                  </span>

                  <strong>
                    0961 580 7893
                  </strong>
                </div>
              </a>

              {/* LOCATION */}

              <div className="contact-detail">
                <div className="contact-detail-icon">
                  ⌖
                </div>

                <div>
                  <span>
                    Location
                  </span>

                  <strong>
                    Manila, Philippines
                  </strong>
                </div>
              </div>

              {/* OPEN TO */}

              <div className="contact-detail">
                <div className="contact-detail-icon">
                  ✦
                </div>

                <div>
                  <span>
                    Open to
                  </span>

                  <strong>
                    Freelance | Full-time
                  </strong>
                </div>
              </div>
            </div>

            {/* SOCIAL LINKS */}

            <div className="contact-socials">
              <a
                href="https://www.linkedin.com/in/myke-oneil-verterra-238a5a1b8/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                aria-label="LinkedIn"
              >
                in
              </a>

              <a
                href="https://github.com/mykeoneilverterra-code"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                aria-label="GitHub"
              >
                <SiGithub />
              </a>

              <a
                href="https://wa.me/639615807893"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button whatsapp-button"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* =====================================
              EMAILJS CONTACT FORM
          ====================================== */}

          <div className="contact-form-card">
            <form
              ref={formRef}
              className="contact-form"
              onSubmit={
                handleContactSubmit
              }
            >
              {/* NAME + EMAIL */}

              <div className="contact-form-row">
                <div className="form-field">
                  <label htmlFor="name">
                    Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    disabled={
                      formStatus ===
                      "sending"
                    }
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    disabled={
                      formStatus ===
                      "sending"
                    }
                  />
                </div>
              </div>

              {/* SUBJECT */}

              <div className="form-field">
                <label htmlFor="subject">
                  Subject
                </label>

                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="What would you like to work on?"
                  required
                  disabled={
                    formStatus ===
                    "sending"
                  }
                />
              </div>

              {/* MESSAGE */}

              <div className="form-field">
                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                  disabled={
                    formStatus ===
                    "sending"
                  }
                ></textarea>
              </div>

              {/* SEND BUTTON */}

              <button
                type="submit"
                className="contact-submit"
                disabled={
                  formStatus ===
                  "sending"
                }
                style={{
                  opacity:
                    formStatus ===
                    "sending"
                      ? 0.7
                      : 1,

                  cursor:
                    formStatus ===
                    "sending"
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {formStatus ===
                "sending"
                  ? "Sending..."
                  : "Send Message"}

                {formStatus !==
                  "sending" && (
                  <span>
                    →
                  </span>
                )}
              </button>

              {/* =====================================
                  SUCCESS MESSAGE
              ====================================== */}

              {formStatus ===
                "success" && (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    padding:
                      "13px 15px",

                    border:
                      "1px solid #cbd9cb",

                    borderRadius:
                      "7px",

                    background:
                      "#f5faf5",

                    color:
                      "#315c31",

                    fontSize:
                      "11px",

                    fontWeight:
                      "600",

                    lineHeight:
                      "1.5",
                  }}
                >
                  ✓ Message sent
                  successfully! Thanks
                  for reaching out.
                  I&apos;ll get back to
                  you as soon as
                  possible.
                </div>
              )}

              {/* =====================================
                  ERROR MESSAGE
              ====================================== */}

              {formStatus ===
                "error" && (
                <div
                  role="alert"
                  aria-live="assertive"
                  style={{
                    padding:
                      "13px 15px",

                    border:
                      "1px solid #e1c4c4",

                    borderRadius:
                      "7px",

                    background:
                      "#fff7f7",

                    color:
                      "#8a3535",

                    fontSize:
                      "11px",

                    fontWeight:
                      "600",

                    lineHeight:
                      "1.5",
                  }}
                >
                  Couldn&apos;t send
                  your message. Please
                  try again, or contact
                  me directly through
                  email or WhatsApp.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* =====================================
            BOTTOM CTA
        ====================================== */}

        <div className="main-container contact-bottom-cta">
          <p>
            HAVE A PROJECT IN MIND?
          </p>

          <h3>
            LET&apos;S TURN YOUR IDEA
            INTO SOMETHING REAL.
          </h3>

          <span>
            Need a website, automation
            workflow, or user-friendly
            interface? Let&apos;s talk
            about what you want to
            build.
          </span>

          <a
            href="mailto:mykeverterra@gmail.com"
            className="contact-bottom-button"
          >
            CONTACT ME

            <span>
              →
            </span>
          </a>
        </div>

        {/* =====================================
            FOOTER
        ====================================== */}

        <footer className="main-container site-footer">
          <p>
            © 2026 Myke Oneil
            Verterra. All rights
            reserved.
          </p>

          <div>
            <a href="#about">
              About
            </a>

            <a href="#projects">
              Projects
            </a>

            <a href="#skills">
              Skills
            </a>

            <a href="#contact">
              Contact
            </a>

            <a
              href="#home"
              className="back-to-top"
              aria-label="Back to top"
            >
              ↑
            </a>
          </div>
        </footer>
      </section>

      {/* =====================================
          PROJECT CASE STUDY MODAL
      ====================================== */}

      {selectedProject && (
        <div
          className="project-modal-backdrop"
          onMouseDown={
            (event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeProject();
              }
            }
          }
        >
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            {/* CLOSE */}

            <button
              type="button"
              className="project-modal-close"
              onClick={
                closeProject
              }
              aria-label="Close project preview"
            >
              <FiX />
            </button>

            {/* PREVIOUS */}

            <button
              type="button"
              className="project-modal-arrow project-modal-prev"
              onClick={
                showPreviousProject
              }
              aria-label="Previous project"
            >
              <FiChevronLeft />
            </button>

            {/* NEXT */}

            <button
              type="button"
              className="project-modal-arrow project-modal-next"
              onClick={
                showNextProject
              }
              aria-label="Next project"
            >
              <FiChevronRight />
            </button>

            <div className="project-modal-content">
              {/* MODAL IMAGE */}

              <div className="project-modal-image-wrap">
                <Image
                  src={
                    selectedProject.image
                  }
                  alt={
                    selectedProject.alt
                  }
                  fill
                  priority
                  className="project-modal-image"
                  sizes="(max-width: 850px) 92vw, 65vw"
                />
              </div>

              {/* MODAL INFORMATION */}

              <div className="project-modal-details">
                <p className="project-modal-category">
                  {
                    selectedProject.category
                  }
                </p>

                <h2 id="project-modal-title">
                  {
                    selectedProject.title
                  }
                </h2>

                {/* CASE STUDY */}

                {selectedProject.caseStudy ? (
                  <div>
                    {/* PROBLEM */}

                    <CaseStudySection
                      title="THE PROBLEM"
                    >
                      <p
                        className="project-modal-description"
                        style={{
                          marginTop:
                            0,
                        }}
                      >
                        {
                          selectedProject
                            .caseStudy
                            .problem
                        }
                      </p>
                    </CaseStudySection>

                    {/* WHAT I BUILT */}

                    <CaseStudySection
                      title="WHAT I BUILT"
                    >
                      <p
                        className="project-modal-description"
                        style={{
                          marginTop:
                            0,
                        }}
                      >
                        {
                          selectedProject
                            .caseStudy
                            .whatIBuilt
                        }
                      </p>
                    </CaseStudySection>

                    {/* ROLE */}

                    <CaseStudySection
                      title="MY ROLE"
                    >
                      <div
                        style={{
                          display:
                            "flex",

                          flexWrap:
                            "wrap",

                          gap:
                            "7px",
                        }}
                      >
                        {
                          selectedProject
                            .caseStudy
                            .role
                            .map(
                              (
                                role
                              ) => (
                                <span
                                  key={
                                    role
                                  }
                                  style={{
                                    padding:
                                      "7px 10px",

                                    border:
                                      "1px solid #e2e2df",

                                    borderRadius:
                                      "999px",

                                    background:
                                      "#f7f7f5",

                                    color:
                                      "#4b4b4b",

                                    fontSize:
                                      "9px",

                                    fontWeight:
                                      "550",
                                  }}
                                >
                                  {
                                    role
                                  }
                                </span>
                              )
                            )
                        }
                      </div>
                    </CaseStudySection>

                    {/* TOOLS */}

                    <CaseStudySection
                      title="TOOLS"
                    >
                      <div className="project-modal-tags">
                        {
                          selectedProject
                            .tags
                            .map(
                              (
                                tag
                              ) => (
                                <span
                                  key={
                                    tag
                                  }
                                >
                                  {
                                    tag
                                  }
                                </span>
                              )
                            )
                        }
                      </div>
                    </CaseStudySection>

                    {/* RESULT */}

                    <CaseStudySection
                      title="RESULT"
                    >
                      <p
                        className="project-modal-description"
                        style={{
                          marginTop:
                            0,
                        }}
                      >
                        {
                          selectedProject
                            .caseStudy
                            .result
                        }
                      </p>
                    </CaseStudySection>
                  </div>
                ) : (
                  <>
                    <p className="project-modal-description">
                      {
                        selectedProject.description
                      }
                    </p>

                    <div className="project-modal-tags">
                      {
                        selectedProject
                          .tags
                          .map(
                            (
                              tag
                            ) => (
                              <span
                                key={
                                  tag
                                }
                              >
                                {
                                  tag
                                }
                              </span>
                            )
                          )
                      }
                    </div>
                  </>
                )}

                {/* PROJECT ACTIONS */}

                <div className="project-modal-actions">
                  {
                    selectedProject
                      .actions
                      .map(
                        (
                          action,
                          index
                        ) => (
                          <a
                            key={
                              action.label
                            }
                            href={
                              action.href
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className={
                              index ===
                              0
                                ? "modal-primary-button"
                                : "modal-secondary-button"
                            }
                          >
                            {
                              action.label
                            }

                            <span>
                              ↗
                            </span>
                          </a>
                        )
                      )
                  }
                </div>

                {/* PROJECT COUNTER */}

                <div className="project-modal-counter">
                  <span>
                    {
                      String(
                        activeProject +
                          1
                      ).padStart(
                        2,
                        "0"
                      )
                    }
                  </span>

                  <span className="counter-line"></span>

                  <span>
                    {
                      String(
                        projects.length
                      ).padStart(
                        2,
                        "0"
                      )
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}