INSERT INTO profiles (id, name, role, location, summary, resume_url)
VALUES (
    1,
    'Your Name',
    'Java Full-Stack Developer',
    'India',
    'I build reliable Spring Boot APIs and sharp, responsive web experiences that turn ideas into usable products.',
    '/resume.pdf'
);

INSERT INTO profile_highlights (profile_id, highlight, sort_order) VALUES
(1, 'Spring Boot REST APIs', 0),
(1, 'React interfaces', 1),
(1, 'Clean database design', 2),
(1, 'Production-minded problem solving', 3);

INSERT INTO profile_social_links (profile_id, social_link, sort_order) VALUES
(1, 'GitHub', 0),
(1, 'LinkedIn', 1),
(1, 'Email', 2);

INSERT INTO projects (id, slug, title, category, description, image_url, github_url, live_url, featured, sort_order) VALUES
(1, 'career-canvas', 'Career Canvas', 'Full Stack', 'A career dashboard that tracks applications, notes, interview stages, and follow-up reminders.', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80', 'https://github.com/', 'https://example.com', TRUE, 0),
(2, 'taskflow-api', 'TaskFlow API', 'Backend', 'A secure task management API with validation, layered architecture, and clean error responses.', 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80', 'https://github.com/', 'https://example.com', TRUE, 1),
(3, 'folio-motion', 'Folio Motion', 'Frontend', 'A visual portfolio concept with animated sections, project filters, and responsive layouts.', 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80', 'https://github.com/', 'https://example.com', FALSE, 2);

INSERT INTO project_tech_stack (project_id, tech, sort_order) VALUES
(1, 'Spring Boot', 0), (1, 'React', 1), (1, 'PostgreSQL', 2), (1, 'JWT', 3),
(2, 'Java', 0), (2, 'Spring Boot', 1), (2, 'JPA', 2), (2, 'Swagger', 3),
(3, 'React', 0), (3, 'TypeScript', 1), (3, 'CSS', 2), (3, 'Vite', 3);

INSERT INTO project_images (project_id, image_url, alt_text, sort_order) VALUES
(1, 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80', 'Career dashboard workspace', 0),
(2, 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80', 'Task planning board', 0),
(3, 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80', 'Frontend design geometry', 0);

INSERT INTO skill_groups (id, title, sort_order) VALUES
(1, 'Backend', 0),
(2, 'Frontend', 1),
(3, 'Database & Tools', 2);

INSERT INTO skill_items (skill_group_id, skill, sort_order) VALUES
(1, 'Java', 0), (1, 'Spring Boot', 1), (1, 'REST APIs', 2), (1, 'JPA', 3), (1, 'Validation', 4),
(2, 'React', 0), (2, 'TypeScript', 1), (2, 'HTML', 2), (2, 'CSS', 3), (2, 'Responsive UI', 4),
(3, 'MySQL', 0), (3, 'Git', 1), (3, 'Maven', 2), (3, 'Postman', 3), (3, 'Flyway', 4);

INSERT INTO experiences (period, title, organization, description, sort_order) VALUES
('2026', 'Portfolio Platform', 'Personal Project', 'Designed a full-stack portfolio foundation with API-driven content, database-backed sections, and a refined frontend.', 0),
('2025', 'Java Development', 'Learning Track', 'Focused on Spring Boot, REST architecture, database modeling, and frontend integration.', 1);

INSERT INTO certifications (title, issuer, credential_url, issued_on, sort_order) VALUES
('Spring Boot Foundations', 'Self Study', 'https://example.com', '2026-01-01', 0);

INSERT INTO admin_users (email, password_hash, display_name, role, enabled)
VALUES ('admin@portfolio.local', '{noop}admin123', 'Portfolio Admin', 'ADMIN', TRUE);
