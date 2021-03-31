const express = require('express');
const router = express.Router();
const dados = require('../model/cadastro');
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
    dados.find({}, (err, data) => {
        if (err) return res.send({error: 'erro na consulta de usuarios'});
        return res.send(data);
    });
});

router.post('/create', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados insuficientes!' });

    dados.findOne({email}, (err, data) => {
        if (err) return res.send({ error: 'Erro ao buscar usuário!' });
        if (data) return res.send({ error: 'Usuário já registrado!' });

        dados.create(req.body, (err, data) => {
            if (err) return res.send({ error: 'Erro ao criar usuário!' });

            data.password = undefined;
            return res.send(data);
        });
    });
});

router.post('/auth', (req, res) => {
    const { email, password} = req.body;

    if(!email || !password) return res.send({ erro: 'Dados insuficientes!'});

    dados.findOne({email}, (err, data) => {
        if(err) return res.send({error: 'Erro ao buscar usuario'})
        if(!data) return res.send({error: 'Usuario não registrado'})

        bcrypt.compare(password, data.password, (err, same) => {
            if(!same) return res.send({erro: 'Erro ao autenticar'});
            
            data.password = undefined;
            return res.send(data);
        })
    }).select('+password');
});

module.exports = router;