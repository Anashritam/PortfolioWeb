import { BriefcaseBusiness, Github, Linkedin, Mail } from 'lucide-react';

const links = ['About', 'Projects', 'Skills', 'Blog', 'Contact'];

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Portfolio home">
        <span className="brand-mark">
          <BriefcaseBusiness size={18} />
        </span>
        <span>Portfolio</span>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        {links.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`}>
            {link}
          </a>
        ))}
      </nav>

      <div className="social-links" aria-label="Social links">
        <a href="/admin" aria-label="Admin">
          <BriefcaseBusiness size={18} />
        </a>
        <a href="https://github.com/" aria-label="GitHub">
          <Github size={18} />
        </a>
        <a href="https://www.linkedin.com/" aria-label="LinkedIn">
          <Linkedin size={18} />
        </a>
        <a href="mailto:you@example.com" aria-label="Email">
          <Mail size={18} />
        </a>
      </div>
    </header>
  );
}
