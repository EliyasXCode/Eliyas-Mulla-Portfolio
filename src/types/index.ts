export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  role: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  highlights: string[];
  challenge: string;
  solution: string;
  architectureDiagram?: {
    nodes: string[];
    description: string;
  };
  results: string[];
  githubUrl: string;
  liveDemoUrl: string;
  gradient: string;
  accentColor: string;
  visualType: 'rental' | 'dapp' | 'safety' | 'voice';
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'ai' | 'tool' | 'core';
  description: string;
  useCase: string;
  proficiency: number;
  relatedProjects: string[];
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface TimelineEntry {
  year: string;
  role: string;
  period: string;
  company: string;
  description: string;
  technologies: string[];
  milestones: string[];
}

export interface PhilosophyPrinciple {
  number: string;
  title: string;
  heading: string;
  description: string;
}

export interface ArchitectureLayer {
  id: string;
  title: string;
  subtitle: string;
  tech: string[];
  icon: string;
  details: string;
}

export type CursorContext = 'default' | 'view' | 'open' | 'explore' | 'drag' | 'build';
