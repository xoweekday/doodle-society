const fastify = require('fastify')({ logger: true });
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