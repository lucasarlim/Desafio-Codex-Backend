const express = require('express');
const router = express.Router();
const dados = require('./model/cadastro');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./middlewares/auth');
const config = require("./config/config");

//Funções auxiliares
const tokendoUsuario = (userId) => {
    return jwt.sign({id: userId}, config.jwt_key, {expiresIn: config.jwt_time});
}

// Verifica GET e POST
router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.send({message: 'Tudo ok com o GET root'})
});

router.post('/', (req, res) => {
    return res.send({message: 'Tudo ok com o POST root'})
});

// Verifica CRUD Usuarios

router.get('/users', async (req, res) => {
    try{
        const dados = await dados.find({});
        return res.send(data);
    }catch(err){
        res.status(500).send({error: 'Erro na consulta de usuarios'});
    }
});

router.post('/users/create', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

    try {
        if (await dados.findOne({ email })) return res.status(400).send({ error: 'Usuário já registrado!'});

        const user = await dados.create(req.body);
        user.password = undefined;

        return res.status(201).send({user, token: tokendoUsuario(user.id)});
    }catch(err){
        return res.status(500).send({ error: 'Erro ao buscar usuário!'});}
});

router.post('/users/auth', async (req, res) => {
    const { email, password} = req.body;

    if(!email || !password) return res.status(400).send({ erro: 'Dados insuficientes!'});

    try {
        const user = await dados.findOne({ email }).select('+password');
        if (!user) return res.status(400).send({ error: 'Usuário não registrado!' });

        const pass_ok = await bcrypt.compare(password, user.password);

        if(!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar usuário!' });

        user.password = undefined;
        return res.send({user, token: tokendoUsuario(user.id)});
    }
    catch(err){
        return res.status(500).send({ error: 'Erro ao buscar usuário!' });
    }
});

module.exports = router;