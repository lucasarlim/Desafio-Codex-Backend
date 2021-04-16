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
    return jwt.sign({
        iss: 'desafio',
        sub: userId,
        iat: new Date().getTime()
    }, config.jwt_pass);
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

        const token = createUserToken(user._id) 
        user.token.push(token)
        await user.save()

        user.password = undefined;
        return res.send({ user });
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
    return res.status(201).send('logout realizado com sucesso')

});

router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Tasks.find({userid: req.id});
        return res.send(tasks.sort((a,b) => {
            if(a.tasks.prioridade > b.tasks.prioridade) return 1;
            else if(a.tasks.prioridade < b.tasks.prioridade) return -1;
            else return 0;}));
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de tarefas!' });
    }
});

router.post('/tasks/create', auth,async (req, res) => {
    const tasks = req.body;

    try {
        const task = await Tasks.create(tasks);

        return res.status(201).send(task);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar Task' });
    }
});

router.put('/tasks/edit', auth,async (req, res) => {
    const tasks = await Tasks.findOne({_id: req.body._id });
    console.log(tasks)
    tasks.task = req.body.task
    tasks.prioridade = req.body.prioridade
    console.log(tasks)
    await tasks.save();
    return res.status(201).send(tasks);
});

router.delete('/tasks/delete', auth,async (req, res) => {
    await Tasks.findOneAndDelete({_id: req.body._id });
    res.status(201).send('task apagada com sucesso');
});

module.exports = router;