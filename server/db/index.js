const { Client } = require('pg');
const pgConfig = require('./config.js');

const client = new Client(pgConfig);
client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack));

//products
const getProducts = async (page, count) => {
  let pageCalc;

  if (!page) {
    pageCalc = 1
  } else {
    pageCalc = count > 100 ? 100 : (count * page) - count;
  }

  if (!count) {
    count = 5;
  }

  const getProducts = `SELECT *
                      FROM product_info
                      LIMIT $1
                      OFFSET $2`;
  try {
    const res = await client.query(getProducts, [count, pageCalc]);
    // await client.end();
    return res;
  } catch(err) {
    console.log(err.stack)
  }
};

//product info
const getProductsById = async (id) => {
  const getProducts = `SELECT
                        product_info.id,
                        name,
                        slogan,
                        description,
                        category,
                        default_price,
                        feature,
                        value
                      FROM product_info
                      LEFT JOIN product_features
                      ON product_id = product_info.id
                      WHERE product_info.id = $1;`;
  try {
    const res = await client.query(getProducts, [id]);
    // await client.end();
    return res;
  } catch(err) {
    console.log(err.stack)
  }
};


//product styles
const getProductsStylesById = async (id) => {
  const getProductStyles = `SELECT
                              product_styles.id,
                              product_id,
                              name,
                              sale_price,
                              original_price,
                              default_style,
                              thumbnail_url,
                              url,
                              style_skus.id,
                              size,
                              quantity
                            FROM product_styles
                            LEFT JOIN style_photos
                            ON style_id = product_styles.id
                            LEFT JOIN style_skus
                            ON style_skus.style_id = product_styles.id
                            WHERE product_styles.product_id = $1;`;
  try {
    const res = await client.query(getProductStyles, [id]);
    // await client.end();
    return res;
  } catch(err) {
    console.log(err.stack)
  }
};

//related products
const getRelatedProductsById = async (id) => {
  const getRelatedProducts = `SELECT
                                related_products.product_id,
                                related_id
                              FROM related_products
                              WHERE product_id = $1;`;
  try {
    const res = await client.query(getRelatedProducts, [id]);
    // await client.end();
    return res;
  } catch(err) {
    console.log(err.stack)
  }
};

module.exports = {
  getProducts,
  getProductsById,
  getProductsStylesById,
  getRelatedProductsById
};
