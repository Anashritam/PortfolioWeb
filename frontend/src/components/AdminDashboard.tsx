import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Check, LogIn, LogOut, Plus, Save, Trash2 } from 'lucide-react';
import {
  adminLogin,
  deleteBlogPost,
  deleteExperience,
  deleteProject,
  deleteSkillGroup,
  loadAdminData,
  markMessageRead,
  saveBlogPost,
  saveExperience,
  saveProfile,
  saveProject,
  saveSkillGroup,
  uploadProjectImage
} from '../api';
import type { AdminBlogPost, AdminExperience, AdminProject, AdminSkillGroup, ContactMessage, Profile } from '../types';

type Tab = 'profile' | 'projects' | 'blog' | 'skills' | 'experience' | 'messages';

const tabs: { key: Tab; label: string }[] = [
  { key: 'profile', label: 'Profile' },
  { key: 'projects', label: 'Projects' },
  { key: 'blog', label: 'Blog' },
  { key: 'skills', label: 'Skills' },
  { key: 'experience', label: 'Experience' },
  { key: 'messages', label: 'Messages' }
];

const emptyProject: Omit<AdminProject, 'id'> = {
  slug: '', title: '', category: 'Full Stack', description: '', techStack: [],
  image: '', githubUrl: '', liveUrl: '', featured: false, sortOrder: 0
};

const emptyBlogPost = {
  slug: '', title: '', excerpt: '', content: '', coverImage: '',
  tags: [] as string[], published: false
};

const emptySkillGroup = { title: '', skills: [] as string[], sortOrder: 0 };

const emptyExperience = { period: '', title: '', organization: '', description: '', sortOrder: 0 };

const emptyProfile: Profile & { resumeUrl: string } = {
  name: '', role: '', location: '', summary: '',
  highlights: [], socialLinks: [], resumeUrl: ''
};

export function AdminDashboard() {
  const [token, setToken] = useState(localStorage.getItem('portfolio_admin_token') || '');
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [status, setStatus] = useState('');

  // Data
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [skills, setSkills] = useState<AdminSkillGroup[]>([]);
  const [experience, setExperience] = useState<AdminExperience[]>([]);
  const [blogPosts, setBlogPosts] = useState<AdminBlogPost[]>([]);
  const [profileData, setProfileData] = useState<Profile & { resumeUrl: string }>(emptyProfile);

  // Edit state
  const [editingProjectId, setEditingProjectId] = useState<number | undefined>();
  const [projectDraft, setProjectDraft] = useState<Omit<AdminProject, 'id'>>(emptyProject);
  const [editingBlogId, setEditingBlogId] = useState<number | undefined>();
  const [blogDraft, setBlogDraft] = useState(emptyBlogPost);
  const [editingSkillId, setEditingSkillId] = useState<number | undefined>();
  const [skillDraft, setSkillDraft] = useState(emptySkillGroup);
  const [editingExpId, setEditingExpId] = useState<number | undefined>();
  const [expDraft, setExpDraft] = useState(emptyExperience);

  const isLoggedIn = Boolean(token);
  const unreadCount = useMemo(() => messages.filter((m) => !m.read).length, [messages]);

  const refresh = async () => {
    const data = await loadAdminData();
    setProjects(data.projects);
    setMessages(data.messages);
    setSkills(data.skills);
    setExperience(data.experience);
    setBlogPosts(data.blogPosts);
    setProfileData({ ...data.profile, resumeUrl: (data.profile as Profile & { resumeUrl?: string }).resumeUrl || '' });
  };

  useEffect(() => {
    if (isLoggedIn) {
      refresh().catch((e) => setStatus(e instanceof Error ? e.message : 'Could not load admin data.'));
    }
  }, [isLoggedIn]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    try {
      const res = await adminLogin(String(fd.get('email')), String(fd.get('password')));
      localStorage.setItem('portfolio_admin_token', res.token);
      setToken(res.token);
      setStatus(`Welcome, ${res.displayName}.`);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'Login failed.');
    }
  };

  const logout = () => {
    localStorage.removeItem('portfolio_admin_token');
    setToken('');
    setProjects([]);
    setMessages([]);
    setSkills([]);
    setExperience([]);
    setBlogPosts([]);
  };

  // ── Login Screen ─────────────────────────────────────────────────

  if (!isLoggedIn) {
    return (
      <main className="admin-shell">
        <section className="admin-login">
          <h1>Admin Login</h1>
          <p>Use the seeded development account, then replace it before deployment.</p>
          <form className="contact-form" onSubmit={handleLogin}>
            <label>
              Email
              <input name="email" type="email" defaultValue="admin@portfolio.local" required />
            </label>
            <label>
              Password
              <input name="password" type="password" defaultValue="admin123" required />
            </label>
            <button className="button primary" type="submit">
              Sign In
              <LogIn size={18} />
            </button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </section>
      </main>
    );
  }

  // ── Handlers ─────────────────────────────────────────────────────

  const handleSaveProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await saveProfile(profileData);
      setStatus('Profile saved.');
      await refresh();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Profile could not be saved.');
    }
  };

  const handleSaveProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await saveProject(projectDraft, editingProjectId);
      setProjectDraft(emptyProject);
      setEditingProjectId(undefined);
      setStatus('Project saved.');
      await refresh();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Project could not be saved.');
    }
  };

  const handleSaveBlogPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await saveBlogPost(blogDraft, editingBlogId);
      setBlogDraft(emptyBlogPost);
      setEditingBlogId(undefined);
      setStatus('Blog post saved.');
      await refresh();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Blog post could not be saved.');
    }
  };

  const handleSaveSkill = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await saveSkillGroup(skillDraft, editingSkillId);
      setSkillDraft(emptySkillGroup);
      setEditingSkillId(undefined);
      setStatus('Skill group saved.');
      await refresh();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Skill group could not be saved.');
    }
  };

  const handleSaveExperience = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await saveExperience(expDraft, editingExpId);
      setExpDraft(emptyExperience);
      setEditingExpId(undefined);
      setStatus('Experience saved.');
      await refresh();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Experience could not be saved.');
    }
  };

  // ── Tab Content ──────────────────────────────────────────────────

  const renderContent = () => {
    switch (activeTab) {

      // ── Profile Tab ──────────────────────────────────────────────
      case 'profile':
        return (
          <form className="admin-panel" onSubmit={handleSaveProfile}>
            <div className="panel-heading"><h2>Edit Profile</h2></div>
            <label>
              Name
              <input value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} required />
            </label>
            <label>
              Role / Title
              <input value={profileData.role} onChange={(e) => setProfileData({ ...profileData, role: e.target.value })} required />
            </label>
            <label>
              Location
              <input value={profileData.location} onChange={(e) => setProfileData({ ...profileData, location: e.target.value })} required />
            </label>
            <label>
              Summary
              <textarea value={profileData.summary} onChange={(e) => setProfileData({ ...profileData, summary: e.target.value })} rows={4} required />
            </label>
            <label>
              Highlights (comma separated)
              <input
                value={profileData.highlights.join(', ')}
                onChange={(e) => setProfileData({ ...profileData, highlights: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                required
              />
            </label>
            <label>
              Social Links (comma separated)
              <input
                value={profileData.socialLinks.join(', ')}
                onChange={(e) => setProfileData({ ...profileData, socialLinks: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                required
              />
            </label>
            <label>
              Resume URL
              <input value={profileData.resumeUrl || ''} onChange={(e) => setProfileData({ ...profileData, resumeUrl: e.target.value })} />
            </label>
            <button className="button primary" type="submit">
              Save Profile
              <Save size={18} />
            </button>
            {status && <p className="form-status">{status}</p>}
          </form>
        );

      // ── Projects Tab ─────────────────────────────────────────────
      case 'projects':
        return (
          <section className="admin-layout">
            <form className="admin-panel" onSubmit={handleSaveProject}>
              <div className="panel-heading">
                <h2>{editingProjectId ? 'Edit Project' : 'Add Project'}</h2>
                <button className="icon-button" type="button" aria-label="New project" onClick={() => { setProjectDraft(emptyProject); setEditingProjectId(undefined); }}>
                  <Plus size={18} />
                </button>
              </div>
              <label>Title <input value={projectDraft.title} onChange={(e) => setProjectDraft({ ...projectDraft, title: e.target.value })} required /></label>
              <label>Slug <input value={projectDraft.slug} onChange={(e) => setProjectDraft({ ...projectDraft, slug: e.target.value })} required /></label>
              <label>Category <input value={projectDraft.category} onChange={(e) => setProjectDraft({ ...projectDraft, category: e.target.value })} required /></label>
              <label>
                Image URL
                <input value={projectDraft.image} onChange={(e) => setProjectDraft({ ...projectDraft, image: e.target.value })} required />
              </label>
              <label>
                Upload Image
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const res = await uploadProjectImage(file);
                    setProjectDraft((d) => ({ ...d, image: res.imageUrl }));
                    setStatus(res.message);
                  } catch (err) {
                    setStatus(err instanceof Error ? err.message : 'Image could not be uploaded.');
                  }
                }} />
              </label>
              <label>
                Tech Stack (comma separated)
                <input value={projectDraft.techStack.join(', ')} onChange={(e) => setProjectDraft({ ...projectDraft, techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} required />
              </label>
              <label>Description <textarea value={projectDraft.description} onChange={(e) => setProjectDraft({ ...projectDraft, description: e.target.value })} rows={4} required /></label>
              <label>GitHub URL <input value={projectDraft.githubUrl || ''} onChange={(e) => setProjectDraft({ ...projectDraft, githubUrl: e.target.value })} /></label>
              <label>Live URL <input value={projectDraft.liveUrl || ''} onChange={(e) => setProjectDraft({ ...projectDraft, liveUrl: e.target.value })} /></label>
              <label className="checkbox-label">
                <input type="checkbox" checked={projectDraft.featured} onChange={(e) => setProjectDraft({ ...projectDraft, featured: e.target.checked })} />
                Featured project
              </label>
              <button className="button primary" type="submit">Save Project <Save size={18} /></button>
              {status && <p className="form-status">{status}</p>}
            </form>

            <div className="admin-panel">
              <div className="panel-heading"><h2>Projects</h2></div>
              <div className="admin-list">
                {projects.map((p) => (
                  <article key={p.id}>
                    <div><strong>{p.title}</strong><span>{p.category}</span></div>
                    <button className="button secondary" type="button" onClick={() => {
                      setEditingProjectId(p.id);
                      setProjectDraft({ slug: p.slug, title: p.title, category: p.category, description: p.description, techStack: p.techStack, image: p.image, githubUrl: p.githubUrl, liveUrl: p.liveUrl, featured: p.featured, sortOrder: p.sortOrder });
                    }}>Edit</button>
                    <button className="icon-button danger" type="button" aria-label={`Delete ${p.title}`} onClick={async () => { await deleteProject(p.id); await refresh(); }}>
                      <Trash2 size={18} />
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );

      // ── Blog Tab ─────────────────────────────────────────────────
      case 'blog':
        return (
          <section className="admin-layout">
            <form className="admin-panel" onSubmit={handleSaveBlogPost}>
              <div className="panel-heading">
                <h2>{editingBlogId ? 'Edit Post' : 'New Post'}</h2>
                <button className="icon-button" type="button" aria-label="New post" onClick={() => { setBlogDraft(emptyBlogPost); setEditingBlogId(undefined); }}>
                  <Plus size={18} />
                </button>
              </div>
              <label>Title <input value={blogDraft.title} onChange={(e) => setBlogDraft({ ...blogDraft, title: e.target.value })} required /></label>
              <label>Slug <input value={blogDraft.slug} onChange={(e) => setBlogDraft({ ...blogDraft, slug: e.target.value })} required /></label>
              <label>Excerpt <textarea value={blogDraft.excerpt} onChange={(e) => setBlogDraft({ ...blogDraft, excerpt: e.target.value })} rows={2} required /></label>
              <label>Cover Image URL <input value={blogDraft.coverImage} onChange={(e) => setBlogDraft({ ...blogDraft, coverImage: e.target.value })} /></label>
              <label>
                Tags (comma separated)
                <input value={blogDraft.tags.join(', ')} onChange={(e) => setBlogDraft({ ...blogDraft, tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} />
              </label>
              <label>
                Content
                <textarea className="blog-content-editor" value={blogDraft.content} onChange={(e) => setBlogDraft({ ...blogDraft, content: e.target.value })} rows={12} required />
              </label>
              <label className="checkbox-label">
                <input type="checkbox" checked={blogDraft.published} onChange={(e) => setBlogDraft({ ...blogDraft, published: e.target.checked })} />
                Published
              </label>
              <button className="button primary" type="submit">Save Post <Save size={18} /></button>
              {status && <p className="form-status">{status}</p>}
            </form>

            <div className="admin-panel">
              <div className="panel-heading"><h2>Blog Posts</h2></div>
              <div className="admin-list">
                {blogPosts.map((post) => (
                  <article key={post.id}>
                    <div>
                      <strong>{post.title}</strong>
                      <span>{post.published ? '✅ Published' : '📝 Draft'}</span>
                    </div>
                    <button className="button secondary" type="button" onClick={() => {
                      setEditingBlogId(Number(post.id));
                      setBlogDraft({ slug: post.slug, title: post.title, excerpt: post.excerpt, content: post.content, coverImage: post.coverImage || '', tags: post.tags, published: post.published });
                    }}>Edit</button>
                    <button className="icon-button danger" type="button" aria-label={`Delete ${post.title}`} onClick={async () => { await deleteBlogPost(Number(post.id)); await refresh(); }}>
                      <Trash2 size={18} />
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );

      // ── Skills Tab ───────────────────────────────────────────────
      case 'skills':
        return (
          <section className="admin-layout">
            <form className="admin-panel" onSubmit={handleSaveSkill}>
              <div className="panel-heading">
                <h2>{editingSkillId ? 'Edit Skill Group' : 'Add Skill Group'}</h2>
                <button className="icon-button" type="button" aria-label="New skill group" onClick={() => { setSkillDraft(emptySkillGroup); setEditingSkillId(undefined); }}>
                  <Plus size={18} />
                </button>
              </div>
              <label>Title <input value={skillDraft.title} onChange={(e) => setSkillDraft({ ...skillDraft, title: e.target.value })} required /></label>
              <label>
                Skills (comma separated)
                <input value={skillDraft.skills.join(', ')} onChange={(e) => setSkillDraft({ ...skillDraft, skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} required />
              </label>
              <label>Sort Order <input type="number" value={skillDraft.sortOrder} onChange={(e) => setSkillDraft({ ...skillDraft, sortOrder: Number(e.target.value) })} /></label>
              <button className="button primary" type="submit">Save Skill Group <Save size={18} /></button>
              {status && <p className="form-status">{status}</p>}
            </form>

            <div className="admin-panel">
              <div className="panel-heading"><h2>Skill Groups</h2></div>
              <div className="admin-list">
                {skills.map((g) => (
                  <article key={g.id}>
                    <div><strong>{g.title}</strong><span>{g.skills.join(', ')}</span></div>
                    <button className="button secondary" type="button" onClick={() => {
                      setEditingSkillId(g.id);
                      setSkillDraft({ title: g.title, skills: g.skills, sortOrder: g.sortOrder });
                    }}>Edit</button>
                    <button className="icon-button danger" type="button" aria-label={`Delete ${g.title}`} onClick={async () => { await deleteSkillGroup(g.id); await refresh(); }}>
                      <Trash2 size={18} />
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );

      // ── Experience Tab ───────────────────────────────────────────
      case 'experience':
        return (
          <section className="admin-layout">
            <form className="admin-panel" onSubmit={handleSaveExperience}>
              <div className="panel-heading">
                <h2>{editingExpId ? 'Edit Experience' : 'Add Experience'}</h2>
                <button className="icon-button" type="button" aria-label="New experience" onClick={() => { setExpDraft(emptyExperience); setEditingExpId(undefined); }}>
                  <Plus size={18} />
                </button>
              </div>
              <label>Period <input value={expDraft.period} onChange={(e) => setExpDraft({ ...expDraft, period: e.target.value })} required placeholder="e.g. 2024 – 2025" /></label>
              <label>Title <input value={expDraft.title} onChange={(e) => setExpDraft({ ...expDraft, title: e.target.value })} required /></label>
              <label>Organization <input value={expDraft.organization} onChange={(e) => setExpDraft({ ...expDraft, organization: e.target.value })} required /></label>
              <label>Description <textarea value={expDraft.description} onChange={(e) => setExpDraft({ ...expDraft, description: e.target.value })} rows={4} required /></label>
              <label>Sort Order <input type="number" value={expDraft.sortOrder} onChange={(e) => setExpDraft({ ...expDraft, sortOrder: Number(e.target.value) })} /></label>
              <button className="button primary" type="submit">Save Experience <Save size={18} /></button>
              {status && <p className="form-status">{status}</p>}
            </form>

            <div className="admin-panel">
              <div className="panel-heading"><h2>Experience</h2></div>
              <div className="admin-list">
                {experience.map((exp) => (
                  <article key={exp.id}>
                    <div><strong>{exp.title}</strong><span>{exp.period} · {exp.organization}</span></div>
                    <button className="button secondary" type="button" onClick={() => {
                      setEditingExpId(exp.id);
                      setExpDraft({ period: exp.period, title: exp.title, organization: exp.organization, description: exp.description, sortOrder: exp.sortOrder });
                    }}>Edit</button>
                    <button className="icon-button danger" type="button" aria-label={`Delete ${exp.title}`} onClick={async () => { await deleteExperience(exp.id); await refresh(); }}>
                      <Trash2 size={18} />
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );

      // ── Messages Tab ─────────────────────────────────────────────
      case 'messages':
        return (
          <section className="admin-panel message-panel">
            <div className="panel-heading"><h2>Contact Messages</h2></div>
            <div className="message-list">
              {messages.map((m) => (
                <article key={m.id} className={m.read ? 'message-card read' : 'message-card'}>
                  <div>
                    <strong>{m.subject}</strong>
                    <span>{m.name} · {m.email}</span>
                  </div>
                  <p>{m.message}</p>
                  {!m.read && (
                    <button className="button secondary" type="button" onClick={async () => { await markMessageRead(m.id); await refresh(); }}>
                      Mark Read <Check size={18} />
                    </button>
                  )}
                </article>
              ))}
            </div>
          </section>
        );
    }
  };

  // ── Main Admin Layout ────────────────────────────────────────────

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <div>
          <span className="eyebrow">Admin</span>
          <h1>Portfolio Control Room</h1>
        </div>
        <button className="button secondary" type="button" onClick={logout}>
          Logout
          <LogOut size={18} />
        </button>
      </header>

      <section className="admin-stats">
        <article><strong>{projects.length}</strong><span>Projects</span></article>
        <article><strong>{blogPosts.length}</strong><span>Blog Posts</span></article>
        <article><strong>{messages.length}</strong><span>Messages</span></article>
        <article><strong>{unreadCount}</strong><span>Unread</span></article>
      </section>

      <nav className="admin-tabs" aria-label="Admin sections">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? 'admin-tab active' : 'admin-tab'}
            type="button"
            onClick={() => { setActiveTab(tab.key); setStatus(''); }}
          >
            {tab.label}
            {tab.key === 'messages' && unreadCount > 0 && (
              <span className="tab-badge">{unreadCount}</span>
            )}
          </button>
        ))}
      </nav>

      {renderContent()}
    </main>
  );
}
