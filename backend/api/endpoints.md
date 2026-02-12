# Portfolio Backend Endpoint Design (Split Tables)

Base path: `/api/v1`

This design has:
- no login endpoints
- fixed default navbar (not editable from dashboard)
- no version check workflow

## Fixed Navbar (Default)

Navbar links are not stored in database and not editable by API.
Use a fixed default list in code:

```json
[
  { "label": "Home", "href": "#home" },
  { "label": "About", "href": "#about" },
  { "label": "Skills", "href": "#skills" },
  { "label": "Projects", "href": "#projects" },
  { "label": "Contact", "href": "#contact" }
]
```

## Database Mapping (Part by Part)

- Basic + Contact fields -> `portfolios`
- Quick Info -> `portfolio_quick_info`
- Skills -> `portfolio_skill_groups` + `portfolio_skill_items`
- Skill Images -> `portfolio_skill_images`
- Projects -> `portfolio_projects`
- Project Tech Stack -> `project_tech_stack`
- Socials -> `portfolio_social_links`
- Contact Messages -> `contact_messages`

## 1) Main Portfolio Read

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/portfolios/:slug` | Load full portfolio payload for frontend and dashboard |

Server reads from all section tables and returns one merged JSON payload.

### GET /portfolios/:slug
Response `200`:

```json
{
  "id": 1,
  "slug": "chea-kimeng",
  "name": "Chea Kimeng",
  "title": "Student (Software Developer)",
  "location": "Cambodia",
  "intro": "I am learning software development...",
  "aboutTitle": "Software Developer Student",
  "about": "I am a software developer student...",
  "navLinks": [
    { "label": "Home", "href": "#home" },
    { "label": "About", "href": "#about" },
    { "label": "Skills", "href": "#skills" },
    { "label": "Projects", "href": "#projects" },
    { "label": "Contact", "href": "#contact" }
  ],
  "quickInfo": [
    { "label": "Education", "value": "TUX Global Institute" }
  ],
  "skills": [
    {
      "category": "Frontend",
      "items": ["React", "Tailwind CSS"]
    }
  ],
  "skillImages": [
    "https://cdn.example.com/react-logo.svg"
  ],
  "projects": [
    {
      "id": 11,
      "category": "Web",
      "title": "Student Task Tracker",
      "description": "Task management app...",
      "techStack": ["React", "Tailwind CSS", "Firebase"],
      "githubUrl": "https://github.com/your-username/student-task-tracker",
      "liveUrl": "https://your-live-link-1.com"
    }
  ],
  "contactDetail": "I am always happy to talk about collaboration...",
  "contactEmail": "mailto:your-email@example.com",
  "socials": [
    { "name": "GitHub", "url": "https://github.com/your-username" }
  ]
}
```

## 2) Full Save Endpoint (Recommended)

| Method | Endpoint | Purpose |
|---|---|---|
| PUT | `/portfolios/:slug` | Replace all editable portfolio data in one request |

Server behavior (single transaction):
1. Update base fields in `portfolios`
2. Replace `portfolio_quick_info`
3. Replace `portfolio_skill_groups` + `portfolio_skill_items`
4. Replace `portfolio_skill_images`
5. Replace `portfolio_projects` + `project_tech_stack`
6. Replace `portfolio_social_links`

### PUT /portfolios/:slug
Request:

```json
{
  "name": "Chea Kimeng",
  "title": "Student (Software Developer)",
  "location": "Cambodia",
  "intro": "I am learning software development...",
  "aboutTitle": "Software Developer Student",
  "about": "I am a software developer student...",
  "quickInfo": [
    { "label": "Education", "value": "TUX Global Institute" }
  ],
  "skills": [
    {
      "category": "Frontend",
      "items": ["React", "Tailwind CSS", "JavaScript"]
    }
  ],
  "skillImages": [
    "https://cdn.example.com/react-logo.svg"
  ],
  "projects": [
    {
      "id": 11,
      "category": "Web",
      "title": "Student Task Tracker",
      "description": "Task management app...",
      "techStack": ["React", "Tailwind CSS", "Firebase"],
      "githubUrl": "https://github.com/...",
      "liveUrl": "https://..."
    }
  ],
  "contactDetail": "I am always happy to talk about collaboration...",
  "contactEmail": "mailto:your-email@example.com",
  "socials": [
    { "name": "GitHub", "url": "https://github.com/your-username" },
    { "name": "LinkedIn", "url": "https://linkedin.com/in/your-username" }
  ]
}
```

Response `200`:

```json
{
  "status": "updated"
}
```

## 3) Optional Section Save Endpoints

| Method | Endpoint | Dashboard Section |
|---|---|---|
| PATCH | `/portfolios/:slug/basic` | Basic Information |
| PUT | `/portfolios/:slug/quick-info` | Quick Info |
| PUT | `/portfolios/:slug/skills` | Skills + Skill Images |
| PUT | `/portfolios/:slug/projects` | Projects |
| PATCH | `/portfolios/:slug/contact` | Contact |
| PUT | `/portfolios/:slug/socials` | Social Links |

Each section endpoint updates only the related table(s) listed in "Database Mapping".

## 4) Contact Message Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/portfolios/:slug/contact-messages` | Save visitor contact form message |
| GET | `/portfolios/:slug/contact-messages` | List messages for dashboard |
| PATCH | `/contact-messages/:messageId/read` | Mark one message as read |

### POST /portfolios/:slug/contact-messages
Request:

```json
{
  "name": "Jane",
  "email": "jane@example.com",
  "subject": "Internship opportunity",
  "message": "Can we discuss a project?"
}
```

Response `201`:

```json
{
  "id": 45,
  "status": "received"
}
```

## 5) Standard Error Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid payload",
    "details": [
      { "field": "contactEmail", "message": "Must be a valid email or mailto link" }
    ]
  }
}
```

Suggested HTTP status codes:
- `200` success read/update
- `201` created
- `400` validation error
- `404` not found
- `500` server error
