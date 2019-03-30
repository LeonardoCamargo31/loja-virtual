const express = require('express');

const { User } = require("../models");

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    //usuario não existir
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }

    //função criada no modal, que compara a senha, se retornar false a senha é invalida 
    if (!(await user.checkPassword(password))) {
        return res.status(401).json({ message: "Incorrect password" });
    }

    return res.send({
        user,
        token: user.generateToken()
    });
})

module.exports = router