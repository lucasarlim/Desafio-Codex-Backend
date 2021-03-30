const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.send({message: 'Tudo ok com o método GET!'})
})

app.listen(3000);

module.exports = app;