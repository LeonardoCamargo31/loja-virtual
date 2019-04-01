const express = require('express')
const { Category, Product } = require("../models");

const router = express.Router();

router.get('/', async (req, res) => {
    const categories = await Category.findAll();
    return res.status(200).send({ categories })
})

router.get('/:idCategory', async (req, res) => {
    const id = req.params.idCategory
    const category = await Category.findByPk(id);
    return res.status(200).send({ category })
})

router.post('/', async (req, res) => {
    try {
        const { title } = req.body;
        console.log(title)

        const category = await Category.create({ title })
        return res.status(200).send({ category })
    }
    catch (err) {
        return res.status(400).send({ error: 'Error create category' });
    }
})

router.put('/:idCategory', async (req, res) => {
    try {
        const id = req.params.idCategory
        const { title } = req.body;

        //verifico se esse usuario existe
        let findCategory = await Category.findAll({
            where: { id }
        });

        //caso encontre um registro, então altero
        if (findCategory.length == 1) {
            await Category.update({ title }, { where: { id } })
            let category = await Category.findAll({
                where: { id }
            });
            category = category[0]
            return res.status(200).send({ category })
        }
        else {
            return res.status(400).send({ error: 'Categoria não encontrado' });
        }
    }
    catch (err) {
        return res.status(400).send({ error: 'Error update category' });
    }
})

router.delete('/:idCategory', async (req, res) => {
    try {
        const id = req.params.idCategory
        const products = await Product.findAll({ where: { category: id } })
        
        if (products.length == 0) {
            const result = await Category.destroy({
                where: { id }
            })
            if (result == 1) {
                return res.status(200).send({ result: "Deletado com sucesso" })
            }
            else {
                return res.status(400).send({ error: 'Categoria não encontrado' });
            }
        }
        else {
            return res.status(400).send({ error: 'Essa categoria tem produtos' });
        }
    }
    catch (err) {
        return res.status(400).send({ error: 'Error remove category' });
    }
})

module.exports = router