const express = require('express');
const router = express.Router();
const dados = require('../model/cadastro');

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


module.exports = router;