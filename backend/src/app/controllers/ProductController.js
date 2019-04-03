const express = require('express')
const { Product } = require("../models");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.status(200).send(responseFormat(true, 'Todos os produtos foram encontrados', products))
    }
    catch (err) {
        return res.status(400).send(responseFormat(false, 'Não foi possível encontrar os produtos', err));
    }
})

router.get('/:idCategory', async (req, res) => {
    try {
        const id = req.params.idCategory
        const category = await Category.findByPk(id);
        return res.status(200).send(responseFormat(true, 'Produto encontrada', category))
    }
    catch (err) {
        return res.status(400).send(responseFormat(false, 'Não foi possível encontrar o produto', err));
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, description, price, category } = req.body;

        const product = await Product.create({ title, description, price, category })
        return res.status(200).send(responseFormat(true, 'Produto inserido', product))
    }
    catch (err) {
        return res.status(400).send(responseFormat(false, 'Não foi possível inserir o produto', product));
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
            return res.status(200).send(responseFormat(true, 'Produto atualizado', product))
        }
        else {
            return res.status(400).send(responseFormat(false, 'Produto não encontrado', null));
        }
    }
    catch (err) {
        return res.status(400).send(responseFormat(false, 'Não foi possível atualizar o produto', err));
    }
})

router.delete('/:idProduct', async (req, res) => {
    try {
        const id = req.params.idProduct
        const result = await Product.destroy({
            where: { id }
        })
        if (result == 1) {
            return res.status(200).send(responseFormat(true, 'Produto deletado com sucesso', null))
        }
        else {
            return res.status(400).send(responseFormat(false, 'Produto não encontrado', null));
        }
    }
    catch (err) {
        return res.status(400).send(responseFormat(false, 'Não foi possível deletar o produto', err));
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