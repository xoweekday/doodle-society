const boom = require('boom');
async function AuthRouter(fastify){
    fastify.post('/api/v1/generateAccessToken', async (req, res) => {
        try{
            const { email, userid, password} = req.body;
            if(!email || !userid || !password){
                res.status(400).send({msg: "Required params are missing"});
                return;
            }
            //Database check will need to import from the db querys
            // let userData = db.query("select email from users where user_id=?", [userid]);
            // if(userData && userData.length > 0){
            //     //generate JWT
            // }
                const token = fastify.jwt.sign({email, userid, password}, {expiresIn: 8080});
                res.status(200).send({token, email});
            
        }catch(error) {
            throw boom.boomify(error);
        }
    })
}


module.exports = AuthRouter;