export type Profile = {
  name: string;
  role: string;
  location: string;
  summary: string;
  highlights: string[];
  socialLinks: string[];
  resumeUrl?: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
};

export type AdminProject = Omit<Project, 'id'> & {
  id: number;
  slug: string;
  sortOrder: number;
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type AdminSkillGroup = SkillGroup & {
  id: number;
  sortOrder: number;
};

export type Experience = {
  period: string;
  title: string;
  organization: string;
  description: string;
};

export type AdminExperience = Experience & {
  id: number;
  sortOrder: number;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  createdAt: string;
};

export type AdminBlogPost = BlogPost & {
  slug: string;
  published: boolean;
  updatedAt: string;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};
