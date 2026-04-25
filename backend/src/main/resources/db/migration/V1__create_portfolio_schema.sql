CREATE TABLE profiles (
    id BIGINT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    role VARCHAR(160) NOT NULL,
    location VARCHAR(120) NOT NULL,
    summary VARCHAR(1200) NOT NULL,
    resume_url VARCHAR(500)
);

CREATE TABLE profile_highlights (
    profile_id BIGINT NOT NULL,
    highlight VARCHAR(180) NOT NULL,
    sort_order INT NOT NULL,
    PRIMARY KEY (profile_id, sort_order),
    CONSTRAINT fk_profile_highlights_profile FOREIGN KEY (profile_id) REFERENCES profiles(id)
);

CREATE TABLE profile_social_links (
    profile_id BIGINT NOT NULL,
    social_link VARCHAR(180) NOT NULL,
    sort_order INT NOT NULL,
    PRIMARY KEY (profile_id, sort_order),
    CONSTRAINT fk_profile_social_links_profile FOREIGN KEY (profile_id) REFERENCES profiles(id)
);

CREATE TABLE projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    title VARCHAR(160) NOT NULL,
    category VARCHAR(80) NOT NULL,
    description VARCHAR(1200) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE project_tech_stack (
    project_id BIGINT NOT NULL,
    tech VARCHAR(80) NOT NULL,
    sort_order INT NOT NULL,
    PRIMARY KEY (project_id, sort_order),
    CONSTRAINT fk_project_tech_stack_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE project_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(180),
    sort_order INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_project_images_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE skill_groups (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(120) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE skill_items (
    skill_group_id BIGINT NOT NULL,
    skill VARCHAR(80) NOT NULL,
    sort_order INT NOT NULL,
    PRIMARY KEY (skill_group_id, sort_order),
    CONSTRAINT fk_skill_items_group FOREIGN KEY (skill_group_id) REFERENCES skill_groups(id) ON DELETE CASCADE
);

CREATE TABLE experiences (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    period VARCHAR(80) NOT NULL,
    title VARCHAR(160) NOT NULL,
    organization VARCHAR(160) NOT NULL,
    description VARCHAR(1200) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE certifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(180) NOT NULL,
    issuer VARCHAR(160) NOT NULL,
    credential_url VARCHAR(500),
    issued_on DATE,
    sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE contact_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    message VARCHAR(1200) NOT NULL,
    read_flag BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(160) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(120) NOT NULL,
    role VARCHAR(40) NOT NULL DEFAULT 'ADMIN',
    enabled BOOLEAN NOT NULL DEFAULT TRUE
);
