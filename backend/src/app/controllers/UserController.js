const express = require('express')
const { User } = require("../models");

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.findAll();
    return res.status(200).send({ users })
})

router.get('/:idUser', async (req, res) => {
    const id = req.params.idUser
    const user = await User.findByPk(id);
    return res.status(200).send({ user })
})

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(email)

        //verificar se email já existe
        const users = await User.findAll({
            where: { email }
        });

        if (users.length == 0) {
            const user = await User.create({ name, email, password })
            return res.status(200).send({ user })
        }
        else {
            return res.status(400).send({ error: 'Email já existe' });
        }
    }
    catch (err) {
        return res.status(400).send({ error: 'Error create user' });
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
            return res.status(200).send({ user })
        }
        else {
            return res.status(400).send({ error: 'Usuario não encontrado' });
        }
    }
    catch (err) {
        return res.status(400).send({ error: 'Error update user' });
    }
})

router.delete('/:idUser', async (req, res) => {
    try {
        const id = req.params.idUser
        const result = await User.destroy({
            where: { id }
        })
        if(result==1){
            return res.status(200).send({ result:"Deletado com sucesso" })
        }
        else {
            return res.status(400).send({ error: 'Usuario não encontrado' });
        }
    }
    catch (err) {
        return res.status(400).send({ error: 'Error remove user' });
    }
})

module.exports = router