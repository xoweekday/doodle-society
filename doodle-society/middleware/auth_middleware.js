/**
 * Auth Middleware decorator
 */
const fastifyPlugin = require('fastify-plugin');

module.exports = fastifyPlugin(async (fastify) => {
    fastify.decorate('jwtAuthentication', async( req, res ) => {
        try {
            await req.jwtVerify();
        }catch(error){
            res.send(error)
        }
    })
})