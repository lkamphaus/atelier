const app = require('./index.js');
// const express = require('express');
const supertest = require('supertest');
// const routes = require('./routes.js');

// const app = express();

// console.log('routes', routes);

// app.use('/test', routes.get)


describe('get request', () => {
   it('should respond with 200 status code', async () => {
     const response = await supertest(app).get('/products');
     expect(response.statusCode).toBe(200);
   });
});