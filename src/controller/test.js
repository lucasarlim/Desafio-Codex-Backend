const dados = require('../model/User');
const bcrypt = require('bcrypt');

const TestController = {
    verificaGet(req, res) {
      res.send({message: 'Tudo ok com o GET root'})
    },

    verificaPost(req, res) {
        res.send({message: 'Tudo ok com o Post root'})
    },

    consultaUsuarios(req, res) {
        try{
            const dados = await dados.find({});
            res.send(data);
        }catch(err){
            res.send({error: 'erro na consulta de usuarios'});
        }
    },

    criarUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.send({ error: 'Dados insuficientes!' });}

        try {
            if (await dados.findOne({ email })){
                res.send({ error: 'Usuário já registrado!'});}

            const user = await dados.create(req.body);
            user.password = undefined;
            res.send(user);
        }catch (err) {
            res.send({ error: 'Erro ao buscar usuário!' });
        }
    },

    criptografiaSenha(req, res){
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
    }
  };
  
  module.exports = TestController;