const express = require('express');
// const bodyParser = require('body-parser');
// const mongoPractice = require('./mongo')
const mongoosePractice = require('./mongoose')

const app = express();

app.use(express.json());

app.post('/products', mongoosePractice.createProduct);

app.get('/products', mongoosePractice.getProducts);

// app.post('/products', mongoPractice.createProduct);

// app.get('/products', mongoPractice.getProducts);

app.listen(3000);