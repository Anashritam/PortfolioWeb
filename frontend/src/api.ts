import type { AdminBlogPost, AdminExperience, AdminProject, AdminSkillGroup, BlogPost, ContactMessage, Experience, Profile, Project, SkillGroup } from './types';
import { fallbackBlogPosts, fallbackExperience, fallbackProfile, fallbackProjects, fallbackSkills } from './data/fallback';

const getJson = async <T,>(path: string, fallback: T): Promise<T> => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      return fallback;
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  }
};

export const loadPortfolio = async () => {
  const [profile, projects, skills, experience, blogPosts] = await Promise.all([
    getJson<Profile>('/api/profile', fallbackProfile),
    getJson<Project[]>('/api/projects', fallbackProjects),
    getJson<SkillGroup[]>('/api/skills', fallbackSkills),
    getJson<Experience[]>('/api/experience', fallbackExperience),
    getJson<BlogPost[]>('/api/blog', fallbackBlogPosts)
  ]);

  return { profile, projects, skills, experience, blogPosts };
};

export const loadBlogPosts = async () => {
  return getJson<BlogPost[]>('/api/blog', fallbackBlogPosts);
};

export const loadBlogPost = async (slug: string) => {
  const response = await fetch(`/api/blog/${slug}`);
  if (!response.ok) {
    throw new Error('Blog post not found.');
  }
  return response.json() as Promise<BlogPost>;
};

export const sendContactMessage = async (payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Message could not be sent. Please try again.');
  }

  return response.json() as Promise<{ message: string; receivedAt: string }>;
};

// ── Admin API ─────────────────────────────────────────────────────────

const authHeaders = () => {
  const token = localStorage.getItem('portfolio_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const adminLogin = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error('Login failed. Check the admin email and password.');
  }

  return response.json() as Promise<{ token: string; email: string; displayName: string }>;
};

export const loadAdminData = async () => {
  const [projects, messages, skills, experience, blogPosts, profile] = await Promise.all([
    fetch('/api/admin/projects', { headers: authHeaders() }),
    fetch('/api/admin/messages', { headers: authHeaders() }),
    fetch('/api/admin/skills', { headers: authHeaders() }),
    fetch('/api/admin/experience', { headers: authHeaders() }),
    fetch('/api/admin/blog', { headers: authHeaders() }),
    fetch('/api/admin/profile', { headers: authHeaders() })
  ]);

  if (!projects.ok || !messages.ok) {
    throw new Error('Admin session expired. Please sign in again.');
  }

  return {
    projects: (await projects.json()) as AdminProject[],
    messages: (await messages.json()) as ContactMessage[],
    skills: (await skills.json()) as AdminSkillGroup[],
    experience: (await experience.json()) as AdminExperience[],
    blogPosts: (await blogPosts.json()) as AdminBlogPost[],
    profile: (await profile.json()) as Profile
  };
};

// ── Projects ─────────────────────────────────────────────────────────

export const saveProject = async (project: Omit<AdminProject, 'id'>, id?: number) => {
  const response = await fetch(id ? `/api/admin/projects/${id}` : '/api/admin/projects', {
    method: id ? 'PUT' : 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      slug: project.slug,
      title: project.title,
      category: project.category,
      description: project.description,
      techStack: project.techStack,
      image: project.image,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      featured: project.featured,
      sortOrder: project.sortOrder
    })
  });

  if (!response.ok) {
    throw new Error('Project could not be saved.');
  }

  return response.json() as Promise<Project>;
};

export const deleteProject = async (id: number) => {
  const response = await fetch(`/api/admin/projects/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });

  if (!response.ok) {
    throw new Error('Project could not be deleted.');
  }
};

// ── Blog Posts ───────────────────────────────────────────────────────

export const saveBlogPost = async (post: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  published: boolean;
}, id?: number) => {
  const response = await fetch(id ? `/api/admin/blog/${id}` : '/api/admin/blog', {
    method: id ? 'PUT' : 'POST',
    headers: authHeaders(),
    body: JSON.stringify(post)
  });

  if (!response.ok) {
    throw new Error('Blog post could not be saved.');
  }

  return response.json() as Promise<BlogPost>;
};

export const deleteBlogPost = async (id: number) => {
  const response = await fetch(`/api/admin/blog/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });

  if (!response.ok) {
    throw new Error('Blog post could not be deleted.');
  }
};

// ── Skills ───────────────────────────────────────────────────────────

export const saveSkillGroup = async (group: { title: string; skills: string[]; sortOrder: number }, id?: number) => {
  const response = await fetch(id ? `/api/admin/skills/${id}` : '/api/admin/skills', {
    method: id ? 'PUT' : 'POST',
    headers: authHeaders(),
    body: JSON.stringify(group)
  });

  if (!response.ok) {
    throw new Error('Skill group could not be saved.');
  }

  return response.json();
};

export const deleteSkillGroup = async (id: number) => {
  const response = await fetch(`/api/admin/skills/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });

  if (!response.ok) {
    throw new Error('Skill group could not be deleted.');
  }
};

// ── Experience ───────────────────────────────────────────────────────

export const saveExperience = async (exp: {
  period: string;
  title: string;
  organization: string;
  description: string;
  sortOrder: number;
}, id?: number) => {
  const response = await fetch(id ? `/api/admin/experience/${id}` : '/api/admin/experience', {
    method: id ? 'PUT' : 'POST',
    headers: authHeaders(),
    body: JSON.stringify(exp)
  });

  if (!response.ok) {
    throw new Error('Experience could not be saved.');
  }

  return response.json();
};

export const deleteExperience = async (id: number) => {
  const response = await fetch(`/api/admin/experience/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });

  if (!response.ok) {
    throw new Error('Experience could not be deleted.');
  }
};

// ── Profile ──────────────────────────────────────────────────────────

export const saveProfile = async (profile: {
  name: string;
  role: string;
  location: string;
  summary: string;
  highlights: string[];
  socialLinks: string[];
  resumeUrl: string;
}) => {
  const response = await fetch('/api/admin/profile', {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(profile)
  });

  if (!response.ok) {
    throw new Error('Profile could not be saved.');
  }

  return response.json() as Promise<Profile>;
};

// ── Images ───────────────────────────────────────────────────────────

export const uploadProjectImage = async (file: File) => {
  const token = localStorage.getItem('portfolio_admin_token');
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/admin/images', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData
  });

  if (!response.ok) {
    throw new Error('Image could not be uploaded.');
  }

  return response.json() as Promise<{ imageUrl: string; message: string }>;
};

export const markMessageRead = async (id: number) => {
  const response = await fetch(`/api/admin/messages/${id}/read`, {
    method: 'PATCH',
    headers: authHeaders()
  });

  if (!response.ok) {
    throw new Error('Message could not be updated.');
  }
};
