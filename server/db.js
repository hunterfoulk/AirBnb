const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Murphy01",
  host: "database-1.clmugbazfa82.us-east-2.rds.amazonaws.com",
  port: 5432,
  database: "initaldatabase",
});

module.exports = pool;
