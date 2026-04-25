import type { Experience } from '../types';
import { SectionTitle } from './SectionTitle';

type ExperienceTimelineProps = {
  experience: Experience[];
};

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  return (
    <section className="section" id="about">
      <SectionTitle
        eyebrow="About"
        title="A developer profile with momentum"
        description="This area is ready for education, internships, certifications, and personal milestones."
      />

      <div className="timeline">
        {experience.map((item) => (
          <article className="timeline-item" key={`${item.period}-${item.title}`}>
            <span>{item.period}</span>
            <div>
              <h3>{item.title}</h3>
              <strong>{item.organization}</strong>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
