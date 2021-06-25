const express = require('express');
const db = require('../server/db');
const transformers = require('../server/transformers');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products/:product_id', async (req, res) => {
  const { product_id } = req.params;
  try {
    const readProductById = await db.getProductsById(product_id);
    const transformRes = await transformers.groupFeaturesByProductId(readProductById.rows);
    res.json(transformRes);
  } catch (err) {
    console.log(err.stack);
    res.status(400).res.end();
  }
});

app.get('/products/:product_id/styles', async (req, res) => {
  const { product_id } = req.params;
  try {
    const readProductStyleById = await db.getProductsById(id);
    res.status(200).send(JSON.stringify(readProductStyleById.rows));
  } catch (err) {
    console.log(err.stack);
    res.status(400).res.end();
  }
});


app.get('/products/:product_id/related', async (req, res) => {
  const { product_id } = req.params;
  try {
    const readRelatedProductById = await db.getProductsById(id);
    res.status(200).send(JSON.stringify(readRelatedProductById.rows));
  } catch (err) {
    console.log(err.stack);
    res.status(400).res.end();
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
