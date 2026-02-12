import pool from '../config/db.js';

export const createSocialService = async (profile_id, name, url, url_image) => {
  const result = await pool.query(
    `
    INSERT INTO social_link (profile_id, name, url, url_image, sort_order)
    VALUES (
      $1, $2, $3, $4,
      COALESCE((SELECT MAX(sort_order) + 1 FROM social_link WHERE profile_id = $1), 0)
    )
    RETURNING *
    `,
    [profile_id, name, url, url_image]
  );
  return result.rows[0];
};

export const getSocialsService = async (profile_id) => {
  const result = await pool.query(
    `
    SELECT * FROM social_link
    WHERE profile_id = $1
    ORDER BY sort_order, id
    `,
    [profile_id]
  );
  return result.rows;
};

export const updateSocialService = async (id, profile_id, name, url, url_image) => {
  const result = await pool.query(
    `
    UPDATE social_link
    SET name = $1, url = $2, url_image = $3
    WHERE id = $4 AND profile_id = $5
    RETURNING *
    `,
    [name, url, url_image, id, profile_id]
  );
  return result.rows[0];
};

export const deleteSocialService = async (id, profile_id) => {
  const result = await pool.query(
    `
    DELETE FROM social_link
    WHERE id = $1 AND profile_id = $2
    RETURNING *
    `,
    [id, profile_id]
  );
  return result.rows[0];
};
