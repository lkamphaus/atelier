const { Client, Pool } = require('pg');
const pgConfig = require('./connection.js');


// const client = new Client(pgConfig.uri);


const connectionString = pgConfig.uri

const pool = new Pool({
  connectionString,
});

(async function() {
  try {
    const client = await pool.connect();
    const res = await (console.log('Connected to DB!'));
    await client.query('SELECT NOW()')
    client.release()
  } catch (err) {
    console.log(console.log(err.stack));
  }
})()

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
    const res = await pool.query(getProducts, [count, pageCalc]);
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
                      ON product_info.id = product_features.product_id
                      WHERE product_info.id = $1;`;
  try {
    const res = await pool.query(getProducts, [id]);
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
                            ON product_styles.id = style_photos.style_id
                            LEFT JOIN style_skus
                            ON product_styles.id = style_skus.style_id
                            WHERE product_styles.product_id = $1;`;
  try {
    const res = await pool.query(getProductStyles, [id]);
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
    const res = await pool.query(getRelatedProducts, [id]);
    return res;
  } catch(err) {
    console.log(err.stack)
  }
};

module.exports = {
  pool,
  getProducts,
  getProductsById,
  getProductsStylesById,
  getRelatedProductsById
};
