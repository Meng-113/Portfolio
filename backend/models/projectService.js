import pool from '../config/db.js';

export const createProjectService = async (
  profile_id,
  category,
  title,
  description,
  tech_stack,
  github_url,
  live_url
) => {
  const result = await pool.query(
    `
    INSERT INTO project (profile_id, category, title, description, tech_stack, github_url, live_url, sort_order)
    VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      COALESCE((SELECT MAX(sort_order) + 1 FROM project WHERE profile_id = $1), 0)
    )
    RETURNING *
    `,
    [profile_id, category, title, description, tech_stack, github_url, live_url]
  );
  return result.rows[0];
};

export const getProjectsService = async (profile_id) => {
  const result = await pool.query(
    `
    SELECT * FROM project
    WHERE profile_id = $1
    ORDER BY sort_order, id
    `,
    [profile_id]
  );
  return result.rows;
};

export const updateProjectService = async (
  id,
  profile_id,
  category,
  title,
  description,
  tech_stack,
  github_url,
  live_url
) => {
  const result = await pool.query(
    `
    UPDATE project
    SET 
      category = $1,
      title = $2,
      description = $3,
      tech_stack = $4,
      github_url = $5,
      live_url = $6
    WHERE id = $7 AND profile_id = $8
    RETURNING *
    `,
    [category, title, description, tech_stack, github_url, live_url, id, profile_id]
  );
  return result.rows[0];
};

export const deleteProjectService = async (id, profile_id) => {
  const result = await pool.query(
    `
    DELETE FROM project
    WHERE id = $1 AND profile_id = $2
    RETURNING *
    `,
    [id, profile_id]
  );
  return result.rows[0];
};
