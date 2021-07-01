const express = require('express');
const db = require('../server/db');
const transformers = require('../server/transformers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/loaderio-38421adb8677f6d7dbe1058b2a9aecdf.txt', async (req, res) => {
  res.send('loaderio-38421adb8677f6d7dbe1058b2a9aecdf');
});


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
    res.status(200);
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
    const transformedRes = await transformers.groupRelatedProductsByProductId(readRelatedProductById.rows);
    res.json(transformedRes);
  } catch (err) {
    console.log(err.stack);
    res.status(400).res.end();
  }
});

module.exports = app;