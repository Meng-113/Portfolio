import pool from '../config/db.js';

export const createSkillImageService = async (profile_id, image_url) => {
  const result = await pool.query(
    `
    INSERT INTO skill_image (profile_id, image_url, sort_order)
    VALUES (
      $1, $2,
      COALESCE((SELECT MAX(sort_order) + 1 FROM skill_image WHERE profile_id = $1), 0)
    )
    RETURNING *
    `,
    [profile_id, image_url],
  );
  return result.rows[0];
};

export const getSkillImagesService = async (profile_id) => {
  const result = await pool.query(
    `
    SELECT * FROM skill_image
    WHERE profile_id = $1
    ORDER BY sort_order, id
    `,
    [profile_id],
  );
  return result.rows;
};

export const deleteSkillImageService = async (id, profile_id) => {
  const result = await pool.query(
    `
    DELETE FROM skill_image
    WHERE id = $1 AND profile_id = $2
    RETURNING *
    `,
    [id, profile_id],
  );
  return result.rows[0];
};
