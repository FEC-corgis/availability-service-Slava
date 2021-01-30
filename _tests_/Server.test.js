const {app} = require('../server/index');
const request = require('supertest');

describe('GET availability', ()=>{
  test('responds with json', ()=>{
    request(app)
      .get('/availability/1')
      .expect('Content-Type', /json/)
      .expect(200)
  })
  test('responds with 404', ()=>{
    request(app)
      .get('/availability/101')
      .expect(404)
  })
});

describe('GET price', ()=>{
  test('responds with json', ()=>{
    request(app)
      .get('/price/2')
      .expect('Content-Type', /json/)
      .expect(200)
  })
  test('responds with json', ()=>{
    request(app)
      .get('/price/102')
      .expect(404)
  })
});

describe('GET prices', ()=>{
  test('responds with json', ()=>{
    request(app)
      .get('/prices')
      .expect('Content-Type', /json/)
      .expect(200)
  })
});