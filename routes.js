const express = require('express');
const router = express.Router();
const auth = require('./middlewares/auth');
const Users = require('./model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config/config');
const Tasks = require('./model/tasks');

//FUNÇÕES AUXILIARES
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires_in });
};

router.get('/users', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de usuários!' });
    }
});

router.post('/users/create', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

    try {
        if (await Users.findOne({ email })) return res.status(400).send({ error: 'Usuário já registrado!'});

        const user = await Users.create(req.body);
        user.password = undefined;

        return res.status(201).send({user, token: createUserToken(user.id)});
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário!' });
    }
});

router.post('/users/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

    try {
        const user = await Users.findOne({ email }).select('+password');
        if (!user) return res.status(400).send({ error: 'Usuário não registrado!' });

        const pass_ok = await bcrypt.compare(password, user.password);

        if(!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar usuário!' });

        const token = createUserToken(user.id) 
        user.token.push(token)
        await user.save()

        user.password = undefined;
        return res.send({ user, token});
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário!' });
    }
    
});

router.put('/users/logout', auth, async (req, res) => {
    const user = await Users.findOne({_id: req.id }).select('+password');
    const token = req.headers["auth"]
    const index = user.token.indexOf(token)
    user.token.splice(index, 1)
    await user.save()
    return res.send('logout realizado com sucesso')

});

router.get('/tasks', async (req, res) => {
    try {
        const users = await Users.find({userid: req.id});
        return res.send(users);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de usuários!' });
    }
});

router.post('/task/create', async (req, res) => {
    const task = req.body;

    try {
        const task = await Tasks.create(task);

        return res.status(201).send(task);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar Task' });
    }
});

router.put('/task/edit', async (req, res) => {
    const task = req.body;

    try {
        const task = await Tasks.create(task);

        return res.status(201).send(task);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar Task' });
    }
});

router.delete('/task/delete', async (req, res) => {
    const task = req.body;

    try {
        const task = await Tasks.create(task);

        return res.status(201).send(task);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar Task' });
    }
});

module.exports = router;