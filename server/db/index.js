const { Client, Pool } = require('pg');
const pgConfig = require('./connection.js');


// const client = new Client(pgConfig.uri);


const config = {
  user: 'postgres',
  database: 'products',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
}

const pool = new Pool(config);


//products
const getProducts = async (page, count) => {
  let res;

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
    res = await pool.query(getProducts, [count, pageCalc]);
  } catch(err) {
    console.log(err.stack)
  }

  return res;
};

//product info
const getProductsById = async (id) => {
  let res;
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
    res = await pool.query(getProducts, [id]);
  } catch(err) {
    console.log(err.stack)
  }
  return res;
};

//product styles
const getProductsStylesById = async (id) => {
  let res;
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
    res = await pool.query(getProductStyles, [id]);
  } catch(err) {
    console.log(err.stack)
  }
  return res;
};

//related products
const getRelatedProductsById = async (id) => {
  let res;
  const getRelatedProducts = `SELECT
                                related_products.product_id,
                                related_id
                              FROM related_products
                              WHERE product_id = $1;`;

  try {
    res = await pool.query(getRelatedProducts, [id]);
  } catch(err) {
    console.log(err.stack)
  }

  return res;
};

module.exports = {
  pool,
  getProducts,
  getProductsById,
  getProductsStylesById,
  getRelatedProductsById
};
