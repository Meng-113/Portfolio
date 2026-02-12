import pool from '../config/db.js';

export const getProfileService = async (id) => {
  const result = await pool.query(`Select * from profile where id=$1`, [id]);
  return result.rows[0];
};

export const updateProfileService = async (
  id,
  name,
  title,
  location,
  about_title,
  intro,
  about,
  contact_detail,
  contact_email,
) => {
  const result = await pool.query(
    `UPDATE profile SET name=$1, title=$2, location=$3, about_title=$4, intro=$5, about=$6, contact_detail=$7, contact_email=$8 WHERE id=$9 RETURNING *`,
    [
      name,
      title,
      location,
      about_title,
      intro,
      about,
      contact_detail,
      contact_email,
      id,
    ],
  );
  return result.rows[0];
};
