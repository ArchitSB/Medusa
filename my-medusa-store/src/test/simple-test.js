// Simple test to verify connectivity
const request = require('supertest');
const api = request('http://localhost:9000');

describe('Simple Store Test', () => {
  const PUBLISHABLE_API_KEY = 'pk_0cb0cfb2548e77fe0b737df879d224fce73f502d89f015369e77097cc70024c0';

  function storeApi() {
    return {
      get: (path) => api.get(path).set('x-publishable-api-key', PUBLISHABLE_API_KEY),
    };
  }

  it('should access regions', async () => {
    const res = await storeApi().get('/store/regions');
    console.log('Regions response status:', res.status);
    expect(res.status).toBe(200);
  }, 5000);

  it('should access products', async () => {
    const res = await storeApi().get('/store/products');
    console.log('Products response status:', res.status);
    expect(res.status).toBe(200);
  }, 5000);
});
