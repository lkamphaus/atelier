const express = require('express');
const db = require('../server/db');
const transformers = require('../server/transformers');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
  const { page, count } = req.query;

  try {
    const readProductById = await db.getProducts(page, count);
    res.json(readProductById.rows);
  } catch (err) {
    console.log(err.stack);
    res.status(400).res.end();
  }
});


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
    const readProductStyleById = await db.getProductsStylesById(product_id);
    const transformedRes = await transformers.groupStylesByProductId(readProductStyleById.rows);
    res.json(transformedRes);
  } catch (err) {
    console.log(err.stack);
    res.status(400).res.end();
  }
});


app.get('/products/:product_id/related', async (req, res) => {
  const { product_id } = req.params;

  try {
    const readRelatedProductById = await db.getRelatedProductsById(product_id);
    console.log(readRelatedProductById);
    const transformedRes = await transformers.groupRelatedProductsByProductId(readRelatedProductById.rows);
    res.json(transformedRes);
  } catch (err) {
    console.log(err.stack);
    res.status(400).res.end();
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
