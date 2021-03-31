const router = require('express').Router();
const TestController = require('@controller/test');

router.get('/', TestController.verificaGet);
router.post('/', TestController.verificaPost);

router.get('/', TestController.consultaUsuarios);
router.post('/create', TestController.criarUser);
router.post('/auth', TestController.criptografiaSenha);

module.exports = router;
