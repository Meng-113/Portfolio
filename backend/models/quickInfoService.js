import pool from '../config/db.js';

export const createQuickInfoService = async (profile_id, label, value) => {
  const result = await pool.query(
    `
    INSERT INTO quick_info (profile_id, label, value, sort_order)
    VALUES (
      $1, $2, $3,
      COALESCE((SELECT MAX(sort_order) + 1 FROM quick_info WHERE profile_id = $1), 0)
    )
    RETURNING *
    `,
    [profile_id, label, value]
  );
  return result.rows[0];
};

export const getQuickInfosService = async (profile_id) => {
  // Use profile_id, not just id
  // Allow optional profile_id filtering if needed, or mandatory.
  // Based on other services, we pass profile_id.
  const result = await pool.query(
    `
    SELECT * FROM quick_info
    WHERE profile_id = $1
    ORDER BY sort_order, id
    `,
    [profile_id]
  );
  return result.rows;
};

// Keeping getQuickInfoService (single item) if it was used, but renamed or commented?
// The user likely wants the standard CRUD.
export const getQuickInfoByIdService = async (id) => {
  const result = await pool.query(
    `SELECT * FROM quick_info WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

export const updateQuickInfoService = async (id, profile_id, label, value) => {
  const result = await pool.query(
    `
    UPDATE quick_info
    SET label = $1, value = $2
    WHERE id = $3 AND profile_id = $4
    RETURNING *
    `,
    [label, value, id, profile_id]
  );
  return result.rows[0];
};

export const deleteQuickInfoService = async (id, profile_id) => {
  const result = await pool.query(
    `
    DELETE FROM quick_info
    WHERE id = $1 AND profile_id = $2
    RETURNING *
    `,
    [id, profile_id]
  );
  return result.rows[0];
};
