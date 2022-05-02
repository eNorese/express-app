const express = require('express');
const faker = require('faker');
const ProductsService = require('./../services/productsService');
const { validatorHandler } = require('./../middlewares/validatorHandler');
const {
    createProductScheme,
    updateProductScheme,
    getProductScheme
} = require('./../schemas/productSchema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
    const products = await service.find();
    console.log('GET /products');
    res.json(products);
});

router.get('/filter', (req, res) => {
    res.send('So y un filter');
});

router.get('/:id',
    validatorHandler(getProductScheme, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            console.info(`GET /products/${id}`);
            res.json(product);
        } catch(error) {
            next(error);
        }
});

router.post('/',
    validatorHandler(createProductScheme, 'body'),
    async (req, res) => {
        const body = req.body;
        const newProduct = await service.create(body);
        res.json(newProduct);

});

router.put('/:id',
    validatorHandler(getProductScheme, 'params'),
    validatorHandler(updateProductScheme, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const product = await service.update(id, body);
            res.json({
                message: "Updated product",
                product
            });
        } catch(error) {
            next(error);
        }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
});

module.exports = router;
