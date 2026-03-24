require("dotenv").config();

const { Pool } = require("pg");
// const isProduction = process.env.NODE_ENV === "production"; // because SSL is only needed in production

const pool = new Pool({
  connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  // ssl: isProduction
  //   ? {
  //       rejectUnauthorized: false, // Needed for Render / Railway / Supabase hosted databases
  //     }
  //   : false,
});

module.exports = pool;
