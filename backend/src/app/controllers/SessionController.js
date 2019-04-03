const express = require('express');

const { User } = require("../models");

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    console.log(email)
    const user = await User.findOne({ where: { email } });

    //usuario não existir
    if (!user) {
        return res.status(404).send(responseFormat(false, 'Usuario não encontrado', null));
    }

    //função criada no modal, que compara a senha, se retornar false a senha é invalida 
    if (!(await user.checkPassword(password))) {
        return res.status(401).send(responseFormat(false, 'Senha inválida', null));
    }

    return res.status(200).send(responseFormat(true, 'Usuario autenticado com sucesso', {
        user,
        token: user.generateToken()
    }));
})

function responseFormat(success, msg, data) {
    const retorno = {
        success: success,
        message: msg,
        details: data
    }
    console.log(retorno)
    return retorno;
}

module.exports = router