import type { BlogPost, Experience, Profile, Project, SkillGroup } from '../types';

export const fallbackProfile: Profile = {
  name: 'Your Name',
  role: 'Java Full-Stack Developer',
  location: 'India',
  summary:
    'I build reliable Spring Boot APIs and sharp, responsive web experiences that turn ideas into usable products.',
  highlights: ['Spring Boot REST APIs', 'React interfaces', 'Clean database design', 'Production-minded problem solving'],
  socialLinks: ['GitHub', 'LinkedIn', 'Email']
};

export const fallbackProjects: Project[] = [
  {
    id: 'career-canvas',
    title: 'Career Canvas',
    category: 'Full Stack',
    description: 'A career dashboard that tracks applications, notes, interview stages, and follow-up reminders.',
    techStack: ['Spring Boot', 'React', 'PostgreSQL', 'JWT'],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/',
    liveUrl: 'https://example.com',
    featured: true
  },
  {
    id: 'taskflow-api',
    title: 'TaskFlow API',
    category: 'Backend',
    description: 'A secure task management API with validation, layered architecture, and clean error responses.',
    techStack: ['Java', 'Spring Boot', 'JPA', 'Swagger'],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/',
    liveUrl: 'https://example.com',
    featured: true
  },
  {
    id: 'folio-motion',
    title: 'Folio Motion',
    category: 'Frontend',
    description: 'A visual portfolio concept with animated sections, project filters, and responsive layouts.',
    techStack: ['React', 'TypeScript', 'CSS', 'Vite'],
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/',
    liveUrl: 'https://example.com',
    featured: false
  }
];

export const fallbackSkills: SkillGroup[] = [
  { title: 'Backend', skills: ['Java', 'Spring Boot', 'REST APIs', 'JPA', 'Validation'] },
  { title: 'Frontend', skills: ['React', 'TypeScript', 'HTML', 'CSS', 'Responsive UI'] },
  { title: 'Database & Tools', skills: ['PostgreSQL', 'MySQL', 'Git', 'Maven', 'Postman'] }
];

export const fallbackExperience: Experience[] = [
  {
    period: '2026',
    title: 'Portfolio Platform',
    organization: 'Personal Project',
    description: 'Designed a full-stack portfolio foundation with API-driven content and a refined frontend.'
  },
  {
    period: '2025',
    title: 'Java Development',
    organization: 'Learning Track',
    description: 'Focused on Spring Boot, REST architecture, database modeling, and frontend integration.'
  }
];

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: 'getting-started-with-spring-boot',
    title: 'Getting Started with Spring Boot',
    excerpt: 'A beginner-friendly walkthrough of building your first REST API with Spring Boot, from project setup to deployment.',
    content: 'Spring Boot makes it incredibly easy to create stand-alone, production-grade Spring-based applications.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Java', 'Spring Boot', 'REST API', 'Backend'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'react-typescript-best-practices',
    title: 'React + TypeScript Best Practices',
    excerpt: 'Lessons learned from building real React applications with TypeScript — type safety, component patterns, and avoiding common pitfalls.',
    content: 'TypeScript brings type safety to React development, catching bugs at compile time rather than runtime.',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'TypeScript', 'Frontend'],
    createdAt: new Date().toISOString()
  }
];
