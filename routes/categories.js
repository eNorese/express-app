const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const { categoryId, productId } = req.query;

    if (categoryId && productId) {
        res.json({
            categoryId,
            productId,
        });
    } else {
        res.send("Categorias");
    }
});

router.get('/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;

    res.json({
        categoryId,
        productId,
    });
});

module.exports = router;
