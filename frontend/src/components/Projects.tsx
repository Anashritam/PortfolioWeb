import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../types';
import { SectionTitle } from './SectionTitle';

type ProjectsProps = {
  projects: Project[];
};

export function Projects({ projects }: ProjectsProps) {
  return (
    <section className="section" id="projects">
      <SectionTitle
        eyebrow="Selected work"
        title="Projects with real product thinking"
        description="Each card is designed to show the problem, stack, and outcome quickly."
      />

      <div className="project-grid">
        {projects.map((project) => (
          <article className={project.featured ? 'project-card featured' : 'project-card'} key={project.id}>
            <img src={project.image} alt="" />
            <div className="project-body">
              <div className="project-meta">
                <span>{project.category}</span>
                {project.featured && <span>Featured</span>}
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags">
                {project.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="card-actions">
                <a href={project.githubUrl}>
                  <Github size={17} />
                  Code
                </a>
                <a href={project.liveUrl}>
                  <ExternalLink size={17} />
                  Live
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
