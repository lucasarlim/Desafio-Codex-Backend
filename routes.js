const express = require('express');
const router = express.Router();
const dados = require('./model/cadastro');
const bcrypt = require('bcrypt');

// Verifica GET e POST
router.get('/', (req, res) => {
    return res.send({message: 'Tudo ok com o GET root'})
})

router.post('/', (req, res) => {
    return res.send({message: 'Tudo ok com o POST root'})
})

// Verifica CRUD Usuarios

router.get('/users', async (req, res) => {
    try{
        const dados = await dados.find({});
        return res.send(data);
    }catch(err){
        res.send({error: 'erro na consulta de usuarios'});
    }
});

router.post('/users/create', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.send({ error: 'Dados insuficientes!' });

    try {
        if (await dados.findOne({ email })) return res.send({ error: 'Usuário já registrado!'});

        const user = await dados.create(req.body);
        user.password = undefined;
        return res.send(user);
    }catch (err) {
        return res.send({ error: 'Erro ao buscar usuário!' });}
});

router.post('/users/auth', async (req, res) => {
    const { email, password} = req.body;

    if(!email || !password) return res.send({ erro: 'Dados insuficientes!'});

    try {
        const user = await dados.findOne({ email }).select('+password');
        if (!user) return res.send({ error: 'Usuário não registrado!' });

        const pass_ok = await bcrypt.compare(password, user.password);

        if(!pass_ok) return res.send({ error: 'Erro ao autenticar usuário!' });

        user.password = undefined;
        return res.send(user);
    }
    catch (err) {
        return res.send({ error: 'Erro ao buscar usuário!' });
    }
});

module.exports = router;