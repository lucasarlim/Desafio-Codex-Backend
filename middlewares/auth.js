const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Users = require('../model/user')

const auth = (req, res, next) => {
    const token_header = req.headers.auth;
    if(!token_header) return res.status(401).send({ error: 'Token não enviado!' });

<<<<<<< HEAD
    jwt.verify(token_header, config.jwt_pass, async (err, decoded) => {
=======
    jwt.verify(token_header, config.jwt_pass, (err, decoded, async function (next){
>>>>>>> 9e884e9f5c51e1a12783f0397499bce4184379dc
        if (err) return res.status(401).send({ error: 'Token inválido!' });
        const user = await Users.findOne({_id: decoded.sub });
        console.log(user)
        console.log(decoded.sub)
        if (!user.token.includes(token_header)) return res.status(401).send({ error: 'Token inválido!' }); 
        req.id = decoded.sub
        return next();
    }));
}

module.exports = auth;