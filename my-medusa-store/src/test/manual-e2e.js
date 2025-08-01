// Manual E2E test script
const request = require('supertest');

const API_URL = 'http://localhost:9000';
const PUBLISHABLE_API_KEY = 'pk_0cb0cfb2548e77fe0b737df879d224fce73f502d89f015369e77097cc70024c0';

async function testEndpoint(method, path, headers = {}, body = null) {
  try {
    const defaultHeaders = {
      'x-publishable-api-key': PUBLISHABLE_API_KEY,
      'Content-Type': 'application/json',
      ...headers
    };

    let response;
    if (method === 'GET') {
      response = await request(API_URL).get(path).set(defaultHeaders);
    } else if (method === 'POST') {
      response = await request(API_URL).post(path).set(defaultHeaders).send(body);
    }

    return {
      status: response.status,
      body: response.body,
      success: response.status >= 200 && response.status < 300
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: error.message },
      success: false
    };
  }
}

async function runTests() {
  console.log('🚀 Starting Medusa Store E2E Tests\n');

  const tests = [
    {
      name: 'Store Regions Access',
      method: 'GET',
      path: '/store/regions',
      expectSuccess: true
    },
    {
      name: 'Store Products Access',
      method: 'GET', 
      path: '/store/products',
      expectSuccess: true
    },
    {
      name: 'Health Check',
      method: 'GET',
      path: '/health',
      expectSuccess: true
    },
    {
      name: 'Admin Products (Should be Unauthorized)',
      method: 'GET',
      path: '/admin/products',
      expectSuccess: false,
      expectedStatus: [401, 403]
    },
    {
      name: 'Marketplace Store Endpoint (Plugin Test)',
      method: 'GET',
      path: '/store/marketplace',
      expectSuccess: false, // We expect this might not exist
      expectedStatus: [404, 401]
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    console.log(`Testing: ${test.name}`);
    const result = await testEndpoint(test.method, test.path);
    
    let testPassed = false;
    if (test.expectSuccess) {
      testPassed = result.success;
    } else {
      testPassed = test.expectedStatus ? test.expectedStatus.includes(result.status) : !result.success;
    }

    if (testPassed) {
      console.log(`✅ PASS - Status: ${result.status}`);
      passed++;
    } else {
      console.log(`❌ FAIL - Status: ${result.status}`);
      console.log(`   Expected: ${test.expectSuccess ? 'Success (200-299)' : `Status in [${test.expectedStatus?.join(', ')}]`}`);
      if (result.body && Object.keys(result.body).length > 0) {
        console.log(`   Body: ${JSON.stringify(result.body).substring(0, 100)}...`);
      }
      failed++;
    }
    console.log('');
  }

  console.log(`\n📊 Test Results:`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

  if (failed === 0) {
    console.log('\n🎉 All tests passed! Medusa store is working correctly.');
  } else {
    console.log(`\n⚠️  ${failed} test(s) failed. Check the configuration.`);
  }
}

runTests().catch(console.error);
