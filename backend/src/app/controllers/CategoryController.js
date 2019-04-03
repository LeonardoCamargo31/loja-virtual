const express = require('express')
const { Category, Product } = require("../models");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).send(responseFormat(true, 'Todas as categorias foram encontradas', categories))
    }
    catch (err) {
        return res.status(400).send(responseFormat(false, 'Não foi possível encontrar as categorias', err));
    }
})

router.get('/:idCategory', async (req, res) => {
    try {
        const id = req.params.idCategory
        const category = await Category.findByPk(id);
        return res.status(200).send(responseFormat(true, 'Categoria encontrada', category))
    }
    catch (err) {
        return res.status(400).send(responseFormat(false, 'Não foi possível encontrar a categoria', err));
    }
})

router.post('/', async (req, res) => {
    try {
        const { title } = req.body;
        console.log(title)

        const category = await Category.create({ title })
        return res.status(200).send(responseFormat(true, 'Categoria inserida', category))
    }
    catch (err) {
        return res.status(400).send(responseFormat(false, 'Não foi possível inserir a categoria', err));
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
            return res.status(200).send(responseFormat(true, 'Categoria atualizada', category))
        }
        else {
            return res.status(400).send(responseFormat(false, 'Categoria não encontrado', null));
        }
    }
    catch (err) {
        return res.status(400).send(responseFormat(false, 'Não foi possível atualizar a categoria', err));
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
                return res.status(200).send(responseFormat(true, 'Categoria deletada com sucesso', null))
            }
            else {
                return res.status(400).send(responseFormat(false, 'Categoria não encontrado', null));
            }
        }
        else {
            return res.status(400).send(responseFormat(false, 'Essa categoria tem produtos', null));
        }
    }
    catch (err) {
        return res.status(400).send(responseFormat(false, 'Não foi possível deletar a categoria', err));
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