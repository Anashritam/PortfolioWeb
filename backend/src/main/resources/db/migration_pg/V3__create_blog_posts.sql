CREATE TABLE blog_posts (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(200) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    excerpt VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    cover_image VARCHAR(500),
    published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog_post_tags (
    blog_post_id BIGINT NOT NULL,
    tag VARCHAR(80) NOT NULL,
    sort_order INT NOT NULL,
    PRIMARY KEY (blog_post_id, sort_order),
    CONSTRAINT fk_blog_post_tags_post FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
);

INSERT INTO blog_posts (id, slug, title, excerpt, content, cover_image, published, created_at) VALUES
(1, 'getting-started-with-spring-boot', 'Getting Started with Spring Boot',
 'A beginner-friendly walkthrough of building your first REST API with Spring Boot, from project setup to deployment.',
 E'Spring Boot makes it incredibly easy to create stand-alone, production-grade Spring-based applications. In this post, I will walk you through the essentials of building a REST API from scratch.\n\n## Why Spring Boot?\n\nSpring Boot takes an opinionated view of the Spring platform and third-party libraries so you can get started with minimum fuss. Most Spring Boot applications need minimal Spring configuration.\n\n## Setting Up Your Project\n\nThe easiest way to start is with Spring Initializr at start.spring.io. Select your dependencies — I recommend starting with Spring Web, Spring Data JPA, and H2 Database for development.\n\n## Creating Your First Controller\n\nA REST controller in Spring Boot is just a class annotated with @RestController. Each method maps to an HTTP endpoint using annotations like @GetMapping, @PostMapping, etc.\n\n## What I Learned\n\nBuilding APIs with Spring Boot taught me to think in layers — controller, service, repository — and to keep each layer focused on its responsibility. The auto-configuration saves hours of boilerplate setup.',
 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
 TRUE, CURRENT_TIMESTAMP),
(2, 'react-typescript-best-practices', 'React + TypeScript Best Practices',
 'Lessons learned from building real React applications with TypeScript — type safety, component patterns, and avoiding common pitfalls.',
 E'TypeScript brings type safety to React development, catching bugs at compile time rather than runtime. Here are the patterns I have found most useful in my projects.\n\n## Component Props with Types\n\nAlways define explicit prop types for your components. Use the type keyword for simple props and interfaces when you need extension.\n\n## State Management\n\nStart with useState and useReducer before reaching for external state libraries. Most applications are simpler than you think.\n\n## Custom Hooks\n\nExtract shared logic into custom hooks. A hook like useApi can centralize your fetch logic, error handling, and loading states.\n\n## Key Takeaways\n\nTypeScript in React is not about adding complexity — it is about getting better editor support, catching mistakes early, and making your codebase self-documenting.',
 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
 TRUE, CURRENT_TIMESTAMP);

SELECT setval('blog_posts_id_seq', 2);

INSERT INTO blog_post_tags (blog_post_id, tag, sort_order) VALUES
(1, 'Java', 0), (1, 'Spring Boot', 1), (1, 'REST API', 2), (1, 'Backend', 3),
(2, 'React', 0), (2, 'TypeScript', 1), (2, 'Frontend', 2);
