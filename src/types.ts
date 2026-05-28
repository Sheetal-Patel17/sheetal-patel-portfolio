export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  tech: string[];
  img: string;
  github?: string;
  demo?: string;
  category: string;
}

export interface Skill {
  name: string;
  level: number;
  category: "Frontend" | "Backend" | "Programming" | "Database" | "AI & Data" | "Tools";
  iconName: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  period: string;
  type: "education" | "project" | "achievement" | "learning";
  description: string[];
  tags: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  badge: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  text: string;
  rating: number;
}