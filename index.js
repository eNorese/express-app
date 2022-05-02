const express = require('express');
const cors = require('cors');
const app = express();
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');

const port = process.env.PORT || 3000;
const productos = require('./products');

// para recibir info tipo json
app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myap.cl'];
const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido'));
        }
    }
}

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hola a mi server en express');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Escuchando en puerto ${port}`);
});
