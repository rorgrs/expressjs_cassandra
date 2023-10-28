const express = require('express')
const path = require('path')
const router = express.Router()
const Product = require('../models/product.js')
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1',
    keyspace: 'defaultks'
});

function randomInt(rightBound) {
    return Math.floor(Math.random() * rightBound);
}

function randomString(size) {
    var alphaChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var generatedString = '';
    for (var i = 0; i < size; i++) {
        generatedString += alphaChars[randomInt(alphaChars.length)];
    }

    return generatedString;
}

/* router.put('/', async (req, res) => {
    try {
        const valor = req.params.valor

        const start = performance.now()

        const produtos = await session
            .query({ collection: "Products" })
            .whereEquals("title", "Bxaxntviwa 87")
            .all()

        produtos.forEach(c => c.price = randomInt(3000000))

        await session.saveChanges()

        const end = performance.now()

        return res.status(200).json({
            message: produtos.length + ' itens editados',
            data: {
                totalTime: end - start,
                produtos: produtos
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Erro interno no servidor',
            error: error
        })
    }
}) */

router.post('/:qtd', async (req, res) => {
    try {
        const qtd = req.params.qtd
        const startAll = performance.now()

        var totalCalcTime = 0;
        var maxTime = 0;
        var minTime = 0;

        for (let j = 0; j < qtd; j++) {
            const startIns = performance.now()

            var queries = [];

            for (let i = 0; i < 100; i++) {
                let product = new Product()
                let uuid = cassandra.types.Uuid.random();
                let query = 'INSERT INTO produtos (id, title, price, currency, storage, manufacturer, in_stock, last_update) VALUES (?,?,?,?,?,?,?,?)';
                let params = [uuid, product.title, product.price, product.currency, product.storage, product.manufacturer, product.in_stock, product.last_update];
                queries.push({ query, params })
            }

            await client.batch(queries, { prepare: true });

            const endIns = performance.now()

            const time = endIns - startIns;

            if (!minTime) minTime = time
            if (!maxTime) maxTime = time
            if (time < minTime) minTime = time
            if (time > maxTime) maxTime = time
            totalCalcTime += time
        }

        const endAll = performance.now()

        return res.status(200).json({
            message: qtd*100 + ' itens cadastrados com sucesso',
            data: {
                totalTime: endAll - startAll,
                maxTime: maxTime,
                minTime: minTime,
                totalCalcTime: totalCalcTime,
                avgTime: totalCalcTime / 10,
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Erro interno no servidor',
            error: error
        })
    }
})

router.post('/', async (req, res) => {
    try {
        let product = new Product()
        const uuid = cassandra.types.Uuid.random();
        const query = 'INSERT INTO produtos (id, title, price, currency, storage, manufacturer, in_stock, last_update) VALUES (?,?,?,?,?,?,?,?)';
        const params = [uuid, product.title, product.price, product.currency, product.storage, product.manufacturer, product.in_stock, product.last_update];

        const start = performance.now()

        var result = await client.execute(query, params, { prepare: true });

        const end = performance.now()

        return res.status(200).json({
            message: 'Item cadastrado com sucesso',
            data: {
                totalTime: end - start,
                result: result
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Erro interno no servidor',
            error: error
        })
    }
})

/* router.get('/:page', async (req, res) => {
    try {
        const page = req.params.page

        if(!page) page = 0;

        const start = performance.now()

        const produtos = await session
            .query({ collection: "Products" })
            .skip(page*500)
            .take(500)
            .all()

        const end = performance.now()

        return res.status(200).json({
            message: produtos.length + ' itens encontrados',
            data: {
                totalTime: end - start,
                produtos: produtos
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Erro interno no servidor',
            error: error
        })
    }
}) */

router.get('/', async (req, res) => {
    try {
        const start = performance.now()

        const query = 'SELECT * FROM produtos WHERE id = ?';

        var result = await client.execute(query, ['PRIMEIROID']);

        const end = performance.now()

        return res.status(200).json({
            message: result.rows.length + ' itens encontrados',
            data: {
                totalTime: end - start,
                result: result
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Erro interno no servidor',
            error: error
        })
    }
})

module.exports = router