# Backend Design Notes

This folder contains a split-table backend design for your portfolio data.

## Files

- `backend/database/schema.sql`
  PostgreSQL schema with section-by-section tables:
  - `portfolios` (basic/contact base fields)
  - `portfolio_quick_info`
  - `portfolio_skill_groups`
  - `portfolio_skill_items`
  - `portfolio_skill_images`
  - `portfolio_projects`
  - `project_tech_stack`
  - `portfolio_social_links`
  - `contact_messages`
  - no `created_at` / `updated_at` columns

- `backend/database/seed.sql`
  Raw starter data for frontend (`slug = chea-kimeng`) across all section tables.

- `backend/api/endpoints.md`
  REST endpoint contract mapped to the split tables.

## Navbar rule

Navbar is fixed default and should be hardcoded in frontend/backend config.
No database table and no edit endpoint for navbar.

## Recommended implementation order

1. Run `backend/database/schema.sql` on PostgreSQL.
2. Run `backend/database/seed.sql` to load frontend starter data.
3. Implement `GET /api/v1/portfolios/:slug` by joining/merging section tables.
4. Implement `PUT /api/v1/portfolios/:slug` (full replace in one transaction).
5. Optionally implement section save endpoints:
   - `PATCH /api/v1/portfolios/:slug/basic`
   - `PUT /api/v1/portfolios/:slug/quick-info`
   - `PUT /api/v1/portfolios/:slug/skills`
   - `PUT /api/v1/portfolios/:slug/projects`
   - `PATCH /api/v1/portfolios/:slug/contact`
   - `PUT /api/v1/portfolios/:slug/socials`
6. Implement `POST /api/v1/portfolios/:slug/contact-messages`.
