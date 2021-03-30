const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({message: 'Tudo ok com o GET root'})
})

router.post('/', (req, res) => {
    return res.send({message: 'Tudo ok com o POST root'})
})


module.exports = router;