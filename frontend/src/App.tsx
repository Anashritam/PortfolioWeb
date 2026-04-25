import { useEffect, useState } from 'react';
import { loadBlogPost, loadPortfolio } from './api';
import { BlogPostView } from './components/BlogPostView';
import { BlogSection } from './components/BlogSection';
import { Contact } from './components/Contact';
import { AdminDashboard } from './components/AdminDashboard';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { fallbackBlogPosts, fallbackExperience, fallbackProfile, fallbackProjects, fallbackSkills } from './data/fallback';
import type { BlogPost, Experience, Profile, Project, SkillGroup } from './types';

type PortfolioState = {
  profile: Profile;
  projects: Project[];
  skills: SkillGroup[];
  experience: Experience[];
  blogPosts: BlogPost[];
};

const initialPortfolio: PortfolioState = {
  profile: fallbackProfile,
  projects: fallbackProjects,
  skills: fallbackSkills,
  experience: fallbackExperience,
  blogPosts: fallbackBlogPosts
};

export function App() {
  const [portfolio, setPortfolio] = useState<PortfolioState>(initialPortfolio);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  useEffect(() => {
    if (!isAdminRoute) {
      loadPortfolio().then(setPortfolio);
    }
  }, [isAdminRoute]);

  const handleSelectPost = async (slug: string) => {
    try {
      const post = await loadBlogPost(slug);
      setSelectedPost(post);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      const fallback = portfolio.blogPosts.find((p) => p.id === slug);
      if (fallback) {
        setSelectedPost(fallback);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  if (selectedPost) {
    return (
      <>
        <Header />
        <main>
          <BlogPostView post={selectedPost} onBack={() => setSelectedPost(null)} />
        </main>
        <footer className="footer">
          <p>Built with Spring Boot, React, TypeScript, and focused design.</p>
        </footer>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Hero profile={portfolio.profile} />
        <ExperienceTimeline experience={portfolio.experience} />
        <Projects projects={portfolio.projects} />
        <Skills skills={portfolio.skills} />
        <BlogSection blogPosts={portfolio.blogPosts} onSelectPost={handleSelectPost} />
        <Contact />
      </main>
      <footer className="footer">
        <p>Built with Spring Boot, React, TypeScript, and focused design.</p>
      </footer>
    </>
  );
}
