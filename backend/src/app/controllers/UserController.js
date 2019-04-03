const express = require('express')
const { User } = require("../models");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).send(responseFormat(true, 'Todas os usuarios foram encontrados', users))
    }
    catch (err) {
        return res.status(400).send(responseFormat(false, 'Não foi possível encontrar os usuarios', err));
    }
})

router.get('/:idUser', async (req, res) => {
    try {
        const id = req.params.idUser
        const user = await User.findByPk(id);
        return res.status(200).send(responseFormat(true, 'Usuario encontrado', user))
    }
    catch (err) {
        return res.status(400).send(responseFormat(false, 'Não foi possível encontrar o usuario', err));
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //verificar se email já existe
        const users = await User.findAll({
            where: { email }
        });

        if (users.length == 0) {
            const user = await User.create({ name, email, password })
            return res.status(200).send(responseFormat(true, 'Usuario inserido', user))
        }
        else {
            return res.status(400).send(responseFormat(false, 'E-mail já cadastrados', null));
        }
    }
    catch (err) {
        return res.status(400).send(responseFormat(false, 'Não foi possível inserir o usuario', err));
    }
})

router.put('/:idUser', async (req, res) => {
    try {
        const id = req.params.idUser
        const { name } = req.body;

        //verifico se esse usuario existe
        let findUser = await User.findAll({
            where: { id }
        });

        //caso encontre um registro, então altero
        if (findUser.length == 1) {
            await User.update({ name }, { where: { id } })
            let user = await User.findAll({
                where: { id }
            });
            user = user[0]
            return res.status(200).send(responseFormat(true, 'Usuario atualizado', user))
        }
        else {
            return res.status(400).send(responseFormat(false, 'Usuario não encontrado', null));
        }
    }
    catch (err) {
        return res.status(400).send(responseFormat(false, 'Não foi possível atualizar o usuario', err));
    }
})

router.delete('/:idUser', async (req, res) => {
    try {
        const id = req.params.idUser
        const result = await User.destroy({
            where: { id }
        })
        if (result == 1) {
            return res.status(200).send(responseFormat(true, 'Usuario deletado com sucesso', null))
        }
        else {
            return res.status(400).send(responseFormat(false, 'Usuario não encontrado', null));
        }
    }
    catch (err) {
        return res.status(400).send(responseFormat(false, 'Não foi possível deletar o usuario', err));
    }
})

function responseFormat(success, msg, data) {
    const retorno = {
        success: success,
        message: msg,
        details: data
    }
    return retorno;
}

module.exports = router