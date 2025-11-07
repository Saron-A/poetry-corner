const pool = require("./pool");

//define some queries
const getAllPoemsByUserId = async (userId) => {
  const { rows } = await pool.query("SELECT * FROM poems WHERE user_id = $1", [
    userId,
  ]);
  return rows;
};

const getPoemById = async (poemId) => {
  const { rows } = await pool.query("SELECT * FROM poems WHERE id = $1", [
    poemId,
  ]);
  return rows[0];
};

const getPoemByTitle = async (title) => {
  const { rows } = await pool.query("SELECT * FROM poems WHERE title = $1", [
    title,
  ]);
  return rows[0];
};

module.exports = {
  getAllPoemsByUserId,
  getPoemById,
  getPoemByTitle,
};
