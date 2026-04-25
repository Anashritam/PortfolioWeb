import { Braces, Database, Layers3 } from 'lucide-react';
import type { SkillGroup } from '../types';
import { SectionTitle } from './SectionTitle';

const icons = [Braces, Layers3, Database];

type SkillsProps = {
  skills: SkillGroup[];
};

export function Skills({ skills }: SkillsProps) {
  return (
    <section className="section skill-section" id="skills">
      <SectionTitle
        eyebrow="Toolbox"
        title="A stack built for full-stack delivery"
        description="The core technologies are grouped by how they support the final product."
      />

      <div className="skill-grid">
        {skills.map((group, index) => {
          const Icon = icons[index % icons.length];
          return (
            <article className="skill-card" key={group.title}>
              <div className="skill-icon">
                <Icon size={22} />
              </div>
              <h3>{group.title}</h3>
              <div className="tags">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
