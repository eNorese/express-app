const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const { limit, offset } = req.query;

    if (limit && offset) {
        res.status(200).json({
            limit, offset
        });
    } else {
        res.status(206).send('No hay parámetros');
    }
});

router.post('/', (req, res) => {
    const body = req.body;
    console.info('POST /users');

    res.status(201).json({
        message: 'User created',
        data: body
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    console.info(`PUT /users/${id}`);

    if(id == 999) {
        res.status(404).json({
            message: "Not found"
        });
    } else {
        res.status(200).json({
            message: "User deleted",
            body,
            id
        });
    }
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    console.info(`PATCH /users/${id}`);

    res.status(202).json({
        message: "User updated",
        body,
        id
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.info(`DELETE /users/${id}`);

    res.status(203).json({
        message: "User deleted",
        id
    });
});


module.exports = router;
