import { ArrowDownRight, Download, MapPin } from 'lucide-react';
import type { Profile } from '../types';

type HeroProps = {
  profile: Profile;
};

export function Hero({ profile }: HeroProps) {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <div className="eyebrow">
          <MapPin size={16} />
          {profile.location}
        </div>
        <h1>{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p className="summary">{profile.summary}</p>

        <div className="hero-actions">
          <a className="button primary" href="#projects">
            View Projects
            <ArrowDownRight size={18} />
          </a>
          <a className="button secondary" href="/resume.pdf">
            Resume
            <Download size={18} />
          </a>
        </div>
      </div>

      <div className="hero-visual" aria-label="Developer profile highlight">
        <div className="portrait-panel">
          <div className="portrait-header">
            <span />
            <span />
            <span />
          </div>
          <div className="code-card">
            <p>public class Developer &#123;</p>
            <p>&nbsp;&nbsp;skill = "Spring Boot";</p>
            <p>&nbsp;&nbsp;focus = "Clean UX";</p>
            <p>&#125;</p>
          </div>
          <div className="metric-row">
            <strong>12+</strong>
            <span>API modules planned</span>
          </div>
          <div className="metric-row">
            <strong>100%</strong>
            <span>Responsive design goal</span>
          </div>
        </div>
      </div>
    </section>
  );
}
