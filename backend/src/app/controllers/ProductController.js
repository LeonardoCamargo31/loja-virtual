const express = require('express')
const { Product } = require("../models");

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.findAll();
    return res.status(200).send({ products })
})

router.get('/:idCategory', async (req, res) => {
    const id = req.params.idCategory
    const category = await Category.findByPk(id);
    return res.status(200).send({ category })
})

router.post('/', async (req, res) => {
    try {
        const { title, description, price, category } = req.body;

        const product = await Product.create({  title, description, price, category })
        return res.status(200).send({ product })
    }
    catch (err) {
        return res.status(400).send({ error: 'Error create product' });
    }
})

router.put('/:idProduct', async (req, res) => {
    try {
        const id = req.params.idProduct
        const { title, description, price, category } = req.body;

        //verifico se esse produto existe
        let findProduct = await Product.findAll({
            where: { id }
        });

        //caso encontre um registro, então altero
        if (findProduct.length == 1) {
            await Product.update({ title, description, price, category }, { where: { id } })
            let product = await Product.findAll({
                where: { id }
            });
            product = product[0]
            return res.status(200).send({ product })
        }
        else {
            return res.status(400).send({ error: 'Produto não encontrado' });
        }
    }
    catch (err) {
        return res.status(400).send({ error: 'Error update product' });
    }
})

router.delete('/:idProduct', async (req, res) => {
    try {
        const id = req.params.idProduct
        const result = await Product.destroy({
            where: { id }
        })
        if (result == 1) {
            return res.status(200).send({ result: "Deletado com sucesso" })
        }
        else {
            return res.status(400).send({ error: 'Produto não encontrado' });
        }
    }
    catch (err) {
        return res.status(400).send({ error: 'Error remove product' });
    }
})

module.exports = router