export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  technologies: string[];
  description: string;
  highlights: string[];
  githubUrl: string;
  liveDemoUrl: string;
  accentColor: string;
  date: string;
}

export interface CareerItem {
  id: string;
  number: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  points: string[];
}

export interface AchievementItem {
  id: string;
  number: string;
  title: string;
  issuer: string;
  date: string;
  category: "Certifications" | "Academic" | "AI & Development";
  description: string;
  file?: string | null;
  previewImage: string;
  credentialId?: string | null;
  verifyUrl?: string | null;
}

export const PORTFOLIO_DATA = {
  owner: {
    name: "Eliyas Mulla",
    firstName: "Eliyas",
    lastName: "Mulla",
    eyebrow: "/ Full-Stack Developer | AI-Integrated Web Applications",
    tagline: {
      primary: "Building AI-integrated applications",
      secondary: "from Pune, India",
    },
    ctaLabel: "Get in touch",
    contact: {
      email: "eliyasmulla79@gmail.com",
      phone: "+91-9022318711",
      github: "https://github.com/EliyasXCode",
      linkedin: "https://www.linkedin.com/in/eliyas-mulla-4a8449257/",
      location: "Pune, Maharashtra, India",
    },
    hud: {
      statusWords: ["BUILDING", "LEARNING", "SHIPPING", "EXPLORING"],
      codingSinceYear: "2022",
      locationLabel: "Pune / GMT+5:30",
      timeZone: "Asia/Kolkata",
      statusBadge: "Open to SDE & Full-Stack Roles",
    },
    summary:
      "Full Stack Developer with a B. Tech in Computer Engineering (CGPA 9.0) and hands-on experience building and deploying production-grade web applications across the MERN stack, Next.js, and Python/Django. Delivered end-to-end projects integrating REST APIs, JWT authentication, relational and NoSQL databases, and Generative AI (Google Gemini API) capabilities, alongside a full stack development internship at Labmentix Private Limited.",
  },

  nav: {
    wordmark: {
      logoText: "EM",
      alt: "Eliyas Mulla",
      homeAriaLabel: "Home",
    },
    links: [
      { label: "Career", href: "/about#career", side: "left" },
      { label: "About", href: "/about", side: "left" },
      { label: "Projects", href: "/projects", side: "right" },
      { label: "Certificates", href: "/certificates", side: "right" },
    ],
  },

  education: [
    {
      number: "01",
      degree: "Bachelor of Technology in Computer Engineering",
      institution: "Bharati Vidyapeeth (Deemed to be) University, Pune",
      period: "06/2022 – 07/2026",
      score: "CGPA: 9.0 / 10.0",
      description:
        "Rigorous coursework covering Data Structures & Algorithms, Operating Systems, Computer Networks, Database Management Systems, System Design, and Modern Software Engineering methodologies.",
    },
  ],

  skills: {
    languages: ["Java", "JavaScript", "Python", "SQL", "TypeScript", "HTML5", "CSS3"],
    frontend: ["React.js", "Next.js", "Tailwind CSS", "SCSS", "Framer Motion", "GSAP"],
    backend: ["Node.js", "Express.js", "Django", "REST APIs", "JWT Authentication"],
    aiGenAi: ["Google Gemini API", "LLM Integration", "Zod Schema Validation", "VAPI Integration"],
    databases: ["MongoDB (Mongoose)", "MySQL", "PostgreSQL"],
    deployment: ["Vercel", "Render", "Netlify", "Docker", "GitHub Actions (CI/CD)"],
    tools: ["Git", "GitHub", "VS Code", "Postman", "Linux/Bash"],
    coreConcepts: ["OOP", "DBMS", "Operating Systems", "Computer Networks", "System Design Basics"],
  },

  career: [
    {
      id: "labmentix",
      number: "01",
      company: "Labmentix Private Limited",
      role: "Full Stack Web Development Intern",
      period: "Aug 2025 – Oct 2025",
      location: "Pune, India",
      type: "Internship",
      description:
        "Contributed to 100% on-time sprint delivery for customer-facing web applications and back-end integration.",
      points: [
        "Built and optimized responsive UI modules using HTML5, SCSS, and JavaScript, ensuring consistent usability across mobile, tablet, and desktop breakpoints.",
        "Designed and implemented RESTful APIs integrating front-end interfaces with back-end services (Python/Django, SQL), streamlining data flow and cutting redundant API calls across application layers.",
        "Collaborated in Agile sprint cycles with a cross-functional team, debugging and deploying scalable web solutions that contributed to 100% on-time delivery of all assigned sprint goals.",
        "Incorporated senior-developer code review feedback on API design and Django/SQL best practices, improving code quality and consistency across modules.",
      ],
    },
    {
      id: "independent-ai",
      number: "02",
      company: "Independent Full Stack & AI Builder",
      role: "Full Stack Engineer & AI Systems Developer",
      period: "2023 – Present",
      location: "Pune, India",
      type: "Projects & Production Deployment",
      description:
        "Architecting production-grade MERN, Next.js, and GenAI applications with CI/CD deployment pipelines.",
      points: [
        "Delivered three end-to-end applications integrating Gemini AI, VAPI voice chat, JWT auth, and automated document generation.",
        "Configured automated CI/CD pipelines via GitHub Actions and deployed containerized apps using Docker, Vercel, and Render.",
        "Engineered layered state management architectures with custom React hooks and Context API for optimal re-render efficiency.",
      ],
    },
  ] as CareerItem[],

  projects: [
    {
      id: "nexus-ai-os",
      number: "01",
      title: "NEXUS AI OS",
      subtitle: "Autonomous Multi-Agent Workspace & Neural Orchestrator",
      category: "Next.js + Multi-Agent AI",
      technologies: ["Next.js", "React", "TypeScript", "Multi-Agent AI", "Tailwind CSS", "Vercel"],
      description:
        "Autonomous multi-agent workspace engineered for parallel task delegation, neural workflow orchestration, and generative intelligence pipelines.",
      highlights: [
        "Orchestrates autonomous multi-agent pipelines with dedicated context memory, task decomposition, and execution monitoring.",
        "Real-time reactive streaming interface with custom workspace layouts, terminal panes, and telemetry logs.",
        "Interactive dark mode developer HUD interface optimized for running complex multi-step generative tasks.",
      ],
      githubUrl: "https://github.com/EliyasXCode",
      liveDemoUrl: "https://nexus-ai-os-r1v2.vercel.app/",
      accentColor: "#38bdf8",
      date: "2026",
    },
    {
      id: "ai-travel-planner",
      number: "02",
      title: "Explore Earth — AI Travel Planner",
      subtitle: "3D Interactive Travel Engine & Global Itinerary Generator",
      category: "AI & 3D Interactive Web App",
      technologies: ["React", "Vite", "Three.js / 3D Globe", "Google Gemini AI", "Tailwind CSS", "Vercel"],
      description:
        "Immersive 3D interactive global travel engine. Discover world-iconic destinations with 360° panoramas, AI itinerary planner, and real-time weather & currency tools.",
      highlights: [
        "Built interactive 3D global destination explorer with high-performance WebGL rendering.",
        "Integrated AI itinerary planner generating day-by-day customized travel schedules and packing recommendations.",
        "Real-time currency converter, live weather data integration, and interactive destination cards.",
      ],
      githubUrl: "https://github.com/EliyasXCode",
      liveDemoUrl: "https://ai-travel-planner-five-lemon.vercel.app/",
      accentColor: "#06b6d4",
      date: "2025",
    },
    {
      id: "gen-ai-interview-platform",
      number: "03",
      title: "Gen-AI Interview Platform",
      subtitle: "Full-Stack AI Interview Preparation & Scoring System",
      category: "MERN + Google Gemini AI",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Google Gemini API", "Zod", "Puppeteer", "JWT"],
      description:
        "Full-stack AI interview-preparation platform supporting resume upload, AI-driven job-match scoring, live mock interviews, and skill-gap analysis.",
      highlights: [
        "Engineered JWT authentication and layered React architecture (UI, custom hooks, Context state, API services), cutting component re-renders.",
        "Integrated Google Gemini API with Zod schema validation to generate structured, personalized interview questions.",
        "Engineered automated PDF interview reports via Puppeteer, eliminating manual report creation overhead.",
        "MongoDB schema indexing optimized for rapid user session and question history retrieval.",
      ],
      githubUrl: "https://github.com/EliyasXCode",
      liveDemoUrl: "https://interview-prep-chi-tawny.vercel.app/",
      accentColor: "#3b82f6",
      date: "May 2026",
    },
    {
      id: "job-portal",
      number: "04",
      title: "PrepJobs — Job Portal & Prep Hub",
      subtitle: "All-in-One Career Discovery & Interview Preparation Hub",
      category: "Full Stack Career Platform",
      technologies: ["JavaScript", "CSS3 / Dark UI", "REST APIs", "FontAwesome", "Vercel"],
      description:
        "Comprehensive career portal and preparation hub equipped with a curated job board, company interview archives, interactive DSA sheets, and placement dashboards.",
      highlights: [
        "Curated job board with advanced multi-filter search (location, role, tech stack, experience level).",
        "Interactive DSA preparation sheet tracking completed coding problems and topic-wise mastery.",
        "Company-specific interview guides, compensation breakdowns, and recruitment trends.",
      ],
      githubUrl: "https://github.com/EliyasXCode",
      liveDemoUrl: "https://job-portal-pearl-eta.vercel.app/",
      accentColor: "#f59e0b",
      date: "2025",
    },
    {
      id: "vivaha-verse-ai",
      number: "05",
      title: "VivahaVerse AI",
      subtitle: "Intelligent Destination Wedding Planner for India",
      category: "Generative AI + Wedding Tech",
      technologies: ["React", "TypeScript", "Generative AI", "Tailwind CSS", "Vercel"],
      description:
        "Intelligent destination wedding planner discovering India's most extraordinary wedding destinations, calculating celebration costs, and using AI to design luxury personalized wedding experiences.",
      highlights: [
        "AI-powered luxury wedding experience designer personalized to family traditions, guest counts, and seasonal preferences.",
        "Interactive destination discovery engine showcasing premier Indian heritage palaces, beachfronts, and hill stations.",
        "Comprehensive celebration cost calculator forecasting venue, decor, hospitality, and vendor expenses.",
      ],
      githubUrl: "https://github.com/EliyasXCode",
      liveDemoUrl: "https://vivaha-verse-ai-panner.vercel.app/",
      accentColor: "#f43f5e",
      date: "2025",
    },
    {
      id: "rideflow-mobility",
      number: "06",
      title: "RideFlow — Urban Mobility & Ride Booking",
      subtitle: "Next-Gen Ride Hailing Platform with 4-Digit PIN Security",
      category: "Full Stack Mobility + Next.js",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST APIs", "Vercel"],
      description:
        "Full-featured urban mobility and ride-hailing web platform featuring upfront locked fare estimates, multi-tier vehicle selection, driver dispatch simulations, and 4-digit ride safety verification PINs.",
      highlights: [
        "Upfront locked pricing engine calculating dynamic fare estimates across Economy, Comfort, and XL vehicle classes.",
        "Guaranteed trip safety with unique 4-digit PIN verification required to initiate rides between drivers and passengers.",
        "Integrated RideFlow AI Assistant widget providing real-time assistance, safety tips, and booking guidance.",
        "Dedicated driver onboarding and portal with fare splits, document verification, and vehicle requirements.",
      ],
      githubUrl: "https://github.com/EliyasXCode/Ride-it-",
      liveDemoUrl: "https://ride-it-api-ten.vercel.app/",
      accentColor: "#10b981",
      date: "2026",
    },
    {
      id: "aesthetic-room-portfolio",
      number: "07",
      title: "Aesthetic 3D Room Experience",
      subtitle: "Interactive Isometric Corridor & Hand-Crafted WebGL Spatial Canvas",
      category: "Creative Dev · 3D WebGL & Shaders",
      technologies: ["React", "Three.js", "React Three Fiber", "GLSL Shaders", "GSAP", "Tailwind CSS", "Vercel"],
      description:
        "An artistic creative frontend showcase exploring an interactive hand-drawn isometric room and dimensional corridor without relying on heavy 3D models. Blending tactile pencil-sketch textures, custom GPU fragment shaders, and dynamic camera choreography to turn portfolio browsing into a living spatial art experience.",
      highlights: [
        "Constructed an interactive 3D spatial room and corridor leveraging procedural geometry, isometric depth, and React Three Fiber rendering.",
        "Authored custom GLSL fragment and vertex shaders simulating paper grain, real-time pencil-sketch hatching, and dynamic paint-reveal highlights on mouse movement.",
        "Orchestrated cinematic camera transitions and interactive room hotspots with GSAP ScrollTrigger and smooth inertia-based spatial exploration.",
        "Maintained silky 60fps frame rates across desktop and mobile by replacing heavy polygon meshes with lightweight textured geometry and custom GLSL math.",
      ],
      githubUrl: "https://github.com/EliyasXCode/Asthetic-portfolio",
      liveDemoUrl: "https://asthetic-portfolio-three.vercel.app/",
      accentColor: "#f59e0b",
      date: "2026",
    },
    {
      id: "tableaura-restaurant-booking",
      number: "08",
      title: "TableAura — Luxury Dining & Table Booking",
      subtitle: "Real-Time Seating Engine with 2D Floor Plans & AI Concierge",
      category: "Full Stack Next.js & Hospitality Tech",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Razorpay API", "AI Concierge", "Vercel"],
      description:
        "Luxury restaurant discovery and table reservation platform curating India's finest rooftop lounges, heritage havelis, and fine-dining sanctuaries. Engineered with atomic real-time table holds, interactive 2D seating floor plans, preorder gastronomy, and an intelligent AI Dining Concierge.",
      highlights: [
        "Architected atomic real-time table locking with 5-minute checkout countdowns, eliminating double-booking concurrency conflicts across peak dining hours.",
        "Engineered interactive 2D restaurant floor plans allowing patrons to select exact tables, booths, and skyline window seats.",
        "Integrated AI Dining Concierge providing contextual dining recommendations, dietary guidance (Jain, Satvik, Vegan), and ambience curation.",
        "Integrated Razorpay payment gateway sandbox for deposit settlement alongside automated encrypted QR booking passes for instant host check-in.",
        "Built multi-role portal architecture supporting fine-grained workflows across Diner Dashboards, Restaurant Managers, and Platform Admins.",
      ],
      githubUrl: "https://github.com/EliyasXCode/Restaurant-Booking",
      liveDemoUrl: "https://restaurant-booking-seven-puce.vercel.app/",
      accentColor: "#d97706",
      date: "2026",
    },
    {
      id: "ai-voice-assistant",
      number: "09",
      title: "AI Voice Assistant Web App",
      subtitle: "Low-Latency Conversational Voice Agent",
      category: "Next.js + AI Voice",
      technologies: ["Next.js", "React", "Tailwind CSS", "Clerk", "VAPI", "Resend API"],
      description:
        "Interactive real-time voice assistant web app delivering low-latency conversational AI interaction, speech-to-speech feedback, and instant email delivery.",
      highlights: [
        "Built an interactive AI voice assistant using Next.js, React, and Tailwind CSS with Clerk authentication, enabling secure user access.",
        "Implemented real-time voice chat via custom VAPI integration, enabling low-latency, natural AI interaction.",
        "Integrated the Resend API for instant email feedback without a backing database, simplifying the notification pipeline and reducing infrastructure overhead.",
        "Mobile-first responsive interface with visual voice-wave animations during active audio sessions.",
      ],
      githubUrl: "https://github.com/EliyasXCode",
      liveDemoUrl: "https://github.com/EliyasXCode",
      accentColor: "#3b82f6",
      date: "Sep 2025",
    },
  ] as ProjectItem[],

  achievements: [
    {
      id: "ux-ui",
      number: "01",
      title: "Principles of UX/UI Design",
      issuer: "Meta / Coursera",
      date: "November 2024",
      category: "Certifications",
      description:
        "Certified in core UX/UI design principles including user research, wireframing, prototyping, visual hierarchy, accessibility standards, and responsive design systems.",
      file: "/certificates/Principles of UX_UI Design (1).pdf",
      previewImage: "/certificates/Principles of UX_UI Design (1)-preview.jpg",
      credentialId: "O4EW662PVLVB",
      verifyUrl: "https://coursera.org/verify/O4EW662PVLVB",
    },
    {
      id: "ibm-python",
      number: "02",
      title: "Python for Web Development",
      issuer: "IBM — CEPYTIIN / IT Vedant",
      date: "June 2024",
      category: "Certifications",
      description:
        "IBM professional certification covering server-side Python, RESTful API architecture, Django web framework, database connectivity, and deployment best practices.",
      file: "/certificates/IBM  (2).pdf",
      previewImage: "/certificates/IBM  (2)-preview.jpg",
      credentialId: "33bd41821d4146b0938fb8bdc506667c",
      verifyUrl: "https://courses.itvedant.skillsnetwork.site/certificates/33bd41821d4146b0938fb8bdc506667c#",
    },
    {
      id: "claude-101",
      number: "03",
      title: "Claude 101",
      issuer: "Anthropic Education",
      date: "2026",
      category: "AI & Development",
      description:
        "Foundational certification in large language model architectures, effective prompting techniques, AI safety mechanisms, and responsible AI usage principles.",
      file: "/certificates/certificate-6s59ru85k988-1785222468 (1).pdf",
      previewImage: "/certificates/certificate-6s59ru85k988-1785222468 (1)-preview.jpg",
      credentialId: "6s59ru85k988",
      verifyUrl: null,
    },
    {
      id: "claude-code-101",
      number: "04",
      title: "Claude Code 101",
      issuer: "Anthropic Education",
      date: "2026",
      category: "AI & Development",
      description:
        "Advanced LLM application development certification covering code generation pipelines, agentic workflows, automated reasoning, and Claude API integration patterns.",
      file: "/certificates/certificate-ysx2ufkn3ksr-1787629990.pdf",
      previewImage: "/certificates/certificate-ysx2ufkn3ksr-1787629990-preview.jpg",
      credentialId: "ysx2ufkn3ksr",
      verifyUrl: null,
    },
    {
      id: "sql-essentials",
      number: "05",
      title: "SQL Essentials — Bonus Lessons",
      issuer: "I.T. Vedant",
      date: "July 2024",
      category: "Certifications",
      description:
        "Certification of completion in SQL Essentials including advanced query writing, database design, joins, indexing, and performance optimization techniques.",
      file: "/certificates/Sql Essential (1).jpg",
      previewImage: "/certificates/Sql Essential (1).jpg",
      credentialId: "ITV66f2357fc5435",
      verifyUrl: null,
    },
    {
      id: "web-designing",
      number: "06",
      title: "Web Designing Basics",
      issuer: "I.T. Vedant",
      date: "September 2024",
      category: "Certifications",
      description:
        "Certification in web design fundamentals including HTML5, CSS3, layout design, colour theory, typography, and responsive design principles.",
      file: "/certificates/Web Design (1).jpg",
      previewImage: "/certificates/Web Design (1).jpg",
      credentialId: "ITV66f2353bc7e09",
      verifyUrl: null,
    },
    {
      id: "computer-networking",
      number: "07",
      title: "Computer Networking",
      issuer: "Illinois Tech / Coursera",
      date: "February 2024",
      category: "Certifications",
      description:
        "Certified in computer networking fundamentals including TCP/IP, OSI model, routing, switching, subnetting, DNS, HTTP/HTTPS protocols, and network security basics.",
      file: "/certificates/Computer Networking (2).pdf",
      previewImage: "/certificates/Computer Networking (2)-preview.jpg",
      credentialId: "RLCHUUDXS8TW",
      verifyUrl: "https://coursera.org/verify/RLCHUUDXS8TW",
    },
    {
      id: "academic-excellence",
      number: "08",
      title: "Academic Excellence — CGPA 9.0",
      issuer: "Bharati Vidyapeeth University",
      date: "2022 – 2026",
      category: "Academic",
      description:
        "Achieved 9.0 Cumulative Grade Point Average in B.Tech Computer Engineering, demonstrating consistent excellence in software development, data structures, algorithms, and AI systems.",
      file: null,
      previewImage: "/certificates/academic-excellence-preview.jpg",
      credentialId: "CGPA 9.0/10",
      verifyUrl: null,
    },
  ] as AchievementItem[],
};
