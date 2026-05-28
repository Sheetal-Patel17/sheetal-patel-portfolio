import { Project, Skill, Experience, Certification, Testimonial } from "./types";

export const projectsData: Project[] = [
  {
    id: "customer-behavior",
    title: "Customer Behavior Analysis",
    subtitle: "Data Analytics · Business Intelligence",
    description:
      "A data analytics project focused on analyzing customer shopping behavior using real-world datasets. The system performs customer segmentation, purchasing trend analysis, and business insights generation for better decision-making.",
    features: [
      "Customer purchase analysis & segmentation",
      "Interactive data visualization dashboards",
      "Trend and pattern detection algorithms",
      "PostgreSQL database integration",
      "Actionable business insight generation",
    ],
    tech: ["Python", "Pandas", "PostgreSQL", "Matplotlib", "Seaborn"],
    img: "/assets/proj_customer.png",
    category: "Data Science",
    github: "https://github.com/Sheetal-Patel17",
    demo: "#",
  },
  {
    id: "road-accident-prediction",
    title: "Road Accident Prediction",
    subtitle: "Machine Learning · Risk Analysis System",
    description:
      "A machine learning project designed to predict road accident risks and analyze accident patterns using historical datasets. The system identifies high-risk conditions and supports preventive decision-making.",
    features: [
      "Accident risk prediction model",
      "Data preprocessing & cleaning pipeline",
      "ML model training & evaluation",
      "Risk factor identification & ranking",
      "Visualization of accident trends & hotspots",
    ],
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    img: "/assets/proj_road.png",
    category: "Machine Learning",
    github: "https://github.com/Sheetal-Patel17",
    demo: "#",
  },
  {
    id: "rs-curve-atelier",
    title: "RS Curve Atelier",
    subtitle: "Fashion Tech · Full-Stack Platform",
    description:
      "An ongoing fashion-tech platform inspired by traditional tailoring businesses. The platform modernizes custom stitching services by allowing users to explore clothing designs, tailoring services, and personalized fashion experiences digitally.",
    features: [
      "Modern fashion showcase & catalog",
      "Tailoring service booking platform",
      "Responsive & accessible UI/UX",
      "Dynamic product sections & filtering",
      "Digital custom clothing experience",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    img: "/assets/proj_rscurve.png",
    category: "Full Stack",
    github: "https://github.com/Sheetal-Patel17",
    demo: "#",
  },
];

export const skillsData: Skill[] = [
  // Frontend
  { name: "React.js", level: 85, category: "Frontend", iconName: "⚛️" },
  { name: "HTML5", level: 92, category: "Frontend", iconName: "🌐" },
  { name: "CSS3", level: 88, category: "Frontend", iconName: "🎨" },
  { name: "JavaScript", level: 85, category: "Frontend", iconName: "JS" },
  { name: "TypeScript", level: 75, category: "Frontend", iconName: "TS" },
  { name: "Tailwind CSS", level: 88, category: "Frontend", iconName: "💨" },
  // Backend
  { name: "Node.js", level: 78, category: "Backend", iconName: "🟢" },
  { name: "Express.js", level: 76, category: "Backend", iconName: "⚡" },
  { name: "PHP", level: 70, category: "Backend", iconName: "🐘" },
  { name: "Java", level: 80, category: "Backend", iconName: "☕" },
  // Programming
  { name: "Python", level: 90, category: "Programming", iconName: "🐍" },
  { name: "C", level: 82, category: "Programming", iconName: "©️" },
  { name: "C++", level: 80, category: "Programming", iconName: "⊕" },
  { name: "DSA", level: 78, category: "Programming", iconName: "🧮" },
  // Database
  { name: "SQL", level: 85, category: "Database", iconName: "🗄️" },
  { name: "MongoDB", level: 75, category: "Database", iconName: "🍃" },
  // AI & Data
  { name: "Machine Learning", level: 72, category: "AI & Data", iconName: "🤖" },
  { name: "Data Analysis", level: 80, category: "AI & Data", iconName: "📊" },
  { name: "Pandas", level: 85, category: "AI & Data", iconName: "🐼" },
  { name: "NumPy", level: 82, category: "AI & Data", iconName: "🔢" },
  // Tools
  { name: "Git", level: 88, category: "Tools", iconName: "🌿" },
  { name: "GitHub", level: 87, category: "Tools", iconName: "🐙" },
  { name: "VS Code", level: 95, category: "Tools", iconName: "💻" },
];

export const experienceData: Experience[] = [
  {
    id: "edu-1",
    title: "B.Tech in Information Technology",
    organization: "Marwadi University",
    period: "2023 – 2027",
    type: "education",
    description: [
      "Currently in 7th Semester with a strong foundation in programming, data structures, and software engineering.",
      "Studying core IT subjects including DBMS, OS, Computer Networks, and Web Technologies.",
      "Active member of the university's coding and innovation clubs.",
    ],
    tags: ["B.Tech IT", "Marwadi University", "Rajkot, Gujarat"],
  },
  {
    id: "proj-1",
    title: "Full-Stack Project Development",
    organization: "Self-Initiated",
    period: "2024 – Present",
    type: "project",
    description: [
      "Built multiple real-world projects including a fashion-tech platform (RS Curve Atelier) using React.js, Node.js, and MongoDB.",
      "Designed and deployed data analytics systems for customer behavior and road accident prediction.",
      "Focused on clean architecture, responsive design, and user-centric experiences.",
    ],
    tags: ["React", "Node.js", "Python", "MongoDB"],
  },
  {
    id: "learn-1",
    title: "AI & Data Science Exploration",
    organization: "Self-Learning",
    period: "2024 – Present",
    type: "learning",
    description: [
      "Actively learning machine learning algorithms, data preprocessing, and model training using Python.",
      "Practicing with real datasets from Kaggle and building end-to-end ML pipelines.",
      "Exploring libraries: Pandas, NumPy, Scikit-learn, and Matplotlib.",
    ],
    tags: ["Machine Learning", "Python", "Scikit-learn", "Pandas"],
  },
  {
    id: "hack-1",
    title: "Hackathon Participation",
    organization: "Multiple Events",
    period: "2024 – 2025",
    type: "achievement",
    description: [
      "Participated in TATA Crucible Campus Quiz 2025, competing with top university students nationally.",
      "Engaged in multiple coding contests and hackathons, building rapid prototypes under time pressure.",
      "Collaborated in team environments to deliver complete solutions within 24–48 hours.",
    ],
    tags: ["TATA Crucible 2025", "Team Collaboration", "Rapid Prototyping"],
  },
  {
    id: "learn-2",
    title: "DevOps & Cloud Computing Exploration",
    organization: "Self-Learning",
    period: "2025 – Present",
    type: "learning",
    description: [
      "Exploring Docker, CI/CD pipelines, and cloud deployment strategies.",
      "Learning AWS and Google Cloud fundamentals for scalable application deployment.",
      "Understanding containerization and modern DevOps workflows.",
    ],
    tags: ["Docker", "AWS", "CI/CD", "Cloud"],
  },
  {
    id: "learn-3",
    title: "Competitive Programming Practice",
    organization: "HackerRank · LeetCode",
    period: "2023 – Present",
    type: "learning",
    description: [
      "Consistently practicing DSA problems on HackerRank and LeetCode.",
      "Earned certifications in Problem Solving and Python on HackerRank.",
      "Improving algorithmic thinking and time complexity optimization skills.",
    ],
    tags: ["DSA", "HackerRank", "LeetCode", "Algorithms"],
  },
];

export const certificationsData: Certification[] = [
  {
    id: "cert-1",
    title: "TATA Crucible Campus Quiz 2025",
    issuer: "TATA Group",
    year: "2025",
    badge: "🏆",
    color: "from-yellow-500/20 to-amber-500/10",
  },
  {
    id: "cert-2",
    title: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    year: "2024",
    badge: "⚡",
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "cert-3",
    title: "Python Coder Certification",
    issuer: "HackerRank",
    year: "2024",
    badge: "🐍",
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    id: "cert-4",
    title: "Master React Workshop",
    issuer: "Online Learning",
    year: "2024",
    badge: "⚛️",
    color: "from-violet-500/20 to-purple-500/10",
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: "t-1",
    name: "Prof. Rajesh Sharma",
    role: "Faculty Mentor",
    organization: "Marwadi University",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    text: "Sheetal demonstrates exceptional dedication to learning and problem-solving. Her project work consistently shows mature thinking beyond her academic year. She combines technical precision with a genuine creative instinct.",
    rating: 5,
  },
  {
    id: "t-2",
    name: "Priya Mehta",
    role: "Senior Developer",
    organization: "Tech Startup, Ahmedabad",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    text: "Working with Sheetal on our hackathon team was a pleasure. She brings both technical skills and creative design sensibility. Her ability to rapidly prototype full-stack solutions under pressure is truly impressive.",
    rating: 5,
  },
  {
    id: "t-3",
    name: "Dr. Ankit Patel",
    role: "AI Research Lead",
    organization: "Gujarat Tech Forum",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    text: "Sheetal's data analytics projects show a solid understanding of real-world ML workflows. Her customer behavior analysis demonstrated strong command over data preprocessing and meaningful visualization—rare for a student at her level.",
    rating: 5,
  },
];