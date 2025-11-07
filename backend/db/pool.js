require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  // ssl: {
  //   require: true,
  //   rejectUnauthorized: false, // Needed for Render / Railway / Supabase hosted databases
  // },
});

module.exports = pool;
