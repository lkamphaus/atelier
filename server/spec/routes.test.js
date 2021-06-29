const app = require('../index.js');
const db = require('.././db/index.js');
const supertest = require('supertest');

beforeAll(done => {
  done()
})

describe('/products', () => {
   it('Products endpoint should respond with 200 status code', async () => {
     const response = await supertest(app).get('/products');
     expect(response.statusCode).toBe(200);
   });

   it('Products endpoint should respond with 5 rows if count is not defined', async () => {
    const response = await supertest(app).get('/products');
    const responseBody = response.body;
    expect(responseBody.length).toEqual(5);
  });

  it('Products endpoint should respond with 5 rows if count is not defined', async () => {
    const response = await supertest(app).get('/products?page=1&count=15');
    const responseBody = response.body;
    expect(responseBody.length).toEqual(15);
  });
});

describe('/products/:product_id', () => {
  it('Product id endpoint should respond with 200 status code', async () => {
    const response = await supertest(app).get('/products/1');
    expect(response.statusCode).toBe(200);
  });
});

describe('/products/:product_id/related', () => {
  it('Product related endpoint should respond with 200 status code', async () => {
    const response = await supertest(app).get('/products/1/related');
    expect(response.statusCode).toBe(200);
  });
});

afterAll(done => {
  db.client.end()
  done()
})


// it('Product styles endpoint should respond with 200 status code', async () => {
//   const response = await supertest(app).get('/products/2/styles');
//   expect(response.statusCode).toBe(200);
// });