const jwt = require('jsonwebtoken')
const config = require("../config/config");

const auth = (req, res, next) => {
    const token_header = req.token_headers.auth

    if(!token_header) return res.status(401).send({error: "Autenticação não enviada"});

    jwt.verify(token_header, config.jwt_key, (err, decoded) => {
        if(err) return res.status(401).send({error: "Token inválido!"});
        res.locals.auth_data = decoded
        return next();
    })
}

module.exports = auth