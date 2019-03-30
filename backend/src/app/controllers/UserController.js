const express=require('express')
const { User } = require("../models");

const router=express.Router();

router.get('/', async (req,res)=>{
    const users = await User.findAll();
    return res.status(200).send({users})
})

router.get('/:idUser', async (req,res)=>{
    const id=req.params.idUser
    const user = await User.findByPk(id);
    return res.status(200).send({user})
})

router.post('/', async (req,res)=>{
    try {
        const { name, email, password } = req.body;
        const user=await User.create({ name, email, password})
        return res.status(200).send({user})
    }
    catch(err){
        return res.status(400).send({ error: 'Error create user' });
    }
})

router.put('/:idUser', async (req,res)=>{
    try {
        const { name, email, password } = req.body;
        const user=await User.create({ name, email, password})
        return res.status(200).send({user})
    }
    catch(err){
        return res.status(400).send({ error: 'Error create user' });
    }
})

module.exports =router