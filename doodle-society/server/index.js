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
  db.getUserByGoogleId(req, res)
  .then((user) => {
    if(user.rowCount) {
      console.log(user.rows);
      console.log("already logged in as " + user.rows[0].name);
      res.status(200).send(user.rows[0].id);
      return;
    }
    return db.createUser(req, res);
  })
  .then((results) => {
    if (results) {
      res.status(201).send(results.rows[0].id);
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send();
  });
});

fastify.get('/api/users/:id', (req, res) => {
  db.getUserById(req, res)
    .then(user => res.status(200).send(user.rows[0]))
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    })
});

fastify.post('/api/images', (req, res) => {
  db.addImage(req, res)
    .then(image => res.status(201).send(image))
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    })
});

fastify.get('/api/images/:id', (req, res) => {
  db.getUserUploads(req, res)
    .then(images => res.status(200).send(images.rows))
    .catch((err) => {
      console.error(err);
      res.status(500).send();
    });
});