const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'doodle',
  password: process.env.DBPASS,
  port: 5432,
});

const createUser = (req, res) => {
  const { username, fullname } = req.body;

  return pool.query('INSERT INTO users (username, fullname) VALUES ($1, $2) RETURNING id', [username, fullname]);
}

module.exports = {
  createUser,
}