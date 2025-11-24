require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false, // Needed for Render / Railway / Supabase hosted databases
  },
});

module.exports = pool;
