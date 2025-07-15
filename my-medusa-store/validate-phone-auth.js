#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Phone Auth Setup...\n');

// Check if required files exist
const requiredFiles = [
  'src/modules/phone-auth/service.ts',
  'src/modules/phone-auth/index.ts',
  'src/modules/twilio-sms/service.ts',
  'src/modules/twilio-sms/index.ts',
  'src/subscribers/send-otp.ts',
  'src/api/middlewares.ts',
  'medusa-config.ts',
  '.env.example'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check medusa-config.ts for phone auth modules
if (fs.existsSync('medusa-config.ts')) {
  const configContent = fs.readFileSync('medusa-config.ts', 'utf8');
  
  if (configContent.includes('phone-auth')) {
    console.log('✅ medusa-config.ts includes phone-auth module');
  } else {
    console.log('❌ medusa-config.ts missing phone-auth module');
    allFilesExist = false;
  }
  
  if (configContent.includes('twilio-sms')) {
    console.log('✅ medusa-config.ts includes twilio-sms module');
  } else {
    console.log('❌ medusa-config.ts missing twilio-sms module');
    allFilesExist = false;
  }
}

// Check package.json for dependencies
if (fs.existsSync('package.json')) {
  const packageContent = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const dependencies = { ...packageContent.dependencies, ...packageContent.devDependencies };
  
  if (dependencies.twilio) {
    console.log('✅ twilio package installed');
  } else {
    console.log('❌ twilio package not installed');
    allFilesExist = false;
  }
  
  if (dependencies.jsonwebtoken) {
    console.log('✅ jsonwebtoken package installed');
  } else {
    console.log('❌ jsonwebtoken package not installed');
    allFilesExist = false;
  }
}

// Check .env.example
if (fs.existsSync('.env.example')) {
  const envContent = fs.readFileSync('.env.example', 'utf8');
  
  if (envContent.includes('TWILIO_ACCOUNT_SID')) {
    console.log('✅ .env.example includes TWILIO_ACCOUNT_SID');
  } else {
    console.log('❌ .env.example missing TWILIO_ACCOUNT_SID');
    allFilesExist = false;
  }
  
  if (envContent.includes('PHONE_AUTH_JWT_SECRET')) {
    console.log('✅ .env.example includes PHONE_AUTH_JWT_SECRET');
  } else {
    console.log('❌ .env.example missing PHONE_AUTH_JWT_SECRET');
    allFilesExist = false;
  }
}

// Check .env file
if (fs.existsSync('.env')) {
  console.log('✅ .env file exists');
} else {
  console.log('❌ .env file missing - copy from .env.example');
  allFilesExist = false;
}

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
  console.log('🎉 Phone Auth Setup Complete!');
  console.log('\nNext steps:');
  console.log('1. Update your .env file with real Twilio credentials');
  console.log('2. Run: npm run dev');
  console.log('3. Test the phone auth endpoints');
} else {
  console.log('❌ Phone Auth Setup Incomplete!');
  console.log('\nPlease fix the missing files/configurations above.');
}

console.log('\n📚 Documentation:');
console.log('- PHONE_AUTH_COMPLETE_SUMMARY.md');
console.log('- PHONE_AUTH_README.md');
console.log('- PHONE_AUTH_FRONTEND_README.md');
