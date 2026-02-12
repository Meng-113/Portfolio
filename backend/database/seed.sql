-- Seed data for frontend development (slug: chea-kimeng)
-- Run this after schema.sql

BEGIN;

INSERT INTO portfolios (
  slug,
  name,
  title,
  location,
  intro,
  about_title,
  about,
  contact_detail,
  contact_email
) VALUES (
  'chea-kimeng',
  'Chea Kimeng',
  'Student (Software Developer)',
  'Cambodia',
  'I am learning software development and building practical web apps. I enjoy clean UI, real-world problem solving, and improving my coding skills every week.',
  'Software Developer Student',
  'I am a software developer student focused on building modern, user-friendly web applications. I like writing clean code, learning new tools, and turning ideas into projects that people can use.',
  'I am always happy to talk about collaboration, internship opportunities, and new ideas.',
  'mailto:your-email@example.com'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  title = EXCLUDED.title,
  location = EXCLUDED.location,
  intro = EXCLUDED.intro,
  about_title = EXCLUDED.about_title,
  about = EXCLUDED.about,
  contact_detail = EXCLUDED.contact_detail,
  contact_email = EXCLUDED.contact_email;

DELETE FROM portfolio_quick_info
WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng');

INSERT INTO portfolio_quick_info (portfolio_id, label, value, display_order) VALUES
((SELECT id FROM portfolios WHERE slug = 'chea-kimeng'), 'Education', 'TUX Global Institute', 0),
((SELECT id FROM portfolios WHERE slug = 'chea-kimeng'), 'Focus', 'Web Development', 1),
((SELECT id FROM portfolios WHERE slug = 'chea-kimeng'), 'Tools', 'React, Node.js, Tailwind CSS', 2),
((SELECT id FROM portfolios WHERE slug = 'chea-kimeng'), 'Location', 'Cambodia', 3);

DELETE FROM portfolio_skill_items
WHERE skill_group_id IN (
  SELECT id
  FROM portfolio_skill_groups
  WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng')
);

DELETE FROM portfolio_skill_groups
WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng');

INSERT INTO portfolio_skill_groups (portfolio_id, category, display_order) VALUES
((SELECT id FROM portfolios WHERE slug = 'chea-kimeng'), 'Frontend', 0),
((SELECT id FROM portfolios WHERE slug = 'chea-kimeng'), 'Backend', 1),
((SELECT id FROM portfolios WHERE slug = 'chea-kimeng'), 'Database', 2),
((SELECT id FROM portfolios WHERE slug = 'chea-kimeng'), 'Tools', 3);

INSERT INTO portfolio_skill_items (skill_group_id, item_name, display_order) VALUES
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 0), 'React', 0),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 0), 'JavaScript (ES6+)', 1),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 0), 'Tailwind CSS', 2),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 0), 'HTML5', 3),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 0), 'CSS3', 4),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 1), 'Node.js', 0),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 1), 'Express.js', 1),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 1), 'REST APIs', 2),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 1), 'Authentication', 3),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 2), 'MySQL', 0),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 2), 'PostgreSQL', 1),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 2), 'MongoDB', 2),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 2), 'Database Design', 3),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 3), 'Git', 0),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 3), 'GitHub', 1),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 3), 'VS Code', 2),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 3), 'Figma', 3),
((SELECT id FROM portfolio_skill_groups WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND display_order = 3), 'Postman', 4);

DELETE FROM portfolio_skill_images
WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng');

INSERT INTO portfolio_skill_images (portfolio_id, image_url, display_order) VALUES
((SELECT id FROM portfolios WHERE slug = 'chea-kimeng'), 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 0),
((SELECT id FROM portfolios WHERE slug = 'chea-kimeng'), 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 1),
((SELECT id FROM portfolios WHERE slug = 'chea-kimeng'), 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', 2);

DELETE FROM project_tech_stack
WHERE portfolio_project_id IN (
  SELECT id
  FROM portfolio_projects
  WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng')
);

DELETE FROM portfolio_projects
WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng');

INSERT INTO portfolio_projects (
  portfolio_id,
  project_id,
  category,
  title,
  description,
  github_url,
  live_url,
  display_order
) VALUES
(
  (SELECT id FROM portfolios WHERE slug = 'chea-kimeng'),
  1,
  'Web',
  'Student Task Tracker',
  'A task management app for students to organize assignments with priority labels and deadlines.',
  'https://github.com/your-username/student-task-tracker',
  'https://your-live-link-1.com',
  0
),
(
  (SELECT id FROM portfolios WHERE slug = 'chea-kimeng'),
  2,
  'Backend',
  'Course API Service',
  'A backend API to manage courses, instructors, and enrollments with role-based access.',
  'https://github.com/your-username/course-api-service',
  'https://your-live-link-2.com',
  1
),
(
  (SELECT id FROM portfolios WHERE slug = 'chea-kimeng'),
  3,
  'UI',
  'Portfolio UI Kit',
  'A reusable set of responsive UI blocks with clean spacing, cards, and action-focused buttons.',
  'https://github.com/your-username/portfolio-ui-kit',
  'https://your-live-link-3.com',
  2
);

INSERT INTO project_tech_stack (portfolio_project_id, tech_name, display_order) VALUES
((SELECT id FROM portfolio_projects WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND project_id = 1), 'React', 0),
((SELECT id FROM portfolio_projects WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND project_id = 1), 'Tailwind CSS', 1),
((SELECT id FROM portfolio_projects WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND project_id = 1), 'Firebase', 2),
((SELECT id FROM portfolio_projects WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND project_id = 2), 'Node.js', 0),
((SELECT id FROM portfolio_projects WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND project_id = 2), 'Express', 1),
((SELECT id FROM portfolio_projects WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND project_id = 2), 'PostgreSQL', 2),
((SELECT id FROM portfolio_projects WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND project_id = 2), 'JWT', 3),
((SELECT id FROM portfolio_projects WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND project_id = 3), 'React', 0),
((SELECT id FROM portfolio_projects WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND project_id = 3), 'Tailwind CSS', 1),
((SELECT id FROM portfolio_projects WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng') AND project_id = 3), 'Vite', 2);

DELETE FROM portfolio_social_links
WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng');

INSERT INTO portfolio_social_links (portfolio_id, name, url, display_order) VALUES
((SELECT id FROM portfolios WHERE slug = 'chea-kimeng'), 'GitHub', 'https://github.com/your-username', 0),
((SELECT id FROM portfolios WHERE slug = 'chea-kimeng'), 'LinkedIn', 'https://linkedin.com/in/your-username', 1),
((SELECT id FROM portfolios WHERE slug = 'chea-kimeng'), 'Facebook', 'https://facebook.com/your-profile', 2);

INSERT INTO contact_messages (
  portfolio_id,
  sender_name,
  sender_email,
  subject,
  message,
  is_read
)
SELECT
  (SELECT id FROM portfolios WHERE slug = 'chea-kimeng'),
  'Jane',
  'jane@example.com',
  'Internship opportunity',
  'Can we discuss a project?',
  FALSE
WHERE NOT EXISTS (
  SELECT 1
  FROM contact_messages
  WHERE portfolio_id = (SELECT id FROM portfolios WHERE slug = 'chea-kimeng')
);

COMMIT;
