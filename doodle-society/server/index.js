const fastify = require('fastify')({ logger: true });
require('dotenv').config();
const db = require('./db');
const start = async () => {
  try {
    await fastify.listen(4000);
  }
  catch(error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

start();

fastify.get('/api/noodle', (req, res) => {
  res.status(200).send('My Noodle');
});

fastify.get('/api/doodle', (req, res) => {
  res.status(200).send('Doodle');
});

fastify.post('/api/users', (req, res) => {
  db.createUser(req, res)
  .then(results => res.status(201).send(results.rows[0].id))
  .catch((err) => {
    console.error(err);
    res.status(500).send();
  });
})